import {useSelector} from "react-redux";
import {useEffect} from "react";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import ProductImage from "../../assets/images/product.jpg";

function Orders() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
    }, [loggedIn, role]);

    return (
        <div className={'px-[10em] py-[5em] flex justify-between w-full max-2xl:px-[6em]'}>
            <div className={'w-[35%] border-2 border-secondary3 rounded-lg p-2'}>
                <div className={'pb-4 font-semibold text-2xl'}>Orders</div>
                <div className={'border border-gray-200 p-1 mb-2'}>
                    <div className={'flex justify-between'}>
                        <div>
                            <div className={'font-semibold'}>Order ID</div>
                            <div className={'ps-3 text-sm'}>ODR-2057-8298</div>
                        </div>
                        <div className={'w-[20%]'}>
                            <div className={'font-semibold'}>Date</div>
                            <div className={'ps-3 text-sm'}>2021-09-15</div>
                        </div>
                    </div>
                    <div className={'flex justify-between'}>
                        <div>
                            <div className={'font-semibold'}>Total</div>
                            <div className={'ps-3 text-sm'}>LKR 1000.00</div>
                        </div>
                        <div className={'w-[20%] font-bold text-yellow-400 text-xl'}>
                            Pending
                        </div>
                    </div>
                </div>
            </div>

            <div className={'w-[64%] p-2 border-2 border-secondary3 rounded-lg pb-5'}>
                <div className={"space-y-2 py-5"}>
                    <div className={"flex justify-between items-center px-5 py-2 bg-white rounded-md shadow-sm"}>
                        <div className={"flex gap-10"}>
                            <img src={ProductImage} alt="Product"
                                 className={"w-20 h-20 rounded-lg shadow-md"}/>
                            <div className={"flex flex-col justify-center"}>
                                <div className={"font-semibold"}>Blooming Love</div>
                                <div className={"font-semibold text-sm text-gray-500"}>Unit Price : Rs 1200.00</div>
                            </div>
                        </div>
                        <div>Qty 1</div>
                        <div>Rs 1200.00</div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <Divider sx={{border : 1, borderColor : '#FDCEDF'}} variant="middle"/>
                </div>
                <div className={'flex justify-between mt-4 px-5 py-2 bg-white rounded-md shadow-sm'}>
                    <div>
                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Name</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>Viharsha</div>
                    </div>
                    <div>
                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Address</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>No 35/1</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>Monarahanduwila Road</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>Weththawa</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>Mathugama</div>

                    </div>
                    <div>
                        <div className={"text-sm font-semibold 2xl:text-lg"}>Receiver Phone</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>077 244 5485</div>
                    </div>
                    <div>
                        <div className={"text-sm font-semibold 2xl:text-lg"}>Delivery Date</div>
                        <div className={"text-[.7rem] 2xl:text-sm"}>2024-04-27</div>
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
                            <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. 1200.00</div>
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
                            <div className={'!nunito-sans-light 2xl:!text-lg font-bold'}>Rs. 1200.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;