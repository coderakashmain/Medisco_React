// LocationContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);



export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({ lat: '', lng: '' });
  const [error, setError] = useState("");
  const [locationLoading,setLocationLoading] = useState(false);
  const [locationMesage,setLocationMessage] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationMessage('');
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
        setLocationMessage('Detected')
        setLocationLoading(false);
      },
      (err) => {
        setError(err.message);
        setLocationLoading(false);
      }
    );
  };



  
  useEffect(() => {
    getLocation();
  }, []);

   const value = useMemo(
    () => ({ userLocation,locationMesage, error, locationLoading, getLocation }),
    [userLocation, error,locationMesage, locationLoading] 
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
