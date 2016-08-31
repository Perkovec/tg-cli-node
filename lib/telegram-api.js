'use strict';
const TelegramCliWrapper = require('./telegram-cli-wrapper.js');

const APIConnection = require('./models/APIConnection.js');

class TelegramAPI {
  constructor(config) {
    this.socket = null;
    this.connection = null;
    this.tgcli = new TelegramCliWrapper(config);
  }
  
  connect(callback) {
    if(this.tgcli.isRunning()){
      throw new Error('TelegramAPI is already running');
    }
    
    this.tgcli.start(socket => {
      this.connection = new APIConnection(socket);
      this.socket = socket;

      this.socket.writeLine('main_session');

      this.socket.writeLine('contact_list');

      this.socket.writeLine('dialog_list');

      callback(this.connection);
    });
  }
  
  disconnect() {
    this.tgcli.stop();
    if(this.connection){
      this.connection.close();
      this.connection = null;
    }
  }
}

module.exports = TelegramAPI;