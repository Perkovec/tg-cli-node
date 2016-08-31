'use strict';

class Peer {
	constructor(data) {
		this.peer_id = data.peer_id;
		this.id = data.id;
		this.phone = data.phone || null;
		this.peer_type = data.peer_type;
		this.flags = data.flags;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.username = data.username;
	}
}

module.exports = Peer;