import React from 'react';
import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Button } from '@mui/material';
import ProductImage from "../../assets/images/product.jpg"
import DeleteIcon from '@mui/icons-material/Delete';
import NumberInput from '../../components/number-input';
import { useNavigate } from "react-router-dom";

function ShoppingCart() {

    const navigate = useNavigate();

    const handleCheckout = () => {
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
                                        <TableCell>Item</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>Quantity</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>Sub Total</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className={'flex gap-2 items-center'}>
                                                <img src={ProductImage} alt="product image"
                                                    className={'w-14 h-14 rounded-md object-cover'} />
                                                <div className={'!nunito-sans-light'}>Hearts of Love</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <NumberInput small={true} />
                                        </TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>Rs. 6000.00</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>
                                            <DeleteIcon className={'text-red-700'} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className={'flex gap-2 items-center'}>
                                                <img src={ProductImage} alt="product image"
                                                    className={'w-14 h-14 rounded-md object-cover'} />
                                                <div className={'!nunito-sans-light'}>Hearts of Love</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <NumberInput small={true} />
                                        </TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>Rs. 6000.00</TableCell>
                                        <TableCell align="center" className={'!nunito-sans-light'}>
                                            <DeleteIcon className={'text-red-700'} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={'w-[35%] ml-10 rounded-lg bg-primary shadow-md p-5'}>
                        <div className={'flex justify-between items-center'}>
                            <div className={'font-semibold'}>Order Summary</div>
                            <div className={'text-sm'}>{2}&nbsp;Item(s)</div>
                        </div>
                        <div className={'my-8 space-y-4'}>
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light'}>Sub Total</div>
                                <div className={'!nunito-sans-light'}>Rs. 12000.00</div>
                            </div>
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light'}>Discount</div>
                                <div className={'!nunito-sans-light'}>-Rs. 500.00</div>
                            </div>
                            <Divider variant="middle" />
                            <div className={'flex justify-between items-center px-5 text-sm'}>
                                <div className={'!nunito-sans-light'}>Total</div>
                                <div className={'!nunito-sans-light'}>Rs. 11500.00</div>
                            </div>
                        </div>
                        <div className={'flex flex-col w-full space-y-2'}>
                            <Button variant="contained" color="secondary3" className={'w-full h-8'} onClick={handleCheckout}>
                                <div className={'!text-sm font-semibold'}>Checkout</div>
                            </Button>
                            <Button variant="outlined" sx={{border : 2}} color="secondary3" className={'w-full h-8 !bg-secondary'}>
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