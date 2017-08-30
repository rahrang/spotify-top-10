/***
 * Six Degrees of Spotify
 * We declare our Spotify API endpoints here.
 * author: @rahrang
*/

const BASE_URL = 'https://api.spotify.com'

module.exports = {

    BASE_URL: BASE_URL,

    // v1/artists/{id}
    GET_ARTIST: '/v1/artists/',

    // '/v1/artists?ids={ids}' 
    GET_ARTISTS: '/v1/artists?ids=',

    // GET_ARTIST_ALBUMS: '/v1/artists/{id}/albums'
    // SEARCH: '/v1/search/q={artist}&type=artist'
}