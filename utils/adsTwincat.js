var ads = require('node-ads');
const statusMessages = require('../config/statusMessages.json');
const {chatId,bot} = require('../botInit');

var options = {
    host: "192.168.1.60",
    amsNetIdTarget: "169.254.91.243.1.1",
    amsNetIdSource: "192.168.1.93.1.1",
    amsPortTarget: 301,
    port: 48898
}



let handle = {
    symname: 'MAIN.OUTPUTS.ILINE_COM_OUT_1.STATUS',  
    bytelength: ads.BYTE,       
    propname: 'value',
    
}


let adsConnectAndListen = (myHandle, options) => {

    let adsTwincatClient = ads.connect(options, function() {
        this.notify(myHandle);
    });
    
    adsTwincatClient.on('notification', function(handle){
        console.log(handle.value);
        console.log("notification?")
        bot.sendMessage(chatId, "station5 :" + statusMessages.station5[handle.value]);
    })
    
    
    adsTwincatClient.on('error', function(error) {
        console.log(error)
    })

    

}

module.exports = {adsConnectAndListen, handle, options}
