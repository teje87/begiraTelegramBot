
let omronFinsUtils = require('./omronFins')

const telegramCommands = [
    { command : "/volpak" , memoryAdress : "D1002" , recordNumber: "1" , text: "Chips empaquetados :", fins: true, util: "omronFinsUtils"   },
    { command : "kaixo", text: "<b>Kaixo</b> \n \n Soy <b>BegiraBot</b> si necesitas información de alguna estación escribe / seguido del nombres de la estación", chat: true}
]

module.exports = { telegramCommands }

