import React from 'react'
import { useUserDataContext } from '../Context/Userdata'
import FallbackLoader from '../components/FallbackLoader';
import NotFound from './NotFound';
const Dashboard = () => {
    const {userdata,userDataloading} =useUserDataContext();
    if(userDataloading){
        return <FallbackLoader/>
    }
  if (!userdata) {
    return <NotFound/>; 
  }


  return (
    <div id='dashboard' className='h-screen w-full'>
        
         <div className='container w-full h-full flex items-center justify-center'>

            <h4 className='font-bold text-2xl'>DASHBOARD SECITON</h4>

        </div>
    </div>
  )
}

export default Dashboard
