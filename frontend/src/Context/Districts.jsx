import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const districtsContext = createContext();

export const useDistrictsContext = () => {
  return useContext(districtsContext);
};




const Districts = ({ children }) => {
  const [districtsList, setDistrictsList] = useState([]);
  const [state,setState] = useState('');
  const [districtLoading,setDistrictLoading] = useState(false);
  const host = import.meta.env.VITE_HOST;
 

  useEffect(() => {
    
    const getDistricts = async () => {
     if (!state) {
      setDistrictsList([]);
      return;
     }
     setDistrictLoading(true);
     setDistrictsList([]);
      try {
        const response = await axios.get(`${host}/admin/cities`,{
            params : {state}
        });
       
        setDistrictsList(response.data);
    
      } catch (error) {
        console.error("Error fetching districts:", error.response?.data || error.message);
      }finally{
        setDistrictLoading(false)
      }
    };

    getDistricts();
  }, [state]); 



  const value = useMemo(() => ({
    districtsList,
    setDistrictsList,
    setState,
    state,
    districtLoading
  }), [districtsList, state, districtLoading,setState]);

  return (
    <districtsContext.Provider value={value}>
      {children}
    </districtsContext.Provider>
  );
};

export default Districts;
