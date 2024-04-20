import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NumberInput from '../../components/number-input';
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getCart} from "../../store/slices/cart_slice.js";
import {setOrderItems, setOrderTotal} from "../../store/slices/order_slice.js";

function ShoppingCart() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const dispatch = useDispatch();
    const customer = useSelector(state => state.customer.data.localStorage);
    const cart = useSelector(state => state.cart.data.cart);

    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
        dispatch(getCart(customer.id))
    }, [customer.id, dispatch, loggedIn, role]);

    const navigate = useNavigate();

    const handleCheckout = () => {

        let orderItems1 = [];

        cart.map((item) => {
            orderItems1.push({
                product_code : item.product_code,
                quantity : item.quantity,
            });
        });
        dispatch(setOrderItems(orderItems1));

        const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/,/g, ''))*parseInt(item.quantity), 0).toString()+'.00';
        dispatch(setOrderTotal(total));

        navigate('/order/cart-details', { state: { component : 'shopping_cart', state : true } });
    }

    return (
        <>
            <div className={'px-[10em] max-2xl:px-[6em] mb-14 max-2xl:mb-10'}>
                <div className={'flex w-full'}>
                    <div className={'w-[65%] mr-10'}>
                        <TableContainer component={Paper} className={'!shadow-md !bg-primary'}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'!nunito-sans-light 2xl:!text-xl'}>Item</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light 2xl:!text-xl'}>Quantity</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light 2xl:!text-xl'}>Sub Total</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light 2xl:!text-xl'}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className={'flex gap-2 items-center'}>
                                                    <img src={'http://localhost:3000/'+item.images[0].image_path} alt="product image"
                                                         className={'w-14 h-14 rounded-md object-cover'} />
                                                    <div className={'!nunito-sans-light 2xl:text-xl'}>{item.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <NumberInput small={true} productQuantity={item.quantity} productCode={item.product_code} />
                                            </TableCell>
                                            <TableCell align="center" className={'!nunito-sans-light 2xl:!text-xl'}>Rs. {parseFloat(item.price.replace(/,/g, ''))*parseInt(item.quantity)}.00</TableCell>
                                            <TableCell align="center" className={'!nunito-sans-light'}>
                                                <DeleteIcon className={'text-red-700'} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={'w-[35%] ml-10 rounded-lg bg-primary shadow-md p-5'}>
                        <div className={'flex justify-between items-center'}>
                            <div className={'font-semibold 2xl:!text-xl'}>Order Summary</div>
                            <div className={'text-sm'}>{cart.length}&nbsp;Item(s)</div>
                        </div>
                        <div className={'my-8 space-y-4'}>
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>Sub Total</div>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/,/g, ''))*parseInt(item.quantity), 0)+'.00'}</div>
                            </div>
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>Flat Discount</div>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>-Rs. 00.00</div>
                            </div>
                            <Divider variant="middle" />
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>Total</div>
                                <div className={'!nunito-sans-light 2xl:!text-lg'}>Rs. {cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/,/g, ''))*parseInt(item.quantity), 0)+'.00'}</div>
                            </div>
                        </div>
                        <div className={'flex flex-col w-full space-y-2'}>
                            <Button variant="contained" color="secondary3" className={'w-full h-8 2xl:h-10'} onClick={handleCheckout}>
                                <div className={'!text-sm font-semibold'}>Checkout</div>
                            </Button>
                            <Button variant="outlined" sx={{border : 2}} color="secondary3" className={'w-full h-8 2xl:h-10 !bg-secondary'}>
                                <div className={'!text-sm font-semibold !text-black'}>Continue Shopping</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ShoppingCart;