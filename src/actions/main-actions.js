export const MainConstants = {
    STORE_DATA: "STORE_DATA"
};

export const MainActions = {

    storeData: (dailyDates, weeklyDates, dailyInfo, weeklyInfo) => ({
        type: 'STORE_DATA',
        dailyDates,
        weeklyDates,
        dailyInfo,
        weeklyInfo
    })
};