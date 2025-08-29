import { useState ,lazy, Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './fonts.googleapis.com/css22dc9.css'
import './App.css'
import HomeContext from './Router/HomeContext';
import Home from './pages/home';
import Services from './Context/Services';
import States from './Context/States';
import Districts from './Context/Districts';






function App() {

  const router = createBrowserRouter( [
   
    {
      path : '/',
      element : <><Services><States><Districts><HomeContext/></Districts></States></Services></>,
      children : [
        {
          path : '',
          element : <><Home/></>
        }
      ]
    }
  ])


  return (
 
    <RouterProvider router={router} />
 
     

  )
}

export default App
