import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const districtsContext = createContext();

export const useDistrictsContext = () => {
  return useContext(districtsContext);
};




const Districts = ({ children }) => {
  const [districtsList, setDistrictsList] = useState([]);
  const [state,setState] = useState('');
 

  useEffect(() => {
    
    const getDistricts = async () => {
     if (!state) return;
      try {
        const response = await axios.get("/api/admin/cities",{
            params : {state}
        });
        setDistrictsList(response.data);
    
      } catch (error) {
        console.error("Error fetching districts:", error.response?.data || error.message);
      }
    };

    getDistricts();
  }, [state]); 

  const value = useMemo(() => ({
    districtsList,
    setDistrictsList,
    setState,
    state
  }), [districtsList, state, setDistrictsList, setState]);

  return (
    <districtsContext.Provider value={value}>
      {children}
    </districtsContext.Provider>
  );
};

export default Districts;
