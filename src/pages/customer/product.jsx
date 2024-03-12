import {useLoaderData} from "react-router-dom";
import ImgCarousel from "../../components/carousel.jsx";
import Breadcrumb from "../../components/breadcrumb.jsx";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

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
                <div className={'w-[50%] mr-5'}>
                    <ImgCarousel/>
                    <div className={'mt-10 max-2xl:mt-5 space-y-10 max-2xl:space-y-5'}>
                        <p className="text-justify"><LocalOfferIcon className={'text-secondary3 mr-2'}/>Introducing our stunning flower bouquet, where every bloom is carefully selected and wrapped in eco-friendly, biodegradable materials!</p>
                        <p className="text-justify"><LocalOfferIcon className={'text-secondary3 mr-2'}/>Free Message card - Customized message can be printed on the message card!</p>
                    </div>
                </div>
                <div className={'w-[50%] ml-5'}>

                </div>
            </div>

        </div>
    );
}

export default Product;