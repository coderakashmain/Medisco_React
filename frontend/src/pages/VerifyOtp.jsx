import React, { useEffect, useState } from 'react'

import logo from '../assets/img/logo.png'
import axios from 'axios';
import { useUserDataContext } from '../Context/Userdata';
import { useSnackbar } from '../Context/SnackbarContext';

const VerifyOtp = ({ setVerifypopup }) => {
    const [loading, setLoading] = useState(false);
    const [OTPValue, setOTPValue] = useState('');
    const [OTPError, setOTPError] = useState('');
    const [message, setMessage] = useState('');
    const { setSnackbar } = useSnackbar();
    const host = import.meta.env.VITE_HOST;
    const email = sessionStorage.getItem('email');



    const hanldeOtpvelidation = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            throw new Error("userId not found");
        }



        if (!OTPValue
        ) {
            console.warn("Please Enter OTP")
            setOTPError("Please fill the all Boxes");
            return;
        }
        setMessage('');
        setOTPError('');
        setLoading(true);

        try {
            const response = await axios.post(`${host}/user/verify-email`, { user_id: userId, otp: OTPValue });

            

            localStorage.setItem('userdata', JSON.stringify(response.data));
            setSnackbar({ open: true, message: 'OTP Verified.', type: 'success' })
            setMessage('Otp Verified.')
            window.location.href = "/dashboard";
            setOTPError('');
            setVerifypopup(false);
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('userId');





        } catch (error) {
            setMessage('');
            setOTPError(error.response?.data?.error?.message || "Something went wrong");
            console.error("Registration  failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div style={{zIndex : 1003}} className=" verify-email-popup    fixed top-0 left-0 inset-0 bg-[#646464ad] cursor-default  w-screen h-screen z-1002 ">


            <div className="container flex items-center justify-center relative h-full   ">
                <div className="verify-email-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                    <form onSubmit={hanldeOtpvelidation}>

                        <div className=" sticky">
                            <button
                                onClick={() => setVerifypopup(false)}
                                className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                            <div className="text-center mb-40">
                                <a href="" className="mb-5 inline-block">
                                    <img src={logo} alt="logo" className="max-w-[160px]" />
                                </a>
                                <h3 className="text-2xl font-semibold text-secondary">Verify Your Email</h3>
                                <p className="text-base text-body-color text-gary text-sm">OTP send to your email id {email}. Please check you email  and verify the OTP.</p>
                                {OTPError && (<p className='text-xs text-[#FC4F4F] pt-10'>{OTPError}</p>)}
                                {message && (<p className='text-xs text-primary pt-10'>{message}</p>)}
                            </div>
                        </div>

                        <div className="mb-6 flex  bg-[#F4F4FF] gap-10 border border-lightgary align-center justify-center rounded p-10 mb-20">

                            <input onChange={(e) => setOTPValue(e.target.value)} value={OTPValue} type="number" name="otp" id="otp" placeholder="OTP" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
                        </div>
                        {/* <div className="flex  justify-between items-center mb-20">
                            <div className="form-check flex align-center text-sm justify-center gap-10">

                                Don't Recieve OTP ? Resend OTP in<span>60s</span>
                            </div>
                            <p className="text-sm text-primary hover:underline cursor-pointer font-semibold">
                                Resend OTP
                            </p>
                        </div> */}
                        <div className="mb-10">
                            <button disabled={loading} type="submit" className={`${loading ? "opacity-50" : ""} button active w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Verify</button>
                        </div>



                    </form>
                </div>

            </div>

        </div>
    )
}

export default VerifyOtp
