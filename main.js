const TelegramAPI = require('./lib/telegram-api.js');
const config = require('./config');

const Client = new TelegramAPI(config);

Client.connect(connection => {
    connection.on('message', message => {
        console.log('message:', message);
    });

    connection.on('error', e => {
        console.log('Error from Telegram API:', e);
    });

    connection.on('disconnect', () => {
        console.log('Disconnected from Telegram API');
    });
});