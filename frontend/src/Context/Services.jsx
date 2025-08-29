import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

export const ServiceListContext = createContext();

export const useServiceListContex = ()=>{
    const context = useContext(ServiceListContext)
    return  context;
}




const Services = ({children}) => {
     const [services, setServices] = useState([]);

     useEffect(()=>{
    
    const getServices = async()=>{

        try{
           const response = await axios.get("/api/admin/services"); 
           
           setServices(response.data)
        }
        catch(err){
            console.log(err)
            console.log("Error getting data",err.response?.data);
        }

    };
    getServices();

},[])

const value = useMemo(()=>({
    services,setServices
}),[services])
  return (
    <ServiceListContext.Provider value={value}>
      {children}
    </ServiceListContext.Provider>
  )
}

export default Services
