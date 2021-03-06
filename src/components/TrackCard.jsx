/***
 * Six Degrees of Spotify
 * This is an individual track in each TrackRow.
 * author: @rahrang
*/

// React
import React from 'react';

// NPM Modules
import { css, StyleSheet } from 'aphrodite';

export default class TrackCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: '',
      albumID: -1,
      imageSrc: '/',
      artists: '',
      trackName: '',
      trackID: -1,
      popularity: -1,
      uri: '',
    }
  }

  componentDidMount() {
    let { trackInfo } = this.props;
    if (trackInfo) {
      this.parseInfo(trackInfo.track);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trackInfo !== this.props.trackInfo) {
      this.parseInfo(nextProps.trackInfo.track);
    }
  }

  parseInfo = (track) => {
    const album = track.album;
    this.setState({
      albumName: album.name,
      albumID: album.id,
      imageSrc: album.images[0].url,
      artists: track.artists,
      trackName: track.name,
      trackID: track.id,
      popularity: track.popularity,
      uri: track.uri,
    });
  }

  render() {

    let { trackInfo, rank, setActiveID, active, def, openModal } = this.props;
    let { trackName, imageSrc, trackID } = this.state;
    
    if (!trackInfo) {
      return null;
    }

    return (
      <div
        className={css(
          styles.trackCard,
          (!active && !def) && styles.inactive)}
        onMouseOver={(e) => setActiveID(e, trackID)}
        onMouseLeave={(e) => setActiveID(e, -1)}
        onClick={(e) => openModal(e, this.state)}
      >
        <div className={css(styles.rank, active && styles.active)}>
          {rank}
        </div>
        <img
          className={css(styles.trackImage)}
          src={imageSrc}
          alt={trackName}
        />
        <div className={css(styles.trackTitle)}>
          { trackName }
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({

  trackCard: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 2px',
    width: '125px',
    '@media(min-width: 1024px)': {
      width: '160px',
    },
    '@media(min-width: 1440px)': {
      width: '125px',
    },
  },

  inactive: {
    opacity: '0.15',
  },

  active: {
    color: '#1DB954',
  },

  rank: {
    color: '#FFF',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2.25em',
    fontWeight: 'bold',
    padding: '0 0 5px 0',
    textAlign: 'center',
  },

  trackImage: {
    height: '125px',
    width: '125px',
    '@media(min-width: 1024px)': {
      height: '160px',
      width: '160px',
    },
    '@media(min-width: 1440px)': {
      height: '125px',
      width: '125px',
    },
  },

  trackTitle: {
    backgroundColor: '#000',
    color: '#FFF',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '0.625em',
    letterSpacing: '0.0125em',
    padding: '4px 0 4px 4px',
    textTransform: 'uppercase',
  }

});