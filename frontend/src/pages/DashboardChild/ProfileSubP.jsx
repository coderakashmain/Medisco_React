import React, { lazy, Suspense, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'

import './ProfileSubP.css'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import MuiAvatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import { useUserDataContext } from '../../Context/Userdata';
const PopUp = lazy(() => import("../../components/PopUp"))
import FallbackLoader from '../../components/FallbackLoader';
import ProfileEdit from './ProfileEdit';

import ForgotePassword from '../ForgotePassword'
import NotFound from '../NotFound'
import TimeAgo from '../../components/TimeAgo'




const ProfileSubP = React.memo(() => {
  const { userdata,profileLoading,profileDetails } = useUserDataContext();
  const [editable, setEditable] = useState(false);
  const [forgotePassword,setForgotePassword] = useState(false);

  
 useEffect(() => {
    if (editable  ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }


    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editable,forgotePassword]);



if (profileLoading) {
  return <FallbackLoader />;
}
if (!profileDetails ) {
  return <NotFound />;
}




 
  return (
    <>
      <section className='h-full w-full p-20 pb-40 sm:p-10'>

        <div className='dash-p-top-bar flex flex-row justify-between items-center '>
          <div className='flex gap-10 '>
            <div className=''>
              <Avatar username='Organisation Name' profile_pic={profileDetails?.data?.hospital_logo} size="80px" />
            </div>
            <div className='flex flex-col  align-center justify-center gap-5'>
              <h2 className='font-bold'>{profileDetails.data.hospital_name}</h2>
              <p className='text-xs text-gary'>{userdata?.data?.role}</p>
            </div>
          </div>
          <div className='flex gap-10 flex-nowrap'>
            


            <button onClick={() => setEditable(true)} className='button bg-primary rounded py-5 px-10 text-white text-xs cursor-pointer text-nowrap flex font-semibold items-center gap-5'><EditSquareIcon sx={{ height: 18, width: 18 }} /> Edit</button>
          </div>
        </div>
        <div className="dashboard-pg-profile-details mt-20">
          <ul>

            <li>
              <label htmlFor="organisatin-name">Organisation Name</label>
              <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='organisatin-name' value={profileDetails.data.hospital_name} />

            </li>

            <li>
              <label htmlFor="parson-name">Parson Name</label>
              <input type="text" value={userdata?.data?.fullname} className={`rounded outline-none p-7 text-sm px-10  opacity-80`} disabled id="parson-name" />

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
              <input type="text" value={profileDetails.data.city} className={`rounded outline-none p-7 text-sm px-10 pacity-80`} disabled id='City' />

            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input type="text" value={profileDetails.data.address} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='address' />

            </li>
            <li>
              <label htmlFor="pincode">Pincode</label>
              <input type="number" value={profileDetails.data.pincode} className={`rounded outline-none p-7 text-sm px-10   opacity-80`} disabled id='pincode' />

            </li>

          </ul>
        </div>



        <div className='mt-40'>
          <h3 className='text-sm font-bold'>My email Adress</h3>
          <div className='flex justify-between'>

            <div className='mt-20 flex gap-10  items-center'>
              <MuiAvatar sx={{ height: 35, width: 35, bgcolor: '#F4F4FF', color: 'var(--color-primary)' }}><MailIcon sx={{ height: 20, width: 20 }} /></MuiAvatar>
              <div>
                <p className='text-sm'>{profileDetails?.data?.email}</p>
                <p className='text-xs text-gary'><TimeAgo dateString={profileDetails.data.created_datetime}/></p>
              </div>

            </div>
            <div className='flex items-center'>
              <button onClick={()=>setForgotePassword(true)} style={{ padding: '5px 10px ', borderRadius: '3rem' }} className=' border border-lightgary text-sm bg-[#F4F4FF] font-bold cursor-pointer  rounded button text-primary '>Reset Password</button>

            </div>
          </div>
        </div>

      </section>
      {editable && (

        <Suspense fallback={<FallbackLoader />}>
          <PopUp>

            <div className="profile-edit-box relative md:w-[80%] lg:w-[80%] w-full  bg-white shadow max-h-[90vh] rounded-[10px] scroll">

              <ProfileEdit setEditable={setEditable} />
            </div>
          </PopUp>
        </Suspense>

      )}
   

        {forgotePassword && (
                  <ForgotePassword setForgotePassword={setForgotePassword} />
                )}
    </>
  )
})

export default ProfileSubP
