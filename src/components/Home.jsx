/***
 * Six Degrees of Spotify
 * This is the main page of the app.
 * author: @rahrang
*/

// React
import React from 'react';

// NPM Modules
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css, StyleSheet } from 'aphrodite';

// Action File
import { MainActions } from '../actions/main-actions.js';

// Local Components
import TrackRow from './TrackRow.jsx';
import TrackModal from './TrackModal.jsx';

// Date Files
const daily_dates = require('../track_data/daily/dates.json');
const weekly_dates = require('../track_data/weekly/dates.json');

const _ = require('lodash');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeID: -1,
      activeTrackInfo: {},
      isModalOpen: false,
      view: 'daily',
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    this.collectAllData();
  }

  collectData = (type) => {
    let data = {};
    let arr = [];
    if (type === 'daily') {
      arr = daily_dates;
    } else if (type === 'weekly') {
      arr = weekly_dates;
    }
    arr.forEach((file) => {
      var dateFile = require(`../track_data/${type}/data/${file}.json`);
      data[file] = dateFile;
    })
    return data;
  }

  collectAllData = () => {
    const dailyInfo = this.collectData('daily');
    const weeklyInfo = this.collectData('weekly');
    this.addDataToStore(daily_dates, weekly_dates, dailyInfo, weeklyInfo);
  }

  addDataToStore = (dailyDates, weeklyDates, dailyInfo, weeklyInfo) => {
    this.props.mainActions.storeData(dailyDates, weeklyDates, dailyInfo, weeklyInfo);
  }

  setActiveID = (e, id) => {
    e.stopPropagation();
    this.setState({activeID: id});
  }

  resetActiveID = (e) => {
    this.setState({activeID: -1});
  }

  openModal = (e, trackInfo) => {
    e.stopPropagation();
    this.setState({
      isModalOpen: true,
      activeTrackInfo: trackInfo,
    });
  }

  closeModal = (e) => {
    e.stopPropagation();
    this.setState({
      isModalOpen: false,
      activeTrackInfo: {},
    })
  }

  render() {

    let { main } = this.props;
    let { activeID, isModalOpen, view } = this.state;

    if (_.isEmpty(main.dailyInfo)) {
      return null;
    }

    let dataArray = [];
    let dates = [];
    if (view === 'weekly') {
      dataArray = main.weeklyInfo;
      dates = weekly_dates;
    } else if (view === 'daily') {
      dataArray = main.dailyInfo;
      dates = daily_dates;
    }

    var trackRows = dates.map((date, index) => {
      return (
        <TrackRow
          key={date}
          date={date}
          dateInfo={dataArray[date].items}
          activeID={activeID}
          setActiveID={this.setActiveID}
          openModal={this.openModal}
        />
      )
    });

    return (
      <div className={css(styles.homeContainer)}
        onClick={(e) => this.resetActiveID(e)}
      >
        <div className={css(styles.headerContainer)}>
          <h1 className={css(styles.header)}>Spotify Top 10</h1>
          <div className={css(styles.selectionContainer)}>
            <button
              className={css(styles.selection, view === 'daily' && styles.activeSelection)}
              onClick={() => this.setState({view: 'daily'})}
            >
              Daily
            </button>
            <button
              className={css(styles.selection, view === 'weekly' && styles.activeSelection)}
              onClick={() => this.setState({view: 'weekly'})}
            >
              Weekly
            </button>
          </div>
        </div>
        <div className={css(styles.trackRowContainer)}>
          { trackRows }
        </div>
        <TrackModal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          trackInfo={this.state.activeTrackInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    main: state.main,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    mainActions: bindActionCreators(MainActions, dispatch),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({

  homeContainer: {
    backgroundColor: '#222222',
    minHeight: '100vh',
    padding: '20px 0',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'bottom',
    justifyContent: 'space-between',
    padding: '10px 20px',
  },

  header: {
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '1.5em',
    fontWeight: '500',
    margin: '0',
    padding: '0',
  },

  selectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  selection: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    color: '#FFF',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '1em',
    letterSpacing: '0.025em',
    outline: 'none',
    margin: '0 5px',
    padding: '0 5px',
    textTransform: 'uppercase',
  },

  activeSelection: {
    borderBottom: '2px solid #FFF',
  },

  trackRowContainer: {
    padding: '40px 0',
  }

})
