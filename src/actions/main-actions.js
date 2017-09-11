export const MainConstants = {
    STORE_DATA: "STORE_DATA",
};

let store_data = (dailyDates, weeklyDates, dailyInfo, weeklyInfo) => {
    type: MainConstants.STORE_DATA,
    dailyDates,
    weeklyDates,
    dailyInfo,
    weeklyInfo
};

export const MainActions = {

    storeData: (dailyDates, weeklyDates, dailyInfo, weeklyInfo) => {
        return dispatch => {
            return dispatch(dailyDates, weeklyDates, dailyInfo, weeklyInfo);
        }
    }
};