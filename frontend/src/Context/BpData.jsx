


import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CustomerProfileApi } from "../APIs/CustomerProfleApi";


export const BpDataContext = createContext();

export const useBpData = () => {
  return useContext(BpDataContext);
};

const BpData = ({ children }) => {
  const [bpData, setBpData] = useState(null);
  const [bpDataloading, setBpDataloading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    setBpDataloading(true);
    const localdata = localStorage.getItem("bpdata");

    if (localdata) {
      setBpData(JSON.parse(localdata));
    }
    setBpDataloading(false);
  }, []);

  // Fetch profile



  useEffect(() => {
    const fetchProfile = async () => {
      if (!bpData?.token) return;

      setProfileLoading(true);
      try {
        const data = await CustomerProfileApi(bpData.token);
        setProfileDetails(data);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        setProfileError("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [bpData]);



  const value = useMemo(
    () => ({
      bpData,
      bpDataloading,
      setBpData,
      profileDetails,
      profileLoading,
      profileError,
      setProfileDetails
    }),
    [bpData, bpDataloading, profileDetails, profileLoading, profileError]
  );

  return (
    <BpDataContext.Provider value={value}>
      {children}
    </BpDataContext.Provider>
  );
};

export default BpData;

