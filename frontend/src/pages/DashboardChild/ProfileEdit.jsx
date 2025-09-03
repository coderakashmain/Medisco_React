
import React, { lazy, useState } from 'react'
import Avatar from '../../components/Avatar'
import profilelog from '../../assets/img/text-profile.png'
import './ProfileSubP.css'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useUserDataContext } from '../../Context/Userdata';




const ProfileEdit = ({ setEditable }) => {
    const { userdata } = useUserDataContext();
    const [editData, setEditData] = useState({
        organisation_name: '',
        person_name: userdata?.data?.fullname || '',
        mobile_no: null,
        state: '',
        city: '',
        address: '',
        pincdoe: null
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
 
        setEditData({
            ...editData,
            [name]: value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
    }


    return (
        <>
            <section className='h-full w-full p-20 pb-80 sm:p-10'>
                <form onSubmit={handleSubmit}>
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
                            <button onClick={() => { setEditable(false) }} className='close-btn  '><i className="fa-solid fa-xmark"></i></button>
                        
                        </div>
                    </div>
                    <div className="dashboard-pg-profile-details mt-20">
                        <ul>

                            <li>
                                <label htmlFor="organisatin-name">Organisation Name</label>
                                <input type="text" onChange={handleChange} name='organisation_name' value={editData.organisation_name} className={`rounded outline-none p-7 text-sm px-10 `} id='organisatin-name' />

                            </li>

                            <li>
                                <label htmlFor="parson-name">Parson Name</label>
                                <input type="text" onChange={handleChange} name='person_name' value={editData.person_name} className={`rounded outline-none p-7 text-sm px-10 `} id="parson-name" />

                            </li>
                            <li>
                                <label htmlFor="email">Email </label>
                                <input type="email" value={userdata?.data?.email} name='email' className='rounded outline-none p-7 text-sm px-10 opacity-80 ' disabled id='email' />

                            </li>
                            <li>
                                <label htmlFor="mobile-no">Contact Number </label>
                                <input onChange={handleChange} value={editData.mobile_no} name='mobile_no' type="number" className={`rounded outline-none p-7 text-sm px-10  `} id='mobile-no' />

                            </li>
                            <li>
                                <label htmlFor="state">State </label>
                                <input type="number" onChange={handleChange} name='state' value={editData.state} className={`rounded outline-none p-7 text-sm px-10  `} id='state' />

                            </li>
                            <li>
                                <label htmlFor="state">City </label>
                                <input type="text" onChange={handleChange} name='city' value={editData.city} className={`rounded outline-none p-7 text-sm px-10  `} id='City' />

                            </li>

                            <li>
                                <label htmlFor="address">Address</label>
                                <input type="text" onChange={handleChange} name='address' value={editData.address} className={`rounded outline-none p-7 text-sm px-10  `} id='address' />

                            </li>
                            <li>
                                <label htmlFor="pincode">Pincode</label>
                                <input type="number" onChange={handleChange} name='pincdoe' value={editData.pincdoe} className={`rounded outline-none p-7 text-sm px-10 `} id='pincode' />

                            </li>

                        </ul>
                    </div>
                    <div>
                        <button type='submit' className='button bloack float-right bg-primary rounded py-5 px-24 mt-30 text-white text-xs cursor-pointer text-nowrap flex items-center gap-5'>Save</button>
                    </div>

                </form>




            </section>

        </>
    )
}

export default ProfileEdit
