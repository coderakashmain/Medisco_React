


// src/APIs/UpdateProfileApi.js
import axios from "axios";


export const UpdateCustomerProfileApi = async (token, payload) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/update-customer-profile`;

  


  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data.error.message || "Update failed");
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};

