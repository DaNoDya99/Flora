import {Link, useLoaderData} from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb.jsx";
import {FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup} from "@mui/material";
import AuthBackgroundImage from "../../assets/images/auth-background.jpg";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../../components/card.jsx";

function Products() {
    const category = useLoaderData();

    const path = [
        {path: '/', name: 'Home',last: false},
        {path: '/categories', name: 'Categories',last: false},
        {path: `/products/${category}`, name: category[0].toUpperCase() + category.slice(1), last: true}
    ];

    return (
        <div className={'min-h-[90vh] py-14 px-[10em]'}>
            <Breadcrumb path={path} />
            <div className={'w-full flex min-h-[78vh] mt-5 nunito-sans-light'}>
                <div className={'w-[20%] border-2 border-secondary3 rounded relative max-h-[60.4vh]'}>
                    <img src={AuthBackgroundImage} alt="background image" className={'h-[60vh] object-cover opacity-30'}/>
                    <div className={'space-y-10 absolute top-10 left-5'}>
                        <FormControl className={'nunito-sans-light'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{fontWeight : 'bold', fontSize:25, color : 'black'}}
                                       className={'nunito-sans-light'} focused={false}>Filter by</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                className={'ms-5'}
                            >
                                <FormControlLabel value="all" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>All</Typography>}/>
                                <FormControlLabel value="latest" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Latest</Typography>}/>
                                <FormControlLabel value="top" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Featured</Typography>}/>
                            </RadioGroup>
                        </FormControl>

                        <FormControl className={'nunito-sans-light'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{fontWeight : 'bold', fontSize:25, color : 'black'}}
                                       className={'nunito-sans-light'} focused={false}>Price</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                className={'ms-5'}
                            >
                                <FormControlLabel value="<=1499" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Below Rs. 1499.00</Typography>}/>
                                <FormControlLabel value="1500 - 3499" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Rs. 1500.00 - Rs. 3499.00</Typography>}/>
                                <FormControlLabel value="3500 - 5499" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Rs. 3500.00 - Rs. 5499.00</Typography>}/>
                                <FormControlLabel value="5500 - 7499" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Rs. 5500.00 - Rs. 7499.00</Typography>}/>
                                <FormControlLabel value=">=7500" control={<Radio />} label={<Typography sx={{fontWeight : 'bold'}} className={'nunito-sans-light'}>Above Rs. 7500.00</Typography>}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className={'flex flex-wrap flex-row justify-between gap-5 ms-10 w-[80%]'}>
                    <Link to={'/product/'+category+'/001'}>
                        <ImgMediaCard/>
                    </Link>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                    <ImgMediaCard/>
                </div>
            </div>
            <div className={'w-full flex justify-center mt-14'}>
                <Pagination count={10} variant="outlined"/>
            </div>
        </div>
    );
}

export default Products;