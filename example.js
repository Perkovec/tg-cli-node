const TelegramAPI = require('./lib/telegram-api.js');
const config = require('./config.js');

const Client = new TelegramAPI(config);
// console.log('conf',config);
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
    connection.add_contact('+989123456789','sad',' ').then((xx)=>{
        console.log('xxxxxxxx',xx);
    });
});
