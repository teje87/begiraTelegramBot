const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config.json')
// replace the value below with the Telegram token you receive from @BotFather
const token = config.telegram.token;
const chatId = config.telegram.chatId;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

module.exports = { token, chatId, bot}