

    var fins = require('omron-fins');
    const config = require('../config/config.json')
    var finsClient = fins.FinsClient(9600,config.URI.station7);

    let finsErrorHandle = ()=> {
        finsClient.on('error',function(error) {
            console.log("Error: ", error);
        });
    }

    let finsRead = (command) => {
        finsClient.read(command.memoryAdress, command.recordNumber)
    }


    module.exports = {finsErrorHandle, finsRead, finsClient}
