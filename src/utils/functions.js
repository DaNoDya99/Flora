import dayjs from "dayjs";

export default {
    getWeekdays : () => {
        let currentDate = dayjs();
        let sevenDaysAgo = currentDate.subtract(7, 'day');
        let weekdays = [];
        for (let i = 0; i <= 7; i++) {
            weekdays.push(sevenDaysAgo.format('dddd'));
            sevenDaysAgo = sevenDaysAgo.add(1, 'day');
        }

        return weekdays;
    },
    formatString : (inputString) => {
        let formattedString = inputString.charAt(0).toLowerCase() + inputString.slice(1);
        let firstUpperIndex = formattedString.slice(1).search(/[A-Z]/);
        if (firstUpperIndex !== -1) {
            formattedString = formattedString.slice(0, firstUpperIndex + 1) + " " + formattedString.slice(firstUpperIndex + 1);
        }
        formattedString = formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
        return formattedString;
    }
}
