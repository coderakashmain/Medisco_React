import { useState ,lazy, Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomeContext from './Router/HomeContext';
import Home from './pages/home';
import Services from './Context/Services';
import States from './Context/States';
import Districts from './Context/Districts';
import Loading from './components/Loading';
import Userdata from './Context/Userdata';
import FallbackLoader from './components/FallbackLoader';






const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SearchList = lazy(() => import("./pages/SearchList"));




function App() {

  const router = createBrowserRouter( [
   
    {
      path : '/',
      element : <><Userdata><Services><States><Districts><HomeContext/></Districts></States></Services></Userdata></>,
      children : [
        {
          path : '*',
          element : <><Suspense fallback={<FallbackLoader/>}><NotFound/></Suspense></>
        },
        {
          path : '',
          element : <><Home/></>
        },
        {
          path : '/search_result/:state/:district/:service',
          element :<><Suspense fallback={<FallbackLoader/>}><SearchList/></Suspense></>
        },
        {
          path : '/dashboard',
          element :<><Suspense fallback={<FallbackLoader/>}><Dashboard/></Suspense></>
        },
        {
          path : '/servicedetails/:service_id/:service_name',
          element :<><Suspense fallback={<FallbackLoader/>}><ServiceDetails/></Suspense></>
        },
      ]
    },
    {
      path : '/reset-password',
      element : <><Suspense fallback={<FallbackLoader/>}><ResetPassword/></Suspense></>
    }
  ])


  return (
 
    <RouterProvider router={router} />
 
     

  )
}

export default App
