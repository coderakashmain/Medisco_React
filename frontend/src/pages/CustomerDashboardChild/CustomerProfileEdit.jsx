


import React, { lazy, Suspense, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import '../DashboardChild/ProfileSubP.css'
import { useCustomerData } from '../../Context/CustomerData';
import { useStatesContext } from '../../Context/States';
import { useDistrictsContext } from '../../Context/Districts';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FallbackLoader from '../../components/FallbackLoader';
import { useLocationContext } from '../../Context/LocationProvider ';
import Loading from '../../components/Loading';
import { UpdateCustomerProfileApi } from '../../APIs/UpdateCustomerProfileApi';
import { useSnackbar } from '../../Context/SnackbarContext';
import { useScreen } from '../../Context/ScreenProvider';
import { useServiceListContex } from '../../Context/Services';


const CustomerProfileEdit = ({ setEditable }) => {
    const { customerData, profileDetails, setProfileDetails } = useCustomerData();
  
    const { setSnackbar } = useSnackbar();
    const { isMobile } = useScreen();
    const { statesList } = useStatesContext();
    const { userLocation, locationLoading, getLocation, error, locationMesage } = useLocationContext();
    const [click, setClick] = useState(0);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");
    const [isOtherCity, setIsOtherCity] = useState(false);
    const { districtsList, districtLoading, setState } = useDistrictsContext();
    const [editData, setEditData] = useState({
        name: profileDetails?.data.first_name || '',
        email: profileDetails?.data.email || '',
        mobileno: profileDetails?.data.mobileno || '',
        state: profileDetails?.data.state || '',
        city: profileDetails?.data.city || '',
        address: profileDetails?.data.address || '',
        pincode: String(profileDetails?.data?.pincode ?? ''),
        latitude: profileDetails?.data.latitude ? String(profileDetails.data.latitude) : "",
        longitude: profileDetails?.data.longitude ? String(profileDetails.data.longitude) : "",
        adhaar_no: profileDetails?.data.adhaar_no || "",
        pan_no: profileDetails?.data.pan_no || ""
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

    }, [profileDetails?.data.city, districtsList])




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

    };

    const handleRefChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditData((prev) => ({ ...prev, ref_percentage: value }));
    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError("");
        setSuccess("");

        if( profileDetails?.data.email !== editData.email){
             setSnackbar({ open: true, message: 'You can not change your email.', type: 'warning' })
             return;
        }

        try {
            const res = await UpdateCustomerProfileApi(customerData?.token, editData);


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
            setSnackbar({ open: true, message: error.message, type: 'error' })

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
                                <Avatar username='Organisation Name' profile_pic={profileDetails?.data?.photo} size={isMobile ? '50px' : '80px'} />
                            </div>
                            <div className='flex flex-col  align-center justify-center max-sm:gap-3 gap-5'>
                                <h2 className='font-bold max-sm:text-sm'>{profileDetails?.data.first_name}</h2>
                                <p className='text-xs text-gary'>{customerData?.data?.role}</p>
                            </div>
                        </div>

                        <div  >

                            <button onClick={() => { setEditable(false) }} className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                            {!isMobile  && (<div className='flex gap-5 items-center' style={{ transform: 'translate(-22px)' }}>
                                {!locationLoading && !error  &&(<p className='text-xs'>Track your current Location</p>)}
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
                                <label htmlFor="name">Name</label>
                                <input type="text" onChange={handleChange} name='name' value={editData.name} className={`rounded outline-none p-7 text-sm px-10 `} id='name' />

                            </li>

                            <li>
                                <label htmlFor="email">Email</label>
                                <input type="text" onChange={handleChange} disabled name='email' value={editData.email} className={`rounded select-none outline-none p-7 text-sm px-10  opacity-50 cursor-notAllow`} id="email" />

                            </li>
                          
                            <li>
                                <label htmlFor="mobileno">Mobile No</label>
                                <input onChange={handleChange} value={editData.mobileno} name='mobileno' type="number" className={`rounded outline-none p-7 text-sm px-10  `} id='mobileno' />

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
                      
                            <li>
                                <label htmlFor="adhaar_no">Aadhaar No</label>
                                <input type="number" onChange={handleChange} name='adhaar_no' value={editData.adhaar_no} className={`rounded outline-none p-7 text-sm px-10 `} id='adhaar_no' />

                            </li>
                            <li>
                                <label htmlFor="pan_no">PAN No</label>
                                <input type="text" onChange={handleRefChange} name='pan_no' value={editData.pan_no} className={`rounded outline-none p-7 text-sm px-10 `} id='pan_no' />

                            </li>
                           


                        </ul>
                    </div>
                    <div className={`flex ${isMobile ? "justify-between" : 'justify-end'}  items-center mt-30 `}>
                        {isMobile && (<div className='flex  items-center'>
                            <Tooltip title="Detect current Location">
                                <IconButton onClick={() => {
                                    getLocation();
                                    setClick((e) => e + 1);

                                }}>
                                    <GpsFixedIcon className=' active text-primary cursor-pointer items-center' />
                                </IconButton>
                            </Tooltip>
                            {!locationLoading && !error && (<p className='text-xs'>Track your current Location</p>)}
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

export default CustomerProfileEdit

