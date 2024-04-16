import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductImage from "../assets/images/product.jpg";
import PropTypes from "prop-types";

ImgMediaCard.propTypes = {
    product : PropTypes.object.isRequired
}

export default function ImgMediaCard(props) {

    const product = props.product;

    return (
        <Card sx={{ maxWidth: 280, maxHeight: 450 }} className={'hover:scale-[101%] nunito-sans-light max-2xl:w-[13em] max-2xl:h-[19.5em]'}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={'http://localhost:3000/'+product.images[0].image_path}
                sx={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    // width: 280,
                    // height: 280,

                }}
                className={'max-2xl:w-[13em] max-2xl:h-[13em]'}
            />
            <CardContent className={'flex flex-col items-center'} sx={{ py: 0.5 }}>
                <Typography gutterBottom component="div" className='max-2xl:text-sm !font-bold'>
                    {product.name}
                </Typography>
                <Typography className='max-2xl:text-sm !font-semibold'>
                    Rs. {product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained"
                    color="secondary3"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width: 280,
                        height: '2em',
                    }}

                ><span className={'nunito-sans-light text-[1rem]'}>Add to Cart</span>
                </Button>
            </CardActions>
        </Card>
    );
}
