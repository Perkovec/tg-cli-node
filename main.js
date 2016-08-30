var TelegramAPI = require('./lib/telegram-api.js');

TelegramAPI.connect(function(connection){
    connection.on('message', function(message){
        console.log('message:', message);
    });


    connection.on('error', function(e){
        console.log('Error from Telegram API:', e);
    });

    connection.on('disconnect', function(){
        console.log('Disconnected from Telegram API');
    });
});