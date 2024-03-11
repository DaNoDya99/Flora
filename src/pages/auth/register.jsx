import LogoNameImage from '../../assets/images/logo-site-name.png';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
function Register() {


    return (
        <>
            <div className={'flex flex-col items-center h-[90vh] justify-center nunito-sans-light max-2xl:my-5'}>
                <div className={'w-[35em] flex flex-col items-center'}>
                    <img src={LogoNameImage}
                         alt="logo"
                         className="w-48 h-48 rounded-full shadow-lg max-2xl:w-24 max-2xl:h-24"
                    />
                    <div>
                        <h1 className={'text-4xl font-semibold text-center mt-5 max-2xl:text-3xl'}>Sign Up to Flower Hub</h1>
                        <form action="" className={'flex flex-col mt-10 space-y-8 max-2xl:mt-5 max-2xl:space-y-5'}>
                            <div className={'flex gap-2'}>
                                <FormControl>
                                    <InputLabel htmlFor="firstName">First name</InputLabel>
                                    <Input id="firstName" name={'firstName'} />
                                </FormControl>

                                <FormControl>
                                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                                    <Input id="lastName" name={'lastName'} />
                                </FormControl>
                            </div>

                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name={'email'} />
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name={'password'} />
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <Input id="confirmPassword" name={'confirmPassword'} />
                            </FormControl>

                            <Button variant="contained" color="secondary2" >
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