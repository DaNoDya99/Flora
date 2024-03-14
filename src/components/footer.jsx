import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";


function Footer() {
    return (
        <div>
            <div className={'w-full py-10 px-[10em] max-2xl:px-[6em] bg-secondary3 flex justify-between'}>
                <div className={'nunito-sans-light'}>
                    <h1 className={'font-semibold text-2xl mb-4'}>HEAD OFFICE</h1>
                    <div className={'space-y-2'}>
                        <p>Flower Hub (pvt) Ltd,</p>
                        <p>123, Flower Road,</p>
                        <p>Colombo 07,</p>
                        <p>Sri Lanka</p>
                        <p><span className={'font-bold'}>Email : </span>flowerhub@gmail.com</p>
                        <p><span className={'font-bold'}>Tel : </span>011 123 4567</p>
                    </div>
                </div>

                <div className={'nunito-sans-light'}>
                    <h1 className={'font-semibold text-2xl mb-4'}>QUICK LINKS</h1>
                    <div className={'space-y-2'}>
                        <p>Occasional Delights</p>
                        <p>Flower Type Elegance</p>
                        <p>Colorful Blossoms</p>
                    </div>
                </div>

                <div className={'nunito-sans-light'}>
                    <h1 className={'font-semibold text-2xl mb-4'}>CONNECT WITH US</h1>
                    <div className={'space-y-2'}>
                        <div className={'flex w-[8em] justify-between items-center'}>
                            <FacebookIcon sx={{fontSize : '2rem'}}/>
                            <p>Facebook</p>
                        </div>
                        <div className={'flex w-[8em] justify-between items-center'}>
                            <InstagramIcon sx={{fontSize : '2rem'}}/>
                            <p>Instagram</p>
                        </div>
                        <div className={'flex w-[8em] justify-between items-center'}>
                            <YouTubeIcon sx={{fontSize : '2rem'}}/>
                            <p>Youtube</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;