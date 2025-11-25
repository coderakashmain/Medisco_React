


import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GetQrcode } from "../APIs/GetQrcode";

export const qrDataContext = createContext();

export const useQrcode = () => {
  return useContext(qrDataContext);
};

const QrCodeProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);
  const [usertokenLoading, setUsertokenLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrcodeLoading, setQrcodeLoading] = useState(false);
  const [qrcodeError, setQrcodeError] = useState("");

  useEffect(() => {
    setUsertokenLoading(true);
    const localdata = localStorage.getItem("customerData");

    if (localdata) {
      setUserdata(JSON.parse(localdata));
    }
    setUsertokenLoading(false);
  }, []);

  // Fetch profile


  
    const fetchQrcode = async () => {
      if (!userdata?.token) return;

      setQrcodeLoading(true);
      try {
        const data = await GetQrcode(userdata.token);
        setQrCode(data);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        setQrcodeError("Failed to load profile");
      } finally {
        setQrcodeLoading(false);
      }
    };
  useEffect(() => {


    fetchQrcode();
  }, [userdata]);

  const value = useMemo(
    () => ({
      userdata,
      setUserdata,
      usertokenLoading,
      setUsertokenLoading,
      qrCode,
      qrcodeLoading,
      qrcodeError,
      fetchQrcode,
      setQrCode
    }),
    [userdata, usertokenLoading, qrCode, qrcodeLoading, qrcodeError]
  );

  return (
    <qrDataContext.Provider value={value}>
      {children}
    </qrDataContext.Provider>
  );
};

export default QrCodeProvider;

