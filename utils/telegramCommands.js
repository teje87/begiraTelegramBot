
let omronFinsUtils = require('./omronFins')

const telegramCommands = [

    //FINS
    { command : "/volpak" , memoryAdress : "D1002" , recordNumber: "1" , text: "Chips empaquetados :", fins: true, util: "omronFinsUtils"   },

    // CHAT
    { command : "kaixo", text: "<b>Kaixo</b> \n \n Soy <b>BegiraBot</b> si necesitas información de alguna estación escribe / seguido del nombres de la estación", chat: true},


    // EXCEL
    { command: "/turnos" , text: "Estos son los turnos del mes : " , xlxsPath: "./assets/excell/turnos.xlsx", worksheetName: "turnos" , excell: true , method: "formatTurnos"}
]

module.exports = { telegramCommands }

