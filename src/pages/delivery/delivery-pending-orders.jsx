import {
    Button,
    FormControl,
    InputLabel,
    NativeSelect,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ProductImage from "../../assets/images/product.jpg";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinearProgress from "@mui/material/LinearProgress";
import CachedIcon from '@mui/icons-material/Cached';
import GradingIcon from '@mui/icons-material/Grading';
import {Circle} from "@mui/icons-material";
import {useSelector} from "react-redux";

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'receiver', label: 'Receiver', minWidth: 100 },
    { id: 'delivery_address', label: 'Delivery Address', minWidth: 170 },
    { id: 'receiver_contact', label: 'Receiver Contact', minWidth: 100 },
    { id: 'delivery_date', label: 'Delivery Date', minWidth: 100 },
    { id: 'total', label: 'Total', minWidth: 100 },
    { id: 'payment_method', label: 'Payment Method', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

function createData(id, receiver, receiver_contact, delivery_address, total, payment_method, delivery_date, actions,state) {
    return { id, receiver, receiver_contact, delivery_address, total, payment_method, delivery_date, actions,state};
}

const rows = [
    createData('odr-001-012', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-012','processed'),
    createData('odr-001-013', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-013', 'dispatched'),
    createData('odr-001-014', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-014', 'delivered'),
    createData('odr-001-015', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-015','ordered'),
    createData('odr-001-016', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-016', 'ordered'),
    createData('odr-001-017', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-017', 'ordered'),
    createData('odr-001-018', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-018', 'ordered'),
    createData('odr-001-019', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-019', 'ordered'),
    createData('odr-001-020', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-020', 'ordered'),
    createData('odr-001-021', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-021', 'ordered'),
    createData('odr-001-022', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-022', 'ordered'),
    createData('odr-001-023', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-023', 'ordered'),
    createData('odr-001-024', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-024', 'ordered'),
    createData('odr-001-025', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-025', 'ordered'),
    createData('odr-001-026', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-026', 'ordered'),
    createData('odr-001-027', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-027', 'ordered'),
    createData('odr-001-028', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-028', 'ordered'),
    createData('odr-001-029', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-029', 'ordered'),
    createData('odr-001-030', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-030', 'ordered'),
    createData('odr-001-031', 'Jane Doe', '9876543211', '108/5 A, Weragama Road, Wadduwa', 1500, 'Cash on Delivery', '2022-12-12', 'odr-001-031', 'ordered'),
    createData('odr-001-032', 'John Doe', '9876543210', '108/5 A, Weragama Road, Wadduwa', 1000, 'Cash on Delivery', '2022-12-12', 'odr-001-032', 'ordered'),
];



function DeliveryPendingOrders() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openOrderDetails, setOpenOrderDetails] = React.useState(false);
    const [openDeliveryStatus, setOpenDeliveryStatus] = React.useState(false);
    const [states, setStates] = useState({ordered : true, processed: false, dispatched: false,  delivered : false});
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);

    if (!isLoggedIn || employee.role !== 'delivery') {
        window.location.href = '/employee/login';
    }

    const handleDeliveryStatusOpen = () => {
        setOpenDeliveryStatus(true);
    }

    const handleDeliveryStatusClose = () => {
        setOpenDeliveryStatus(false);
    }

    const handleOrderDetailsOpen = () => {
        setOpenOrderDetails(true);
    }

    const handleOrderDetailsClose = () => {
        setOpenOrderDetails(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div className={'flex justify-between items-center'}>
                <div className={'text-3xl font-semibold'}>Delivery Order Details</div>
                <div className={'flex items-center justify-end gap-5 w-[40%]'}>
                    <FormControl className={'w-[50%]'}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Order Type
                        </InputLabel>
                        <NativeSelect
                            defaultValue={'today'}
                            inputProps={{
                                name: 'type',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={'today'}>Today - Pending</option>
                            <option value={'love&romance'}>Cash on delivery - Pending</option>
                            <option value={'birthday'}>Paid - Pending</option>
                            <option value={'anniversary'}>Successfully Delivered</option>
                            <option value={'anniversary'}>Failed Deliveries</option>
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
            <div className={'mt-10 max-h-[70vh]'}>
                <TableContainer className={'h-[70vh]'}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={'!font-semibold !text-xl'}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={row.state === 'processed' ? 'bg-[#9b59b6] bg-opacity-20' : row.state === 'dispatched' ? 'bg-[#f39c12] bg-opacity-20' : row.state === 'delivered' ? 'bg-[#2ecc71] bg-opacity-20' : ''}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    column.id === 'image' ? <TableCell key={column.id} align={column.align}>
                                                        <img src={value} alt={'product'} className={'w-20 h-20 rounded-md shadow-md'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                            <InfoIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600 bg-white'}
                                                                               onClick={handleOrderDetailsOpen}/>
                                                            <LocalShippingIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-green-600 bg-white'}
                                                                               onClick={handleDeliveryStatusOpen}/>
                                                        </TableCell> :
                                                        <TableCell key={column.id} align={column.align} className={'!text-lg'}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            {/*Order Details*/}
            <Modal
                open={openOrderDetails}
                onClose={handleOrderDetailsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1} className={'w-[70%] max-h-[80vh] overflow-auto'}>
                    <div className={'flex justify-between items-center'}>
                        <Typography id="modal-modal-title" variant="h6" component="h3">
                            Order Details
                        </Typography>
                        <CloseIcon onClick={handleOrderDetailsClose} className={'text-red-600'} />
                    </div>
                    <div className={'w-full bg-primary rounded-lg shadow-lg px-5 py-8'}>
                        <div className={"space-y-2"}>
                            <div className={"flex justify-between items-center px-5 py-2 bg-white rounded-md shadow-sm"}>
                                <div className={"flex gap-10"}>
                                    <img src={ProductImage} alt="Product"
                                         className={"w-20 h-20 rounded-lg shadow-md"}/>

                                    <div className={"flex flex-col justify-center"}>
                                        <div className={"font-semibold"}>Hearts of Love</div>
                                        <div className={"font-semibold text-sm text-gray-500"}>Unit Price : Rs 6000.00</div>
                                    </div>
                                </div>
                                <div>Qty 1</div>
                                <div>Rs 6000.00</div>
                            </div>
                            <div className={"flex justify-between items-center px-5 py-2 bg-white rounded-md shadow-sm"}>
                                <div className={"flex gap-10"}>
                                    <img src={ProductImage} alt="Product"
                                         className={"w-20 h-20 rounded-lg shadow-md"}/>

                                    <div className={"flex flex-col justify-center"}>
                                        <div className={"font-semibold"}>A New Hope</div>
                                        <div className={"font-semibold text-sm text-gray-500"}>Unit Price : Rs 6000.00</div>
                                    </div>
                                </div>
                                <div>Qty 1</div>
                                <div>Rs 6000.00</div>
                            </div>
                        </div>
                        <div className={"w-full mt-4"}>
                            <Divider sx={{border : 1, borderColor : '#FDCEDF'}} variant="middle"/>
                        </div>
                        <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Name</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>Edward Samuel</div>
                            </div>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Address</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>107 / 2</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>Weragama Road</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>Wadduwa</div>
                            </div>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Phone</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>0778965445</div>
                            </div>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Delivery Date</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>2024-04-06</div>
                            </div>
                        </div>
                        <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Sender Name</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>John Doe</div>
                            </div>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Sender Phone</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>0778965446</div>
                            </div>
                            <div>
                                <div className={"text-sm font-semibold 2xl:text-lg"}>Ordered Date</div>
                                <div className={"text-[.7rem] 2xl:text-sm"}>2024-04-04</div>
                            </div>
                        </div>

                        <div className={"w-full py-4"}>
                            <Divider sx={{border : 1, borderColor : '#FDCEDF'}} variant="middle"/>
                        </div>

                        {/* Payment details */}

                        <div>
                            <div className={'flex justify-between items-center px-5'}>
                                <div className={'font-semibold 2xl:!text-xl'}>Order Summary</div>
                                <div className={'text-sm'}>{2}&nbsp;Item(s)</div>
                            </div>
                            <div className={'mt-8 space-y-4'}>
                                <div className={'flex justify-between items-center px-5 text-sm'}>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Sub Total</div>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. 12000.00</div>
                                </div>
                                <div className={'flex justify-between items-center px-5 text-sm'}>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Flat Discount</div>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 500.00</div>
                                </div>
                                <div className={'flex justify-between items-center px-5 text-sm'}>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Promotional Discount</div>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                                </div>
                                <div className={'flex justify-between items-center px-5 text-sm'}>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Delivery charges</div>
                                    <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. 800.00</div>
                                </div>

                                <Divider variant="middle" />

                                <div className={'flex justify-between items-center px-5 text-sm'}>
                                    <div className={'!nunito-sans-light 2xl:!text-lg font-bold'}>Total</div>
                                    <div className={'!nunito-sans-light 2xl:!text-lg font-bold'}>Rs. 12300.00</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            {/**/}
            <Modal
                open={openDeliveryStatus}
                onClose={handleDeliveryStatusClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1} className={'w-[50%]'}>
                    <div className={'flex justify-between items-center'}>
                        <Typography id="modal-modal-title" variant="h6" component="h3">
                            Update Delivery Status - odr-001-012
                        </Typography>
                        <CloseIcon onClick={handleDeliveryStatusClose} className={'text-red-600'} />
                    </div>

                    <div className="flex py-14 max-2xl:py-10 justify-between items-center">
                        <div className="flex flex-col items-center justify-center mr-5">
                            <Link to={'/order/shopping-cart'}>
                                <GradingIcon className={states.ordered ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                            </Link>
                            <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Ordered</div>
                        </div>
                        {states.cart ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                        <div className="flex flex-col items-center justify-center mx-5">
                            <Link to={'/order/cart-details'}>
                                <CachedIcon className={states.processed ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                            </Link>
                            <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Processed</div>
                        </div>
                        {/*<LinearProgress className={'w-1/3'} color={'secondary'}/>*/}
                        {states.sender_receiver ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                        <div className="flex flex-col items-center justify-center mx-5">
                            <Link to={'/order/delivery-details'}>
                                <LocalShippingIcon className={states.dispatched ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                            </Link>
                            <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Dispatched</div>
                        </div>
                        {/*<LinearProgress className={'w-1/3'} color={'secondary'}/>*/}
                        {states.delivery ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                        <div className="flex flex-col items-center justify-center ms-5">
                            <CheckCircleIcon className={states.delivered ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                            <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Delivered</div>
                        </div>
                    </div>

                    <div className={'w-full bg-primary rounded-lg shadow-lg px-5 py-8'}>
                        <div className={'font-bold text-xl'}>Choose delivery status</div>
                        <div className={'mt-5'}>
                            <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3'}>
                                <div>Ordered</div>
                                <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                            </div>

                            <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'}>
                                <div>Processed</div>
                                <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                            </div>

                            <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'}>
                                <div>Dispatched</div>
                                <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                            </div>

                            <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'}>
                                <div>Delivered</div>
                                <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                            </div>
                        </div>

                        <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10 !mt-5'}>
                            <div className={'!text-sm font-semibold'}>Update status</div>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DeliveryPendingOrders;