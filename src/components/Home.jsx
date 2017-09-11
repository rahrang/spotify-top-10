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
import TrackCard from './TrackCard.jsx';

// Date Files
const daily_dates = require('../client/daily_dates.json');
const weekly_dates = require('../client/weekly_dates.json');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'weekly',
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

  formatRank = (index) => {
    if (index < 9) {
      return `0${index + 1}`
    } else {
      return `${index + 1}`
    }
  }

  render() {

    let { main } = this.props;

    const date = main.dailyDates[0];
    var dateInfo = main.dailyInfo[date];

    if (dateInfo) {
      console.log(dateInfo.items);
    }

    return (
      <div className="home-container">
        <h1 className={css(styles.header)}>Spotify Top 10</h1>
        <h2>{date}</h2>
        <TrackCard
          date={date}
          dateInfo={dateInfo ? dateInfo.items[0] : null}
          rank={this.formatRank(9)} // rank should always be 1 more than index (this will be the index+1 when we map over the dateInfo.items)
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

    header: {
        color: '#FFF',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '1.5em',
        fontWeight: '500',
        margin: '0',
        padding: '10px',
    }

})
