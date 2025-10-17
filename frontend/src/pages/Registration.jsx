import React, { useEffect, useRef, useState } from 'react'
import { useUserDataContext } from '../Context/Userdata';
import { useServiceListContex } from '../Context/Services';
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationContext } from '../Context/LocationProvider ';
import logo from '../assets/img/logo.png'
import axios from 'axios';
import FallbackLoader from '../components/FallbackLoader';
import { useSnackbar } from '../Context/SnackbarContext';
import { useScreen } from '../Context/ScreenProvider';
import DropdownOff from '../components/DropdownOff';


const Registration = ({ setSignIn, setLoginP, setOtpVerify }) => {

    const { userdata, setUserdata, profileDetails } = useUserDataContext();
    const { userLocation } = useLocationContext();
    const { services } = useServiceListContex();
    const { statesList } = useStatesContext();
    const { districtsList, setState, state, districtLoading } = useDistrictsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);
    const [custumeCity, setCustumeCity] = useState('');
    const host = import.meta.env.VITE_HOST;
    const { setSnackbar } = useSnackbar();
    const [isOtherCity, setIsOtherCity] = useState(false);
    const { isMobile } = useScreen();
    const [filterStates, setFilterStates] = useState([])
    const [filterCity, setFilterCity] = useState([])
    const [showStatePopup, setShowStatePopup] = useState(false);
    const [showCityPopup, setShowCityPopup] = useState(false);
    const stateListRef = useRef();
    const cityListRef = useRef();
    const [allowCity, setAllowCity] = useState(false);


    const [userdetails, setUserdetails] = useState({
        service_type: '',
        organization_name: '',
        contact_person: '',
        contact_email: '',
        contact_mobileno: '',
        password: "",
        state: '',
        city: '',
        address: '',
        pincode: '',
        longitude: `${userLocation?.lng}` || '',
        latitude: `${userLocation?.lat}` || ''

    })




    const hanldeRegistration = async (e) => {
        e.preventDefault();


        const exists = statesList.data.some(s => s.toLowerCase() === userdetails.state.toLowerCase());
        if (!exists) {
            setError("Please enter correct State name!");
            return;
        }

        if (!userdetails.service_type || !userdetails.organization_name || !userdetails.contact_person || !userdetails.contact_email || !userdetails.contact_mobileno || !userdetails.password || !userdetails.state || !userdetails.city || !userdetails.address || !userdetails.pincode
        ) {
            console.warn("Please Enter all the fileds.")
            setError("Please fill the all Boxes");
            return;
        }


        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]+$/;

        if (!passwordPattern.test(userdetails.password)) {
            console.warn("*Password must include uppercase, lowercase, number & special character.");
            setSnackbar({ open: true, message: '*Password must include uppercase, lowercase, number & special character.', type: 'error' })
            setError(
                "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
            );
            return;
        }


        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${host}/user/register`, userdetails);
            const userdata = response.data;


            sessionStorage.setItem("email", userdetails.contact_email);
            sessionStorage.setItem("userId", response.data.data.user_id);
            setSnackbar({ open: true, message: 'OTP send to your Email.', type: 'success' })

            setOtpVerify(true);
        } catch (error) {
            if (error.response?.data?.error?.password) {
                setError("*Password must include uppercase, lowercase, number & special character.")
                console.error(error.response?.data?.error?.password)
            } else {
                setError(error.response?.data?.error?.message || "Something went wrong");
                console.error("Registration  failed:", error.response?.data || error.message);
            }

        } finally {
            setLoading(false);
        }

    }


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;



        if (name === "citySelect") {
            if (value.toLowerCase() === "other") {
                setIsOtherCity(true);
                setUserdetails((prev) => ({ ...prev, city: "" }));
            } else {
                setIsOtherCity(false);
                setUserdetails((prev) => ({ ...prev, city: value }));
            }
        } else if (name === "city") {

            setUserdetails((prev) => ({ ...prev, city: value }));
        } else if (name === 'state') {
            const formattedValue =
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            setUserdetails((prev) => ({ ...prev, state: formattedValue }));
        } else {
            setUserdetails((prev) => ({ ...prev, [name]: value }));
        }
    };




    useEffect(() => {

        if (userdetails.state) {
            setShowStatePopup(true);
            const datalist = statesList.data.filter(state =>
                state.toLowerCase().includes(userdetails.state.toLowerCase())
            );
            setFilterStates(datalist);
            const exists = statesList.data.some(s => s.toLowerCase() === userdetails.state.toLowerCase());
            if (exists) {
                setShowStatePopup(false);
            } else {
                setShowStatePopup(true);
            }
        } else {
            setFilterStates(statesList.data);
            setShowStatePopup(false);
            setUserdetails({
                ...userdetails,
                city: ''
            })
        }
    }, [statesList, userdetails.state]);

    useEffect(() => {
        const exists = statesList.data.some(s => s.toLowerCase() === userdetails.state.toLowerCase());
        if (exists) {
            setAllowCity(true);
        } else {
            setAllowCity(false);
        }
    }, [statesList, userdetails.state])


    useEffect(() => {
        const exists = statesList.data.some(s => s.toLowerCase() === userdetails.state.toLowerCase());
        if (!exists) {
            return;
        }


        if (districtsList.length === 0) return;

        if (userdetails.city) {
            if (!districtsList || districtLoading) return;
            setShowCityPopup(true);
            const datalist = districtsList?.data?.filter(city =>
                city.toLowerCase().includes(userdetails.city.toLowerCase())
            );
            setFilterCity(datalist);
            const exists = districtsList?.data.some(s => s.toLowerCase() === userdetails.city.toLowerCase());
            if (exists) {
                setShowCityPopup(false);
            } else {
                setShowCityPopup(true);
            }
        } else {
            setFilterCity(districtsList.data);
            setShowCityPopup(false);
        }
    }, [districtsList, userdetails.city]);



    return (
        <div style={{ zIndex: 10 }} className=" register-popup  cursor-default  fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">

            <div className="container flex items-center justify-center relative h-full   ">
                <div className={`register-box relative  md:w-[60%] lg:w-1/2 w-full ${isMobile ? "max-h-[80vh]" : "max-h-[90vh]"}  scroll  bg-white shadow rounded-[10px]  px-30 pb-30`}>
                    <form onSubmit={hanldeRegistration}>
                        <div style={{ zIndex: 10 }} className="sticky pt-30 pb-10 top-0 left-0 bg-white">

                            <button
                                onClick={() => setSignIn(false)}
                                className='close-btn  registration-close'><i className="fa-solid fa-xmark"></i></button>
                            <div className="text-center mb-40">
                                <a href="" className="mb-5 inline-block">
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


                        <p className=" text-sm mb-10">Contact Person *</p>
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
                        <div className='relative'>


                            <input
                                value={userdetails.state}
                                onChange={(e) => {
                                    handleChange(e);
                                    setState(e.target.value);
                                }}
                                className='w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none'

                                name="state" id="state" />
                            <DropdownOff dropdownRef={stateListRef} setDropdownOpen={setShowStatePopup}>

                                {showStatePopup && <ul style={{ zIndex: 1 }} ref={stateListRef} className='absolute bg-[#F4F4FF] shadow max-h-200 scroll rounded w-full top-[100%] left-0 border border-lightgary '>
                                    {filterStates?.length > 0 ? filterStates.map((state, index) => (
                                        <li className='py-7 px-10 hover:bg-primary hover:text-white cursor-pointer transition text-sm'
                                            onClick={() => {
                                                setUserdetails({
                                                    ...userdetails,
                                                    state: state
                                                })
                                                setState(state);
                                                setShowStatePopup(false);
                                            }}
                                            key={index}>{state}</li>

                                    )) : (
                                        <li className='py-7 px-10 hover:bg-primary hover:text-white cursor-pointer transition text-sm'>No State Found</li>
                                    )}
                                </ul>}
                            </DropdownOff>


                        </div>

                        <p className=" text-sm mb-10">City *</p>
                        <div className='relative'>
                            <input
                                value={isOtherCity ? "Other" : userdetails.city}
                                disabled={!allowCity || districtsList.length === 0}
                                onChange={handleChange}
                                className={`w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none ${!allowCity || districtsList.length === 0 ? 'cursor-notAllow  opacity-50' : ''}`}

                                name="citySelect" id="city" />
                            <DropdownOff dropdownRef={cityListRef} setDropdownOpen={setShowCityPopup}>

                                {showCityPopup && !isOtherCity && <ul ref={cityListRef} className='absolute bg-[#F4F4FF] shadow max-h-200 scroll rounded w-full top-[100%] left-0 border border-lightgary'>
                                    {filterCity?.length > 0 && filterCity.map((dist, index) => (

                                        <li className='py-7 px-10 hover:bg-primary hover:text-white cursor-pointer transition text-sm'
                                            onClick={() => {
                                                setUserdetails({
                                                    ...userdetails,
                                                    city: dist
                                                })
                                                setShowCityPopup(false);
                                            }}
                                            key={index}>{dist}</li>





                                    ))}
                                    <li name='citySelect' value='Other' className='py-7 px-10 hover:bg-primary hover:text-white cursor-pointer transition text-sm'
                                        onClick={(e) => {
                                            setIsOtherCity(true);
                                            setUserdetails((prev) => ({ ...prev, city: "" }));

                                            setShowCityPopup(false);
                                        }}
                                    >Other</li>
                                </ul>}
                            </DropdownOff>





                        </div>
                        {isOtherCity && (
                            <input
                                type="text"
                                name="city"
                                value={userdetails.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                className="w-full text-sm bg-[#F4F4FF] py-10 px-10 border border-lightgary rounded mb-20 outline-none"
                            />
                        )}



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
                        <div className='border border-lightgary rounded flex flex-row gap-10 overflow-hidden bg-[#F4F4FF] items-center'>

                            <input
                                name='password'
                                value={userdetails.password}
                                onChange={handleChange}
                                type={passwordShow ? 'text' : 'password'} className="w-full text-sm  py-10 px-10   outline-none" placeholder="" />
                            <i onClick={() => setPasswordShow(!passwordShow)} className={`fa-solid ${passwordShow ? "fa-eye-slash" : 'fa-eye'}  text-gary  cursor-pointer pr-10`}></i>
                        </div>
                        <p style={{ fontSize: '10px', marginTop: '2px' }} className='text-xs text-gary mb-30'> *Password atleast six charecters must include uppercase, lowercase, number & special character.</p>




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
            {loading && (
                <FallbackLoader fixed={true} />
            )}
        </div>
    )
}

export default Registration
