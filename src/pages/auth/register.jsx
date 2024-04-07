import LogoNameImage from '../../assets/images/logo-site-name.png';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {register} from "../../store/slices/customer_slice.js";
import {toast, Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const dispatch = useDispatch();
    const errors = useSelector(state => state.customer.data.errors.register);
    const message = useSelector(state => state.customer.data.message.register);

    const notify = () => toast.success(message, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    useEffect(() => {
        if (message) {
            notify();
        }
    })

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.isActivated = false;
        dispatch(register(formData));
    }

    return (
        <>
            <div className={'flex flex-col items-center h-screen justify-center nunito-sans-light max-2xl:my-5'}>
                <div className={'w-[35em] flex flex-col items-center'}>
                    <img src={LogoNameImage}
                         alt="logo"
                         className="w-48 h-48 rounded-full shadow-lg max-2xl:w-24 max-2xl:h-24"
                    />
                    <div>
                        <h1 className={'text-4xl font-semibold text-center mt-5 max-2xl:text-3xl'}>Sign Up to Flower Hub</h1>
                        {
                            errors.message ? <div className={'text-red-500 text-center p-2 my-3 border-2 border-red-500 rounded-md'}>{errors.message}</div> : null
                        }
                        <ToastContainer/>
                        <form action="" className={'flex flex-col mt-10 space-y-8 max-2xl:mt-5 max-2xl:space-y-5'} onSubmit={handleSubmit}>
                            <div className={'flex gap-2'}>
                                <FormControl>
                                    <InputLabel htmlFor="firstName">First name</InputLabel>
                                    <Input id="firstName" name={'firstName'} value={formData.firstName} onChange={handleChange}/>
                                </FormControl>

                                <FormControl>
                                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                                    <Input id="lastName" name={'lastName'} value={formData.lastName} onChange={handleChange}/>
                                </FormControl>
                            </div>

                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name={'email'}  value={formData.email} onChange={handleChange}/>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name={'password'} value={formData.password} onChange={handleChange}/>
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <Input id="confirmPassword" name={'confirmPassword'} value={formData.confirmPassword} onChange={handleChange}/>
                            </FormControl>

                            <Button variant="contained" color="secondary2" type={'submit'}>
                                Sign Up
                            </Button>
                            <div className={'w-full text-center'}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>Already have an account ? <Link to={'/auth/login'} className={'font-bold'}>Sign In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;