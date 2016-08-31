'use strict';
const Peer = require('./Peer');

class Message {
	constructor(connection, data) {
		this.service = data.service;
		this.event = data.event;
		this.reply_id = data.reply_id || null;
		this.id = data.id;
		this.from = new Peer(data.from);
		this.to = new Peer(data.to);
		this.flags = data.flags;
		this.out = data.out;
		this.unread = data.unread;
		this.date = data.date;
		this.text = data.text || null;
		
		this.registerEvents(connection);
	}
	
	registerEvents(connection) {
		this.delete_msg = () => {
			connection.delete_msg(this.id);
		}
	}
	
}

module.exports = Message;