const path = require('path');

module.exports = {
    telegram_cli_path: path.join(__dirname, 'tg/bin/telegram-cli'),
    telegram_cli_socket_path: path.join(__dirname, 'socket'),
    server_publickey_path: path.join(__dirname, 'tg/tg-server.pub'),
}