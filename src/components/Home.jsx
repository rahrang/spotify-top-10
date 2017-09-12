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

// Date Files
const daily_dates = require('../client/daily_dates.json');
const weekly_dates = require('../client/weekly_dates.json');

const _ = require('lodash');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'daily',
      activeID: -1,
    }
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

  setActiveID = (id) => {
    this.setState({activeID: id});
  }

  render() {

    let { main } = this.props;
    let { activeID } = this.state;

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
        />
      )
    });

    return (
      <div className={css(styles.homeContainer)}>
        <h1 className={css(styles.header)}>Spotify Top 10</h1>
        { trackRows }
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
    overflowX: 'scroll',
  },

  header: {
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '1.5em',
    fontWeight: '500',
    margin: '0',
    padding: '10px',
  }

})
