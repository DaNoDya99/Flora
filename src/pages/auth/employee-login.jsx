import LogoNameImage from "../../assets/images/logo-site-name.png";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux"
import {login} from "../../store/slices/employee_auth_slice.js";

function EmployeeLogin() {
    const dispatch = useDispatch()
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email : '',
        password : ''
    })

    const handleChange = (e) => {
        setLoginForm({...loginForm,
            [e.target.name]: e.target.value})
    }

    const handleEmployeeLogin = (e) => {
        e.preventDefault()
        dispatch(login(loginForm))
    }

    return (
        <div>
            <div className={'flex flex-col items-center h-screen justify-center nunito-sans-light max-2xl:h-[88vh]'}>
                <div className={'w-[35em] flex flex-col items-center'}>
                    <img src={LogoNameImage}
                         alt="logo"
                         className="w-48 h-48 rounded-full shadow-lg max-2xl:w-24 max-2xl:h-24"
                    />
                    <div>
                        <h1 className={'text-4xl font-semibold text-center mt-5 max-2xl:text-3xl'}>Employee Login - Flower Hub</h1>
                        <form action="" className={'flex flex-col mt-10 space-y-10 max-2xl:mt-5 max-2xl:space-y-5'} onSubmit={handleEmployeeLogin}>
                            <FormControl>
                                <InputLabel htmlFor={'email'} required>Email</InputLabel>
                                <Input id={'email'} required name={'email'} value={loginForm.email} onChange={handleChange}/>
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
                                value={loginForm.password} onChange={handleChange}/>
                            </FormControl>

                            <Button variant="contained" color="secondary2" className='max-2xl:!mt-5 !font-semibold' type={'submit'}>
                                Sign In
                            </Button>
                            <div className={'w-full text-center'}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>Forgot password ? <Link to={'/auth/forgot-password'} className={'font-bold'}>Reset</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;