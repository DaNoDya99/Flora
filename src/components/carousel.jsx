import { Carousel, Flowbite } from 'flowbite-react';
import ProductImage from '../assets/images/product.jpg';

const customTheme = {
    carousel: {
        control : {
            icon : "h-5 w-5 text-gray-700 sm:h-6 sm:w-6",
            base : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-700/30 group-hover:bg-gray-700/50 group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-700 sm:h-10 sm:w-10",
        },
        indicators : {
            active : {
                off: 'bg-gray-400',
                on: 'bg-gray-700'	
            }
        }
    },
};


function ImgCarousel() {
    return (
        <Flowbite theme={{theme: customTheme}}>
            <Carousel slide={false} className={'h-[30em]'}>
                <img src={ProductImage} alt="..." />
                <img src={ProductImage} alt="..." />
                <img src={ProductImage} alt="..." />
                <img src={ProductImage} alt="..." />
                <img src={ProductImage} alt="..." />
            </Carousel>
        </Flowbite>
    );
}

export default ImgCarousel;