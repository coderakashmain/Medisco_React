// src/APIs/GetCustomerListApi.js
import axios from "axios";

export const getCustomerList = async (token) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/customer-list`;
  
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
      const errorMessage =
        error.response.data?.error?.message ||
        error.response.data?.message ||
        "Failed to fetch customer list";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
