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
import React, {useEffect, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetailsByStatus, updateOrderStatus} from "../../store/slices/order_slice.js";
import {getProducts} from "../../store/slices/product_slice.js";
import dayjs from "dayjs";

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

let rows = [];



function DeliveryPendingOrders() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openOrderDetails, setOpenOrderDetails] = React.useState(false);
    const [openDeliveryStatus, setOpenDeliveryStatus] = React.useState(false);
    const [states, setStates] = useState({ordered : true, processed: false, dispatched: false,  delivered : false});
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);
    const [deliveryStatus, setDeliveryStatus] = useState('processing');
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.data.orders);
    const allProducts = useSelector(state => state.product.data.products);
    rows = orders.map((order) => {
        return createData(order.order_id, order.recipient_name, order.recipient_phone, order.recipient_address.slice(0,18)+'...', order.total, order.payment_method === 'cash' ? 'Cash on delivery' : 'Paid', order.delivery_date, order.order_id);
    });
    const [order, setOrder] = React.useState({});
    const [products, setProducts] = React.useState([]);

    if (!isLoggedIn || employee.role !== 'delivery') {
        window.location.href = '/employee/login';
    }

    useEffect(() => {
        dispatch(getOrderDetailsByStatus('processing'));
        dispatch(getProducts());
    }, [dispatch]);

    const handleChange = (event) => {
        setDeliveryStatus(event.target.value);
        dispatch(getOrderDetailsByStatus(event.target.value))
    }
    const handleDeliveryStatusOpen = (order_id) => {
        setOpenDeliveryStatus(true);
        const odr = orders.find(order => order.order_id === order_id);
        setOrder(odr);

        if(odr.order_status === 'pending'){
            setStates({ordered : true, processed: false, dispatched: false,  delivered : false});
        }else if(odr.order_status === 'processing'){
            setStates({ordered : true, processed: true, dispatched: false,  delivered : false});
        }else if(odr.order_status === 'dispatched'){
            setStates({ordered : true, processed: true, dispatched: true,  delivered : false});
        }else if(odr.order_status === 'delivered'){
            setStates({ordered : true, processed: true, dispatched: true,  delivered : true});
        }
    }

    const handleDeliveryStatusClose = () => {
        setOpenDeliveryStatus(false);
    }

    const handleOrderDetailsOpen = (order_id) => {
        setOpenOrderDetails(true);
        const odr = orders.find(order => order.order_id === order_id);
        setOrder(odr);
        let prdcts = [];
        for(let i =0; i < odr.order_items.length; i++){
            const product = allProducts.find(product => product.product_code === odr.order_items[i].product_code);
            prdcts.push(product);
        }
        setProducts(prdcts);
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

    const handleUpdateDeliveryStatus = (order_id) => {
        const data = {
            order_id : order_id,
            order_status : deliveryStatus === 'processing' ? 'dispatched' : 'delivered'
        }

        dispatch(updateOrderStatus(data));
        window.location.reload();
    }

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
                            name={'delivery-status'}
                            onChange={handleChange}
                        >
                            <option value={'processing'}>Assigned Deliveries</option>
                            <option value={'dispatched'}>Dispatched Deliveries</option>
                            <option value={'delivered'}>Delivered Deliveries</option>
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    column.id === 'image' ? <TableCell key={column.id} align={column.align}>
                                                        <img src={value} alt={'product'} className={'w-20 h-20 rounded-md shadow-md'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                            <InfoIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600 bg-white'}
                                                                      onClick={() => handleOrderDetailsOpen(value)}/>
                                                            <LocalShippingIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-green-600 bg-white'}
                                                                               onClick={() => handleDeliveryStatusOpen(value)}/>
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
                    {
                        order && products.length > 0 ? <div className={'w-full'}>
                            <div className={'w-full p-2 border-2 border-secondary3 rounded-lg pb-5'}>
                                <div className={"space-y-2 py-5"}>
                                    {
                                        products.map((product, index) => (
                                            <div key={index} className={"flex justify-between items-center px-5 py-2 bg-white rounded-md shadow-sm"}>
                                                <div className={"flex gap-10"}>
                                                    <img src={'http://localhost:3000/'+product.images[0].image_path} alt="Product"
                                                         className={"w-20 h-20 rounded-lg shadow-md"}/>
                                                    <div className={"flex flex-col justify-center"}>
                                                        <div className={"font-semibold"}>{product.name}</div>
                                                        <div className={"font-semibold text-sm text-gray-500"}>Unit Price : Rs {product.price}.00</div>
                                                    </div>
                                                </div>
                                                <div>Qty {order.order_items.find(item => item.product_code === product.product_code).quantity}</div>
                                                <div>Rs {product.price}.00</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={"w-full"}>
                                    <Divider sx={{border : 1, borderColor : '#FDCEDF'}} variant="middle"/>
                                </div>
                                <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Name</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_name}</div>
                                    </div>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Address</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_address.split(',')[0] ? order.recipient_address.split(',')[0] : 'Address'}</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_address.split(',')[1] ? order.recipient_address.split(',')[1] : 'Line 1'}</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_address.split(',')[2] ? order.recipient_address.split(',')[2] : 'Line 2'}</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_address.split(',')[3] ? order.recipient_address.split(',')[3] : ''}</div>
                                    </div>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Phone</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_phone ? order.recipient_phone : ''}</div>
                                    </div>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Delivery Date</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.delivery_date ? dayjs(order.delivery_date).format('YY MMMM DD') : ''}</div>
                                    </div>
                                </div>
                                <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Sender Name</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.sender_name}</div>
                                    </div>
                                    <div>
                                        <div className={"text-sm font-semibold 2xl:text-lg"}>Sender Phone</div>
                                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.sender_phone}</div>
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
                                            <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {order.total ? order.total : ''}</div>
                                        </div>
                                        <div className={'flex justify-between items-center px-5 text-sm'}>
                                            <div className={'!nunito-sans-light 2xl:!text-lg'}>Flat Discount</div>
                                            <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                                        </div>
                                        <div className={'flex justify-between items-center px-5 text-sm'}>
                                            <div className={'!nunito-sans-light 2xl:!text-lg'}>Promotional Discount</div>
                                            <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                                        </div>

                                        <Divider variant="middle" />

                                        <div className={'flex justify-between items-center px-5 text-sm'}>
                                            <div className={'!nunito-sans-light 2xl:!text-lg font-bold'}>Total</div>
                                            <div className={'!nunito-sans-light 2xl:!text-lg font-bold'}>Rs. {order.total ? order.total : ''}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                    }
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
                            Update Delivery Status - {order.order_id}
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

                            {
                                states.ordered ? <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3'}>
                                    <div>Ordered</div>
                                    <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                                </div> : <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center '}>
                                    <div>Ordered</div>
                                    <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                                </div>
                            }

                            {
                                states.processed ? <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3 mt-5'}>
                                    <div>Processed</div>
                                    <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                                </div> : <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'}>
                                    <div>Processed</div>
                                    <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                                </div>
                            }

                            {
                                states.dispatched ? <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3 mt-5'}>
                                    <div>Dispatched</div>
                                    <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                                </div> : <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'} onClick={() => deliveryStatus === 'processing' ? setStates({ordered : true, processed: true, dispatched: true,  delivered : false}) : setStates({ordered : true, processed: true, dispatched: false,  delivered : false})}>
                                    <div>Dispatched</div>
                                    <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                                </div>
                            }

                            {
                                states.delivered ? <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3 mt-5'}>
                                    <div>Delivered</div>
                                    <Circle className={'w-10 h-10 text-secondary3 border-2 rounded-full border-white'}/>
                                </div> : <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'} onClick={() => deliveryStatus === 'dispatched' ? setStates({ordered : true, processed: true, dispatched: true,  delivered : true}) : setStates({ordered : true, processed: true, dispatched: true,  delivered : false})}>
                                    <div>Delivered</div>
                                    <Circle className={'w-10 h-10 text-white !border-2 rounded-full border-secondary3'}/>
                                </div>
                            }
                        </div>
                        <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10 !mt-5'}>
                            <div className={'!text-sm font-semibold'} onClick={() => handleUpdateDeliveryStatus(order.order_id)}>Update status</div>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DeliveryPendingOrders;