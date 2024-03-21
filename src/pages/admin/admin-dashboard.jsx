import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {BarChart} from "@mui/x-charts";
dayjs.extend(customParseFormat);

const thisWeek = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const lastWeek = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const quantity = [5,7,10,12,14,15,16];
const products = ['P001', 'P002', 'P003', 'P004', 'P005', 'P006', 'P007'];

function getWeekdays() {
    let currentDate = dayjs();
    let sevenDaysAgo = currentDate.subtract(7, 'day');
    let weekdays = [];
    for (let i = 0; i <= 7; i++) {
        weekdays.push(sevenDaysAgo.format('dddd'));
        sevenDaysAgo = sevenDaysAgo.add(1, 'day');
    }

    return weekdays;
}

const xLabels = getWeekdays();

function AdminDashboard() {
    return (
        <div className={'flex flex-col gap-5 w-full max-2xl:gap-2'}>
            <div className={'flex w-full gap-5 max-2xl:gap-2'}>
                <div className={'w-[50%] h-[43vh] shadow-lg max-2xl:h-[42vh]'}></div>
                <div className={'w-[50%] h-[43vh] shadow-lg p-5 space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Comparison of Daily Income: This Week vs. Last Week</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <LineChart
                            series={[
                                { data: lastWeek, label: 'This Week', id: 'pvId'},
                                { data: thisWeek, label: 'Last Week', id: 'uvId' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels, label:"Week Days", labelStyle: {fontSize: '1rem',fontWeight: 'bold'}}]}
                            yAxis={[{ scaleType: 'linear', label: 'Income',labelStyle: {fontSize: '1rem',fontWeight: 'bold'}, position: 'right'}]}
                            slotProps={{legend : {
                                position: {vertical: 'top', horizontal: 'right'},
                                direction: 'column',
                                labelStyle: {fontSize: '0.5rem',fontWeight: 'bold'}
                            }}}
                        />
                    </div>
                </div>
            </div>
            <div className={'flex w-full gap-5 max-2xl:gap-2'}>
                <div className={'w-[50%] h-[43vh] shadow-lg space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Top Selling Bouquets with in the Week</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <BarChart
                            series={[
                                { data: quantity, label: 'Quantity', id: 'pvId' },
                            ]}
                            xAxis={[{ data: products, scaleType: 'band' ,label:"Product ID", labelStyle: {fontSize: '1rem',fontWeight: 'bold'}}]}
                            slotProps={{legend : {
                                position: {vertical: 'top', horizontal: 'right'},
                                direction: 'column',
                                labelStyle: {fontSize: '0.5rem',fontWeight: 'bold'}
                            }}}
                        />
                    </div>
                </div>
                <div className={'w-[50%] h-[43vh] shadow-lg max-2xl:h-[42vh]'}></div>
            </div>
        </div>
    );
}

export default AdminDashboard;