import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {BarChart} from "@mui/x-charts";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector,useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {
    dailyIncomeThisWeekVsLastWeek,
    lowQuantityProducts,
    numberOfOrdersDeliveredYesterday,
    numberOfOrdersYesterday,
    numberOfPendingOrders, topSellingBouquetsWithinTheWeek,
    totalIncomeThisWeek
} from "../../store/slices/reports_slice.js";
dayjs.extend(customParseFormat);



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


function createData(id, name, quantity, price) {
    return { id, name, quantity, price  };
}

const xLabels = getWeekdays();

let rows = [];

function AdminDashboard() {
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);

    const dispatch = useDispatch();

    if (!isLoggedIn || employee.role !== 'admin') {
        window.location.href = '/employee/login';
    }

    const totalIncome = useSelector(state => state.reports.data.weeklyTotalIncome);
    const pendingOrders = useSelector(state => state.reports.data.pendingOrders);
    const ordersReceived = useSelector(state => state.reports.data.ordersReceived);
    const deliveredOrdersLastDay = useSelector(state => state.reports.data.deliveredOrdersLastDay);
    const topSellingBouquets = useSelector(state => state.reports.data.topSellingBouquets);
    const incomeComparison = useSelector(state => state.reports.data.incomeComparison);
    const lowQuantityBouquets = useSelector(state => state.reports.data.lowQuantityProducts);

    useEffect(() => {
        dispatch(totalIncomeThisWeek())
        dispatch(numberOfOrdersYesterday())
        dispatch(numberOfPendingOrders())
        dispatch(numberOfOrdersDeliveredYesterday())
        dispatch(topSellingBouquetsWithinTheWeek())
        dispatch(lowQuantityProducts())
        dispatch(dailyIncomeThisWeekVsLastWeek())
    }, [dispatch]);


    let thisWeek = [-1];
    let lastWeek = [-1];

    thisWeek = incomeComparison.thisWeekIncome;
    lastWeek = incomeComparison.lastWeekIncome;

    rows = lowQuantityBouquets.map((item) => {
        return createData(item.product_code, item.name, item.quantity, item.price);
    });

    return (
        <div className={'flex flex-col gap-5 w-full max-2xl:gap-2'}>
            <div className={'flex w-full gap-5 max-2xl:gap-2'}>
                <div className={'w-[50%] h-[43vh] shadow-lg max-2xl:h-[42vh] p-2 flex flex-col gap-2 items-center justify-center'}>
                    <div className={'flex gap-2 w-full justify-between'}>
                        <div className={'w-[50%] text-center py-2 border-2 border-secondary2 rounded-md h-[19vh] flex flex-col justify-center'}>
                            <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}>Total Income: This Week</h1>
                            <div className={'text-center text-2xl font-semibold'}>Rs. {totalIncome}.00</div>
                        </div>
                        
                        <div className={'w-[50%] text-center py-2 border-2 border-secondary2 rounded-md h-[19vh] flex flex-col justify-center'}>
                            <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Orders Received: Today</h1>
                            <div className={'text-center text-2xl font-semibold'}>{ordersReceived}</div>
                        </div>
                    </div>
                    <div className={'flex gap-2 w-full justify-between'}>
                        <div className={'w-[50%] text-center py-2 border-2 border-secondary2 rounded-md h-[19vh] flex flex-col justify-center'}>
                            <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Pending Orders</h1>
                            <div className={'text-center text-2xl font-semibold'}>{pendingOrders}</div>
                        </div>
                        
                        <div className={'w-[50%] text-center py-2 border-2 border-secondary2 rounded-md h-[19vh] flex flex-col justify-center'}>
                            <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Orders Delivered: Last Day</h1>
                            <div className={'text-center text-2xl font-semibold'}>{deliveredOrdersLastDay}</div>
                        </div>
                    </div>

                </div>
                <div className={'w-[50%] h-[43vh] shadow-lg p-5 space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Comparison of Daily Income: This Week vs. Last Week</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        {
                            thisWeek === undefined || lastWeek === undefined? <div className={'text-center text-2xl font-semibold'}>No Data Available</div> :
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
                        }
                    </div>
                </div>
            </div>
            <div className={'flex w-full gap-5 max-2xl:gap-2'}>
                <div className={'w-[50%] h-[43vh] shadow-lg space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Top Selling Bouquets with in the Week</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        {
                             topSellingBouquets ? <div className={'text-center text-2xl font-semibold'}>No Data Available</div> :
                                <BarChart
                                    series={[
                                        { data: topSellingBouquets.quantity, label: 'Quantity', id: 'pvId'},
                                    ]}
                                    xAxis={[{ data : topSellingBouquets.products, scaleType: 'band' ,label:"Product ID", labelStyle: {fontSize: '1rem',fontWeight: 'bold'}}]}
                                    slotProps={{legend : {
                                            position: {vertical: 'top', horizontal: 'right'},
                                            direction: 'column',
                                            labelStyle: {fontSize: '0.5rem',fontWeight: 'bold'}
                                        }}}
                                />

                        }
                    </div>
                </div>
                <div className={'w-[50%] h-[43vh] shadow-lg space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Insufficient Stock Report: Low Quantity Products</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price (Rs)</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

