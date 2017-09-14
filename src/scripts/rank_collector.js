/***
 * Six Degrees of Spotify
 * This is run to create a file with a mapping between the date & rank of a track.
 * author: @rahrang
*/

// Import file server
const fs = require('fs');

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

