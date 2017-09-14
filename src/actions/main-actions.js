export const MainConstants = {
    STORE_DATA: "STORE_DATA"
};

export const MainActions = {

    storeData: (data) => ({
        type: 'STORE_DATA',
        globalWeeklyDates: data[0][0],
        globalWeeklyInfo: data[0][1],
        globalDailyDates: data[0][2],
        globalDailyInfo: data[0][3],
        usaWeeklyDates: data[1][0],
        usaWeeklyInfo: data[1][1],
        usaDailyDates: data[1][2],
        usaDailyInfo: data[1][3],
    })
};