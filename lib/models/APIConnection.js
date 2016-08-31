'use strict';
const events = require('events');
const Parser = require('../utils/line-parser');

class APIConnection extends events.EventEmitter {
	constructor(socket) {
		super();
		this.socket = socket;
		this.lineParser = new Parser(this);
		this._registerEvents();
		this.open = true;
	}
	
	send(peer, message) {
		this._executeCommand('msg', peer, `"${message}"`);
	}
	
	delete_msg(id) {
		this._executeCommand('delete_msg', id);
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
	
	_registerEvents() {
		this.socket.on('line', line => {
			const parsedLine = this.lineParser.parse(line);
			if (parsedLine) {
				this.emit(parsedLine.type, parsedLine.data);	
			}
		});

		this.socket.on('error', e => {
			this.emit('error', e);
		});

		this.socket.on('close', () => {
			this.emit('disconnect');
		});
	};
}


module.exports = APIConnection;