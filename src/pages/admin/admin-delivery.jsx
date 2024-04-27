import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
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
import InfoIcon from "@mui/icons-material/Info.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close.js";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import {
    assignDeliveryPerson,
    getOrderDetailsByStatus,
    getOrderPendingOrderCountsGroupedByCity
} from "../../store/slices/order_slice.js";
import {getProducts} from "../../store/slices/product_slice.js";
import dayjs from "dayjs";
import {getDeliveryPersonnel, getDeliveryPersonnelAssignedOrderCounts} from "../../store/slices/employee_slice.js";

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
    { id: 'payment_method', label: 'Payment Status', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

function createData(id, receiver, receiver_contact, delivery_address, total, payment_method, delivery_date, actions,state) {
    return { id, receiver, receiver_contact, delivery_address, total, payment_method, delivery_date, actions,state};
}

let rows = [];

function AdminDelivery() {
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.data.products);
    const orders = useSelector(state => state.order.data.orders);
    rows = orders.map((order) => {
        return createData(order.order_id, order.recipient_name, order.recipient_phone, order.recipient_address.slice(0,18)+'...', order.total, order.payment_method === 'cash' ? 'Cash on delivery' : 'Paid', order.delivery_date, order.order_id);
    });
    const deliveryPersonnel = useSelector(state => state.employee.data.employees);
    const orderCountsByCity = useSelector(state => state.order.data.orderCountsByCity);

    const [orderStatus, setOrderStatus] = React.useState('pending');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openOrderDetails, setOpenOrderDetails] = React.useState(false);
    const [order, setOrder] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [openAssignDeliveryPerson, setOpenAssignDeliveryPerson] = React.useState(false);
    const [deliveryPerson, setDeliveryPerson] = React.useState('');

    if (!isLoggedIn || employee.role !== 'admin') {
        window.location.href = '/employee/login';
    }

    useEffect(() => {
        dispatch(getOrderDetailsByStatus('pending'));
        dispatch(getProducts());
        dispatch(getDeliveryPersonnelAssignedOrderCounts())
        dispatch(getOrderPendingOrderCountsGroupedByCity())
    }, [dispatch]);
    
    const handleChange = (event) => {
        setOrderStatus(event.target.value);
        dispatch(getOrderDetailsByStatus(event.target.value))
    }

    const handleDeliveryPersonChange = (event) => {
        setDeliveryPerson(event.target.value);
    }

    const handleAssignDeliveryPerson = (city) => {
        const data = {
            city : city,
            deliveryPerson : deliveryPerson
        }
        dispatch(assignDeliveryPerson(data))
        setDeliveryPerson('')
    }

    const handleOrderDetailsOpen = (order_id) => {
        setOpenOrderDetails(true);
        console.log(order_id);
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

    const handleAssignDeliveryPersonClose = () => {
        setOpenAssignDeliveryPerson(false);
    }

    const handleAssignDeliveryPersonOpen = () => {
        setOpenAssignDeliveryPerson(true);
    }

    return (
        <div>
            <div className={'flex justify-between items-center'}>
                <div className={'text-3xl font-semibold'}>Order</div>
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
                            onChange={handleChange}
                            name={'order-status'}
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                        </NativeSelect>
                    </FormControl>
                </div>

            </div>
            <div className={'mt-5'} hidden={orderStatus !== 'pending'}>
                {/*    Assign delivery person button*/}
                <Button className={'!bg-secondary2'} variant="contained" onClick={handleAssignDeliveryPersonOpen}>Assign Delivery Person</Button>
            </div>
            <div className={'mt-5 max-h-[70vh]'}>
                <TableContainer className={'h-[70vh]'}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={'!font-semibold !text-xl max-2xl:!text-lg'}
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
                                                        </TableCell> :
                                                        <TableCell key={column.id} align={column.align} className={'!text-lg max-2xl:!text-sm'}>
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

            <Modal
                open={openAssignDeliveryPerson}
                onClose={handleAssignDeliveryPersonClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1} className={'w-[70%]'}>
                    <div className={'flex justify-between items-center'}>
                        <Typography id="modal-modal-title" variant="h6" component="h3">
                            Assign Delivery Person
                        </Typography>
                        <CloseIcon onClick={handleAssignDeliveryPersonClose} className={'text-red-600'} />
                    </div>

                    <div className={'flex justify-center gap-5 flex-wrap mt-5'}>

                        {
                            orderCountsByCity.map((city, index) => (
                                <div key={index} className={'border-2 border-secondary3 p-2 w-[30%]'}>
                                    <div className={'flex justify-between'}>
                                        <div>
                                            <div className={'font-semibold text-lg'}>{city.recipient_city}</div>
                                            <div className={'text-sm'}>{city.order_count} Orders</div>
                                        </div>
                                        <FormControl className={'w-[50%]'}>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Assign To
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={'today'}
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'uncontrolled-native',
                                                }}
                                                onChange={handleDeliveryPersonChange}
                                                name={'delivery-person'}
                                            >
                                                <option value={'Select Delivery Person'}>Select Delivery Person</option>
                                                {
                                                    deliveryPersonnel.map((personnel, index) => (
                                                        <option key={index} value={personnel.id}>{personnel.firstName} {personnel.lastName} - {personnel.orderCount} Assigned Orders</option>
                                                    ))
                                                }
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                    {/*    Assign Button*/}
                                    <Button className={'!bg-secondary3 w-full !mt-5'} variant="contained" onClick={() => handleAssignDeliveryPerson(city.recipient_city)}>Assign</Button>
                                </div>
                            ))
                        }
                    </div>
                </Box>
            </Modal>
        </div>

    );
}

export default AdminDelivery;