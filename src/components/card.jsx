import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductImage from "../assets/images/product.jpg";

export default function ImgMediaCard() {
    return (
        <Card sx={{ maxWidth: 280, maxHeight: 450}} className={'hover:scale-[101%] nunito-sans-light'}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={ProductImage}
                sx={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    width: 280,
                    height: 280,

                }}
            />
            <CardContent className={'flex flex-col items-center'}>
                <Typography gutterBottom variant="h5" component="div">
                    AFFAIRS OF HEARTS
                </Typography>
                <Typography sx={{fontSize: '1.5em'}}>
                    Rs. 6000.00
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained"
                        color="secondary3"
                        sx={{fontSize: '1.2em',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            width: 280,
                            height: '2.5em',
                        }}
                        className={'nunito-sans-light'}
                >Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}
