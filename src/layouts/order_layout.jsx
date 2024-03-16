import {Link, Outlet} from "react-router-dom";
import ResponsiveAppBar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useLocation } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";


function OrderLayout() {
    const [states, setStates] = useState({cart : false, sender_receiver: false, delivery: false,  payment : false});

    const location = useLocation();

    const from = location.state && location.state.component;
    const state = location.state && location.state.state;

    useEffect(() => {
        if(from === 'shopping_cart'){
            setStates({...states, cart : state});
        } else if(from === 'delivery_details'){
            setStates({...states, delivery : state});
        } else if(from === 'sender_receiver_details'){
            setStates({...states, sender_receiver : state});
        } else if(from === 'payment'){
            setStates({...states, payment : state});
        }
    }, [from, location, state, states]);

    return (
        <div className={'nunito-sans-light'}>
            <ResponsiveAppBar sticky={true} />
            <div className="px-[10em] max-2xl:px-[6em] flex py-14 max-2xl:py-10 justify-between items-center">
                <div className="flex flex-col items-center justify-center mr-5">
                    <Link to={'/order/shopping-cart'}>
                        <CheckCircleIcon className={states.cart ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                    </Link>
                    <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Cart</div>
                </div>
                {states.cart ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                <div className="flex flex-col items-center justify-center mx-5">
                    <Link to={'/order/cart-details'}>
                        <AccountCircleIcon className={states.sender_receiver ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                    </Link>
                    <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Sender / Receiver Details</div>
                </div>
                {/*<LinearProgress className={'w-1/3'} color={'secondary'}/>*/}
                {states.sender_receiver ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                <div className="flex flex-col items-center justify-center mx-5">
                    <Link to={'/order/delivery-details'}>
                        <LocalShippingIcon className={states.delivery ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                    </Link>
                    <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Delivery Details</div>
                </div>
                {/*<LinearProgress className={'w-1/3'} color={'secondary'}/>*/}
                {states.delivery ? <div className={'w-1/3 h-1 bg-secondary3'}></div> :<LinearProgress className={'w-1/3'} color={'secondary'}/>}
                <div className="flex flex-col items-center justify-center ms-5">
                    <PaymentIcon className={states.payment ? 'text-secondary3 !text-5xl 2xl:!text-7xl' : 'text-secondary !text-5xl 2xl:!text-7xl'}/>
                    <div className={'w-full text-center text-sm font-semibold !nunito-sans-light 2xl:text-lg'}>Payment</div>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default OrderLayout;