import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import { useUserDataContext } from '../Context/Userdata';
import axios from 'axios';
import FallbackLoader from '../components/FallbackLoader';
import { useNavigate } from 'react-router-dom';

const Login = React.memo(({ setLoginP, setForgotePassword, setSignIn }) => {
    const [message, setMessage] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userdata, setUserdata } = useUserDataContext();
    const host = import.meta.env.VITE_HOST;
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        remember: false
    });

    //Fetch email and password from localstorage

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem("password");
        if (email || password) {
            setLoginData({
                ...loginData,
                email: email,
                password: password,
                remember: true

            })
        }


    }, [])



    const loginUser = async (e) => {
        e.preventDefault();



        if (!loginData.email) {
            setLoginError("Please fill the all Boxes");
            console.warn("Please Enter Email Id.")
            return;
        }
        if (!loginData.password) {
            setLoginError("Please fill the all Boxes");
            console.warn("Please Enter Password.")
            return;
        }

        setMessage('');
        setLoading(true)

        setLoginError('');

        try {
            const response = await axios.post(
               ` ${host}/user/login`,
                {
                    email: loginData.email,
                    password: loginData.password
                }
            );
            const userData = response.data;
            setUserdata(JSON.stringify(userData))
            setMessage("Login Successfully")
            if (loginData.remember) {
                localStorage.setItem('email', loginData.email)
                localStorage.setItem('password', loginData.password)
            }
            localStorage.setItem('userdata', JSON.stringify(userData));

            setLoginP(false)
            navigate('/dashboard')
            setLoginData({
                ...loginData,
                email: '',
                password: ''
            })
            setMessage('');

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            setLoginError(error.response?.data?.error?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };



    return (
        <>
            {loading && (<FallbackLoader fixed={true} size='100vh' />)}
            <div className=" login-popup   fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">


                <div className="container flex items-center justify-center relative h-full   ">
                    <div className="login-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                        <form onSubmit={loginUser}>

                            <div className=" sticky">
                                <button onClick={() => { setLoginP(false) }} className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                                <div className="text-center mb-40">
                                    <a href="index.html" className="mb-5 inline-block">
                                        <img src={logo} alt="logo" className="max-w-[160px]" />
                                    </a>
                                    <h3 className="text-2xl font-semibold text-secondary">Welcome Back!</h3>
                                    <p className="text-base text-body-color text-gary text-sm">Log in to your account</p>
                                    {loginError && (<p className='text-xs text-[#FC4F4F]'>{loginError}</p>)}
                                    {message && (<p className='text-xs text-primary'>{message}</p>)}
                                </div>
                            </div>

                            <div style={{ alignItems: 'center' }} className="mb-6 flex bg-[#F4F4FF] gap-10 border border-lightgary align-center justify-center rounded p-10 mb-20">

                                <span className="flex align-center justify-between text-gary"> <i className="fa-solid fa-user flex align-center justify-between "></i></span>
                                <input type="email" autoComplete='email' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} name="userid" id="userid" placeholder="User Id" className="w-full  outline-none focus:border-primary focus-visible:shadow-none" />
                            </div>
                            <div style={{ alignItems: 'center' }} className="mb-6 flex   bg-[#F4F4FF] gap-10 border border-lightgary   rounded p-10 mb-20">


                                <i className="fa-solid fa-lock text-gary  "></i>


                                <input type={passwordShow ? 'text' : 'password'} autoComplete='current-password' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} name="password" id="password" placeholder="Enter password" className="login-password w-full outline-none focus:border-primary focus-visible:shadow-none" />

                                <i onClick={() => setPasswordShow(!passwordShow)} className={`fa-solid ${passwordShow ? "fa-eye-slash" : 'fa-eye'}  text-gary  cursor-pointer`}></i>

                            </div>
                            <div className="flex  justify-between items-center mb-20">
                                <div className="form-check flex align-center justify-center gap-10">
                                    <input type="checkbox" checked={loginData.remember} onChange={(e) =>
                                        setLoginData({ ...loginData, remember: e.target.checked })
                                    } name="remember" id="remember" className="h-4 w-4 rounded border border-[#E9EDF4] bg-white checked:bg-primary checked:border-primary focus:ring-0" />
                                    <label htmlFor="remember" className="text-sm text-body-color ">Remember me</label>
                                </div>
                                <button onClick={() => {
                                    setForgotePassword(true)
                                    setLoginP(false);
                                }} className="text-sm text-primary hover:underline font-semibold cursor-pointer">
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="mb-10">
                                <button type="submit" disabled={loading} className={`button ${loading ? 'opacity-50' : ''} button w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Log In</button>
                            </div>
                            <div className="flex  items-center gap-10  mt-10">

                                <p className="text-center text-sm text-body-color">Don't have an account? </p>
                                <p className=" switch-register cursor-pointer text-center font-semibold text-sm text-primary hover:underline block"
                                    onClick={() => {
                                        setSignIn(true);
                                        setLoginP(false);
                                    }}
                                >Sign Up</p>
                            </div>



                        </form>
                    </div>

                </div>

            </div>
        </>
    )
})

export default Login
