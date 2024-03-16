import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {Button, Divider, NativeSelect} from "@mui/material";

function CartDetails(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/order/delivery-details', { state: { component : 'sender_receiver_details', state : true } });
    }

    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full'}>
            <div className={'w-[50%] mr-5 rounded-lg bg-primary py-10 px-16 shadow-lg'}>
                <form action="" className={'space-y-6'}>
                    <div className={'font-semibold nunito-sans-light text-2xl'}>Recipient Information</div>
                    <FormControl className={'w-full'}>
                        <InputLabel htmlFor={'name'} required><span className={'!nunito-sans-light'}>Recipient name</span></InputLabel>
                        <Input id={'email'} required name={'name'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'address'} required><span className={'!nunito-sans-light'}>Recipient address</span></InputLabel>
                        <Input id={'address'} required name={'address'} type={'text-area'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Recipient city
                            </InputLabel>
                            <NativeSelect
                                defaultValue={'Colombo'}
                                inputProps={{
                                    name: 'city',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={'Colombo'}>Colombo</option>
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'phone'} required><span className={'!nunito-sans-light'}>Recipient phone</span></InputLabel>
                        <Input id={'phone'} required name={'phone'}/>
                    </FormControl>

                    <div className={'font-semibold nunito-sans-light text-2xl'}>Sender Information</div>
                    {/*Check box for same as recipient below this comment */}
                    <div className={'w-full flex gap-2 items-center'}>
                        <input type="checkbox" id="same_as_recipient" name="same_as_recipient" value="same_as_recipient"/>
                        <label htmlFor="same_as_recipient" className={'!nunito-sans-light text-sm'}>Same as recipient</label>
                    </div>

                    <FormControl className={'w-full'}>
                        <InputLabel htmlFor={'name'} required><span className={'!nunito-sans-light'}>Sender name</span></InputLabel>
                        <Input id={'email'} required name={'name'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'email'} required><span className={'!nunito-sans-light'}>Sender email</span></InputLabel>
                        <Input id={'email'} required name={'email'}/>
                    </FormControl>

                    <FormControl className={'w-full mt-5'}>
                        <InputLabel htmlFor={'address'} required><span className={'!nunito-sans-light'}>Sender phone</span></InputLabel>
                        <Input id={'address'} required name={'address'} type={'text-area'}/>
                    </FormControl>

                    <div className={'flex justify-between w-full'}>
                        <button onClick={handleClick} className={'bg-secondary3 text- text-black p-3 rounded-lg mt-5 w-full font-bold'}>Next</button>
                    </div>
                </form>
            </div>
            <div className={'w-[50%] ms-5 rounded-lg bg-primary py-10 px-16 max-h-[25em] shadow-lg'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'font-semibold 2xl:!text-xl'}>Order Summary</div>
                    <div className={'text-sm'}>{2}&nbsp;Item(s)</div>
                </div>
                <div className={'my-8 space-y-4'}>
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Sub Total</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. 12000.00</div>
                    </div>
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Flat Discount</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 500.00</div>
                    </div>
                    {/*Promotional discount*/}
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Promotional Discount</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                    </div>

                    <Divider variant="middle" />
                    <div className={'flex justify-between items-center px-5 text-sm'}>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Total</div>
                        <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. 11500.00</div>
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