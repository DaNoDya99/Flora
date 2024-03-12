import HomeBackgroundImage from '../../assets/images/home-background.jpg'
import Button from "@mui/material/Button";
import ImgMediaCard from "../../components/card.jsx";
import DescriptiveCard from "../../components/descriptive-card.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
// import { useSelector, useDispatch } from 'react-redux'
// import {addProduct, removeProduct} from "../../store/slices/product_slice.js";

function Home() {
    // const products = useSelector(state => state.product);
    // const dispatch = useDispatch();
    const [noOfCards, setNoOfCards] = useState(0);

    useEffect(() => {
        if (window.innerWidth < 1536) {
            setNoOfCards(4);
        } else if (window.innerWidth >=1536){
            setNoOfCards(5);
        }

        const handleResize = () => {
            if (window.innerWidth < 1536) {
                setNoOfCards(4);
            } else if (window.innerWidth >=1536){
                setNoOfCards(5);
            }
        };

        window.addEventListener('resize', handleResize);
    },[setNoOfCards]);

    const cardsArray = Array.from({ length: noOfCards }, (_, index) => index);

    const collections = [
            {
                name: '🎉 Occasional Delights',
                description: 'Celebrate special moments with our carefully curated occasional-based flower bouquets. ' +
                    'Whether it\'s birthdays, anniversaries, or seasonal festivities, our collections add a touch ' +
                    'of floral magic to every occasion.'
            },
            {
                name: '🌷 Flower Type Elegance',
                description: 'Explore the unique beauty of each flower type with our specialized arrangements. ' +
                    'From the classic romance of roses to the exotic allure of lilies, our flower type-based ' +
                    'collections capture the essence of individual blooms.'
            },
            {
                name: '🌈 Colorful Blossoms',
                description: 'Dive into a world of color with our flower color-based arrangements. ' +
                    'From vibrant rainbow bouquets to elegant monochromatic displays, choose blooms ' +
                    'that match your mood or complement your space.'
            },
        ]

    const values = [
        {
            'name' : '✨ Freshness Guaranteed',
            'description' : 'Every bloom is carefully selected to ensure unparalleled freshness and longevity.'
        },
        {
            'name' : '🌿 Sustainably Sourced',
            'description' : 'Our commitment to the environment means we source our flowers ' +
                'responsibly, supporting local growers and eco-friendly practices.'
        },
        {
            'name' : '🎁 Perfect for Every Occasion',
            'description' : 'Whether it\'s a birthday, anniversary, or just to brighten ' +
                'someone\'s day, our blooms make the perfect gift.'
        },
        {
            'name' : '🚚 Same-Day Delivery',
            'description' : 'Need flowers in a hurry? We offer same-day delivery to ensure ' +
                'your blooms arrive fresh, fragrant, and right on time.'
        }
    ]

    return (
        <>
            <div className={'bg-secondary h-[90vh] w-full flex mt-1 nunito-sans-light'}>
                <div className={'flex justify-end w-full'}>
                    <img src={HomeBackgroundImage}
                         className={'w-full object-cover opacity-75'}
                         alt=""/>
                    <div className={'absolute left-[15em] top-[36vh] space-y-5 max-2xl:left-[8em]'}>
                        <h1 className={'text-6xl text-white font-bold'}>Discover the Beauty of Blooms.</h1>
                        <p className={'text-white text-5xl'}>Welcome to Flower Hub - Where </p>
                        <p className={'text-white text-5xl'}>Nature Meets Elegance! </p>
                        <Button variant="contained"
                                color="secondary3"
                                sx={{fontSize: '1.5em',
                                    fontWeight: 'bold',
                                    padding: '0.5em 1em',
                                    textTransform: 'none',
                                    width: '10em',
                                    height: '3em',
                                    fontFamily: 'monospace',
                                }}
                        >Shop Now
                        </Button>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col justify-center items-center py-10 nunito-sans-light bg-primary'}>
                <h1 className={'text-4xl font-semibold'}>Featured Products</h1>
                <div className={'mt-10 px-[10em] flex justify-between w-full max-2xl:px-[6em]'}>
                    {
                        cardsArray.map((index) => (
                            <Link key={index} to={'product/birthday/001'}>
                                <ImgMediaCard/>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className={'flex flex-col items-center px-[10em] py-10 nunito-sans-light max-2xl:px-[6em]'}>
                <h1 className={'text-4xl font-semibold'}>Our Collections</h1>
                <div className={'flex justify-between mt-10'}>
                    {collections.map((collection, index) => (
                        <DescriptiveCard key={index} collection={collection} size={true}/>
                    ))}
                </div>
            </div>

            <div className={'flex flex-col items-center px-[10em] py-10 bg-primary nunito-sans-light max-2xl:px-[6em]'}>
                <h1 className={'text-4xl font-semibold'}>Why Choose Us?</h1>
                <div className={'flex'}>
                    <div className={'flex flex-col justify-center items-start w-[50%] space-y-10'}>
                        {
                            values.map((value, index) => (
                                //check index less than 2
                                index < 2 ?
                                    <DescriptiveCard key={index} collection={value} size={false}/> : null
                            ))
                        }
                    </div>
                    <div className={'flex flex-col justify-center items-end w-[50%] space-y-10 mt-32'}>
                        {
                            values.map((value, index) => (
                                //check index greater than 1
                                index > 1 ?
                                    <DescriptiveCard key={index} collection={value} size={false}/> : null
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;