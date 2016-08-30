function Message(time, peer, type, body){
    this.time = time;
    this.peer = peer;
    this.type = type;
    this.body = body;
}

module.exports = Message;