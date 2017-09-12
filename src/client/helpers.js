const fs = require('fs');

var addDate = (file, date) => {

    var dates = [];

    try {
        var dateString = fs.readFileSync(file)
        dates = JSON.parse(dateString);
    } catch (e) {
        console.log('could not read dates');
        return [];
    }

    dates.unshift(date);
    fs.writeFileSync(file, JSON.stringify(dates));
}

var getDates = (file) => {
    
    var dates = [];

    try {
        var dateString = fs.readFileSync(file);
        console.log('from here');
        return JSON.parse(dateString);
    } catch (e) {
        console.log('error', e);
        return [];
    }
}

module.exports = {
    addDate,
    getDates
}