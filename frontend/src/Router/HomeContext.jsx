import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import CustomSnackbar from '../components/Snackbar'
import ProgressBar from '../components/ProgressBar'

const HomeContext = () => {
  return (
    <>
      <ProgressBar/>
      
        <Preloader/>
        <CustomSnackbar/>
        <Navbar/>
        <Outlet/>
        <Footer/>

      
    </>
  )
}

export default HomeContext
