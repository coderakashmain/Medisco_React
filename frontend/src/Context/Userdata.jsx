import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProfilApi } from "../APIs/ProfileApi";

export const userDataContext = createContext();

export const useUserDataContext = () => {
  return useContext(userDataContext);
};

const Userdata = ({ children }) => {
  const [userdata, setUserdata] = useState(null);
  const [userDataloading, setUserDataLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    setUserDataLoading(true);
    const localdata = localStorage.getItem("userdata");

    if (localdata) {
      setUserdata(JSON.parse(localdata));
    }
    setUserDataLoading(false);
  }, []);

  // Fetch profile

  const fetchProfile = async () => {
      if (!userdata?.token) return;

      setProfileLoading(true);
      try {
        const data = await ProfilApi(userdata.token);
        setProfileDetails(data);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        setProfileError("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, [userdata]);

  const value = useMemo(
    () => ({
      userdata,
      setUserdata,
      userDataloading,
      setUserDataLoading,
      profileDetails,
      profileLoading,
      profileError,
      setProfileDetails,
      fetchProfile
    }),
    [userdata, userDataloading, profileDetails, profileLoading, profileError]
  );

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default Userdata;
