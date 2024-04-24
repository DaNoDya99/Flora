import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import ProductImage from "../../assets/images/product.jpg";
import {getCustomerOrders} from "../../store/slices/order_slice.js";
import {useDispatch} from "react-redux";
import {getProducts} from "../../store/slices/product_slice.js";

function Orders() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const allProducts = useSelector(state => state.product.data.products);
    const dispatch = useDispatch();
    const user = useSelector(state => state.customer.data.localStorage);
    const customerOrders = useSelector(state => state.order.data.orders);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});

    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
        dispatch(getCustomerOrders(user.id));
        dispatch(getProducts())
    }, [dispatch, loggedIn, role, user.id]);

    const getProductDetails = (order_id) => {
        const odr = customerOrders.find(order => order.order_id === order_id);
        setOrder(odr)
        let prdcts = [];
        for(let i =0; i < odr.order_items.length; i++){
            const product = allProducts.find(product => product.product_code === odr.order_items[i].product_code);
            prdcts.push(product);
        }
        setProducts(prdcts);
    }

    return (
        <div className={'px-[10em] py-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[35%] border-2 border-secondary3 rounded-lg p-2'}>
                <div className={'pb-4 font-semibold text-2xl'}>Orders</div>
                {
                    customerOrders ? customerOrders.map((order, index) => {
                        return (
                            <div key={index} className={'border border-gray-200 p-1 mb-2'} onClick={() => getProductDetails(order.order_id)}>
                                <div className={'flex justify-between'}>
                                    <div>
                                        <div className={'font-semibold'}>Order ID</div>
                                        <div className={'ps-3 text-sm'}>{order.order_id}</div>
                                    </div>
                                    <div className={'w-[20%]'}>
                                        <div className={'font-semibold'}>Date</div>
                                        <div className={'ps-3 text-sm'}>{order.delivery_date}</div>
                                    </div>
                                </div>
                                <div className={'flex justify-between'}>
                                    <div>
                                        <div className={'font-semibold'}>Total</div>
                                        <div className={'ps-3 text-sm'}>LKR {order.total}</div>
                                    </div>
                                    <div className={'w-[20%] font-bold text-yellow-400 text-xl'}>
                                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : "No Orders Yet!"
                }
            </div>

            {
                order && products.length > 0 ? <div className={'w-[64%]'}>
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
                                        <div>Qty 1</div>
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
                </div> : "No Orders Yet!"
            }

        </div>
    );
}

export default Orders;