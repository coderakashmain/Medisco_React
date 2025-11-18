import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useCustomerData } from '../../Context/CustomerData'
import { useScreen } from '../../Context/ScreenProvider';
import FallbackLoader from '../../components/FallbackLoader';
import NotFound from '../NotFound';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import Avatar from '../../components/Avatar';
import '../DashboardChild/ProfileSubP.css'
const PopUp = lazy(() => import('../../components/PopUp'))
import ForgotePassword from '../ForgotePassword';
import CustomerProfileEdit from './CustomerProfileEdit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useSnackbar } from '../../Context/SnackbarContext';
import { UploadPhoto } from '../../APIs/UploadPhoto';
import Loading from '../../components/Loading';


const CustomerProfile = () => {
    const { customerDataloading, profileDetails: customerProfileDetails, customerData, setProfileDetails } = useCustomerData();
    const { isMobile, width } = useScreen();
    const [editable, setEditable] = useState(false);
    const [forgotePassword, setForgotePassword] = useState(false);
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [imagePath, setImagePath] = useState()
    const { setSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    const HOST = import.meta.env.VITE_HOST;
    const API_URL = `${HOST}/user/update-profile-image`;




    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFiles(file);
    };


    const handleSubmit = async () => {
        if (!selectedFiles) return setSnackbar({ open: true, message: 'Please select an image first', type: 'warning' });

        setLoading(true);


        try {
            const res = await UploadPhoto(customerData?.token, selectedFiles, "service");
            setImagePath(res.data);


            setSelectedFiles(null);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert('');
            setSnackbar({ open: true, message: 'Upload failed', type: 'error' });
        } finally {

        }
    };

    const finalSave = async (imagePath) => {

        try {
            const response = await axios.post(
                API_URL,
                {

                    image: imagePath
                },
                {
                    headers: {
                        Authorization: `Bearer ${customerData?.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );


            return response.data;
        } catch (error) {
            console.error("uploaderror error:", error);
            setSnackbar({ open: true, message: 'Upload failed', type: 'error' });
            throw error.response?.data || error;
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (!imagePath) return;

        const upload = async () => {
            try {
              await finalSave(imagePath);


                setProfileDetails(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        photo: imagePath
                    }
                }));

               setSnackbar({ open: true, message: 'Photo changed.', type: 'success' });

            } catch (error) {
                console.error("Photo update error:", error);
            }
        };



        upload();

    }, [imagePath])



    if (customerDataloading) {
        return <FallbackLoader />;
    }
    if (!customerProfileDetails ) {
        return <NotFound />;
    }




    return (
        <>
            <section className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>


                <div className={`dash-p-top-bar flex flex-row justify-between   mb-20  `}>
                    <div className={`flex gap-10 max-sm:gap-5 ${isMobile ? 'flex-wrap' : 'flex-nowrap'}`}>
                        <div className='  rounded-[50%]'>
                            <div style={{ padding: 2, borderWidth: 3 }} className='relative rounded-[50%] border  border-primary '>

                                <Avatar username={customerProfileDetails?.data?.first_name} profile_pic={customerProfileDetails?.data?.photo} size={isMobile ? '100px' : '150px'} />
                                <div onClick={() => fileInputRef.current.click()} style={{ position: 'absolute', zIndex: 10, padding: isMobile ? 7 : 10, bottom: isMobile ? '0%' : '3%', right: isMobile ? "0%" : '3%' }} className='text-primary  rounded-[50%]  bg-white shadow cursor-pointer'>
                                    <PhotoCameraIcon />
                                </div>

                                {loading && (<div className='absolute rounded-[50%] top-0 left-0 w-full h-full bg-primary opacity-50  flex items-center justify-center'>
                                    <Loading size='20px' />
                                </div>)}
                            </div>

                            <input
                                ref={fileInputRef}
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={handleFileSelect}
                                hidden
                            />

                        </div>
                        <div className='flex flex-col  align-center justify-center max-sm:gap-3 gap-5'>
                            <h2 className={`font-bold  ${isMobile ? 'text-md' : 'text-2xl'}`}>{customerProfileDetails?.data?.first_name}</h2>
                            <p className='text-xs text-gary'> {customerProfileDetails?.data?.user_name}</p>

                        </div>
                    </div>
                    <div className=' flex-nowrap select-none'>
                        <h4 className='font-semibold select-none max-sm:text-sm text-md text-nowrap text-end'>Total Savings on Bills</h4>
                        <p className='text-success text-end mt-5 font-bold '> <ShowChartIcon />₹ 23239</p>
                        <p className=' rounded text-sm border inline-block float-right border-primary px-10 py-5 mt-10 font-bold text-primary cursor-pointer  text-xs sm:text-sm text-nowrap'>VIEW DETAILS</p>

                    </div>
                </div>


                <div className='dash-p-top-bar flex flex-row justify-between items-center '>
                    <div className='flex gap-10 max-sm:gap-5 '>
                        <p className='text-md font-semibold'>Parsonal Details</p>
                    </div>
                    <div className='flex gap-10 flex-nowrap items-center'>

                        <button onClick={() => setEditable(true)} className='button bg-primary rounded py-5 px-10 text-white text-xs cursor-pointer text-nowrap flex font-semibold items-center gap-5'><EditSquareIcon sx={{ height: 18, width: 18 }} /> Edit</button>
                    </div>
                </div>

                <div className="dashboard-pg-profile-details mt-20">
                    <ul>
                        <li>
                            <label htmlFor="name"> Name</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='name' value={customerProfileDetails?.data?.first_name} />

                        </li>
                        <li>
                            <label htmlFor="email"> Email</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='email' value={customerProfileDetails?.data?.email} />

                        </li>
                        <li>
                            <label htmlFor="mobileno"> Mobile</label>
                            <input type="number" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='mobileno' value={customerProfileDetails?.data?.mobileno} />

                        </li>
                        <li>
                            <label htmlFor="state"> State</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='state' value={customerProfileDetails?.data?.state} />

                        </li>
                        <li>
                            <label htmlFor="city"> City</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='city' value={customerProfileDetails?.data?.city} />

                        </li>
                        <li>
                            <label htmlFor="address"> Address</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='address' value={customerProfileDetails?.data?.address} />

                        </li>
                        <li>
                            <label htmlFor="pincode"> Pincode</label>
                            <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='pincode' value={customerProfileDetails?.data?.pincode} />

                        </li>
                        <li>
                            <label htmlFor="aadhaarno"> Aadhaar Card No</label>
                            <input type="number" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='aadhaarno' value={customerProfileDetails?.data?.adhaar_no} />

                        </li>
                        <li>
                            <label htmlFor="panno"> Pan Card No</label>
                            <input type="number" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='panno' value={customerProfileDetails?.data?.pan_no} />

                        </li>

                    </ul>

                    <div className='mt-20 font-bold mb-10'>
                        Password  <br /><span onClick={()=>setForgotePassword(true)} className='text-primary cursor-pointer text-sm'>  forgote password ?</span>
                    </div>
                </div>

            </section>

            {editable && (


                <PopUp>

                    <div className={`profile-edit-box relative md:w-[80%] lg:w-[80%] w-full  bg-white shadow ${isMobile ? "max-h-[80vh]" : 'max-h-[90vh]'}  rounded-[10px] scroll`}>

                        <Suspense fallback={<FallbackLoader fixed={true} />}>
                            <CustomerProfileEdit setEditable={setEditable} />
                        </Suspense>
                    </div>
                </PopUp>


            )}


            {forgotePassword && (
                <Suspense fallback={<FallbackLoader fixed={true} />}>

                    <ForgotePassword setForgotePassword={setForgotePassword} />
                </Suspense>
            )}

            {selectedFiles && (
                <Suspense fallback={<FallbackLoader fixed={true} />}>
                    <PopUp>
                        <div className='min:h-252 gap-10 w-300 bg-white rounded flex flex-col justify-between px-10 py-10  '>
                            <div className='flex items-center justify-center '>


                                <div style={{ height: '13rem', width: '13rem' }} className='p-2  rounded rounded-[50%] overflow-hidden  relative'>
                                    <img
                                        src={URL.createObjectURL(selectedFiles)}

                                        alt="preview"
                                        className='h-full w-full object-cover'
                                    />
                                    {loading && (<div className='absolute rounded-[50%] top-0 left-0 w-full h-full bg-primary opacity-50  flex items-center justify-center'>
                                        <Loading size='20px' />
                                    </div>)}
                                </div>
                            </div>
                            <div className='flex gap-10 justify-end'>


                                <button className='text-sm text-red bg-gary cursor-pointer' onClick={() => setSelectedFiles(null)}>cancel</button>
                                <button disabled={loading} style={{opacity : loading ? '0.5': '1'}} onClick={handleSubmit} className={` px-10  text-sm font-semibold py-5 bg-primary rounded text-white cursor-pointer`}>{ loading ? "Updating..." : "Update"}</button>
                            </div>

                        </div>
                    </PopUp>

                </Suspense>
            )}
        </>
    )
}

export default CustomerProfile
