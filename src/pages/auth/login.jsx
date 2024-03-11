import LogoNameImage from '../../assets/images/logo-site-name.png';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {Link} from "react-router-dom";
function Login() {

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return (
        <>
            <div className={'flex flex-col items-center h-[80vh] justify-center nunito-sans-light max-2xl:h-[88vh]'}>
                <div className={'w-[35em] flex flex-col items-center'}>
                    <img src={LogoNameImage}
                         alt="logo"
                         className="w-48 h-48 rounded-full shadow-lg max-2xl:w-24 max-2xl:h-24"
                    />
                    <div>
                        <h1 className={'text-4xl font-semibold text-center mt-5 max-2xl:text-3xl'}>Sign In to Flower Hub</h1>
                        <form action="" className={'flex flex-col mt-10 space-y-10 max-2xl:mt-5 max-2xl:space-y-5'}>
                            <FormControl>
                                <InputLabel htmlFor={'email'} required>Email</InputLabel>
                                <Input id={'email'} required name={'email'} />
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor={'password'} required>Password</InputLabel>
                                <Input id={'password'} required name={'password'} type={passwordVisibility ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            {passwordVisibility ? <VisibilityOffIcon sx={{fontSize : 'large'}} onClick={() => setPasswordVisibility(false)} className={'cursor-pointer'}/>
                                                : <VisibilityIcon sx={{fontSize : 'large'}} onClick={() => setPasswordVisibility(true)} className={'cursor-pointer'}/>}
                                        </InputAdornment>
                                        }
                                />
                            </FormControl>

                            <Button variant="contained" color="secondary2" className='max-2xl:!mt-5'>
                                Sign In
                            </Button>
                            <div className={'w-full text-center'}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>Don't have an account ? <Link to={'/auth/register'} className={'font-bold'}>Sign Up</Link></p>
                                <p>Forgot password ? <Link to={'/auth/forgot-password'} className={'font-bold'}>Reset</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;