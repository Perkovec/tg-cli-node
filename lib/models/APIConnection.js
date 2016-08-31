'use strict';
const events = require('events');
const parser = require('../utils/line-parser');

class APIConnection extends events.EventEmitter {
	constructor(socket) {
		super();
		this.socket = socket;
		registerEvents.call(this, socket);
		this.open = true;
	}
	
	send(peer, message) {
		this._executeCommand('msg', peer, `"${message}"`);
	}
	
	sendImage(peer, path) {
		this._executeCommand('send_photo', peer, '"' + path + '"');
	}
	
	sendDocument(peer, path) {
		this._executeCommand('send_document', peer, '"' + path + '"');
	}
	
	_executeCommand() {
    if(this.open){
      var args = Array.prototype.slice.call(arguments);
      var cmd = args.join(' ');
      console.log('executing command:', cmd);
      this.socket.writeLine(cmd);
    }else{
      throw new Error('Api connection closed');
    }
	}
	
	close() {
		if(this.open){
      this.open = false;
      this.socket.end();
    }
	}
}

function registerEvents(socket) {
	socket.on('line', line => {
		const parsedLine = parser(line);
		if (parsedLine) {
			this.emit(parsedLine.type, parsedLine);	
		}
	});

	socket.on('error', e => {
		this.emit('error', e);
	});

	socket.on('close', () => {
		this.emit('disconnect');
	});
};

module.exports = APIConnection;