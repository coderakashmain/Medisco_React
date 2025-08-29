import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import axios from 'axios';
const ForgotePassword = React.memo(({setForgotePassword}) => {

    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/user/forgot-password", {
        email: email,
      });

      if (response.data.status) {
        setMessage(response.data.message || "Password reset link sent!");
      } else {
        setError(response.data.error?.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" forgatepassword    fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">
    
    
                      <div className="container flex items-center justify-center relative h-full   ">
                        <div className="verify-email-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                          <form onSubmit={handleForgotPassword}>
    
                            <div className=" sticky">
                              <button
                              onClick={()=>setForgotePassword(false)}
                              className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                              <div className="text-center mb-40">
                                <a href="" className="mb-5 inline-block">
                                  <img src={logo} alt="logo" className="max-w-[160px]" />
                                </a>
                                <h3 className="text-2xl font-semibold text-secondary">Forgote Password ?</h3>
                                <p className="text-base text-body-color text-gary text-sm">Please Enter your registered Email And then clike to Continue.</p>
                                {error && <p className='text-xs text-[#FC4F4F]'>{error}</p>}
                                {message && <p className='text-xs text-primary'>{message}</p>}
                              </div>
                            </div>
    
                            <div className="mb-6 flex  bg-[#F4F4FF] gap-10 border border-lightgary align-center justify-center rounded p-10 mb-20">
                              {/* <!-- <label for="password" className="block text-sm font-medium text-dark mb-2">Password</label> -->
                             <!-- <span className="flex align-center justify-between  text-gary ">
                                 <i className="fa-solid fa-lock"></i>
    
                             </span> --> */}
                              <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
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
                              <button disabled={loading} type="submit" className={` ${loading? 'opacity-50' : ''} button active w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Verify</button>
                            </div>
                            {/* <!-- <div className="flex  items-center gap-10  mt-10">
    
                          <p className="text-center text-sm text-body-color">Don't have an account? </p>
                          <p  className=" switch-register cursor-pointer text-center font-semibold text-sm text-primary hover:underline block">Sign Up</p>
                        </div> --> */}
    
    
    
                          </form>
                        </div>
    
                      </div>
    
                    </div>
  )
})

export default ForgotePassword
