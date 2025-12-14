import React, { lazy, Suspense, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './ProfileSubP.css'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import MuiAvatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import { useUserDataContext } from '../../Context/Userdata';
import TimeAgo from '../../components/TimeAgo'
import { useScreen } from '../../Context/ScreenProvider';

import PopUp from '../../components/PopUp';
import FallbackLoader from '../../components/FallbackLoader';
const ProfileEdit = lazy(() => import("./ProfileEdit"));
const ForgotePassword = lazy(() => import("../ForgotePassword"));
const UpdateAbout = lazy(() => import("./UpdateAbout"));
const UpdateSpecialization = lazy(() => import("./UpdateSpecialization"));
import { useServiceListContex } from '../../Context/Services';
import { getSpecializationByService } from '../../APIs/getSpecializationByService';
import NotFound from '../NotFound'





const ProfileSubP = React.memo(() => {
  const { profileLoading, profileDetails, userdata } = useUserDataContext();
  const [editable, setEditable] = useState(false);
  const [forgotePassword, setForgotePassword] = useState(false);
  const { isMobile } = useScreen();
  const { services } = useServiceListContex();
  const [updateAbout, setUpdateAbout] = useState(false);
  const [specializationList, setSpecializationList] = useState([]);
  const [updateSpecialization,setUpdateSpecialization] = useState(false);



  useEffect(() => {
    if (editable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }


    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editable, forgotePassword]);


  useEffect(() => {
    if (!userdata.token) return;

    const fetchSpecialization = async () => {
      try {
        const list = await getSpecializationByService(userdata?.token, profileDetails?.data?.service_type);

        setSpecializationList(list.data);

      } catch (error) {
        setApiError(error.message);
      }
    }
    fetchSpecialization();

  }, [userdata,profileDetails?.data?.service_type])



  if (profileLoading) {
    return <FallbackLoader />;
  }
  if (!profileDetails) {
    return <NotFound />;
  }



  const findeServiceName = (serviceId) => {
    if (!services?.data) return;

    const matched = services.data.find(
      (value) => value.service_id === serviceId
    );

    return matched ? matched.service_name : undefined;
  };



  return (
    <>
      <section className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>

        <div className='dash-p-top-bar flex flex-row justify-between items-center '>
          <div className='flex gap-10 max-sm:gap-5 '>
            <div className=''>
              <Avatar username={profileDetails?.data?.hospital_name} profile_pic={profileDetails?.data?.hospital_logo} size={isMobile ? '50px' : '80px'} />
            </div>
            <div className='flex flex-col  align-center justify-center max-sm:gap-3 gap-5'>
              <h2 className='font-bold max-sm:text-sm'>{profileDetails.data.hospital_name}</h2>
              <p className='text-xs text-gary'> {findeServiceName(profileDetails?.data?.service_type)}</p>

            </div>
          </div>
          <div className='flex gap-10 flex-nowrap items-center'>
            {/* <p className='text-sm'>Publish</p>
        
            <OnOffToggle/> */}


            <button onClick={() => setEditable(true)} className='button bg-primary rounded py-5 px-10 text-white text-xs cursor-pointer text-nowrap flex font-semibold items-center gap-5'><EditSquareIcon sx={{ height: 18, width: 18 }} /> Edit</button>
          </div>
        </div>
        <h5 className='text-primary font-bold mt-20 select-none'>About Service</h5>

        {profileDetails?.data?.about.trim() ? (<p style={{ background: '#f3f3f3', padding: '13px', borderRadius: '5px' }} className='text-sm  mt-10 text-gary font-semibold border border-lightgary text-black p-6 flex justify-between'>
          <span>{profileDetails.data.about}</span> <EditSquareIcon sx={{ fontSize: 15 }} onClick={() => setUpdateAbout(true)} className='text-primary cursor-pointer' />
        </p>) : (
          <p style={{ background: '#f3f3f3', padding: '13px', borderRadius: '5px' }} className=' flex justify-between text-primary mt-10  font-semibold text-sm  border border-primary'>
            <span> Add about Us</span> <AddCircleIcon className='cursor-pointer active' onClick={() => setUpdateAbout(true)} />
          </p>
        )}


        {specializationList.length > 0 && (<h5 className='text-primary font-bold mt-20 select-none'>Specialization</h5>)}

        {specializationList.length > 0 && (
          profileDetails?.data?.specialization?.length > 0 ? (
            <>

              <div
                style={{ background: '#f3f3f3', padding: '13px', borderRadius: '5px' }}
                className="mt-10 border border-lightgary p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-black text-sm">Your Specializations</span>
                  <EditSquareIcon
                    sx={{ fontSize: 15 }}
                    onClick={() => setUpdateSpecialization(true)}
                    className="text-primary cursor-pointer"
                  />
                </div>

                {/* Chips Section */}
                <div className="flex flex-wrap gap-5 mt-10">
                  {profileDetails.data.specialization.map((item) => (
                    <span
                      key={item.specialized_id}
                      style={{padding :"3px 10px"}}
                      className="bg-primary text-white text-xs rounded-full shadow-sm"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </>

          ) : (

            <p
              style={{ background: '#f3f3f3', padding: '13px', borderRadius: '5px' }}
              className="flex justify-between text-primary mt-10 font-semibold text-sm border border-primary"
            >
              <span>Add Specialization</span>
              <AddCircleIcon
                className="cursor-pointer active"
                onClick={() => setUpdateSpecialization(true)}
              />
            </p>

          )
        )}




        <h5 className='text-primary font-bold mt-20 select-none'>Profile Details</h5>
        <div className="dashboard-pg-profile-details mt-20">
          <ul>

            <li>
              <label htmlFor="organisatin-name">Organisation Name</label>
              <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='organisatin-name' value={profileDetails.data.hospital_name} />

            </li>

            <li>
              <label htmlFor="parson-name">Parson Name</label>
              <input type="text" value={profileDetails?.data?.first_name} className={`rounded outline-none p-7 text-sm px-10  opacity-80`} disabled id="parson-name" />

            </li>
            <li>
              <label htmlFor="email">Email </label>
              <input type="email" value={profileDetails?.data?.email} className='rounded outline-none p-7 text-sm px-10 opacity-80 ' disabled id='email' />

            </li>
            <li>
              <label htmlFor="mobile-no">Contact Number </label>
              <input type="number" value={profileDetails?.data.mobileno} className={`rounded outline-none p-7 text-sm px-10  opacity-80`} disabled id='mobile-no' />

            </li>
            <li>
              <label htmlFor="state">State </label>
              <input type="text" value={profileDetails?.data.state} className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='state' />

            </li>
            <li>
              <label htmlFor="state">City </label>
              <input type="text" value={profileDetails.data.city} className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='City' />

            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input type="text" value={profileDetails.data.address} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='address' />

            </li>
            <li>
              <label htmlFor="pincode">Pincode</label>
              <input type="number" value={profileDetails.data.pincode} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='pincode' />

            </li>
            <li>
              <label htmlFor="registration_no">Registration No</label>
              <input type="number" value={profileDetails.data.registration_no} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='registration_no' />

            </li>
            <li>
              <label htmlFor="gst">GST</label>
              <input type="number" value={profileDetails.data.gst} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='gst' />

            </li>
            <li>
              <label htmlFor="ref_percentage">Referral Percentage (%)</label>
              <input type="number" value={profileDetails.data.ref_percentage}
                className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='ref_percentage' />

            </li>
            <li>
              <label htmlFor="availability">Availability</label>
              <input type="text" value={profileDetails.data.availability} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='availability' />

            </li>
            {findeServiceName(profileDetails?.data?.service_type) === 'HOSPITALS' && (<li>
              <label htmlFor="noofbed">No of Bed</label>
              <input type="number" value={profileDetails.data.noofbed} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='noofbed' />

            </li>)}

          </ul>
        </div>



        <div className='mt-40'>
          <h3 className='text-sm font-bold'>My email Adress</h3>
          <div className='flex justify-between mt-20'>

            <div className=' flex gap-10  items-center'>
              <MuiAvatar sx={{ height: 35, width: 35, bgcolor: '#F4F4FF', color: 'var(--color-primary)' }}><MailIcon sx={{ height: 20, width: 20 }} /></MuiAvatar>
              <div>
                <p className='text-sm'>{profileDetails?.data?.email}</p>
                <p className='text-xs text-gary'><TimeAgo dateString={profileDetails.data.created_datetime} /></p>
              </div>

            </div>
            <div className='flex items-center'>
              <button onClick={() => setForgotePassword(true)} style={{ padding: '5px 10px ', borderRadius: '3rem' }} className=' border border-lightgary max-sm:text-xs  text-sm bg-[#F4F4FF] font-bold cursor-pointer  rounded button text-primary  '>Reset Password</button>

            </div>
          </div>
        </div>

      </section>
      {editable && (


        <PopUp>

          <div className={`profile-edit-box relative md:w-[80%] lg:w-[80%] w-full  bg-white shadow ${isMobile ? "max-h-[80vh]" : 'max-h-[90vh]'}  rounded-[10px] scroll`}>

            <Suspense fallback={<FallbackLoader fixed={true} />}>
              <ProfileEdit setEditable={setEditable} />
            </Suspense>
          </div>
        </PopUp>


      )}
      {updateAbout && (


        <PopUp>

          <div className={`profile-edit-box relative w-[97vw] md:w-[80%] lg:w-[60%]  bg-white shadow  rounded-[10px]  `}>

            <Suspense fallback={<FallbackLoader fixed={true} />}>
              <UpdateAbout setUpdateAbout={setUpdateAbout} />
            </Suspense>
          </div>
        </PopUp>


      )}
      {updateSpecialization && (


        <PopUp>

          <div className={`profile-edit-box w-[97vw]  relative md:w-[80%] lg:w-[60%]  bg-white shadow  rounded-[10px] max-h-[80vh] scroll `}>

            <Suspense fallback={<FallbackLoader fixed={true} />}>
              <UpdateSpecialization specializationList={specializationList} setUpdateSpecialization={setUpdateSpecialization}
              
              />
            </Suspense>
          </div>
        </PopUp>


      )}


      {forgotePassword && (
        <Suspense fallback={<FallbackLoader fixed={true} />}>

          <ForgotePassword setForgotePassword={setForgotePassword} />
        </Suspense>
      )}
    </>
  )
})

export default ProfileSubP
