

import React from 'react'
import FallbackLoader from '../../components/FallbackLoader';
import NotFound from '../NotFound';
import "../Dashboard.css"
import { NavLink, Outlet } from 'react-router-dom';
import { useScreen } from '../../Context/ScreenProvider';
import { useBpData } from '../../Context/BpData';



const BpDashboard = () => {
  const { bpData , bpDataloading } = useBpData();
  const {isMobile} = useScreen();

if (bpDataloading) {
  return <FallbackLoader />;
}
if (!bpData ) {
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
                    <NavLink to="/professionalbp_dashboard" end className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Dashboard
                    </NavLink>
                    <NavLink to="commission" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Commission
                    </NavLink>
                    <NavLink to="customer_list" className={({ isActive }) =>
                      `rounded shadow ${isActive ? 'sub-tab-active' : ''} ${isMobile ? 'bg-[#F4F4FF]' : 'bg-white'}`
                    }>
                      Customer
                    </NavLink>
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

export default BpDashboard

