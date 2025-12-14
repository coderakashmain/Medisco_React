import React, { useEffect, useState, useRef, Suspense, lazy } from 'react'
import logo from '../assets/img/logo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUserDataContext } from '../Context/Userdata'
import Avatar from './Avatar'

import Loading from './Loading'
import { HashLink } from 'react-router-hash-link';
const Login = lazy(() => import("../pages/Login"));
const ForgotePassword = lazy(() => import("../pages/ForgotePassword"));
const Registration = lazy(() => import("../pages/Registration"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const CustomerRegistration = lazy(() => import("../pages/CustomerRegistration"));
import DropdownOff from './DropdownOff'
import FallbackLoader from './FallbackLoader'
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useCustomerData } from '../Context/CustomerData'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
const bdodata =   JSON.parse(localStorage.getItem("bdodata"));


const bpdata =   JSON.parse(localStorage.getItem("bpdata")) ;


const Navbar = () => {
  const navigate = useNavigate();
  const { userdata, setUserdata, profileDetails } = useUserDataContext();
  const {customerData,setCustomerData,profileDetails : customerProfiledetails} = useCustomerData();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logingP, setLoginP] = useState(false);
  const [signInP, setSignIn] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [forgotePassword, setForgotePassword] = useState(false);
  const [customerLogin,setCustomerLogin] = useState(false);
  const [customerRegister,setCustomerRegister] = useState(false);
  const [bpLogin,setBPlogin] = useState(false);
  const [bdoLogin,setBdologin] = useState(false);

  const [dropDownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [ProfileDropdown, setProfileDropdown] = useState(false);
  const host = import.meta.env.VITE_HOST;
  const avatarRef = useRef(null);








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
    localStorage.clear();
    setUserdata(null);
    setCustomerData(null);
  })

  return (
    <header
      className="z-99 sticky-header main-bar-wraper navbar-expand-lg duretion-500"
    >
      {/* {loading && (<FallbackLoader fixed={true} size='100vh' />)} */}
      <div className="main-bar">
        <div className="container">
          <div className="bottom-bar">
            <div className="two-bar">
              <div className="flex items-center justify-between">
                <div className="logo" >
                  <a href="/">
                    <img alt="logo" src={logo}  className='w-full f-full object-cover'/>

                  </a>
                </div>
              </div>
            </div>

            <nav className="navbar lg:block hidden">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <HashLink smooth to='/'>Home</HashLink>
                </li>

                <li className="navbar-dropdown service-dropdown-out-box dropdown-out-box  relative ">
                  <HashLink smooth to="/#services">Services</HashLink>
                </li>
                <li className="navbar-dropdown">
                  <HashLink smooth to="/about">About</HashLink>
                </li>
                <li className="navbar-dropdown">
                  <HashLink smooth to="/#section-pricing">Plans</HashLink>
                </li>


                <li className="navbar-dropdown">
                  <HashLink smooth to="/#contact">contact</HashLink>
                </li>
                <li className="navbar-dropdown">
                  <HashLink smooth to="/broucher">broucher</HashLink>
                </li>
              </ul>
            </nav>

            <div className="flex gap-15 align-center">
              <div className="header-menu-right h-full flex items-center gap-15 cursor-pointer">
                {userdata || customerData || bpdata || bdodata ? (
                  <div className='font-semibold relative' onClick={() => setProfileDropdown(!ProfileDropdown)} >

                  <div >


                    <Avatar username={userdata ? profileDetails?.data?.hospital_name  : customerProfiledetails?.data?.first_name} profile_pic={ userdata ? profileDetails?.data?.hospital_logo : customerProfiledetails?.data?.photo} size={35} />

                  </div>
                  <div ref={avatarRef} className={`${ProfileDropdown ? 'dropdown-active' : 'dropdown-off'} absolute top-[100%] right-0  opacity-0   bg-white font-normal  z-99 mt-5  flex flex-col  shadow`}>
                    <DropdownOff dropdownRef={avatarRef} setDropdownOpen={setProfileDropdown}>
                      <ul>
                        <li onClick={(e) => {
                          e.stopPropagation();
                          setProfileDropdown(false)
                          if(userdata){

                            navigate('/dashboard')
                          } 
                          if(bpdata){
                                navigate('/professionalbp_dashboard')
                          }
                          if(bdodata){
                                navigate('/professionalbdo_dashboard')
                          }
                          if(customerData){
                            navigate('/customer_dashboard')
                          }
                        }} className='font-normal text-sm text-black  hover:bg-primary hover:text-white px-12 py-10 text-nowrap'>Dashborad</li>
                        <li onClick={handleLogout} className='font-normal text-sm text-black  hover:bg-primary hover:text-white px-12 py-10 text-nowrap'>Log Out</li>
                      </ul>
                    </DropdownOff>
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
                        className=" text-xs select-none bg-primary px-10 py-5 rounded-full text-white">Join now <KeyboardArrowDownRoundedIcon sx={{fontSize : 18}}/></span>
                      <div style={{ display: userdata ? 'none' : '' }} className={`${dropDownOpen ? 'dropdown-active' : 'dropdown-off'} header-auth-dropdown dropdown-box absolute top-[100%] right-0     bg-white font-normal  z-99 mt-5  flex flex-col  shadow rounded overflow-hidden select-none `}>
                        <ul className=''>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              setCustomerLogin(true)
                              setDropdownOpen(false)
                            }}
                            className="register-btn font-normal text-sm text-black rounded font-semibold   hover:bg-primary hover:text-white px-12 py-10 text-nowrap"><PersonRoundedIcon sx={{ fontSize : 20}}/> <span style={{marginLeft  : 6.2}}>Join as Customer</span></li>



                          <li

                            onClick={(e) => {
                              e.stopPropagation();
                              setLoginP(!logingP)
                              setDropdownOpen(false)
                            }}
                            className="login-btn font-normal font-semibold text-sm text-black  hover:bg-primary rounded hover:text-white px-12 py-10 text-nowrap"><AddBusinessRoundedIcon sx={{ fontSize : 20}}/><span style={{marginLeft  : 10}}>Join   as Service Provider</span> </li>
                          <li

                            onClick={(e) => {
                              e.stopPropagation();
                              setLoginP(!logingP)
                              setDropdownOpen(false)
                              setBPlogin(true)
                            }}
                            className="login-btn font-normal font-semibold text-sm text-black  hover:bg-primary rounded hover:text-white px-12 py-10 text-nowrap"><AddBusinessRoundedIcon sx={{ fontSize : 20}}/><span style={{marginLeft  : 10}}>Join   as BP</span> </li>
                          <li

                            onClick={(e) => {
                              e.stopPropagation();
                              setLoginP(!logingP)
                              setDropdownOpen(false)
                              setBdologin(true)
                            }}
                            className="login-btn font-normal font-semibold text-sm text-black  hover:bg-primary rounded hover:text-white px-12 py-10 text-nowrap"><AddBusinessRoundedIcon sx={{ fontSize : 20}}/><span style={{marginLeft  : 10}}>Join   as BDO</span> </li>
                            

                        </ul>


                      </div>
                    </div>
                  )
                }


                {/* <!-- Login popUp --> */}

                {(logingP || customerLogin) && (<Suspense fallback={<FallbackLoader fixed={true} />}><Login customerLogin={customerLogin}
                setCustomerRegister={setCustomerRegister}
                setCustomerLogin={setCustomerLogin} setBdoLogin={setBdologin} bdoLogin={bdoLogin} setBPlogin={setBPlogin} bpLogin={bpLogin} setLoginP={setLoginP} setForgotePassword={setForgotePassword} setSignIn={setSignIn} /></Suspense>)}

                {/* <!-- Registration popUp --> */}

                {signInP && !otpVerify && (
                  <Suspense fallback={<FallbackLoader fixed={true} />}>

                    <Registration setSignIn={setSignIn} setLoginP={setLoginP} setOtpVerify={setOtpVerify} />
                  </Suspense>

                )}
                {/* <!-- Customer Registration popUp --> */}

                {customerRegister  && (
                  <Suspense fallback={<FallbackLoader fixed={true} />}>

                    <CustomerRegistration bdoLogin={bdoLogin} bpLogin={bpLogin} setCustomerRegister={setCustomerRegister} setCustomerLogin={setCustomerLogin} setOtpVerify={setOtpVerify} />
                  </Suspense>

                )}

                {/* <!-- Verify email popUp --> */}

                {otpVerify && (
                  <Suspense fallback={<FallbackLoader fixed={true} />}>
                    <VerifyOtp bdoLogin={bdoLogin} bpLogin={bpLogin} customerRegister={customerRegister} setVerifypopup={setOtpVerify} />


                  </Suspense>



                )}

                {/* Forgate password section  */}
                {forgotePassword && (
                  <Suspense fallback={<FallbackLoader fixed={true} />}>

                    <ForgotePassword setForgotePassword={setForgotePassword} />
                  </Suspense>
                )}


                {/* <div className="header-search-button search-box-outer  ">

                  <a href="javascript:void(0)" className="search-btn ">
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
                </div> */}

              </div>
              <a href="javascript:void(0)" id="mobile-menu" className="menu-start ">
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
                <a href="/">Home</a>
              </li>
              <li>
                <HashLink to="/about">About Us</HashLink>
              </li>
              <li>
                <HashLink to="/#services">Services</HashLink>
              </li>
              <li>
                <HashLink to="/#">Contact</HashLink>
              </li>
              <li>
                <HashLink to="/broucher">Broucher</HashLink>
              </li>
            </ul>
            <a href="JavaScript:void(0)" id="res-cross"></a>
          </div>
          {/* <div className="search-popup">
            <button className="close-search"><i className="fa-solid fa-xmark"></i></button>
            <form method="post" action="#">
              <div className="form-group relative  overflow-hidden rounded">
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
              <div className="form-group relative overflow-hidden mt-5 rounded">
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
              <div className="form-group relative overflow-hidden mt-5 rounded">
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
          </div> */}

        </div>
      </div>
      <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>
    </header>
  )
}

export default Navbar
