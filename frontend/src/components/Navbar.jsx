import React, { useEffect, useState, useRef, Suspense, lazy } from 'react'
import logo from '../assets/img/logo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useServiceListContex } from '../Context/Services'
import { useStatesContext } from '../Context/States'
import { useDistrictsContext } from '../Context/Districts'
import ForgotePassword from '../pages/ForgotePassword'
import { useUserDataContext } from '../Context/Userdata'
import Avatar from './Avatar'
import profilelog from '../assets/img/text-profile.png'
import Loading from './Loading'
import FallbackLoader from './FallbackLoader'
import { HashLink } from 'react-router-hash-link';
const Login = lazy(() => import("../pages/Login"));
import { useLocationContext } from '../Context/LocationProvider ';




const Navbar = () => {
  const { services } = useServiceListContex();
  const { statesList } = useStatesContext();
  const { userLocation } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { userdata, setUserdata ,profileDetails} = useUserDataContext();
  const { districtsList, setState, state } = useDistrictsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logingP, setLoginP] = useState(false);
  const [signInP, setSignIn] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [forgotePassword, setForgotePassword] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [OTPValue, setOTPValue] = useState(null);
  const [OTPError, setOTPError] = useState('');
  const [userId, setuserId] = useState(null);
  const [message, setMessage] = useState('');
  const [ProfileDropdown, setProfileDropdown] = useState(false);
  const host = import.meta.env.VITE_HOST;







  const [userdetails, setUserdetails] = useState({
    service_type: '',
    organization_name: '',
    contact_person: '',
    contact_email: '',
    contact_mobileno: null,
    password: "",
    state: '',
    city: '',
    address: '',
    pincode: null,
    longitude: `${userLocation?.lng}` || '23.23432',
    latitude: `${userLocation?.lat}` || '43.2345'

  })




  //User registration

  const hanldeRegistration = async (e) => {
    e.preventDefault();


    if (!userdetails.service_type || !userdetails.organization_name || !userdetails.contact_person || !userdetails.contact_email || !userdetails.contact_mobileno || !userdetails.password || !userdetails.state || !userdetails.city || !userdetails.address || !userdetails.pincode
    ) {
      console.warn("Please Enter all the fileds.")
      setError("Please fill the all Boxes");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${host}/user/register`, userdetails);
      const userdata = response.data;
      setuserId(response.data.data.user_id);
      setUserdata(JSON.stringify(userdata))
      setOtpVerify(true);
    } catch (error) {
      setError(error.response?.data?.error?.message || "Something went wrong");
      console.error("Registration  failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }

  }


  //Verify Otp





  const hanldeOtpvelidation = async (e) => {
    e.preventDefault();



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
      sessionStorage.setItem('userdata', response.data);
      setMessage('Otp Verified.')
      setOTPError('');
      setUserdata(response.data);
      setOtpVerify(false);
      setSignIn(false)
    
     window.location.href = "/dashboard";
      



    } catch (error) {
      setMessage('');
      setOTPError(error.response?.data?.error?.message || "Something went wrong");
      console.error("Registration  failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }

  }







  //data change event

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserdetails({
      ...userdetails,

      [name]: value
    }
    )
  };

  //Dropdown event

  useEffect(() => {
    const handleEvent = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false)
      }

    }

    document.addEventListener('mousedown', handleEvent);

    return () => document.removeEventListener('mousedown', handleEvent);

  }, [])

  //Logout 
  const handleLogout = (() => {
    window.location.href = "/";
    localStorage.removeItem('userdata');
    setUserdata(null);
  })

  return (
    <header
      className="z-99 sticky-header main-bar-wraper navbar-expand-lg duretion-500"
    >
      {loading && (<FallbackLoader fixed={true} size='100vh' />)}
      <div className="main-bar">
        <div className="container">
          <div className="bottom-bar">
            <div className="two-bar">
              <div className="flex items-center justify-between">
                <div className="logo">
                  <a href="/">
                    <img alt="logo" src={logo} />

                  </a>
                </div>
              </div>
            </div>

            <nav className="navbar lg:block hidden">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <HashLink smooth to='/'>Home</HashLink>
                </li>
                <li className="navbar-dropdown">
                  <HashLink smooth to="/#about">About</HashLink>
                </li>
                <li className="navbar-dropdown">
                  <HashLink smooth to="/#section-pricing">Plans</HashLink>
                </li>

                <li className="navbar-dropdown service-dropdown-out-box dropdown-out-box  relative ">
                  <HashLink smooth to="/#services">Services</HashLink>
                  <div className="service-dropdown-box dropdown-box  absolute top-[100%] left-[-100%] w-[30vw]    bg-white font-normal  z-99 mt-5 flex flex-col  shadow">
                    <ul>
                    </ul>
                  </div>
                </li>

                <li className="navbar-dropdown">
                  <HashLink smooth to="/#contact">contact</HashLink>
                </li>
              </ul>
            </nav>

            <div className="flex gap-15 align-center">
              <div className="header-menu-right h-full flex items-center gap-15 cursor-pointer">
                {userdata ? (<div className='font-semibold relative' onClick={() => setProfileDropdown(!ProfileDropdown)} >
                  <Avatar username={profileDetails?.data?.hospital_name} profile_pic={profileDetails?.data?.hospital_logo} size={35} />
                  <div className={`${ProfileDropdown ? 'dropdown-active' : ''} absolute top-[100%] right-0  opacity-0   bg-white font-normal  z-99 mt-5  flex flex-col  shadow`}>
                    <ul>
                      <li onClick={() => {
                        setProfileDropdown(false)
                        navigate('/dashboard')
                      }} className='font-normal text-sm text-black  hover:bg-primary hover:text-white px-12 py-10 text-nowrap'>Dashborad</li>
                      <li onClick={handleLogout} className='font-normal text-sm text-black  hover:bg-primary hover:text-white px-12 py-10 text-nowrap'>Log Out</li>
                    </ul>
                  </div>
                </div>) :

                  (
                    <div

                      className="header-auth dropdown-out-box  gap-10 items-center text-secondary font-semibold cursor-pointer relative block m-auto text-nowrap">

                      <span
                        ref={dropdownRef}
                        onClick={() => {
                          setDropdownOpen(!dropDownOpen)
                        }}
                        className="hover:text-primary text-xs">Join as Service Provider</span>
                      <div className={`${dropDownOpen ? 'dropdown-active' : ''} header-auth-dropdown dropdown-box absolute top-[100%] right-0     bg-white font-normal  z-99 mt-5  flex flex-col  shadow`}>
                        <ul>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setSignIn(!signInP)
                              setDropdownOpen(false)
                            }}
                            className="register-btn font-normal text-sm text-black  hover:bg-primary hover:text-white px-12 py-10 text-nowrap"><i className="fa-solid fa-user-plus w-25 "></i> Register</li>



                          <li

                            onClick={(e) => {
                              e.stopPropagation();
                              setLoginP(!logingP)
                              setDropdownOpen(false)
                            }}
                            className="login-btn font-normal text-sm text-black px-10 hover:bg-primary hover:text-white px-12 py-10 text-nowrap"><i className="fa-solid fa-user w-25 "></i> Log In</li>

                        </ul>


                      </div>
                    </div>
                  )
                }


                {/* <!-- Login popUp --> */}

                {logingP && (<Suspense fallback={<Loading size="10px" />}><Login setLoginP={setLoginP} setForgotePassword={setForgotePassword} setSignIn={setSignIn} /></Suspense>)}

                {/* <!-- Registration popUp --> */}

                {signInP && !otpVerify && (
                  
                  <div className=" register-popup   fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">

                  <div className="container flex items-center justify-center relative h-full   ">
                    <div className="register-box relative  md:w-[60%] lg:w-1/2 w-full max-h-[90vh] scroll  bg-white shadow rounded-[10px]  px-30 pb-30">
                      <form onSubmit={hanldeRegistration}>
                        <div className="sticky pt-30 pb-10 top-0 left-0 bg-white">

                          <button
                            onClick={() => setSignIn(false)}
                            className='close-btn  registration-close'><i className="fa-solid fa-xmark"></i></button>
                          <div className="text-center mb-40">
                            <a href="#" className="mb-5 inline-block">
                              <img src={logo} alt="logo" className="max-w-[160px]" />
                            </a>
                            <h3 className="text-2xl font-semibold text-secondary">Lets' Connect with Us.</h3>

                            <p className="text-base text-body-color text-gary text-sm">Register Here </p>
                            {error && (<p className='text-xs text-[#FC4F4F] pt-10'>{error}</p>)}
                          </div>
                        </div>

                        <p className=" text-sm mb-10">Select Service Type *</p>
                        <select

                          name="service_type" id="service-list"
                          onChange={handleChange}
                          value={userdetails.service_type}
                          className="w-full text-sm bg-[#F4F4FF] outline-none px-10 py-10 border border-lightgary rounded mb-20">

                          <option value="" disabled selected>-- Select a Service --</option>
                          {services.status && services.data.map((service, index) => (
                            <option key={index} value={service.service_id}>
                              {service.service_name}
                            </option>
                          ))}

                        </select>

                        <p className=" text-sm mb-10">Name of the Organization *</p>
                        <input
                          name='organization_name'
                          onChange={handleChange}
                          value={userdetails.organization_name}
                          type="text" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none" placeholder="" />


                        <p className=" text-sm mb-10">Contact Person Name *</p>
                        <input
                          name='contact_person'
                          value={userdetails.contact_person}
                          onChange={handleChange}
                          type="text" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none" placeholder="" />




                        <p className=" text-sm mb-10">Email *</p>
                        <input
                          name='contact_email'
                          value={userdetails.contact_email}
                          onChange={handleChange}
                          type="email" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none" placeholder="" />

                        <p className=" text-sm mb-10">Mobile No *</p>
                        <input
                          name='contact_mobileno'
                          value={userdetails.contact_mobileno}
                          onChange={handleChange}
                          type="number" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none" placeholder="" />

                        <p className=" text-sm mb-10">State *</p>
                        <select
                          value={userdetails.state}
                          onChange={(e) => {
                            handleChange(e);
                            setState(e.target.value);
                          }}
                          className='w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none'
                          defaultValue=""
                          name="state" id="state">
                          <option value="">-- Select State --</option>
                          {statesList.status && statesList.data.map((state, index) => (
                            <option value={state} key={index}>{state}</option>

                          ))}
                        </select>

                        <p className=" text-sm mb-10">City *</p>
                        <select
                          value={userdetails.city}
                          onChange={handleChange}
                          className='w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none'
                          defaultValue=""
                          name="city" id="city">
                          <option value="">-- Select City --</option>
                          {districtsList?.status && districtsList.data.map((dist, index) => (
                            <option value={dist} key={index}>{dist}</option>

                          ))}
                        </select>


                        <p className=" text-sm mb-10">Address *</p>
                        <input
                          name='address'
                          value={userdetails.address}
                          onChange={handleChange}
                          type="text" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none" placeholder="" />

                        <p className=" text-sm mb-10">Pincode *</p>
                        <input
                          name='pincode'
                          value={userdetails.pincode}
                          onChange={handleChange}
                          type="number" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-30 outline-none" placeholder="" />



                        <p className=" text-sm mb-10">Password *</p>
                        <input
                          name='password'
                          value={userdetails.password}
                          onChange={handleChange}
                          type="password" className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-30 outline-none" placeholder="" />




                        <div className="mb-10">
                          <button type="submit"
                            disabled={loading}
                            className={` ${loading ? 'opacity-50' : ''} button w-full bg-primary text-white py-7  px-5 rounded hover:bg-opacity-90 transition cursor-pointer`}>Continue</button>
                        </div>
                        <div className="flex  items-center gap-10  mt-10">
                          <p className="text-center text-sm text-body-color">Already have an account? </p>
                          <p className="switch-login text-center font-semibold text-primary text-sm text-primary hover:underline cursor-pointer block"
                            onClick={() => {
                              setLoginP(true);
                              setSignIn(false);
                            }}
                          >Log In</p>
                        </div>




                      </form>
                    </div>

                  </div>

                </div>
              )}


                {/* <!-- Verify email popUp --> */}

                {otpVerify && (<div className=" verify-email-popup    fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">


                  <div className="container flex items-center justify-center relative h-full   ">
                    <div className="verify-email-box relative md:w-[60%] lg:w-1/2 w-full  bg-white shadow rounded-[10px]  p-30">
                      <form onSubmit={hanldeOtpvelidation}>

                        <div className=" sticky">
                          <button
                            onClick={() => setOtpVerify(false)}
                            className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                          <div className="text-center mb-40">
                            <a href="#" className="mb-5 inline-block">
                              <img src={logo} alt="logo" className="max-w-[160px]" />
                            </a>
                            <h3 className="text-2xl font-semibold text-secondary">Verify Your Email</h3>
                            <p className="text-base text-body-color text-gary text-sm">OTP send to your email id {userdetails?.contact_email}. Please check you email  and verify the OTP.</p>
                            {OTPError && (<p className='text-xs text-[#FC4F4F] pt-10'>{OTPError}</p>)}
                            {message && (<p className='text-xs text-primary pt-10'>{message}</p>)}
                          </div>
                        </div>

                        <div className="mb-6 flex  bg-[#F4F4FF] gap-10 border border-lightgary align-center justify-center rounded p-10 mb-20">

                          <input onChange={(e) => setOTPValue(e.target.value)} value={OTPValue} type="number" name="otp" id="otp" placeholder="OTP" className="w-full outline-none focus:border-primary focus-visible:shadow-none" />
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

                </div>)}

                {/* Forgate password section  */}
                {forgotePassword && (
                  <ForgotePassword setForgotePassword={setForgotePassword} />
                )}


                <div className="header-search-button search-box-outer  ">

                  <a href="javascript:void(0)" className="search-btn">
                    <i>
                      <svg
                        fill="#000000"
                        width="30px"
                        height="30px"
                        viewBox="0 -0.24 28.423 28.423"
                        data-name="02 - Search Button"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="Path_215"
                          data-name="Path 215"
                          d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z"
                          transform="translate(-2.31 -2.547)"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_216"
                          data-name="Path 216"
                          d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z"
                          transform="translate(-2.31 -2.547)"
                          fillRule="evenodd"
                        />
                      </svg>
                    </i>
                  </a>
                </div>
                {/* <!-- <a href="appointment.html" className="btn xl:block hidden"
                ><span
                  >Book Appointment<i className="fa-solid fa-arrow-right"></i></span
              ></a> --> */}
              </div>
              <a href="javascript:void(0)" id="mobile-menu" className="menu-start">
                <i className="fa-solid fa-bars m-0"></i>

              </a>

            </div>
          </div>
          <div className="mobile-nav" id="mobile-nav">
            <div className="res-log mb-30">
              <a href="index-2.html">
                <img alt="logo" src={logo} className="w-auto" />
              </a>
            </div>
            <ul>
              <li>
                <a to="">Home</a>
              </li>
              <li>
                <NavLink to="#about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="#services">Services</NavLink>
              </li>
              <li>
                <NavLink to="#">Contact</NavLink>
              </li>
            </ul>
            <a href="JavaScript:void(0)" id="res-cross"></a>
          </div>
          <div className="search-popup">
            <button className="close-search"><i className="fa-solid fa-xmark"></i></button>
            <form method="post" action="#">
              <div className="form-group relative overflow-hidden">
                <input
                  type="search"
                  name="search-field"
                  value=""
                  placeholder="Search Here"
                  required=""
                  className="placeholder:text-black"
                />
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
            </form>
          </div>

        </div>
      </div>
      <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>
    </header>
  )
}

export default Navbar
