process.env["NTBA_FIX_319"] = 1;
var fins = require('omron-fins');
const TelegramBot = require('node-telegram-bot-api');
const telegramCommands = require('./utils/telegramCommands');
const config = require('./config/config.json')

// replace the value below with the Telegram token you receive from @BotFather
const token = config.telegram.token;
const chatId = config.telegram.chatId;


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
let queryCommand = "";
let notificationText = "";



// Connecting to remote FINS client on port 9600 with default timeout value.
var client = fins.FinsClient(9600,'192.168.1.146');

// Setting up our error listener
client.on('error',function(error) {
  console.log("Error: ", error);
});


// Bot response on message
bot.on('message', (msg) => {
	console.log(telegramCommands);
	// Check the command coming from telegram
	telegramCommands.forEach((command)=>{
		if(command.command === msg.text){
			client.read(command.memoryAdress, command.recordNumber)
			notificationText = command.text;
		}
	})
  });



// Volpak response 
client.on('reply',function(msgfins) {
  	console.log("Reply from: ", msgfins.remotehost);
  	console.log("Transaction SID: ", msgfins.sid)
	console.log("Replying to issued command of: ", msgfins.command);
	console.log("Response code of: ", msgfins.code);
	console.log("Data returned: ", msgfins.values);

	bot.sendMessage(chatId, notificationText + msgfins.values[0].toString(16));
});




