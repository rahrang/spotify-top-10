/***
 * Six Degrees of Spotify
 * This is run to collect data from the Spotify endpoint.
 * author: @rahrang
*/

// Import file server
const fs = require('fs');
// Import request package
const request = require('request');
// Import moment package
const moment = require('moment');

const helpers = require('./helpers.js');

const DAILY_PATH = '../track_data/daily'
const WEEKLY_PATH = '../track_data/weekly'

/*** Create the file name ***/
createDate = () => {
    const momentDate = moment().format('L').toString();
    const date = momentDate.split('/').join('_');
    return date;
}

const day = moment().format('dddd').toString();
// const fileName = createDate();
const fileName = 'here';

/*** Create the info needed for the request to Spotify's endpoint ***/
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_USER = 'spotifycharts'
const SPOTIFY_CHART = '37i9dQZEVXbLRQDuF5jeBp'; // US TOP 50
const SPOTIFY_ENDPOINT = `${SPOTIFY_API_BASE_URL}/v1/users/${SPOTIFY_USER}/playlists/${SPOTIFY_CHART}/tracks?fields=items(track(album(href,id,images,name),artists(href,id,name),id,name,popularity,uri))&limit=10&offset=0` 

/*** Create the Access Token ***/
const client_id = '547c50263a834e1aa8facc89365eb672'; // client id
const client_secret = 'd6957ea6a316466e97f4ca8a7170be5f'; // client secret

// application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

/*** Make the request to Spotify endpoint ***/
request.post(authOptions, function(error, response, json) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    const token = json.access_token;
    const options = {
      url: SPOTIFY_ENDPOINT,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      bodyString = JSON.stringify(body);
      fs.appendFileSync(`${DAILY_PATH}/data/${fileName}.json`, bodyString); // put the data in the daily_data folder
      helpers.addDate(`${DAILY_PATH}/dates.json`, fileName);
      if (day === 'Monday') { // if today is Monday (Tuesday is day new music is released in US), put the data in the weekly_data folder
        fs.appendFileSync(`${WEEKLY_PATH}/data/${fileName}.json`, bodyString);
        helpers.addDate(`${WEEKLY_PATH}/dates.json`, fileName);
      }
    });
  }
});