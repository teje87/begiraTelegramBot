process.env["NTBA_FIX_319"] = 1;
const omronFinsUtils = require('./utils/omronFins');
const adsTwincatUtils = require('./utils/adsTwincat');
const excellUtils = require('./utils/excellRead');
const TelegramBot = require('node-telegram-bot-api');
const {telegramCommands} = require('./utils/telegramCommands');
const {chatId, bot} = require('./botInit');


let queryCommand = "";
let notificationText = "";
let currentUtil = "";

omronFinsUtils.finsErrorHandle()

adsTwincatUtils.adsConnectAndListen(adsTwincatUtils.handle,adsTwincatUtils.options);


// Bot response on message
bot.on('message', (msg) => {
	
	// Check the command coming from telegram
	telegramCommands.forEach((command)=>{
		if(command.command === msg.text.toLowerCase()){

			command.fins ? omronFinsUtils.finsRead(command) : null
			command.chat ?  bot.sendMessage(chatId, command.text, {parse_mode : "HTML"}) : null
			command.excell ?
						excellUtils[command.method](command.xlxsPath,command.worksheetName)
							.then((result) => bot.sendMessage(chatId, command.text + result,  {parse_mode : "HTML"} )) 
						: null

			notificationText = command.text;
		}
	})
});



// Volpak response 
omronFinsUtils.finsClient.on('reply',function(msgfins) {
	bot.sendMessage(chatId, notificationText + msgfins.values[0].toString(16));
});




