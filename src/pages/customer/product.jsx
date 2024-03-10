import {useLoaderData} from "react-router-dom";

function Product() {
    const product = useLoaderData();
    console.log(product);

    return (
        <div className={'min-h-[90vh] py-14 px-[10em]'}>
            Product
        </div>
    );
}

export default Product;