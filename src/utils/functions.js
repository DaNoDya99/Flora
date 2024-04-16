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
    },
    getFlowerByFlowerType : (flowerType) => {
        const flowers = [
            {flower_type : '1', name : 'Lilies',freshness : 10},
            {flower_type : '2', name : 'Roses', freshness: 7},
            {flower_type : '3', name : 'Chrysanthemums', freshness: 5},
            {flower_type : '4', name : 'Gerbera', freshness: 9},
        ]

        return flowers.find(flower => flower.flower_type === flowerType);

    },
    getFlowerStatus : (flowerList) => {
        const flowers = [
            {flower_type : '1', name : 'Lilies',freshness : 10},
            {flower_type : '2', name : 'Roses', freshness: 7},
            {flower_type : '3', name : 'Chrysanthemums', freshness: 5},
            {flower_type : '4', name : 'Gerbera', freshness: 9},
        ]

        let status = [];

        flowers.forEach(flower => {
            const findFlower = flowerList.find(flowerItem => flowerItem.flower_type.toString() === flower.flower_type.toString());
            if (findFlower) {
                status.push({
                    name: flower.name,
                    status: true
                });
            }else {
                status.push({
                    name: flower.name,
                    status: false
                });
            }
        });
        return status;
    },
    getFlowerQuantityStatus : (flowerList) => {
        const flowers = [
            {flower_type : '1', name : 'Lilies',freshness : 10},
            {flower_type : '2', name : 'Roses', freshness: 7},
            {flower_type : '3', name : 'Chrysanthemums', freshness: 5},
            {flower_type : '4', name : 'Gerbera', freshness: 9},
        ]

        let status = [];

        flowers.forEach(flower => {
            const findFlower = flowerList.find(flowerItem => flowerItem.flower_type.toString() === flower.flower_type.toString());
            if (findFlower) {
                status.push({
                    name: flower.name,
                    status: true,
                    quantity: findFlower.quantity
                });
            }else {
                status.push({
                    name: flower.name,
                    status: false,
                    quantity: null
                });
            }
        });
        return status;
    }
}
