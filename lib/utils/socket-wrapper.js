var events = require('events'),
    util = require('util');

function SocketWrapper(socket, options){
    this.socket = socket;
    options = options || {};
    this.lineDelimiter = options.lineDelimiter || '\n';
    this.encoding = options.encoding || 'utf8';
    this.init();
}

util.inherits(SocketWrapper, events.EventEmitter);

SocketWrapper.prototype.init = function() { 
    this.buffer = '';
    this.socket.setEncoding(this.encoding);
    this.socket.on('data', function(data){
        this.buffer += data;
        while((i = this.buffer.indexOf(this.lineDelimiter)) != -1){
            var line = this.buffer.substr(0, i);
            //printBuffer(this.buffer);
            if(line){
                this.emit('line', line);
            }
            this.buffer = this.buffer.substr(i + 1);
        }
    }.bind(this));

    this.socket.on('error', function(e){
        this.emit('error', e);
    }.bind(this));

    this.socket.on('close', function(){
        this.emit('close');
    }.bind(this));
};

SocketWrapper.prototype.end = function() {
    if(this.socket){
        this.socket.end();
    }
};

SocketWrapper.prototype.writeLine = function(line) {
    this.socket.write(line + '\n');
};

function printBuffer(buffer){
    console.log('buffer:', buffer.replace(/\n/g, '\\n'));
}

module.exports = SocketWrapper;