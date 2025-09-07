import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import logo from '../assets/img/logo.png'
import axios from 'axios';
import { useSnackbar } from '../Context/SnackbarContext';
import FallbackLoader from '../components/FallbackLoader';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [laoding, setLoading] = useState(false);
    const [password, setPasswrod] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [passwordShow, setPasswordShow] = useState(false);
    const { setSnackbar } = useSnackbar();

    if (!token) {
        return <p className='pt-80 text-center font-bold text-xl'>Token not found.</p>;
    }

    const handlesubmit = async (e) => {
        const host = import.meta.env.VITE_HOST;
        e.preventDefault();

        if (!password || !confirmPassword) {
            setSnackbar({ open: true, message: 'Please Enter  password', type: 'warning' })
            setError('Please Enter a new password');
            return
        }
        if(password !==confirmPassword){
             setSnackbar({ open: true, message: 'Mismatch in Password.', type: 'warning' })
            setError('Mismatch in Password.');
            return
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {

            const response = await axios.post(`${host}/user/reset-password`, { token ,new_password : confirmPassword})
            setSnackbar({ open: true, message: 'Password reset successfully', type: 'success' })
            setMessage("Password reset successfully");
            window.location.href = '/dashboard';
        }
        catch (error) {
            setMessage('');
            setSnackbar({ open: true, message: error.response?.data?.error?.message || error.response?.data?.error?.password || "Something went wrong", type: 'error' })
            setError(error.response?.data?.error?.message || error.response?.data?.error?.password || "Something went wrong");
            console.error("Registration  failed:", error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section style={{ height: '100vh', background: '#F4F4FF' }} id='reset-password  w-full '>

            <div className="container flex items-center justify-center relative h-full   ">
                <div className="reset-password-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                    <form onSubmit={handlesubmit}>

                        <div className=" sticky">

                            <div className="text-center mb-40">
                                <a href="" className="mb-5 inline-block">
                                    <img src={logo} alt="logo" className="max-w-[160px]" />
                                </a>
                                <h3 className="text-2xl font-semibold text-secondary">Reset your Password.</h3>
                                <p className="text-base text-body-color text-gary text-sm">Enter your password here.</p>
                                <p style={{ fontSize: '10px', marginTop: '2px' }} className='text-xs text-gary mb-30'> *Password atleast six charecters must include uppercase, lowercase, number & special character.</p>
                                {error && (<p className='text-xs text-[#FC4F4F]'>{setError}</p>)}
                                {message && (<p className='text-xs text-primary'>{message}</p>)}
                            </div>
                        </div>

                        <div className="mb-6 flex   bg-[#F4F4FF] gap-10 border border-lightgary items-center  rounded p-10 mb-20">

                            <input onChange={(e) => setPasswrod(e.target.value)} value={password} type={passwordShow ? 'text' : 'password'} name="password" id="password" placeholder="New password" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
                            <i onClick={() => setPasswordShow(!passwordShow)} className={`fa-solid ${passwordShow ? "fa-eye-slash" : 'fa-eye'}  text-gary  cursor-pointer`}></i>

                        </div>
                        <div className="mb-6 flex   bg-[#F4F4FF] gap-10 border border-lightgary items-center  rounded p-10 mb-20">

                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type= 'password'  name="password" id="password" placeholder="Re-enter your password" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
                          

                        </div>


                        <div className="mb-10">
                            <button disabled={laoding} type="submit" className={`${laoding ? "opacity-50" : ""} button active w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Change</button>
                        </div>



                    </form>
                </div>

            </div>

            {laoding && (
                <FallbackLoader fixed={true} />
            )}



        </section>
    )
}

export default ResetPassword
