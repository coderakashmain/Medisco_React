


import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CustomerProfileApi } from "../APIs/CustomerProfleApi";


export const BdoDataContext = createContext();

export const useBdoData = () => {
  return useContext(BdoDataContext);
};

const BdoData = ({ children }) => {
  const [bdoData, setBdoData] = useState(null);
  const [bdoDataloading, setBdoDataloading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    setBdoDataloading(true);
    const localdata = localStorage.getItem("bdodata");

    if (localdata) {
      setBdoData(JSON.parse(localdata));
    }
    setBdoDataloading(false);
  }, []);

  // Fetch profile



  useEffect(() => {
    const fetchProfile = async () => {
      if (!bdoData?.token) return;

      setProfileLoading(true);
      try {
        const data = await CustomerProfileApi(bdoData.token);
        setProfileDetails(data);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        setProfileError("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [bdoData]);



  const value = useMemo(
    () => ({
      bdoData,
      bdoDataloading,
      setBdoData,
      profileDetails,
      profileLoading,
      profileError,
      setProfileDetails
    }),
    [bdoData, bdoDataloading, profileDetails, profileLoading, profileError]
  );

  return (
    <BdoDataContext.Provider value={value}>
      {children}
    </BdoDataContext.Provider>
  );
};

export default BdoData;

