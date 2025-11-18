
// src/APIs/UpdateProfileApi.js
import axios from "axios";


export const GetQrcode = async (token, payload) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/qrcode`;



  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data.error.message || "Getting Qr failed");
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};


