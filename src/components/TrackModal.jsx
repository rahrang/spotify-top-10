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

export default class TrackModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { isOpen, onRequestClose, trackInfo } = this.props;

    console.log(trackInfo);

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={css(styles.modal)}
        overlayClassName={css(styles.overlay)}
        contentLabel="Modal"
      >
        <h1 className={css(styles.trackName)}> {trackInfo.trackName} </h1>
        <div className={css(styles.bodyContainer)}>
          <img className={css(styles.image)} src={trackInfo.imageSrc} alt={trackInfo.trackName} />
        </div>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

  modal: {
    backgroundColor: '#222',
    border: '2px solid #FFF',
    borderRadius: '5px',
    outline: 'none',
    position: 'absolute',
    top: '50px',
    left: '150px',
    right: '150px',
    bottom: '50px',
  },

  overlay : {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },

  trackName: {
    borderBottom: '2px solid #FFF',
    color: '#FFF',
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2em',
    margin: '0',
    padding: '5px 20px',
    textTransform: 'uppercase',
  },

  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    padding: '20px',
    height: '400px',
    width: '400px',
  }

})
