import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useStatesContext } from './States';

export const districtsContext = createContext();

export const useDistrictsContext = () => {
  return useContext(districtsContext);
};

const Districts = ({ children }) => {
  const [districtsList, setDistrictsList] = useState([]);
  const [state, setState] = useState('');
  const [districtLoading, setDistrictLoading] = useState(false);
  const [apisend, setApisend] = useState(false);

  const host = import.meta.env.VITE_HOST;
  const { statesList } = useStatesContext();

  
  useEffect(() => {
    if (state && statesList?.data?.length > 0) {
      const exists = statesList.data.some(
        s => s.trim().toLowerCase() === state.trim().toLowerCase()
      );
      setApisend(exists);
    } else {
      setApisend(false);
    }
  }, [state, statesList]);

  
  useEffect(() => {

    if (!apisend) {
      setDistrictsList([]);
      return;
    }

    let timeoutId;

    const getDistricts = async () => {
      if (!state) return;

      setDistrictLoading(true);
      setDistrictsList([]);

      try {
        const response = await axios.get(`${host}/admin/cities`, {
          params: { state },
        });

        setDistrictsList(response.data || []);
      } catch (error) {
        console.error('Error fetching districts:', error.response?.data || error.message);
        
      } finally {
        setDistrictLoading(false);
      }
    };

    
    timeoutId = setTimeout(() => {
      if (apisend) getDistricts();
    }, 500);

    
    return () => clearTimeout(timeoutId);
  }, [state, apisend, host]);

  const value = useMemo(
    () => ({
      districtsList,
      setDistrictsList,
      setState,
      state,
      districtLoading,
    }),
    [districtsList, state, districtLoading]
  );

  return (
    <districtsContext.Provider value={value}>
      {children}
    </districtsContext.Provider>
  );
};

export default Districts;
