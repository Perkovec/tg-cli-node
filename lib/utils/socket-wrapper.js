'use strict';
const events = require('events');

class SocketWrapper extends events.EventEmitter {
	constructor(socket, options) {
		super();
		this.socket = socket;
		options = options || {};
		this.lineDelimiter = options.lineDelimiter || '\n';
		this.encoding = options.encoding || 'utf8';
		this.init();
	}
	
	init() {
		this.buffer = '';
		this.socket.setEncoding(this.encoding);
		this.socket.on('data', data => {
			this.buffer += data;
			let i;
			while ((i = this.buffer.indexOf(this.lineDelimiter)) !== -1) {
				const line = this.buffer.substr(0, i);
				//printBuffer(this.buffer);
				if (line) {
					this.emit('line', line);
				}
				this.buffer = this.buffer.substr(i + 1);
			}
		});
		
		this.socket.on('error', e => {
			this.emit('error', e);
		});
		
		this.socket.on('close', () => {
			this.emit('close');
		});
	}
	
	end() {
		if(this.socket){
    	this.socket.end();
    }
	}
	
	writeLine(line) {
		this.socket.write(line + '\n');
	}
}

function printBuffer(buffer){
    console.log('buffer:', buffer.replace(/\n/g, '\\n'));
}

module.exports = SocketWrapper;