/***
 * Six Degrees of Spotify
 * This is the main page of the app.
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
    let { dateInfo } = this.props;
    if (dateInfo) {
      this.parseInfo(dateInfo.track);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateInfo !== this.props.dateInfo) {
      this.parseInfo(nextProps.dateInfo.track);
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

    let { dateInfo, rank } = this.props;
    let { trackName, imageSrc } = this.state;
    
    if (!dateInfo) {
      return null;
    }

    return (
      <div className={css(styles.trackCard)}>
        <div className={css(styles.rank)}> { rank } </div>
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
    display: 'flex',
    flexDirection: 'column',
    width: '150px', // use media queries to change these based on screen width
  },

  rank: {
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '2.5em',
    fontWeight: 'bold',
    padding: '10px 0',
    textAlign: 'center',
  },

  trackImage: {
    height: '150px', // use media queries to change these based on screen width
    width: '150px',
  },

  trackTitle: {
    backgroundColor: '#000',
    color: '#FFF',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '0.75em',
    letterSpacing: '0.0125em',
    padding: '4px 0 4px 4px',
    textTransform: 'uppercase',
  }

})
