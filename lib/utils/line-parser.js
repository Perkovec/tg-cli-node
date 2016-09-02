'use strict';
const Message = require('../models/Message.js');

class Parser {
	constructor(connection) {
		this.connection = connection;
	}
	
	parse(line) {
		try {
			const scheme = JSON.parse(line);
			if (scheme.event === 'message') {
				return { type: 'message', data: new Message(this.connection, scheme) };
			} else {
				return { type: 'callback', data: scheme };
			}
		} catch(e) {
		}
	}
}

module.exports = Parser;