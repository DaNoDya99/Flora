import Divider from '@mui/material/Divider';
import CashOnDeliveryImage from "../../assets/images/cash-on-delivery.png";
import CreditCardImage from "../../assets/images/credit-card.png";
import {Button} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import dayjs, { Dayjs } from 'dayjs';
import { placeOrder,setCustomer, setPaymentDetails} from "../../store/slices/order_slice.js";
import {Bounce, toast} from "react-toastify";

function PaymentDetails() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const order = useSelector(state => state.order.data.order)
    const cart = useSelector(state => state.cart.data.cart);
    const [clicked, setClicked] = useState({
        cash : false,
        card : false
    });
    const dispatch = useDispatch();
    const user = useSelector(state => state.customer.data.localStorage);

    const message = useSelector(state => state.order.message.placeOrder);

    const notify = () => toast.success(message, {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }

        if (message) {
            notify();
        }
    }, [loggedIn, message, notify, role]);

    const setPaymentMethod = (method) => {
        if (method === 'cash') {
            setClicked({
                cash : true,
                card : false
            })
        }else if (method === 'card') {
            setClicked({
                cash : false,
                card : true
            })
        }
    }

    const handleClick = () => {
        const paymentMethod = clicked.cash || clicked.card ? clicked.cash ? 'cash' : 'card' : '';
        dispatch(setPaymentDetails({payment_method : paymentMethod}));
        dispatch(setCustomer({customer : user.id}));
        dispatch(placeOrder(order));
    }


    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[65%] bg-primary rounded-lg shadow-lg px-5 py-8'}>
                <div className={"font-bold text-xl"}>Review your order</div>
                <div className={"space-y-2 py-5"}>
                    {
                        cart.map((item, index) => (
                            <div key={index} className={"flex justify-between items-center px-5 py-2 bg-white rounded-md shadow-sm"}>
                                <div className={"flex gap-10"}>
                                    <img src={'http://localhost:3000/'+item.images[0].image_path} alt="Product"
                                        className={"w-20 h-20 rounded-lg shadow-md"}/>
                                    <div className={"flex flex-col justify-center"}>
                                        <div className={"font-semibold"}>{item.name}</div>
                                        <div className={"font-semibold text-sm text-gray-500"}>Unit Price : Rs {item.price}.00</div>
                                    </div>
                                </div>
                                <div>Qty {item.quantity}</div>
                                <div>Rs {parseFloat(item.price.replace(/,/g, ''))*parseInt(item.quantity)}.00</div>
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
                        <div className={"text-[.7rem] 2xl:text-sm"}>{order.recipient_name ? order.recipient_name : 'Edward'}</div>
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
            <div className={"w-[30%] bg-primary rounded-lg shadow-lg px-5 py-8 max-h-[20em]"}>
                <div className={"font-bold text-xl"}>Choose payment method</div>
                <div className={'mt-5'}>
                    <div className={clicked.cash ? 'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3' : 'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'} onClick={() => setPaymentMethod('cash')}>
                        <div>Cash On Delivery</div>
                        <img src={CashOnDeliveryImage} alt="cash on delivery" 
                            className={'w-10 h-10'}/>
                    </div>

                    <div className={clicked.card ? 'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3 mt-5' : 'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'} onClick={() => setPaymentMethod('card')}>
                        <div>Card Payment</div>
                        <img src={CreditCardImage} alt="cash on delivery" 
                            className={'w-10 h-10'}/>
                    </div>
                </div>

                <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10 !mt-5'} onClick={handleClick}>
                    <div className={'!text-sm font-semibold'}>Proceed to checkout</div>
                </Button>
            </div>
        </div>
    );
}

export default PaymentDetails;