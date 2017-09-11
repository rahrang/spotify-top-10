/***
 * Six Degrees of Spotify
 * This is the main page of the app.
 * author: @rahrang
*/

import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const helpers = require('../client/helpers.js');

const daily_dates = require('../client/daily_dates.json');

class Home extends React.Component {

  render() {

    console.log(daily_dates);


    // find ways to push this to Redux store in ComponentDidMount
    for (var i = 0; i < daily_dates.length; i++) {
      var dateFile = require(`../client/daily_data/${daily_dates[i]}.json`);
      console.log(dateFile);
    }

    return (
      <div className="home-container">
        <h1 className={css(styles.header)}>Spotify Top 10</h1>
        <h2></h2>
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
