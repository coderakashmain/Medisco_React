// LocationContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);



export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({ lat: '', lng: '' });
  const [error, setError] = useState("");
  const [locationLoading,setLocationLoading] = useState(false);
  const [locationMesage,setLocationMessage] = useState('');

const getLocation = async () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  setLocationLoading(true);
  setLocationMessage('');
  setError('');

  try {
   
    const permission = await navigator.permissions.query({ name: "geolocation" });

    if (permission.state === "denied") {
      setError("Location permission denied. Please enable it in your browser settings.");
       window.alert(
        "⚠️ Location access is blocked.\n\nTo enable it:\n1️⃣ Click the 🔒 (lock) icon in your browser’s address bar.\n2️⃣ Choose 'Site settings'.\n3️⃣ Set 'Location' to 'Allow'.\n\nThen click the 'Retry Location' button."
      );
      setLocationLoading(false);
      return;
    }

    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
        setLocationMessage("Detected");
        setLocationLoading(false);
      },
      (err) => {
        if (err.code === 1) {
          setError("Permission denied. Please allow location access.");
        } else {
          setError(err.message);
        }
        setLocationLoading(false);
      }
    );
  } catch (err) {
    setError("Error checking location permission: " + err.message);
    setLocationLoading(false);
  }
};



  


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
