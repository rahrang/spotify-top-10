/***
 * Six Degrees of Spotify
 * These are helper functions to 
 * author: @rahrang
*/

const fs = require('fs');
const _ = require('lodash');

var addDate = (file, date) => {

    var dates = [];

    try {
        var dateString = fs.readFileSync(file)
        dates = JSON.parse(dateString);
        if (_.includes(dates, date)) {
            console.log(`ERROR: ${file} already contains ${date}`);
            return false;
        }
    } catch (e) {
        console.log('could not read dates');
        dates = [];
    }

    dates.unshift(date);
    fs.writeFileSync(file, JSON.stringify(dates));
    return true;
}

var getDates = (file) => {
    try {
        var dateString = fs.readFileSync(file);
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