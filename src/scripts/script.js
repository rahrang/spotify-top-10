const data_grabber = require('./data_grabber.js');
const rank_collector = require('./rank_collector.js');

const GLOBAL_PATH = '../track_data/global';
const GLOBAL_CHART = '37i9dQZEVXbMDoHDwVN2tF'; // Global TOP 50
const USA_PATH = '../track_data/usa';
const USA_CHART = '37i9dQZEVXbLRQDuF5jeBp'; // US TOP 50

let grabUSAData = data_grabber.makeRequest(USA_PATH, USA_CHART);
if (grabUSAData) {
    rank_collector.collectRanks('usa', 'weekly');
    rank_collector.collectRanks('usa', 'daily');
} else {
    console.log('error in grabbing USA data from scripts')
}

let grabGlobalData = data_grabber.makeRequest(GLOBAL_PATH, GLOBAL_CHART);
if (grabGlobalData) {
    // rank_collector.collectRanks('global', 'weekly');
    rank_collector.collectRanks('global', 'daily');
} else {
    console.log('error in grabbing global data from scripts')
}