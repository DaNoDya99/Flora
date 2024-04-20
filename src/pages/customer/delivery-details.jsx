import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, Radio} from "@mui/material";
import Input from "@mui/material/Input";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setDeliveryDetails} from "../../store/slices/order_slice.js";

function DeliveryDetails(){
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const order = useSelector(state => state.order.data.order)
    const [formData, setFormData] = useState({
        delivery_method : '',
        delivery_date : dayjs()
    })
    const dispatch = useDispatch();

    const handleChange = (e) => {
        //check the radio button is checked
        if (e.target.name === 'delivered' && e.target.checked) {
            setFormData({
                ...formData,
                delivery_method : 'delivered'
            })
        }else if (e.target.name === 'pickup' && e.target.checked) {
            setFormData({
                ...formData,
                delivery_method : 'pickup'
            })
        }
    }

    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
    }, [loggedIn, role]);

    const [value, setValue] = useState(dayjs());
    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(setDeliveryDetails(formData));

        navigate('/order/payment-details', { state: { component : 'delivery_details', state : true } });
    }


    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[50%] mr-5 rounded-lg bg-primary py-10 px-10 shadow-lg max-2xl:px-5'}>
                <div className={'flex flex-col space-y-6 w-full border-2 border-secondary2 rounded-lg'}>
                    <div className={'w-full flex items-center justify-between px-10 py-4'}>
                        <div className={'flex gap-14 items-center'}>
                            <div>Receiver</div>
                            <div>
                                <p>{order.sender_name ? order.sender_name : 'Edward'}</p>
                                <p>{order.sender_phone ? order.sender_phone : '07x - xxx xxxx'}</p>
                            </div>
                        </div>
                        <div className={'font-semibold underline hover:font-bold'}>Change</div>
                    </div>
                    <Divider variant="middle" className={'!my-0'}/>
                    <div className={'w-full flex items-center justify-between px-10 pb-4'}>
                        <div className={'flex gap-14 items-center'}>
                            <div>Receiver</div>
                            <div>
                                <p>{order.recipient_name ? order.recipient_name : 'Edward'}</p>
                                <p>{order.recipient_city ? order.recipient_city : 'Colombo'}</p>
                                <p>{order.recipient_phone ? order.recipient_phone : '07x - xxx xxxx'}</p>
                            </div>
                        </div>
                        <div className={'font-semibold underline hover:font-bold'}>Change</div>
                    </div>
                </div>

                <div className={'flex flex-col space-y-6 w-full border-2 border-secondary2 rounded-lg mt-5 px-10 py-4'}>
                    <div className={'space-y-2'}>
                        <div className={'w-full text-2xl font font-semibold'}>Delivery Method</div>
                        <div className={'text-sm text-red-700'}>Note: Delivery only within Colombo district</div>
                    </div>
                    <div className={'py-4'}>
                        <FormControl>
                            <FormControlLabel value="delivered" control={<Radio name={'delivered'} onChange={handleChange}/>} label="Get Delivered" />
                            <div className={'ms-8 text-gray-500'}>
                                Get delivered to your doorstep.
                            </div>
                        </FormControl>
                    </div>

                    <Divider variant="middle" className={'!my-0'}/>

                    <div className={'py-4'}>
                        <FormControl>
                            <FormControlLabel value="pickup" control={<Radio name={'pickup'} onChange={handleChange}/>} label="Pickup" />
                            <div className={'ms-8 text-gray-500'}>
                                Collect your order from our store.
                            </div>
                        </FormControl>
                    </div>

                </div>

                <div className={'flex flex-col space-y-6 w-full border-2 border-secondary2 rounded-lg mt-5 px-10 py-4'}>
                    <div className={'w-full text-2xl font font-semibold'}>Deliver Date</div>

                    <FormControl className={'w-full mt-5'}>
                        <Input id={'deliver-date'} required name={'delivery_date'} disabled={false} value={dayjs(value).format('D MMMM YYYY')} />
                    </FormControl>
                    <div className={'flex justify-center'}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                <DemoItem>
                                    <DateCalendar value={value} onChange={(newValue) => {setValue(newValue)
                                    setFormData({...formData, delivery_date : dayjs(newValue)})}} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

            </div>

            <div className={'w-[50%] ms-5 rounded-lg bg-primary py-10 px-16 max-h-[23em] shadow-lg max-2xl:px-5 2xl:max-h-[26em]'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'font-semibold 2xl:!text-xl'}>Order Summary</div>
                    <div className={'text-sm'}>{order ? order.order_items.length : 0}&nbsp;Item(s)</div>
                </div>
                <div className={'my-8 space-y-4'}>
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Sub Total</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {order.total}</div>
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
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Total</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {order.total}</div>
                    </div>

                    {/* Review your order button */}
                    <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10'} onClick={handleClick}>
                        <div className={'!text-sm font-semibold'}>Review your order</div>
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default DeliveryDetails;