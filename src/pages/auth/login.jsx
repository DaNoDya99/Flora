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
import {useDispatch} from "react-redux";
import {login2} from "../../store/slices/customer_slice.js";
import { useSelector } from 'react-redux';

function Login() {

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();
    const errors = useSelector(state => state.customer.data.errors);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login2(formData));
    }

    return (
        <>
            <div className={'flex flex-col items-center h-screen justify-center nunito-sans-light max-2xl:h-[88vh]'}>
                <div className={'w-[35em] flex flex-col items-center'}>
                    <img src={LogoNameImage}
                         alt="logo"
                         className="w-48 h-48 rounded-full shadow-lg max-2xl:w-24 max-2xl:h-24"
                    />
                    <div>
                        <h1 className={'text-4xl font-semibold text-center mt-5 max-2xl:text-3xl'}>Sign In to Flower Hub</h1>
                        {
                            errors.message ? <div className={'text-red-500 text-center p-2 my-3 border-2 border-red-500 rounded-md'}>Incorrect Credentials</div> : null
                        }
                        <form action="" className={'flex flex-col mt-10 space-y-10 max-2xl:mt-5 max-2xl:space-y-5'} onSubmit={handleSubmit}>
                            <FormControl>
                                <InputLabel htmlFor={'email'} required>Email</InputLabel>
                                <Input id={'email'} required name={'email'} value={formData.email} onChange={handleChange}/>
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
                                    value={formData.password} onChange={handleChange}
                                />
                            </FormControl>

                            <Button variant="contained" color="secondary2" className='max-2xl:!mt-5' type={'submit'}>
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