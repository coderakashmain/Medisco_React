


import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CustomerProfileApi } from "../APIs/CustomerProfleApi";

export const customerDataContext = createContext();

export const useCustomerData = () => {
  return useContext(customerDataContext);
};

const CustomerData = ({ children }) => {
  const [customerData, setCustomerData] = useState(null);
  const [customerDataloading, setcustomerDataloading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {

    const localdata = localStorage.getItem("customerData");

    if (localdata) {
      setCustomerData(JSON.parse(localdata));
    }
    setcustomerDataloading(false);
  }, []);

  // Fetch profile



  useEffect(() => {
    const fetchProfile = async () => {
      if (!customerData?.token) return;

      setProfileLoading(true);
      try {
        const data = await CustomerProfileApi(customerData.token);
        setProfileDetails(data);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        setProfileError("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [customerData]);

  const value = useMemo(
    () => ({
      customerData,
      setCustomerData,
      customerDataloading,
      setcustomerDataloading,
      profileDetails,
      profileLoading,
      profileError,
      setProfileDetails
    }),
    [customerData, customerDataloading, profileDetails, profileLoading, profileError]
  );

  return (
    <customerDataContext.Provider value={value}>
      {children}
    </customerDataContext.Provider>
  );
};

export default CustomerData;

