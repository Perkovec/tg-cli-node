var spawn = require('child_process').spawn,
    SocketWrapper = require('./utils/socket-wrapper.js'),
    net = require('net');


function TelegramCliWrapper(config){
    this.childInstance = null;
    this.socket = null;
    this.config = config;
}

TelegramCliWrapper.prototype.start = function(callback){
    if(this.childInstance){
        throw new Error('Process already started');
    }

    var cli_path = this.config.telegram_cli_path,
        publickey_path = this.config.server_publickey_path,
        socket_path = generateSocketName(this.config.telegram_cli_socket_path);

    console.log('starting child process');
    //Start telegram-cli as child process listening on specified socket
    this.childInstance = spawn(cli_path, ['-k', publickey_path, '-S', socket_path]);
    
    bindChildEvents.call(this, this.childInstance);
    // this.childInstance.stdout.pipe(process.stdout);
    this.childInstance.stdout.setEncoding('utf8');
    this.childInstance.stdout.once('data', function(data){
        data = data.replace(/\r|\n/g, '').trim();
        if(/^Telegram-cli version/.test(data)){
            this.socket = net.createConnection(socket_path, function(){
                callback(new SocketWrapper(this.socket));
            }.bind(this));    
        }
    }.bind(this));
}

TelegramCliWrapper.prototype.stop = function(){
    if(this.socket && this.socket.writable){
        this.socket.write('quit\n');
    }

    if(this.childInstance){
        this.childInstance = null;
    }
}

TelegramCliWrapper.prototype.isRunning = function(){
    return !!this.childInstance;
}

//Generate unique socket name
function generateSocketName(path){
    return path + +new Date;
}

function bindChildEvents(childProcess){
    childProcess.on('error', function(e){
        console.log(e);
    });

    childProcess.on('exit', function(){
        this.stop();
    }.bind(this));
}

module.exports = TelegramCliWrapper;