/***
 * Six Degrees of Spotify
 * This is run to collect data from the Spotify endpoint.
 * This file does NOT contain confidential information (client id & secret)
 * author: @rahrang
*/

// Import built-in NPM modules
const fs = require('fs');

// Import NPM packages
const request = require('request');
const moment = require('moment');

// Import local helper file
const helpers = require('./helpers.js');

/*** CONSTANTS ***/
const CLIENT_ID = '';
const CLIENT_SECRET = '';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_USER = 'spotifycharts'
const USA_CHART = '37i9dQZEVXbLRQDuF5jeBp'; // US TOP 50
const GLOBAL_CHART = '37i9dQZEVXbMDoHDwVN2tF'; // Global TOP 50

const USA_PATH = '../track_data/usa';
const GLOBAL_PATH = '../track_data/global';

/*** Create the file name ***/
createDate = () => {
    const momentDate = moment().format('L').toString();
    const date = momentDate.split('/').join('_');
    return date;
}

const day = moment().format('dddd').toString();
const fileName = createDate();

/*** Create the Access Token ***/
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

/*** Define function to make requests to Spotify API ***/
var makeRequest = (chartPath, chartID) => {
  request.post(authOptions, function(error, response, json) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const token = json.access_token;
      const options = {
        url: `${SPOTIFY_API_BASE_URL}/v1/users/${SPOTIFY_USER}/playlists/${chartID}/tracks?fields=items(track(album(href,id,images,name),artists(href,id,name),id,name,popularity,uri))&limit=10&offset=0`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };

      // get data from the Spotify API endpoint, store it in local files
      request.get(options, function(error, response, body) {
        bodyString = JSON.stringify(body);
        let dateAdded = helpers.addDate(`${chartPath}/daily/dates.json`, fileName);
        if (dateAdded) {  
          fs.appendFileSync(`${chartPath}/daily/data/${fileName}.json`, bodyString);
        }
        if (day === 'Monday') {
          let dateAdded = helpers.addDate(`${chartPath}/weekly/dates.json`, fileName);
          if (dateAdded) {
            fs.appendFileSync(`${chartPath}/weekly/data/${fileName}.json`, bodyString);
          }
        }
      });
    }
  });
}

/*** Make requests to Spotify API ***/
makeRequest(USA_PATH, USA_CHART);
makeRequest(GLOBAL_PATH, GLOBAL_CHART);