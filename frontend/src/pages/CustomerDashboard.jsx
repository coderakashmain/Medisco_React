


import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useCustomerData } from '../Context/CustomerData';
import FallbackLoader from '../components/FallbackLoader';
import NotFound from './NotFound';
import "./Dashboard.css"
import { NavLink, Outlet } from 'react-router-dom';
import { useScreen } from '../Context/ScreenProvider';



const CustomerDashboard = () => {
  const {customerData,customerDataloading} = useCustomerData();
  const {isMobile} = useScreen();
if (customerDataloading) {
  return <FallbackLoader />;
}
if (!customerData ) {
  return <NotFound />;
}



  return (
    <>
      <div id='dashboard' className={`w-full  ${isMobile ? 'bg-white' : 'bg-[#F4F4FF]'}`}>

        <div className='container    flex items-center justify-center '>


          <div className="dashboard-right-box flex-1 flex flex-col h-full   relative pt-100">
            <div className="dashboard-userdata-box    p-10  ">
              <div className='flex flex-row gap-10  h-full'>
                <div className='flex-grow '>

                  <div className='dashboard-subtab flex flex-row gap-30  mb-10 font-semibold' >
                    <NavLink to="/customer_dashboard" end className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Profile
                    </NavLink>
                    <NavLink to="card" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                    My Card
                    </NavLink>
                    <NavLink to="Plans" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Plans
                    </NavLink>
                    {/* <NavLink to="Plans" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Statistics
                    </NavLink> */}
                  </div>
                  <div style={{ scrollbarWidth: 'none' }} className={` w-full mt-20 min-h-252 bg-white  rounded ${isMobile ? "" : 'shadow '}`}>
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

export default CustomerDashboard
