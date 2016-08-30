var config = { 
    telegram_cli_path: __dirname + '/../tg/bin/telegram-cli',
    telegram_cli_socket_path: __dirname + '/../socket',
    server_publickey_path: __dirname + '/../tg/tg-server.pub',
};

exports.get = function(key){
    var value;
    if((value = config[key]) !== undefined){
        return value;
    }

    throw new Error('Key ' + key + ' not defined');
}