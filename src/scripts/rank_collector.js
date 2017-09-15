/***
 * Six Degrees of Spotify
 * This is run to create a file with a mapping between the date & rank of a track.
 * author: @rahrang
*/

// Import file server
const fs = require('fs');
const _ = require('lodash');

const helpers = require('./helpers.js');

/***
- take in 'daily' or 'weekly', 'US or Global'
- iterate through the DATE.json files in daily_data/weekly_data folders (use daily_dates and weekly_dates for this)
    - for every date, iterate through the trackIDs (((.items[index].track.id)))
    - create the mapping between the date & (-(index + 1))
    - create/append to a file TRACK_ID.json inside the daily_tracks or weekly_tracks directory
    - [{09_09_2017: 1}, {09_10_2017: 2}, ...]
- in TrackModal, require the file, convert the file contents to JSON, feel it into the data in LineChart
***/

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
            trackFile.unshift(data);

            saveFile(file, trackFile);
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