
let omronFinsUtils = require('./omronFins')

const telegramCommands = [
    { command : "/volpak" , memoryAdress : "D1002" , recordNumber: "1" , text: "Chips empaquetados :", clientType: "finsClient", util: "omronFinsUtils"   }
]

module.exports = { telegramCommands }

