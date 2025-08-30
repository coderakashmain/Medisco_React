import { useState ,lazy, Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomeContext from './Router/HomeContext';
import Home from './pages/home';
import Services from './Context/Services';
import States from './Context/States';
import Districts from './Context/Districts';
import Loading from './components/Loading';


const SearchList = lazy(() => import("./pages/SearchList"));




function App() {

  const router = createBrowserRouter( [
   
    {
      path : '/',
      element : <><Services><States><Districts><HomeContext/></Districts></States></Services></>,
      children : [
        {
          path : '',
          element : <><Home/></>
        },
        {
          path : '/search_result/:state/:district/:service',
          element :<><Suspense fallback={<div className='h-screen flex align-center justify-center'><Loading size='30px' /></div>}><SearchList/></Suspense></>
        }
      ]
    }
  ])


  return (
 
    <RouterProvider router={router} />
 
     

  )
}

export default App
