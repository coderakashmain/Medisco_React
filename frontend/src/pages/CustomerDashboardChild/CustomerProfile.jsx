import React, { Suspense, useState } from 'react'
import { useCustomerData } from '../../Context/CustomerData'
import { useScreen } from '../../Context/ScreenProvider';
import FallbackLoader from '../../components/FallbackLoader';
import NotFound from '../NotFound';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import Avatar from '../../components/Avatar';
import '../DashboardChild/ProfileSubP.css'
import PopUp from '../../components/PopUp';
import ForgotePassword from '../ForgotePassword';
import CustomerProfileEdit from './CustomerProfileEdit';
const CustomerProfile = () => {
    const { customerDataloading, profileDetails: customerProfileDetails } = useCustomerData();
    const { isMobile } = useScreen();
    const [editable, setEditable] = useState(false);
    const [forgotePassword, setForgotePassword] = useState(false);



    if (customerDataloading) {
        return <FallbackLoader />;
    }
    if (!customerProfileDetails) {
        return <NotFound />;
    }




    return (
        <>
        <section className={`h-full w-full ${isMobile ? "pt-10 " : ' p-20  sm:p-10'} pb-20`}>


            <div className='dash-p-top-bar flex flex-row justify-between items-center '>
                <div className='flex gap-10 max-sm:gap-5 '>
                    <div className=''>
                        <Avatar username={customerProfileDetails?.data?.first_name} profile_pic={customerProfileDetails?.data?.photo} size={isMobile ? '50px' : '80px'} />
                    </div>
                    <div className='flex flex-col  align-center justify-center max-sm:gap-3 gap-5'>
                        <h2 className='font-bold max-sm:text-sm text-2xl'>{customerProfileDetails.data.first_name}</h2>
                        <p className='text-xs text-gary'> {customerProfileDetails?.data?.user_name}</p>

                    </div>
                </div>
                <div className='flex gap-10 flex-nowrap items-center'>

                    <button onClick={() => setEditable(true)} className='button bg-primary rounded py-5 px-10 text-white text-xs cursor-pointer text-nowrap flex font-semibold items-center gap-5'><EditSquareIcon sx={{ height: 18, width: 18 }} /> Edit</button>
                </div>
            </div>

            <div className="dashboard-pg-profile-details mt-20">
                <ul>
                    <li>
                        <label htmlFor="name"> Name</label>
                        <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='name' value={customerProfileDetails.data.first_name} />

                    </li>
                    <li>
                        <label htmlFor="email"> Email</label>
                        <input type="text" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='email' value={customerProfileDetails.data.email} />

                    </li>
                    <li>
                        <label htmlFor="mobileno"> Mobile</label>
                        <input type="number" className={`rounded outline-none p-7 text-sm px-10 opacity-80`} disabled id='mobileno' value={customerProfileDetails.data.mobileno} />

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
            </div>

        </section>

              {editable && (


        <PopUp>

          <div className={`profile-edit-box relative md:w-[80%] lg:w-[80%] w-full  bg-white shadow ${isMobile ? "max-h-[80vh]" : 'max-h-[90vh]'}  rounded-[10px] scroll`}>

            <Suspense fallback={<FallbackLoader fixed={true} />}>
              <CustomerProfileEdit setEditable={setEditable}/>
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
}

export default CustomerProfile
