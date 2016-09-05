'use strict';
const Peer = require('./Peer');

class Message {
	constructor(connection, data) {
		this.service = data.service;
		this.event = data.event;
		this.reply_id = data.reply_id || null;
		this.id = data.id;
		this.from = new Peer(connection, data.from);
		this.to = new Peer(connection, data.to);
		this.flags = data.flags;
		this.out = data.out;
		this.unread = data.unread;
		this.date = data.date;
		this.text = data.text || null;
		
		this._registerEvents(connection);
	}
	
	_registerEvents(connection) {
		this.forward = peer => {
			connection.forward(peer, this.id);	
		}
		
		this.send = msg => {
			this.to.send(msg);
		}
		
		this.reply = msg => {
			connection.reply(this.id, msg);
		}
		
		this.sendImage = path => {
			this.to.sendImage(path);
		}
		
		this.sendDocument = path => {
			this.to.sendDocument(path);
		}
		
		this.deleteMsg = () => {
			connection.deleteMsg(this.id);
		}
		
		this.sendTyping = () => {
			this.from.sendTyping();
		}
	}
	
}

module.exports = Message;