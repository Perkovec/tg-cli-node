'use strict';

class Peer {
	constructor(connection, data) {
		this.peer_id = data.peer_id;
		this.id = data.id;
		this.phone = data.phone || null;
		this.peer_type = data.peer_type;
		this.flags = data.flags;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.print_name = data.print_name;
		this.username = data.username;
		this.title = data.title || null;
		this.members_num = data.members_num || null;
		this.kicked_count = data.kicked_count || null;
		this.participants_count = data.participants_count || null;
		this.admins_count = data.admins_count || null;
		
		this._registerEvents(connection);
	}
	
	_registerEvents(connection) {
		this.forward = msg_id => {
			connection.forward(this.print_name, msg_id);
		}
		
		this.send = msg => {
			connection.send(this.print_name, msg);
		}
		
		this.sendImage = path => {
			connection.sendImage(this.print_name, path);
		}
		
		this.sendDocument = path => {
			connection.sendDocument(this.print_name, path);
		}
		
		this.sendTyping = () => {
			connection.sendTyping(this.id);
		}
	}
	
}

module.exports = Peer;