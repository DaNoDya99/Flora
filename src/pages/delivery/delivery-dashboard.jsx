import {LineChart} from "@mui/x-charts/LineChart";
import all from "../../utils/functions.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PieChart} from "@mui/x-charts";

const xLabels = all.getWeekdays();

function createData(id, ordered_date, delivery_date, days_passed) {
    return { id, ordered_date, delivery_date, days_passed  };
}

const rows = [
    createData('odr-001-012', '2021-10-01', '2021-10-10', 9),
    createData('odr-001-013', '2021-10-02', '2021-10-11', 9),
    createData('odr-001-014', '2021-10-03', '2021-10-12', 9),
];

function DeliveryDashboard() {
    return (
        <div className={'flex flex-col gap-5 w-full max-2xl:gap-2'}>
            <div className={'flex w-full gap-5 max-2xl:gap-2'}>
                <div className={'w-[50%] h-[43vh] shadow-lg max-2xl:h-[42vh] p-2 flex flex-col gap-2 items-center justify-center'}>
                    <div className={'flex flex-col justify-between gap-5 w-full'}>
                        <div className={'flex justify-between gap-5 w-full'}>
                            <div className={'h-[20vh] border-2 border-secondary3 w-[50%] rounded-lg flex justify-center items-center'}>
                                <div className={'space-y-2'}>
                                    <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Pending Deliveries:</h1>
                                    <div className={'text-center text-2xl font-semibold'}>33</div>
                                </div>
                            </div>
                            <div className={'h-[20vh] border-2 border-secondary3 w-[50%] rounded-lg flex justify-center items-center'}>
                                <div className={'space-y-2'}>
                                    <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Completed Deliveries:<br/>This Week</h1>
                                    <div className={'text-center text-2xl font-semibold'}>103</div>
                                </div>
                            </div>
                        </div>
                        <div className={'flex justify-between gap-5 w-full'}>
                            <div className={'h-[20vh] border-2 border-secondary3 w-[50%] rounded-lg flex justify-center items-center'}>
                                <div className={'space-y-2'}>
                                    <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}># Delivery Failures:<br/>This Week</h1>
                                    <div className={'text-center text-2xl font-semibold'}>3</div>
                                </div>
                            </div>
                            <div className={'h-[20vh] border-2 border-secondary3 w-[50%] rounded-lg flex justify-center items-center'}>
                                <div className={'space-y-2'}>
                                    <h1 className={'text-2xl font-semibold text-center max-2xl:text-sm'}>Overall Delivery Accuracy:</h1>
                                    <div className={'text-center text-2xl font-semibold'}>97.08%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'w-[50%] h-[43vh] shadow-lg p-5 space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Orders Delivered with in the Week</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <LineChart
                            xAxis={[{ scaleType: 'point', data: xLabels, label:"Week Days", labelStyle: {fontSize: '1rem',fontWeight: 'bold'}}]}
                            yAxis={[{ scaleType: 'linear', label: '# Orders Delivered',labelStyle: {fontSize: '1rem',fontWeight: 'bold'}, position: 'right'}]}
                            series={[
                                {
                                    data: [30, 28, 20, 31, 35, 22, 20],
                                },
                            ]}
                            slotProps={{
                                legend : {
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
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Delivery Failure Details</h1>
                    </div>
                    <div className={'w-[90%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'!font-semibold'}>ID</TableCell>
                                        <TableCell className={'!font-semibold'} align="right">Ordered Date</TableCell>
                                        <TableCell className={'!font-semibold'} align="right">Delivery Date</TableCell>
                                        <TableCell className={'!font-semibold'} align="right">Days Passed</TableCell>
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
                                            <TableCell align="right">{row.ordered_date}</TableCell>
                                            <TableCell align="right">{row.delivery_date}</TableCell>
                                            <TableCell align="right">{row.days_passed}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className={'w-[50%] h-[43vh] shadow-lg space-y-2 flex flex-col items-center justify-center max-2xl:h-[42vh]'}>
                    <div className={'text-center'}>
                        <h1 className={'text-2xl font-semibold max-2xl:text-sm'}>Distribution of Deliveries by Delivery Personnel</h1>
                    </div>
                    <div className={'w-[60%] h-[35vh] flex justify-center max-2xl:w-full'}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 103, label: 'Person 1' },
                                        { id: 1, value: 80, label: 'Person 2' },
                                        { id: 2, value: 97, label: 'Person 3' },
                                        { id: 3, value: 110, label: 'Person 4' },
                                    ],
                                    innerRadius: 80,
                                    outerRadius: 140,
                                    paddingAngle: 2,
                                    cornerRadius: 3,
                                    startAngle: -90,
                                    endAngle: 270,
                                    cx: 150,
                                    cy: 150,
                                },
                            ]}
                            slotProps={{
                                legend : {
                                    position: {vertical: 'top', horizontal: 'right'},
                                    direction: 'column',
                                    labelStyle: {fontSize: '0.8rem',fontWeight: 'bold'}
                                }}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryDashboard;