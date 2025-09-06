// src/APIs/GetDiscountsByServiceApi.js
import axios from "axios";

export const SavePhoto = async (token, file) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/update-images`;
    

  try {
    const response = await axios.post(API_URL,{images : file}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.error?.message || "Failed to fetch discounts";
      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
