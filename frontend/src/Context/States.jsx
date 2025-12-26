import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const statesContext = createContext();

export const useStatesContext = () => {
  return useContext(statesContext);
};

const CACHE_KEY = "states_cache";
const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days

const States = ({ children }) => {
  const [statesList, setStatesList] = useState([]);
  const [stateLoading, setStateLoading] = useState(false);
  const host = import.meta.env.VITE_HOST;

  useEffect(() => {
    const loadStates = async () => {
      setStateLoading(true);

      try {
        // 🔹 Check cache
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isValid = Date.now() - timestamp < CACHE_DURATION;

          if (isValid) {
            setStatesList(data);
            setStateLoading(false);
            return; // ✅ use cache
          }
        }

        // 🔹 Fetch from API
        const response = await axios.get(`${host}/admin/states`);
        setStatesList(response.data);

        // 🔹 Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: response.data,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error(
          "Error fetching states:",
          error.response?.data || error.message
        );
      } finally {
        setStateLoading(false);
      }
    };

    loadStates();
  }, []);

  const value = useMemo(
    () => ({
      statesList,
      setStatesList,
      stateLoading,
    }),
    [statesList, stateLoading]
  );

  return (
    <statesContext.Provider value={value}>
      {children}
    </statesContext.Provider>
  );
};

export default States;
