/***
 * Six Degrees of Spotify
 * This is run to collect data from the Spotify endpoint.
 * This file does not contain the client id or client secret, so as to not reveal secure information. 
 * author: @rahrang
*/

// Import file server
const fs = require('fs');

// Import request package
const request = require('request');

// Import moment package
const moment = require('moment');

/*** Create the file name ***/
createDate = () => {
    const momentDate = moment().format('L').toString();
    const date = momentDate.split('/').join('_');
    return date;
}

const day = moment().format('dddd').toString(); // Create the day of the week (e.g. Tuesday, Saturday, etc.)
const fileName = createDate(); // Create the actual date (e.g. 09_09_2017)
const folderName = './data'; // This is the directory the data will be stored inside

/*** Create the info needed for the request to Spotify's endpoint ***/
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_USER = 'spotifycharts'
const SPOTIFY_CHART = '37i9dQZEVXbLRQDuF5jeBp'; // US TOP 50
const SPOTIFY_ENDPOINT = `${SPOTIFY_API_BASE_URL}/v1/users/${SPOTIFY_USER}/playlists/${SPOTIFY_CHART}/tracks?fields=items(track(album(href,id,images,name),artists(href,id,name),id,name,popularity,uri))&limit=10&offset=0` 

/*** Create the Access Token ***/
const client_id = 'CLIENT_ID'; // client id -- REMOVED TO PREVENT DATA COMPROMISE
const client_secret = 'CLIENT_SECRET'; // client secret -- REMOVED TO PREVENT DATA COMPROMISE

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
    request.get(options, function(error, response, json) {
        jsonString = JSON.stringify(json);
        fs.appendFileSync(`daily_data/${fileName}.json`, jsonString); // put the data in the daily_data folder
        if (day === 'Tuesday') { // if today is Tuesday (day new music is released in US), put the data in the weekly_data folder
          fs.appendFileSync(`weekly_data/${fileName}.json`, jsonString); 
        }
    });
  }
});