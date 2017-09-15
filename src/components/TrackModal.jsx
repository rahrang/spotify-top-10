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

const _ = require('lodash');

export default class TrackModal extends React.Component {

  render() {

    let { isOpen, onRequestClose, trackInfo, chart, view } = this.props;

    if (_.isEmpty(trackInfo)) {
      return null;
    }

    let trackFile = require(`../track_data/${chart}/${view}/ranks/${trackInfo.trackID}.json`);

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
              <iframe
                title={trackInfo.trackName}
                src={`https://open.spotify.com/embed?uri=${trackInfo.uri}`}
                frameBorder="0"
                allowTransparency="true"
                width={'100%'}
                height={'100%'}
              >
              </iframe>
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
            <div className={css(styles.lineChart)}>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

  modal: {
    backgroundColor: '#FFF',
    outline: 'none',
    height: '100%',
    width: '100%',
    overflow: 'disabled',
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
    color: '#1DB954',
    fontSize: '1.5em',
  },

  trackName: {
    borderBottom: '3px solid #1DB954',
    color: '#222',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2.5em',
    margin: '0',
    padding: '10px 30px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    '@media(min-width:768px)': {
      flexDirection: 'row',
    }
  },

  leftContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
    color: '#222',
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
