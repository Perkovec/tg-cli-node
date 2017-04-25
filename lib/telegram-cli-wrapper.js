'use strict';
const spawn = require('child_process').spawn;
const SocketWrapper = require('./utils/socket-wrapper.js');
const net = require('net');

class TelegramCliWrapper {
  constructor(config) {
    this.childInstance = null;
    this.socket = null;
    this.config = config;
  }
  
  start(callback) {
    if (this.childInstance) {
      throw new Error('Process already started');
    }
    
    const cli_path = this.config.telegram_cli_path;
    const publickey_path = this.config.server_publickey_path;
    const socket_path = generateSocketName(this.config.telegram_cli_socket_path);
    
    console.log('starting child process');
    this.childInstance = spawn(cli_path, ['-k', publickey_path, '-S', socket_path, '--json']);
    bindChildEvents.call(this, this.childInstance);
    // this.childInstance.stdout.pipe(process.stdout);
    this.childInstance.stdout.setEncoding('utf8');
    this.childInstance.stdout.once('data', data => {
      data = data.replace(/\r|\n/g, '').trim();

      if (/^Telegram-cli version/.test(data)) {
        this.childInstance.stdout.once('data', () => {
          this.socket = net.createConnection(socket_path, () => {
            callback(new SocketWrapper(this.socket));
          });
        });
      }
    });
  }
  
  stop() {
    if(this.socket && this.socket.writable){
     this.socket.write('quit\n');
    }

    if(this.childInstance){
      this.childInstance = null;
    }
  }
  
  isRunning() {
    return !!this.childInstance;
  }
}

//Generate unique socket name
function generateSocketName(path){
    return path + +new Date;
}

function bindChildEvents(childProcess){
    childProcess.on('error', e => {
        console.log(e);
    });

    childProcess.on('exit', (() => {
        this.stop();
    }).bind(this));
}

module.exports = TelegramCliWrapper;