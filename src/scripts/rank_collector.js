/***
 * Six Degrees of Spotify
 * This is run to create a file with a mapping between the date & rank of a track.
 * author: @rahrang
*/

// Import file server
const fs = require('fs');
const _ = require('lodash');

const helpers = require('./helpers.js');

const GLOBAL_PATH = '../track_data/global';
const USA_PATH = '../track_data/usa';

const global_weekly_dates = require(`${GLOBAL_PATH}/weekly/dates.json`);
const global_weekly_ranks_path = `${GLOBAL_PATH}/weekly/ranks`;

const global_daily_dates = require(`${GLOBAL_PATH}/daily/dates.json`);
const global_daily_ranks_path = `${GLOBAL_PATH}/daily/ranks`;

const usa_weekly_dates = require(`${USA_PATH}/weekly/dates.json`);
const usa_weekly_ranks_path = `${USA_PATH}/weekly/ranks`;

const usa_daily_dates = require(`${USA_PATH}/daily/dates.json`);
const usa_daily_ranks_path = `${USA_PATH}/daily/ranks`;

var collectRanks = (chart, view, dateArray, ranksPath) => {

    for (let i = 0; i < dateArray.length; i++) {
        
        let date = dateArray[i];
        let dateFile = fetchFile(`../track_data/${chart}/${view}/data/${date}.json`);
        let dateData = dateFile.items;

        for (let j = 0; j < dateData.length; j++) {

            let track = dateData[j].track;
            let trackID = track.id;
            let data = {};
            data['date'] = date;
            data['rank'] = (-(j + 1));

            let file = `${ranksPath}/${trackID}.json`;
            let trackFile = fetchFile(file);

            let inside = false;
            for (let k = 0; k < trackFile.length; k++) {
                if (_.isEqual(trackFile[k].date, date)) {
                    inside = true;
                }
            }
            if (!inside) {
                trackFile.unshift(data);
                saveFile(file, trackFile);
            }
        }
    }
}

var fetchFile = (file) => {
    try {
        let fileString = fs.readFileSync(file);
        return JSON.parse(fileString);
    } catch (e) {
        return [];
    }
}

var saveFile = (file, fileJSON) => {
    fs.writeFileSync(file, JSON.stringify(fileJSON));
}

collectRanks('global', 'weekly', global_weekly_dates, global_weekly_ranks_path);
collectRanks('global', 'daily', global_daily_dates, global_daily_ranks_path);
collectRanks('usa', 'weekly', usa_weekly_dates, usa_weekly_ranks_path);
collectRanks('usa', 'daily', usa_daily_dates, usa_daily_ranks_path);