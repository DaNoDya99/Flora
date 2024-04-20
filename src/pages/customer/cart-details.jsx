import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {Button, Divider, NativeSelect} from "@mui/material";
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react";
import {setSenderRecipient} from "../../store/slices/order_slice.js";

function CartDetails(){
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const order = useSelector(state => state.order.data.order)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
    }, [loggedIn, role]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        dispatch(setSenderRecipient(data));
        navigate('/order/delivery-details', { state: { component : 'sender_receiver_details', state : true } });
    }

    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[50%] mr-5 rounded-lg bg-primary py-10 px-16 shadow-lg max-2xl:px-6'}>
                <form action="" className={'space-y-6'} onSubmit={handleSubmit}>
                    <div className={'font-semibold nunito-sans-light text-2xl'}>Recipient Information</div>
                    <FormControl className={'w-full'}>
                        <InputLabel htmlFor={'recipient_name'} required><span className={'!nunito-sans-light'}>Recipient name</span></InputLabel>
                        <Input id={'recipient_name'} required name={'recipient_name'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'recipient_address'} required><span className={'!nunito-sans-light'}>Recipient address</span></InputLabel>
                        <Input id={'recipient_address'} required name={'recipient_address'} type={'text-area'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Recipient city
                            </InputLabel>
                            <NativeSelect
                                defaultValue={'Colombo'}
                                inputProps={{
                                    name: 'recipient_city',
                                    id: 'uncontrolled-native',
                                }}
                                name={'recipient_city'}
                            >
                                <option value={'Colombo'}>Colombo</option>
                            </NativeSelect>
                        </FormControl>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'recipient_phone'} required><span className={'!nunito-sans-light'}>Recipient phone</span></InputLabel>
                        <Input id={'recipient_phone'} required name={'recipient_phone'}/>
                    </FormControl>

                    <div className={'font-semibold nunito-sans-light text-2xl'}>Sender Information</div>

                    <FormControl className={'w-full'}>
                        <InputLabel htmlFor={'sender_name'} required><span className={'!nunito-sans-light'}>Sender name</span></InputLabel>
                        <Input id={'sender_name'} required name={'sender_name'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'sender_email'} required><span className={'!nunito-sans-light'}>Sender email</span></InputLabel>
                        <Input id={'sender_email'} required name={'sender_email'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'sender_phone'} required><span className={'!nunito-sans-light'}>Sender phone</span></InputLabel>
                        <Input id={'sender_phone'} required name={'sender_phone'}/>
                    </FormControl>

                    <div className={'flex justify-between w-full'}>
                        <button type={"submit"} className={'bg-secondary3 text- text-black p-3 rounded-lg mt-5 w-full font-bold'}>Next</button>
                    </div>
                </form>
            </div>
            <div className={'w-[50%] ms-5 rounded-lg bg-primary py-10 px-16 max-h-[25em] shadow-lg max-2xl:px-5'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'font-semibold 2xl:!text-xl'}>Order Summary</div>
                    <div className={'text-sm'}>{order.order_items.length}&nbsp;Item(s)</div>
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
                    {/*Promotional discount*/}
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Promotional Discount</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                    </div>

                    <Divider variant="middle" />
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Total</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {order.total}</div>
                    </div>
                </div>
                {/*    Enter promo code*/}
                <div className={'flex gap-5 justify-between items-center'}>
                    <FormControl className={'w-full'}>
                        <InputLabel htmlFor={'promo_code'} required><span className={'!nunito-sans-light'}>Promo code</span></InputLabel>
                        <Input id={'promo_code'} required name={'promo_code'}/>
                    </FormControl>
                    <Button variant="contained" color="secondary3" className={'w-1/3 h-8 2xl:h-10'}>
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;