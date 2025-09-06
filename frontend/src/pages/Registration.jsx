import React, { useEffect, useState } from 'react'
import { useUserDataContext } from '../Context/Userdata';
import { useServiceListContex } from '../Context/Services';
import { useStatesContext } from '../Context/States';
import { useDistrictsContext } from '../Context/Districts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocationContext } from '../Context/LocationProvider ';
import logo from '../assets/img/logo.png'
import axios from 'axios';

const Registration = ({ setSignIn, setLoginP, setOtpVerify }) => {

    const { userdata, setUserdata, profileDetails } = useUserDataContext();
      const { userLocation } = useLocationContext();
    const { services } = useServiceListContex();
    const { statesList } = useStatesContext();
    const { districtsList, setState, state } = useDistrictsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
        const location = useLocation();
    const navigate = useNavigate();
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
            
            
            sessionStorage.setItem("email",userdetails.contact_email);
            sessionStorage.setItem("userId",response.data.data.user_id);
             
       
            setOtpVerify(true);
        } catch (error) {
            setError(error.response?.data?.error?.message || "Something went wrong");
            console.error("Registration  failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }

    }


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setUserdetails({
            ...userdetails,

            [name]: value
        }
        )
    };


    return (
        <div className=" register-popup   fixed top-0 left-0 inset-0 bg-[#646464ad]  w-screen h-screen z-1002 ">

            <div className="container flex items-center justify-center relative h-full   ">
                <div className="register-box relative  md:w-[60%] lg:w-1/2 w-full max-h-[90vh] scroll  bg-white shadow rounded-[10px]  px-30 pb-30">
                    <form onSubmit={hanldeRegistration}>
                        <div className="sticky pt-30 pb-10 top-0 left-0 bg-white">

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
    )
}

export default Registration
