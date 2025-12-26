import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const ServiceListContext = createContext();

export const useServiceListContex = () => {
  return useContext(ServiceListContext);
};

const CACHE_KEY = "services_cache";
const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days

const Services = ({ children }) => {
  const [services, setServices] = useState([]);
  const host = import.meta.env.VITE_HOST;

  useEffect(() => {
    const getServices = async () => {
      try {
        // 🔹 Check cache
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isValid = Date.now() - timestamp < CACHE_DURATION;

          if (isValid) {
            setServices(data);
            return; // ✅ use cached data
          }
        }

        // 🔹 Fetch from API
        const response = await axios.get(`${host}/user/services`);
        setServices(response.data);

        // 🔹 Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: response.data,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.error("Error getting services:", err.response?.data || err.message);
      }
    };

    getServices();
  }, []);

  const value = useMemo(
    () => ({
      services,
      setServices,
    }),
    [services]
  );

  return (
    <ServiceListContext.Provider value={value}>
      {children}
    </ServiceListContext.Provider>
  );
};

export default Services;
