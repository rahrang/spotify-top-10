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
import { fadeIn } from 'react-animations';

// Action File
import { MainActions } from '../actions/main-actions.js';

// Local Components
import TrackRow from './TrackRow.jsx';
import TrackModal from './TrackModal.jsx';

// Date Files
const global_weekly_dates = require('../track_data/global/weekly/dates.json');
const global_daily_dates = require('../track_data/global/daily/dates.json');
const usa_weekly_dates = require('../track_data/usa/weekly/dates.json');
const usa_daily_dates = require('../track_data/usa/daily/dates.json');

const _ = require('lodash');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeID: -1,
      activeTrackInfo: {},
      isModalOpen: false,
      view: 'daily',
      chart: 'usa',
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    this.collectAllData();
  }

  // add chart as parameter
  collectData = (chart, view, arr) => {
    let data = {};
    arr.forEach((file) => {
      let dateFile = require(`../track_data/${chart}/${view}/data/${file}.json`);
      data[file] = dateFile;
    })
    return data;
  }

  collectAllData = () => {
    const globalWeeklyInfo = this.collectData('global', 'weekly', global_weekly_dates);
    const globalDailyInfo = this.collectData('global', 'daily', global_daily_dates);
    const usaWeeklyInfo = this.collectData('usa', 'weekly', usa_weekly_dates);
    const usaDailyInfo = this.collectData('usa', 'daily', usa_daily_dates);
    let data = [
      [
        global_weekly_dates,
        globalWeeklyInfo,
        global_daily_dates,
        globalDailyInfo
      ],
      [
        usa_weekly_dates,
        usaWeeklyInfo,
        usa_daily_dates,
        usaDailyInfo
      ]
    ]
    this.addDataToStore(data);
  }

  addDataToStore = (data) => {
    this.props.mainActions.storeData(data);
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

  getData = (chart, view) => {
    let { main } = this.props;
    let dates = [];
    let dataArray = [];
    if (chart === 'global') {
      if (view === 'weekly') {
        dates = main.globalWeeklyDates;
        dataArray = main.globalWeeklyInfo;
      } else if (view === 'daily') {
        dates = main.globalDailyDates;
        dataArray = main.globalDailyInfo;
      }
    } else if (chart === 'usa') {
      if (view === 'weekly') {
        dates = main.usaWeeklyDates;
        dataArray = main.usaWeeklyInfo;
      } else if (view === 'daily') {
        dates = main.usaDailyDates;
        dataArray = main.usaDailyInfo;
      }
    }
    return [dates, dataArray]
  }

  render() {

    let { activeID, isModalOpen, view, chart } = this.state;

    let data = this.getData(chart, view);
    let dates = data[0];
    let dataArray = data[1];

    if (_.isEmpty(dates) || _.isEmpty(dataArray)) {
      return null;
    }

    let trackRows = dates.map((date, index) => {
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
      <div className={css(styles.homeContainer, styles.fadeIn)}
        onClick={(e) => this.resetActiveID(e)}
      >
        <div className={css(styles.headerContainer)}>
          <h1 className={css(styles.header)}>Spotify Top 10</h1>
          <div className={css(styles.selectionContainer)}>
            <div className={css(styles.container)}>
              <button
                className={css(styles.selection, chart === 'global' && styles.activeSelection)}
                onClick={() => this.setState({chart: 'global'})}
              >
                Global
              </button>
              <button
                className={css(styles.selection, chart === 'usa' && styles.activeSelection)}
                onClick={() => this.setState({chart: 'usa'})}
              >
                USA
              </button>         
            </div>
            <div className={css(styles.container)}>
              <button
                className={css(styles.selection, view === 'weekly' && styles.activeSelection)}
                onClick={() => this.setState({view: 'weekly'})}
              >
                Weekly
              </button>
              <button
                className={css(styles.selection, view === 'daily' && styles.activeSelection)}
                onClick={() => this.setState({view: 'daily'})}
              >
                Daily
              </button>
            </div>
          </div>
        </div>
        <div className={css(styles.trackRowContainer)}>
          { trackRows }
        </div>
        <div className={css(styles.footer)}>
          <p className={css(styles.disclaimer)}>
            This application is not endorsed by Spotify.
          </p>
          <p className={css(styles.links)}>
            {/*
              <a className={css(styles.link)} href='/about'>
                About
              </a>
              |
            */}
            <a
              className={css(styles.link)}
              href='https://github.com/rahrang/SpotifyTop10'
              target='blank'
            >
              Source Code
            </a>
            |
            <a
              className={css(styles.link)}
              href='http://rahrang.xyz'
              target='blank'
            >
              Rahul Rangnekar
            </a>
          </p>
        </div>
        <TrackModal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          trackInfo={this.state.activeTrackInfo}
          view={view}
          chart={chart}
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
    padding: '20px 0 0',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
  },

  header: {
    borderBottom: '2px solid #1DB954',
    color: '#FFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '2em',
    fontWeight: '500',
    margin: '0',
    padding: '3px 0',
  },

  selectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px 0',
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
    padding: '0 0 1px 0',
    textTransform: 'uppercase',
  },

  activeSelection: {
    borderBottom: '2px solid #1DB954',
  },

  trackRowContainer: {
    padding: '40px 0',
  },

  footer: {
    backgroundColor: '#000',
    color: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.875em',
    padding: '0 20px',
  },

  links: {
    textAlign: 'right',
  },

  link: {
    padding: '0 3px',
    margin: '0 3px',
    color: '#FFF',
    textDecoration: 'none',
    ':hover': {
      color: '#1DB954',
    }
  },

  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1s',
  }
})
