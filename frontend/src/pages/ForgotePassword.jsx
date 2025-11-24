import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import axios from 'axios';
import { useSnackbar } from '../Context/SnackbarContext';
import FallbackLoader from '../components/FallbackLoader';
import { useUserDataContext } from '../Context/Userdata';
const ForgotePassword = React.memo(({ setForgotePassword }) => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { setSnackbar } = useSnackbar();
  const { profileDetails } = useUserDataContext();

  const handleForgotPassword = async (e) => {
    const host = import.meta.env.VITE_HOST;

    e.preventDefault();
    if (!email) {
      setSnackbar({ open: true, message: 'Please enter your email!', type: 'warning' })
      return;
    }
    if (profileDetails?.data?.email) {
      if (profileDetails?.data?.email !== email) return setSnackbar({ open: true, message: 'You enter incorrect email!', type: 'warning' })
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${host}/user/forgot-password`, {
        email: email,
      });

      if (response.data.status) {
        setSnackbar({ open: true, message: 'Password reset link sent!', type: 'success' })
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
    <div style={{ zIndex: 100 }} className=" forgatepassword    fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">


      <div className="container flex items-center justify-center relative h-full   ">
        <div className="verify-email-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-20 sm:p-30">
          <form onSubmit={handleForgotPassword}>

            <div className=" sticky">
              <button
                onClick={() => setForgotePassword(false)}
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

              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
            </div>

            <div className="mb-10">
              <button disabled={loading} type="submit" className={` ${loading ? 'opacity-50' : ''} button active w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Verify</button>
            </div>




          </form>
        </div>

      </div>
      {loading && (<FallbackLoader fixed={true} />)}

    </div>
  )
})

export default ForgotePassword
