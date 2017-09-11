import { MainConstants } from '../actions/main-actions';

const defaultState = {
    dailyDates: [],
    weeklyDates: [],
    dailyInfo: {},
    weeklyInfo: {}
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    // add cases here
    default:
      return state;
  }
};

export default MainReducer;