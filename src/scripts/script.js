const data_grabber = require('./data_grabber.js');
const rank_collector = require('./rank_collector.js');

let grabUSAData = data_grabber.makeRequest(USA_PATH, USA_CHART);
let grabGlobalData = data_grabber.makeRequest(GLOBAL_PATH, GLOBAL_CHART);

if (grabUSAData) {
    rank_collector.collectRanks('usa', 'weekly');
    rank_collector.collectRanks('usa', 'daily');
} else {
    console.log('error in grabbing USA data from scripts')
}

if (grabGlobalData) {
    // rank_collector.collectRanks('global', 'weekly');
    rank_collector.collectRanks('global', 'daily');
} else {
    console.log('error in grabbing global data from scripts')
}