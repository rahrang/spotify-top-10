/***
 * Six Degrees of Spotify
 * This is the row of tracks corresponding to each day.
 * author: @rahrang
*/

// React
import React from 'react';

// NPM Modules
import { css, StyleSheet } from 'aphrodite';

// Local Components
import TrackCard from './TrackCard.jsx';

const moment = require('moment');

export default class TrackRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      dateInfo: '',
    }
  }

  componentDidMount() {
    let { dateInfo, date } = this.props;
    if (dateInfo) {
      this.setState({ dateInfo });
      this.formatDate(date)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateInfo !== this.props.dateInfo) {
      this.setState({ dateInfo: nextProps.dateInfo })
      this.formatDate(nextProps.date)
    }
  }

  formatRank = (index) => {
    if (index < 9) {
      return `0${index + 1}`
    }
    return `${index + 1}`
  }

  formatDate = (dateString) => {
    var date = dateString.split('_').join('/');
    var momentDate = moment(date);
    var day = momentDate.format('DD');
    var month = momentDate.format('MMM');
    var dateArray = [day, month];
    this.setState({date: dateArray});
  }


  render() {

    let { dateInfo, activeID, setActiveID, openModal } = this.props;
    let { date } = this.state;
    
    if (!dateInfo) {
      return null;
    }

    var trackCards = dateInfo.map((track, index) => {
      return (
        <TrackCard
          key={`${date}_${index}`}
          active={activeID === -1 || activeID === track.track.id}
          index={index}
          rank={this.formatRank(index)}
          setActiveID={setActiveID}
          trackInfo={track}
          openModal={openModal}
        />
      )
    })

    return (
      <div className={css(styles.trackRow)}>
        <div className={css(styles.date)}>
          <h2 className={css(styles.day, styles.noPad)}> {date[0]} </h2>
          <h2 className={css(styles.month, styles.noPad)}> {date[1]} </h2>
        </div>
        <div className={css(styles.trackCardContainer)}>
          {trackCards}
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({

  trackRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
    justifyContent: 'center',
    margin: '15px 0', // keep this when margin offsets on TrackCards are commented out
    width: '100%',
  },

  date: {
    color: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px 0 0',
    padding: '0 10px',
  },

  day: {
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2em',
    fontWeight: 'bold',
    lineHeight: '0.75em',
  },

  month: {
    fontFamily: 'Oswald, sans-serif',
    fontSize: '1.5em',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },

  noPad: {
    margin: '0',
    padding: '0',
  },

  trackCardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

})