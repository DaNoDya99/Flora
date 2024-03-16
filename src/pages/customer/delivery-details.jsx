import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, Radio} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

function DeliveryDetails(){

    return (
        <div className={'px-[10em] pb-[5em] flex justify-between w-full'}>
            <div className={'w-[50%] mr-5 rounded-lg bg-primary py-10 px-10 shadow-lg'}>
                <div className={'flex flex-col space-y-6 w-full border-2 border-secondary2 rounded-lg'}>
                    <div className={'w-full flex items-center justify-between px-10 py-4'}>
                        <div className={'flex gap-14 items-center'}>
                            <div>Receiver</div>
                            <div>
                                <p>Edward</p>
                                <p>Panadura</p>
                                <p>0778965445</p>
                            </div>
                        </div>
                        <div className={'font-semibold underline hover:font-bold'}>Change</div>
                    </div>
                    <Divider variant="middle" className={'!my-0'}/>
                    <div className={'w-full flex items-center justify-between px-10 pb-4'}>
                        <div className={'flex gap-14 items-center'}>
                            <div>Receiver</div>
                            <div>
                                <p>Edward</p>
                                <p>Panadura</p>
                                <p>0778965445</p>
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
                            <FormControlLabel value="delivered" control={<Radio />} label="Get Delivered" />
                            <div className={'ms-8 text-gray-500'}>
                                Get delivered to your doorstep.
                            </div>
                        </FormControl>
                    </div>

                    <Divider variant="middle" className={'!my-0'}/>

                    <div className={'py-4'}>
                        <FormControl>
                            <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                            <div className={'ms-8 text-gray-500'}>
                                Collect your order from our store.
                            </div>
                        </FormControl>
                    </div>

                </div>

                <div className={'flex flex-col space-y-6 w-full border-2 border-secondary2 rounded-lg mt-5 px-10 py-4'}>
                    <div className={'w-full text-2xl font font-semibold'}>Deliver Date</div>

                    <FormControl className={'w-full mt-5'}>
                        <Input id={'deliver-date'} required name={'deliver-date'} disabled={true}/>
                    </FormControl>
                </div>

            </div>

            <div className={'w-[50%] ms-5 rounded-lg bg-primary py-10 px-16 max-h-[25em] shadow-lg'}>

            </div>
        </div>
    );
}

export default DeliveryDetails;