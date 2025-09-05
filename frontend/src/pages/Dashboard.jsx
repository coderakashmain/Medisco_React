import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useUserDataContext } from '../Context/Userdata'
import FallbackLoader from '../components/FallbackLoader';
import NotFound from './NotFound';
import "./Dashboard.css"
import { NavLink, Outlet } from 'react-router-dom';
import { ProfilApi } from '../APIs/ProfileApi';




const Dashboard = () => {
  const { userdata, userDataloading,profileLoading,profileError } = useUserDataContext();
  const [profileDetails, setProfileDetails] = useState();
  const [error, setError] = useState("");

if (userDataloading) {
  return <FallbackLoader />;
}
if (!userdata ) {
  return <NotFound />;
}



  return (
    <>
      <div id='dashboard' className='w-full min-h-screen  bg-[#F4F4FF]'>

        <div className='container    flex items-center justify-center '>


          <div className="dashboard-right-box flex-1 flex flex-col h-full   relative pt-100">
            <div className="dashboard-userdata-box    p-10  ">
              <div className='flex flex-row gap-10  h-full'>
                <div className='flex-grow '>

                  <div className='dashboard-subtab flex flex-row gap-30  mb-10 font-semibold' >
                    <NavLink to="/dashboard" end className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''}`
                    }>
                      Profile
                    </NavLink>
                    <NavLink to="discount" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''}`
                    }>
                      Discount
                    </NavLink>
                    <NavLink to="photos" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''}`
                    }>
                      Photos
                    </NavLink>
                    <NavLink to="statistics" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''}`
                    }>
                      Statistics
                    </NavLink>
                  </div>
                  <div style={{ scrollbarWidth: 'none' }} className=' w-full mt-20 min-h-252 bg-white  rounded shadow'>
                    <Outlet />
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>





      </div>

    </>
  )
}

export default Dashboard
