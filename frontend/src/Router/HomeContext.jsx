import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import CustomSnackbar from '../components/Snackbar'

const HomeContext = () => {
  return (
    <div className=''>
      
        <Preloader/>
        <CustomSnackbar/>
        <Navbar/>
        <Outlet/>
        <Footer/>

      
    </div>
  )
}

export default HomeContext
