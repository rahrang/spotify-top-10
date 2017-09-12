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
const daily_dates = require('../client/daily_dates.json');
const weekly_dates = require('../client/weekly_dates.json');

const _ = require('lodash');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeID: -1,
      activeTrackInfo: {},
      isModalOpen: true,
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
    if (type === 'daily_data') {
      arr = daily_dates;
    } else if (type === 'weekly_data') {
      arr = weekly_dates;
    }
    arr.forEach((file) => {
      var dateFile = require(`../client/${type}/${file}.json`);
      data[file] = dateFile;
    })
    return data;
  }

  collectAllData = () => {
    const dailyInfo = this.collectData('daily_data');
    const weeklyInfo = this.collectData('weekly_data');
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
    console.log('track', trackInfo);
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
    let { activeID, isModalOpen } = this.state;

    if (_.isEmpty(main.dailyInfo)) {
      return null;
    }

    var trackRows = daily_dates.map((date, index) => {
      return (
        <TrackRow
          key={date}
          date={date}
          dateInfo={main.dailyInfo[date].items}
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
        <h1 className={css(styles.header)}>Spotify Top 10</h1>
        { trackRows }
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
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  header: {
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '1.5em',
    fontWeight: '500',
    margin: '0',
    padding: '10px',
  },

})
