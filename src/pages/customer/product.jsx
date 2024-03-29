import {useLoaderData} from "react-router-dom";
import ImgCarousel from "../../components/carousel.jsx";
import Breadcrumb from "../../components/breadcrumb.jsx";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NumberInput from "../../components/number-input.jsx";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Product() {
    const product = useLoaderData();
    console.log(product);

    const paths = [{ path: '/', name: 'Home', last: false },
            { path: '', name: 'Categories', last: false },
            { path: '/products/birthday', name: 'Birthday', last: false },
            {path: '/product/birthday/001',name:'Affairs of Hearts', last:true}
        ]

    return (
        <div className={'py-14 max-2xl:py-10 px-[10em] max-2xl:px-[6em]'}>
            <div className={'mb-5'}>
                <Breadcrumb path={paths} />
            </div>
            <div className={'flex w-full'}>
                <div className={'w-[50%] mr-12'}>
                    <ImgCarousel/>
                    <div className={'mt-10 max-2xl:mt-5 space-y-10 max-2xl:space-y-5 text-xl max-2xl:text-sm'}>
                        <div className={'flex items-center'}>
                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                            <p className="text-justify">Introducing our stunning flower bouquet, where every bloom is
                                carefully selected and wrapped in eco-friendly, biodegradable materials!</p>
                        </div>
                        <div className={'flex items-center'}>
                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                            <p className="text-justify">Free Message card - Customized message can be printed on the message card!!</p>
                        </div>
                        <div className={'flex items-center'}>
                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                            <p className="text-justify">At Flower Hub, we prioritize your satisfaction. If necessary,
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                we may substitute flowers with ones of equal or greater value that align with your arrangement's
                                style and color scheme. Rest assured, we will always seek your approval for the replacement
                                options. Your happiness is our utmost concern.</p>
                        </div>
                    </div>
                </div>
                <div className={'w-[50%] ml-12'}>
                    <div className={'space-y-4 max-2xl:space-y-2'}>
                        <h1 className={'text-3xl font-semibold'}>AFFAIRS OF HEARTS</h1>
                        <div className={'flex text-2xl'}>
                            <h1 className={'font-semibold'}>Product Code :</h1>
                            <h1>&nbsp; 001</h1>
                        </div>
                        <div className={'text-2xl font-semibold'}>
                            Rs. 6000.00
                        </div>
                        <NumberInput small={false}/>
                        <div className={'flex flex-col items-center py-10 space-y-4'}>
                            <Button variant="contained" color="secondary3" className={'w-[60%] h-12'}>
                                <Typography className={'!text-xl font-semibold'}>Add to Cart</Typography>
                            </Button>
                            <Button variant="outlined" sx={{border : 2.5}} color="secondary3" className={'w-[60%] h-12 !bg-secondary'}>
                                <Typography className={'!text-xl font-semibold text-black'}>Buy it now</Typography>
                            </Button>
                        </div>
                    </div>
                    <div className={'space-y-10'}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className={'text-justify text-xl max-2xl:text-sm'}>Brighten Women's Day with our charming flower bunch—a delightful mix of hues symbolizing the
                            joy and strength of women. This bouquet is a simple yet heartfelt way to honor the incredible women in your life. Share
                            these blooms to express gratitude and celebrate the unique contributions of women everywhere.</p>

                        <div className={'space-y-2'}>
                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Bloom Contains:</h1>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>Gerbera: 03 stems</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>Chrysanthemums: 08 stems</p>
                        </div>

                        <div className={'space-y-2'}>
                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Freshness Guaranteed:</h1>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>Gerbera: 03 to 05 days</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>Chrysanthemums: 07 to 10 days</p>
                        </div>

                        <div className={'space-y-2'}>
                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Care Instructions:</h1>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>For everlasting blooms, trim the stem and let it dry inside a book and then you can keep it as a souvenir.</p>
                        </div>

                        <div className={'space-y-2'}>
                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Care Tips:</h1>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Once you receive your flowers, trim the stems from the bottom and place the flowers in a vase filled with water. Again cut the stems to about 1-2 inches in a slanting direction.</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Always put the flowers in a clean vase and fresh water.</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Cut all the leaves immersed in water. Don’t remove the leaves on the stems.</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Keep a check on the water levels and try to change the water daily for a longer shelf life of flowers. Keep the flowers away from direct sunlight and excessive heat.</p>
                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Sprinkle some water on the flowers for that refreshing brightness.</p>

                            <div className={'pt-10 text-justify text-xl max-2xl:text-sm'}>
                                Flower bunches are prepared by certified florists at Lassana Flora, and with our own fields of blooming flowers,
                                we are able to ensure that our bunches are always made with the highest quality flowers available, picked at the
                                peak of their beauty and freshness, and handled with care and safely transported in refrigerated vehicles.
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
}

export default Product;