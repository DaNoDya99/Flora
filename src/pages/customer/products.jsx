import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb.jsx";
import { FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from "@mui/material";
import AuthBackgroundImage from "../../assets/images/auth-background.jpg";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../../components/card.jsx";
import {useEffect, useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {getProducts} from "../../store/slices/product_slice.js";

function Products() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
        dispatch(getProducts());
    }, [dispatch, loggedIn, role]);

    const category = useLoaderData();
    const products = useSelector(state => state.product.data.products);

    const filteredProducts = products.filter(product => product.sub_category.toString() === category.toString());

    const path = [
        { path: '/', name: 'Home', last: false },
        { path: '/categories', name: 'Categories', last: false },
        { path: `/products/${category}`, name: category[0].toUpperCase() + category.slice(1), last: true }
    ];

    const [noOfCards, setNoOfCards] = useState(0);

    useEffect(() => {
        if (window.innerWidth < 1536) {
            setNoOfCards(6);
        } else if (window.innerWidth >=1536){
            setNoOfCards(8);
        }

        const handleResize = () => {

            if (window.innerWidth < 1536) {
                setNoOfCards(6);
            } else if (window.innerWidth >=1536){
                setNoOfCards(8);
            }
        };

        window.addEventListener('resize', handleResize);
    }, [setNoOfCards]);

    const cardsArray = Array.from({ length: noOfCards }, (_, index) => index);

    return (
        <div className={'min-h-[90vh] py-14 px-[10em] max-2xl:px-[6em]  max-2xl:py-10'}>
            <Breadcrumb path={path} />
            <div className={'w-full flex min-h-[78vh] mt-5 nunito-sans-light'}>
                <div className={'w-[20%] border-2 border-secondary3 rounded relative max-h-[75.4vh] max-2xl:w-[30%] max-2xl:max-h-[90vh]'}>
                    <img src={AuthBackgroundImage} alt="background image" className={'h-[75vh] max-2xl:h-[89.3vh] object-cover opacity-30'} />
                    <div className={'space-y-10 absolute top-10 left-5'}>
                        <FormControl className={'nunito-sans-light'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}
                                className={'nunito-sans-light max-2xl:!text-xl'} focused={false}>Filter by</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                className={'ms-5'}
                            >
                                <FormControlLabel value="all" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>All</Typography>} />
                                <FormControlLabel value="latest" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Latest</Typography>} />
                                <FormControlLabel value="top" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Featured</Typography>} />
                            </RadioGroup>
                        </FormControl>

                        <FormControl className={'nunito-sans-light'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}
                                className={'nunito-sans-light max-2xl:!text-xl'} focused={false}>Price</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                className={'ms-5'}
                            >
                                <FormControlLabel value="<=1499" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Below Rs. 1499.00</Typography>} />
                                <FormControlLabel value="1500 - 3499" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Rs. 1500.00 - Rs. 3499.00</Typography>} />
                                <FormControlLabel value="3500 - 5499" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Rs. 3500.00 - Rs. 5499.00</Typography>} />
                                <FormControlLabel value="5500 - 7499" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Rs. 5500.00 - Rs. 7499.00</Typography>} />
                                <FormControlLabel value=">=7500" control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }} className={'nunito-sans-light max-2xl:!text-sm'}>Above Rs. 7500.00</Typography>} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className={'flex flex-wrap flex-row justify-center gap-5 ms-10 w-[80%]'}>
                    {
                        cardsArray.map((index) => (
                            index <= filteredProducts.length - 1 ?
                            <Link key={index} to={'/product/'+filteredProducts[index].product_code}>
                                <ImgMediaCard product={filteredProducts[index]}/>
                            </Link> : ''
                        ))

                    }
                </div>
            </div>
            <div className={'w-full flex justify-center mt-14'}>
                <Pagination count={10} variant="outlined" />
            </div>
        </div>
    );
}

export default Products;