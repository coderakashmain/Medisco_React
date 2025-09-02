// LocationContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);



export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };



  // Fetch location on mount (optional)
  useEffect(() => {
    getLocation();
  }, []);

   const value = useMemo(
    () => ({ userLocation, error, loading, getLocation }),
    [userLocation, error, loading] 
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
