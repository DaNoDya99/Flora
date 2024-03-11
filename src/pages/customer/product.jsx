import {useLoaderData} from "react-router-dom";
import ImgCarousel from "../../components/carousel.jsx";

function Product() {
    const product = useLoaderData();
    console.log(product);

    return (
        <div className={'min-h-[92vh] py-14 px-[10em]'}>
            <div className={'flex w-full'}>
                <div className={'w-[50%] mr-5'}>
                    <ImgCarousel/>
                </div>
                <div className={'w-[50%] ml-5'}>

                </div>
            </div>

        </div>
    );
}

export default Product;