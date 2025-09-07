import { useState, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomeContext from './Router/HomeContext';
import Home from './pages/Home';
import Services from './Context/Services';
import States from './Context/States';
import Districts from './Context/Districts';
import Loading from './components/Loading';
import Userdata from './Context/Userdata';
import FallbackLoader from './components/FallbackLoader';
import GlobalRouter from './Router/GlobalRouter';
import { LocationProvider } from './Context/LocationProvider ';
import SnackbarProvider from './Context/SnackbarContext';
import ScreenProvider from './Context/ScreenProvider';


const ProfileSubP = lazy(() => import("./pages/DashboardChild/ProfileSubP"));
const DiscountSubp = lazy(() => import("./pages/DashboardChild/DiscountSubp"));
const Photos = lazy(() => import("./pages/DashboardChild/Photos"));
const Statistics = lazy(() => import("./pages/DashboardChild/Statistics"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SearchList = lazy(() => import("./pages/SearchList"));




function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><ScreenProvider><SnackbarProvider><LocationProvider><Userdata><Services><States><Districts><GlobalRouter /></Districts></States></Services></Userdata></LocationProvider></SnackbarProvider></ScreenProvider></>,
      children: [
        {
          path: '',
          element: <><HomeContext /></>,
          children: [
            {
              path: '*',
              element: <><Suspense fallback={<FallbackLoader />}><NotFound /></Suspense></>
            },
            {
              path: '',
              element: <><Home /></>
            },
            {
              path: '/search_result',
              element: <><Suspense fallback={<FallbackLoader />}><SearchList /></Suspense></>
            },

            {
              path: '/servicedetails/:service_id/:service_name',
              element: <><Suspense fallback={<FallbackLoader />}><ServiceDetails /></Suspense></>
            },
             {
          path: '/dashboard',
          element: <><Suspense fallback={<FallbackLoader />}><Dashboard /></Suspense></>,
          children : [
            {
              path : '',
              element : <><Suspense fallback={<FallbackLoader  size="20vh"/>}><ProfileSubP /></Suspense></>
            },
            {
              path : 'discount',
              element : <><Suspense fallback={<FallbackLoader size="20vh" />}><DiscountSubp/></Suspense></>
            },
            {
              path : 'photos',
              element : <><Suspense fallback={<FallbackLoader  size="20vh"/>}><Photos/></Suspense></>
            },
            {
              path : 'statistics',
              element : <><Suspense fallback={<FallbackLoader size="20vh" />}><Statistics/></Suspense></>
            },
            
          ]
        }
          ]
        },
        {
          path: '/reset-password',
          element: <><Suspense fallback={<FallbackLoader />}><ResetPassword /></Suspense></>
        },
       
      ]
    }


  ])


  return (

    <RouterProvider router={router} />



  )
}

export default App
