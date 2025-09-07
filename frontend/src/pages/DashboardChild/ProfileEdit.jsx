
import React, { lazy, Suspense, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import './ProfileSubP.css'

import { useUserDataContext } from '../../Context/Userdata';
import { useStatesContext } from '../../Context/States';
import { useDistrictsContext } from '../../Context/Districts';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FallbackLoader from '../../components/FallbackLoader';
import { useLocationContext } from '../../Context/LocationProvider ';
import Loading from '../../components/Loading';
import { UpdateProfileApi } from '../../APIs/UpdateProfileApi';
import { useSnackbar } from '../../Context/SnackbarContext';

import { useScreen } from '../../Context/ScreenProvider';

const ProfileEdit = ({ setEditable }) => {
    const { userdata, profileDetails, setProfileDetails } = useUserDataContext();
    const { setSnackbar } = useSnackbar();
      const {isMobile} = useScreen();
    const { statesList } = useStatesContext();
    const { userLocation, locationLoading, getLocation, error, locationMesage } = useLocationContext();
    const [click, setClick] = useState(0);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");
    const [isOtherCity, setIsOtherCity] = useState(false);
    const { districtsList, districtLoading, setState } = useDistrictsContext();
    const [editData, setEditData] = useState({
        hospital_name: profileDetails?.data.hospital_name || '',

        service_type: profileDetails?.data.service_type || '',
        contact_person: userdata?.data?.fullname || '',
        contact_mobileno: profileDetails?.data.mobileno || '',
        contact_email: profileDetails?.data.email || '',
        state: profileDetails?.data.state || '',
        city: profileDetails?.data.city || '',
        address: profileDetails?.data.address || '',
        pincode: profileDetails?.data.pincode || '',
        latitude: profileDetails?.data.latitude ? String(profileDetails.data.latitude) : "",
        longitude: profileDetails?.data.longitude ? String(profileDetails.data.longitude) : "",
        registration_no: profileDetails?.data.registration_no || "",
        gst: profileDetails?.data.gst || "",
        availability: profileDetails?.data.availability || "",
        noofbed: profileDetails?.data.noofbed || "",
        ref_percentage: profileDetails?.data.ref_percentage ? [profileDetails?.data.ref_percentage] : [],


    });

    useEffect(() => {
        setState(profileDetails?.data.state);
    }, [profileDetails?.data.state])


    useEffect(() => {
        if (!districtsList?.data) return;
        const currentCity = profileDetails?.data?.city;


        if (currentCity && !districtsList.data.includes(currentCity)) {
            setIsOtherCity(true);
        }

    }, [profileDetails?.data.city,districtsList])




    useEffect(() => {
        if (userLocation.lat && userLocation.lng) {
            setEditData((prev) => ({
                ...prev,
                latitude: String(userLocation.lat),
                longitude: String(userLocation.lng),
            }));
        }
    }, [userLocation]);






    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        if (name === "citySelect") {
            if (value === "Other") {
                setIsOtherCity(true);
                setEditData((prev) => ({ ...prev, city: "" }));
            } else {
                setIsOtherCity(false);
                setEditData((prev) => ({ ...prev, city: value }));
            }
        } else if (name === "city") {

            setEditData((prev) => ({ ...prev, city: value }));
        } else {
            setEditData((prev) => ({ ...prev, [name]: value }));
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError("");
        setSuccess("");

        try {
            const res = await UpdateProfileApi(userdata?.token, editData);


            setProfileDetails((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    ...editData,
                },
            }));
            setSuccess("Profile updated successfully ");

            setSnackbar({ open: true, message: 'Profile updated successfully', type: 'success' })


            setEditable(false);
        } catch (error) {
            setApiError(error.message);

        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <section className='h-full w-full p-20 pb-40 sm:p-10'>

                <form onSubmit={handleSubmit}>
                    <div className='dash-p-top-bar flex flex-row justify-between items-center '>
                        <div className='flex gap-10 '>
                            <div className=''>
                                <Avatar username='Organisation Name' profile_pic={profileDetails?.data?.hospital_logo} size={isMobile ? '50px' : '80px'} />
                            </div>
                            <div className='flex flex-col  align-center justify-center max-sm:gap-3 gap-5'>
                                <h2 className='font-bold max-sm:text-sm'>{profileDetails?.data.hospital_name}</h2>
                                <p className='text-xs text-gary'>{userdata?.data?.role}</p>
                            </div>
                        </div>

                        <div  >

                            <button onClick={() => { setEditable(false) }} className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                            {!isMobile && (<div className='flex gap-5 items-center' style={{ transform: 'translate(-22px)' }}>
                                {!locationLoading && (<p className='text-xs'>Track your current Location</p>)}
                                {locationLoading && (<Loading size="15px" />)}
                                {error && (<p className='text-red text-xs'>{error}</p>)}
                                {locationMesage && click > 0 && (<p className='text-xs' style={{ color: 'green' }}>({locationMesage})</p>)}
                                <Tooltip title="Detect current Location">
                                    <IconButton onClick={() => {
                                        getLocation();
                                        setClick((e) => e + 1);

                                    }}>
                                        <GpsFixedIcon className=' active text-primary cursor-pointer items-center' />
                                    </IconButton>
                                </Tooltip>
                            </div>)}


                        </div>
                    </div>
                    <div className="dashboard-pg-profile-details mt-20">
                        <ul>

                            <li>
                                <label htmlFor="hospital_name">Organisation Name</label>
                                <input type="text" onChange={handleChange} name='hospital_name' value={editData.hospital_name} className={`rounded outline-none p-7 text-sm px-10 `} id='hospital_name' />

                            </li>

                            <li>
                                <label htmlFor="parson-name">Parson Name</label>
                                <input type="text" onChange={handleChange} name='contact_person' value={editData.contact_person} className={`rounded outline-none p-7 text-sm px-10 `} id="parson-name" />

                            </li>
                            <li>
                                <label htmlFor="email">Email </label>
                                <input type="email" value={userdata?.data?.email} name='email' className='rounded outline-none p-7 text-sm px-10 opacity-80 ' disabled id='email' />

                            </li>
                            <li>
                                <label htmlFor="mobile-no">Contact Number </label>
                                <input onChange={handleChange} value={editData.contact_mobileno} name='contact_mobileno' type="number" className={`rounded outline-none p-7 text-sm px-10  `} id='mobile-no' />

                            </li>
                            <li>
                                <label htmlFor="state">State </label>

                                <select name='state' id='state' className=' block rounded outline-none mt-10 shadow w-full p-7 text-sm px-10 bg-[#F4F4FF] ' onChange={(e) => {
                                    const { value } = e.target;
                                    setState(value);
                                    setEditData((prev) => ({
                                        ...prev,
                                        state: value,
                                        city: "",
                                    }));

                                }} value={editData.state}>
                                    <option className='p-7 text-sm px-10' disabled value="">-- Select State --</option>
                                    {statesList.status && statesList.data.map((state, index) => (
                                        <option className='p-7 text-sm px-10' key={index} value={state} >{state}</option>
                                    ))}

                                </select>

                            </li>
                            <li>
                                <label htmlFor="city">City </label>

                                <select value={isOtherCity ? "Other" : editData.city} name="citySelect" id="city" className={`block rounded outline-none mt-10 shadow w-full p-7 text-sm px-10 bg-[#F4F4FF]`}
                                    onChange={handleChange}
                                    defaultValue="">
                                    <option className='p-7 text-sm px-10' value="" > -- Select City --</option>
                                    {districtsList?.status && districtsList?.data.map((district, index) => (
                                        <option className='p-7 text-sm px-10' key={index} value={district}>{district}</option>

                                    ))}
                                    {districtsList?.status && (
                                        <option value="Other">Other</option>
                                    )}
                                    {districtLoading && (<option className='p-7 text-sm px-10' disabled>Loading...</option>)}
                                </select>

                            </li>
                            {isOtherCity && (
                                <li>

                                    <label htmlFor="address">Enter your city</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={editData.city}
                                        onChange={handleChange}
                                        className="rounded outline-none p-7 text-sm px-10e"
                                    />
                                </li>
                            )}

                            <li>
                                <label htmlFor="address">Address</label>
                                <input type="text" onChange={handleChange} name='address' value={editData.address} className={`rounded outline-none p-7 text-sm px-10  `} id='address' />

                            </li>
                            <li>
                                <label htmlFor="pincode">Pincode</label>
                                <input type="number" onChange={handleChange} name='pincode' value={editData.pincode} className={`rounded outline-none p-7 text-sm px-10 `} id='pincode' />

                            </li>

                        </ul>
                    </div>
                <div className={`flex ${isMobile ? "justify-between" : 'justify-end'}  items-center mt-30 `}>
                        {isMobile && ( <div className='flex  items-center'>
                             <Tooltip title="Detect current Location">
                                    <IconButton onClick={() => {
                                        getLocation();
                                        setClick((e) => e + 1);

                                    }}>
                                        <GpsFixedIcon className=' active text-primary cursor-pointer items-center' />
                                    </IconButton>
                                </Tooltip>
                                {!locationLoading && (<p className='text-xs'>Track your current Location</p>)}
                                {locationLoading && (<Loading size="15px" />)}
                                {error && (<p className='text-red text-xs'>{error}</p>)}
                                {locationMesage && click > 0 && (<p className='text-xs' style={{ color: 'green' }}>({locationMesage})</p>)}
                               
                            </div>)}
                        <button disabled={loading} type='submit' className={`${loading ? 'opacity-50' : ''} button block float-right bg-primary rounded py-5 px-24 text-white text-xs cursor-pointer text-nowrap flex items-center gap-5 `}>Save</button>
                    </div>

                </form>

                {loading && (<FallbackLoader fixed={true} />
                )}



            </section>


        </>
    )
}

export default ProfileEdit
