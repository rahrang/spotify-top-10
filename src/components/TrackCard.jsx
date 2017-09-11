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
      trackName: '',
      trackID: -1,
      albumName: '',
      albumID: -1,
      imageSrc: '/',
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
      trackName: track.name,
      trackID: track.id,
      albumName: album.name,
      albumID: album.id,
      imageSrc: album.images[0].url,
      popularity: track.popularity,
      uri: track.uri,
    })
  }

  render() {

    let { dateInfo } = this.props;
    let { trackName, imageSrc } = this.state;
    
    if (!dateInfo) {
      return null;
    }

    return (
      <div className="track-card-container">
        <img
          className={css(styles.trackImage)}
          src={imageSrc}
          alt={trackName}
        />
        <br/>
        {JSON.stringify(dateInfo)}
        <br/><br/>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

const styles = StyleSheet.create({

  trackImage: {
    height: '150px', // use media queries to change these based on screen width
    width: '150px',
  }

})
