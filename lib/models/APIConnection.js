var util = require('util'),
    events = require('events'),
    parse = require('../utils/message-parser.js');

function APIConnection(socket) {
    this.socket = socket;
    registerEvents.call(this, socket);
    this.open = true;
}

util.inherits(APIConnection, events.EventEmitter);

APIConnection.prototype.send = function(peer, message) {
    this._executeCommand('msg', peer, message);
};

APIConnection.prototype.sendImage = function(peer, path) {
    this._executeCommand('send_photo', peer, '"' + path + '"');
};

APIConnection.prototype.sendDocument = function(peer, path) {
    this._executeCommand('send_document', peer, '"' + path + '"');
};

APIConnection.prototype._executeCommand = function() {
    if(this.open){
        var args = Array.prototype.slice.call(arguments);
        var cmd = args.join(' ');
        console.log('executing command:', cmd);
        this.socket.writeLine(cmd);
    }else{
        throw new Error('Api connection closed');
    }
};

APIConnection.prototype.close = function() {
    if(this.open){
        this.open = false;
        this.socket.end();
    }
};

var registerEvents = function(socket) {
    socket.on('line', function(line){
        var message = parse(line);
            this.emit('message', line);
    }.bind(this));

    socket.on('error', function(e){
        this.emit('error', e);
    }.bind(this));

    socket.on('close', function(){
        this.emit('disconnect');
    }.bind(this));
};

module.exports = APIConnection;