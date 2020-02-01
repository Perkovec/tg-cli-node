# tg-cli-node

[![Greenkeeper badge](https://badges.greenkeeper.io/Perkovec/tg-cli-node.svg)](https://greenkeeper.io/)

Node.js wrapper for [telegram-cli](https://github.com/vysheng/tg)

[Docs](https://github.com/Perkovec/tg-cli-node/wiki/Documentation)

## How to use
Install package from npm:
```bash
npm install tg-cli-node
```

Create `config.js` with:
```javascript
const path = require('path');
const os = require('os');

module.exports = {
    telegram_cli_path: path.join(__dirname, 'tg/bin/telegram-cli'), //path to tg-cli (see https://github.com/vysheng/tg)
    telegram_cli_socket_path: path.join( os.tmpdir(), 'socket'), // path for socket file
    server_publickey_path: path.join(__dirname, 'tg/tg-server.pub'), // path to server key (traditionally, in %tg_cli_path%/tg-server.pub)
}
```

Open your app script and use this example:
```javascript
const TelegramAPI = require('tg-cli-node');
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
```