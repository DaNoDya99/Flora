import dayjs from "dayjs";

export default function getWeekdays() {
    let currentDate = dayjs();
    let sevenDaysAgo = currentDate.subtract(7, 'day');
    let weekdays = [];
    for (let i = 0; i <= 7; i++) {
        weekdays.push(sevenDaysAgo.format('dddd'));
        sevenDaysAgo = sevenDaysAgo.add(1, 'day');
    }

    return weekdays;
}