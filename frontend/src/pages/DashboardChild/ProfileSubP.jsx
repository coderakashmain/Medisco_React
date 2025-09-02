import React from 'react'
import Avatar from '../../components/Avatar'
import profilelog from '../../assets/img/text-profile.png'
import './ProfileSubP.css'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import MuiAvatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import { useUserDataContext } from '../../Context/Userdata';

const ProfileSubP = () => {
  const { userdata } = useUserDataContext();
console.log(userdata);
  if(!userdata) return null;
  return (
    <section className='h-full w-full p-20 pb-40 sm:p-10'>

      <div className='dash-p-top-bar flex flex-row justify-between items-center '>
        <div className='flex gap-10 '>
          <div className=''>
            <Avatar username='Organisation Name' profile_pic={profilelog} size="100px" />
          </div>
          <div className='flex flex-col  align-center justify-center gap-5'>
            <h2 className='font-bold'>Organisation name</h2>
            <p className='text-xs text-gary'>{userdata?.data?.role}</p>
          </div>
        </div>
        <div>
          <button className='button bg-primary rounded py-5 px-24 text-white text-xs cursor-pointer text-nowrap flex items-center gap-5'><EditSquareIcon sx={{ height: 18, width: 18 }} /> Edit</button>
        </div>
      </div>
      <div className="dashboard-pg-profile-details mt-20">
        <ul>

          <li>
            <label htmlFor="organisatin-name">Organisation Name</label>
            <input type="text" className='rounded outline-none p-7 text-sm px-10 ' disabled id='organisatin-name' />

          </li>

          <li>
            <label htmlFor="parson-name">Parson Name</label>
            <input type="text" value={userdata?.data?.fullname} className='rounded outline-none p-7 text-sm px-10 ' disabled id="parson-name" />

          </li>
          <li>
            <label htmlFor="email">Email </label>
            <input type="email" value={userdata?.data?.email} className='rounded outline-none p-7 text-sm px-10 ' disabled id='email' />

          </li>
          <li>
            <label htmlFor="mobile-no">Contact Number </label>
            <input type="number" className='rounded outline-none p-7 text-sm px-10' disabled id='mobile-no' />

          </li>
          <li>
            <label htmlFor="state">State </label>
            <input type="number" className='rounded outline-none p-7 text-sm px-10' disabled id='state' />

          </li>
          <li>
            <label htmlFor="state">City </label>
            <input type="text" className='rounded outline-none p-7 text-sm px-10' disabled id='City' />

          </li>
        
          <li>
            <label htmlFor="address">Address</label>
            <input type="text" className='rounded outline-none p-7 text-sm px-10' disabled id='address' />

          </li>
          <li>
            <label htmlFor="pincode">Pincode</label>
            <input type="number" className='rounded outline-none p-7 text-sm px-10' disabled id='pincode' />

          </li>

        </ul>
      </div>



      <div className='mt-40'>
        <h3 className='text-sm font-bold'>My email Adress</h3>
        <div className='flex justify-between'>

          <div className='mt-20 flex gap-10  items-center'>
            <MuiAvatar sx={{ height: 35, width: 35, bgcolor: '#F4F4FF', color: 'var(--color-primary)' }}><MailIcon sx={{ height: 20, width: 20 }} /></MuiAvatar>
            <div>
              <p className='text-sm'>{userdata?.data?.email}</p>
              <p className='text-xs text-gary'>1 month ago</p>
            </div>

          </div>
          <div className='flex items-center'>
          <button style={{padding :'5px 10px ' , borderRadius : '3rem'}} className=' border border-lightgary text-sm bg-[#F4F4FF] font-bold cursor-pointer  rounded button text-primary '>Reset Password</button>

          </div>
        </div>
      </div>

    </section>
  )
}

export default ProfileSubP
