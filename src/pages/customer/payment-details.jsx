import ProductImage from "../../assets/images/product.jpg";
import Divider from '@mui/material/Divider';
import CashOnDeliveryImage from "../../assets/images/cash-on-delivery.png";
import CreditCardImage from "../../assets/images/credit-card.png";
import {Button} from "@mui/material";

function PaymentDetails() {

    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[65%] bg-primary rounded-lg shadow-lg px-5 py-8'}>
                <div className={"font-bold text-xl"}>Review your order</div>
                <div className={"space-y-2 py-5"}>
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
                <div className={"w-full"}>
                    <Divider sx={{border : 1, borderColor : '#FDCEDF'}} variant="middle"/>
                </div> 
                <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                    <div>
                        <div className={"text-sm font-semibold"}>Receiver Name</div>
                        <div className={"text-[.7rem]"}>Edward Samuel</div>
                    </div>
                    <div>
                        <div className={"text-sm font-semibold"}>Receiver Address</div>
                        <div className={"text-[.7rem]"}>107 / 2</div>
                        <div className={"text-[.7rem]"}>Weragama Road</div>
                        <div className={"text-[.7rem]"}>Wadduwa</div>
                    </div>
                    <div>
                        <div className={"text-sm font-semibold"}>Receiver Phone</div>
                        <div className={"text-[.7rem]"}>0778965445</div>
                    </div>
                    <div>
                        <div className={"text-sm font-semibold"}>Delivery Date</div>
                        <div className={"text-[.7rem]"}>2024-04-06</div>
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
            <div className={"w-[30%] bg-primary rounded-lg shadow-lg px-5 py-8 max-h-[20em]"}>
                <div className={"font-bold text-xl"}>Choose payment method</div>
                <div className={'mt-5'}>
                    <div className={'flex py-2 px-5 bg-secondary rounded-md shadow-sm justify-between items-center border-2 border-secondary3'}>
                        <div>Cash On Delivery</div>
                        <img src={CashOnDeliveryImage} alt="cash on delivery" 
                            className={'w-10 h-10'}/>
                    </div>

                    <div className={'flex py-2 px-5 bg-white rounded-md shadow-sm justify-between items-center mt-5'}>
                        <div>Card Payment</div>
                        <img src={CreditCardImage} alt="cash on delivery" 
                            className={'w-10 h-10'}/>
                    </div>
                </div>

                <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10 !mt-5'}>
                    <div className={'!text-sm font-semibold'}>Place order</div>
                </Button>
            </div>
        </div>
    );
}

export default PaymentDetails;