var Excel = require('exceljs');

// read from a file
var workbook = new Excel.Workbook(); 


let worksheetToArray = async (xlsxPath, worksheetName) => {
    let result = [];

    let readWorkbook = await workbook.xlsx.readFile(xlsxPath)
    let readWorkSheet = await readWorkbook.getWorksheet(worksheetName);
    await readWorkSheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
        result.push(row.values)
    }) 

    return result;
}



let formatTurnos = async (xlsxPath, worksheetName) => {

    let responseTurnos = [] ;
    let responseText = "";

    let preformatTurnos = await worksheetToArray(xlsxPath, worksheetName);
    
    let turnosDelNull = await preformatTurnos.map((row)=>{
        return row.filter((element)=>{ return element != null;})
    })
    
    turnosDelNull.splice(0,1)

    responseTurnos = [
        {
            fecha : turnosDelNull[2][0],  
            mañana: turnosDelNull[2].slice(2,5) , 
            tarde:turnosDelNull[3].slice(1,4) , 
            noche:turnosDelNull[4].slice(1,4) 
        },
        {
            fecha : turnosDelNull[6][0],  
            mañana: turnosDelNull[6].slice(2,5) , 
            tarde:turnosDelNull[7].slice(1,4) , 
            noche:turnosDelNull[8].slice(1,4) 
        },
        {
            fecha : turnosDelNull[9][0],  
            mañana: turnosDelNull[9].slice(2,5) , 
            tarde:turnosDelNull[10].slice(1,4) , 
            noche:turnosDelNull[11].slice(1,4) 
        }

    ]
    
    responseTurnos.forEach((week)=>{
        responseText = responseText.concat(" \n <b> $week.fecha </b> \n Turno de mañana: $week.mañana \n Turno de tarde: $week.tarde \n Turno de noche: $week.noche \n ")
    })
    return responseText;
}



module.exports = { worksheetToArray, formatTurnos}