import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import logo from '../assets/img/logo.png'

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [message,setMessage] = useState('');
    const [error,setError]=useState('');
    const [laoding,setLoading] = useState(false);
    const [password,setPasswrod] = useState('');

    if (!token) {
        return <p className='pt-80 text-center font-bold text-xl'>Token not found.</p>;
    }


    return (
        <section id='reset-password bg-secondary h-screen w-full'>
         


                    <div className="container flex items-center justify-center relative h-full   ">
                        <div className="reset-password-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                            <form onSubmit={hanldeOtpvelidation}>

                                <div className=" sticky">
                                    <button
                                       
                                        className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                                    <div className="text-center mb-40">
                                        <a href="" className="mb-5 inline-block">
                                            <img src={logo} alt="logo" className="max-w-[160px]" />
                                        </a>
                                        <h3 className="text-2xl font-semibold text-secondary">Reset your Password.</h3>
                                        <p className="text-base text-body-color text-gary text-sm">Enter your password here.</p>
                                        {OTPError && (<p className='text-xs text-[#FC4F4F]'>{OTPError}</p>)}
                                        {message && (<p className='text-xs text-primary'>{message}</p>)}
                                    </div>
                                </div>

                                <div className="mb-6 flex  bg-[#F4F4FF] gap-10 border border-lightgary align-center justify-center rounded p-10 mb-20">

                                    <input onChange={(e) => setPasswrod(e.target.value)} value={password} type="number" name="otp" id="otp" placeholder="OTP" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
                                </div>
                                <div className="flex  justify-between items-center mb-20">
                                    <div className="form-check flex align-center text-sm justify-center gap-10">

                                        Don't Recieve OTP ? Resend OTP in<span>60s</span>
                                    </div>
                                    <p className="text-sm text-primary hover:underline cursor-pointer font-semibold">
                                        Resend OTP
                                    </p>
                                </div>
                                <div className="mb-10">
                                    <button disabled={loading} type="submit" className={`${loading ? "opacity-50" : ""} button active w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Verify</button>
                                </div>



                            </form>
                        </div>

                    </div>

                

        </section>
    )
}

export default ResetPassword
