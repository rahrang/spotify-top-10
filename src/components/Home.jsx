/***
 * Six Degrees of Spotify
 * This is the main page of the app.
 * author: @rahrang
*/

import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import spotify_client_id from '../client/config.js';

class Home extends React.Component {

  render() {
    return (
      <div className="home-container">
        <h1 className={css(styles.header)}>Spotify Top 10</h1>
      </div>
    );
  }
}

export default Home;

const styles = StyleSheet.create({

    header: {
        color: '#FFF',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '1.5em',
        fontWeight: '500',
        margin: '0',
        padding: '10px',
    }

})
