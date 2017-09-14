/***
 * Six Degrees of Spotify
 * This is an individual track in each TrackRow.
 * author: @rahrang
*/

// React
import React from 'react';

// NPM Modules
import { css, StyleSheet } from 'aphrodite';
import Modal from 'react-modal';
// import {LineChart, XAxis, YAxis, CartesianGrid} from 'recharts';

const _ = require('lodash');

export default class TrackModal extends React.Component {

  render() {

    let { isOpen, onRequestClose, trackInfo } = this.props;

    if (_.isEmpty(trackInfo)) {
      return null;
    }

    let featArtists = [];
    for (let i = 1; i < trackInfo.artists.length; i++) {
      featArtists.push(trackInfo.artists[i].name);
    }

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={css(styles.modal)}
        overlayClassName={css(styles.overlay)}
        contentLabel="Modal"
      >

        <div className={css(styles.bodyContainer)}>
          <div className={css(styles.leftContainer)}>
            <img className={css(styles.image)} src={trackInfo.imageSrc} alt={trackInfo.trackName} />
          </div>
          <div className={css(styles.rightContainer)}>
            <div className={css(styles.headerContainer)}>
              <h1 className={css(styles.trackName)}> {trackInfo.trackName} </h1>
              <span 
                className={css(styles.closeIcon)}
                onClick={onRequestClose}
              >
                <i className={css(styles.icon) + " fa fa-times"} aria-hidden="true"></i>
              </span>
            </div>
            <div className={css(styles.infoContainer)}>
              <h2 className={css(styles.info, styles.artistName)}>
                {trackInfo.artists[0].name}
              </h2>
              {!_.isEmpty(featArtists) &&
                <h3 className={css(styles.info, styles.featArtists)}>
                  {'feat. ' + featArtists.join(', ')}
                </h3>
              }
              <h2 className={css(styles.info, styles.albumName)}>
                {trackInfo.albumName}
              </h2>
            </div>
            {/*
            <div className={css(styles.lineChart)}>
              <LineChart width={400} height={300} data={[{date: '1', rank: '1'}]}>
                <XAxis dataKey='date' />
                <YAxis dataKey='rank' />
                <CartesianGrid strokeDasharray="3 3" />
              </LineChart>
            </div>
            */}
            <div className={css(styles.playerContainer)}>
              <iframe
                title={trackInfo.trackName}
                src={`https://open.spotify.com/embed?uri=${trackInfo.uri}`}
                frameBorder="0"
                allowTransparency="true"
                width={350}
                height={80}
              >
              </iframe>
            </div>   
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

  modal: {
    backgroundColor: '#222',
    border: '3px solid #FFF',
    borderRadius: '5px',
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '500px',
    width: '1000px',

  },

  overlay : {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },

  closeIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '20px',
  },

  icon: {
    color: '#FFF',
    fontSize: '1.5em',
  },

  trackName: {
    borderBottom: '3px solid #FFF',
    color: '#FFF',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2em',
    margin: '0',
    padding: '10px 30px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  leftContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: '500px',
    width: '500px',
  },

  rightContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoContainer: {
    padding: '20px',
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    textAlign: 'center',
  },

  artistName: {
    fontSize: '1.75em',
  },

  featArtists: {
    fontSize: '1em',
  },

  albumName: {
    fontSize: '1.25em',
    letterSpacing: '0.025em',
    margin: '10px 0',
    textTransform: 'uppercase',
  },

  info: {
    padding: '0',
    margin: '5px 0',
    letterSpacing: '0.0125em',
  },

})
