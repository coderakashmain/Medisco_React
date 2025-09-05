import axios from "axios";




export const ProfilApi = async (token) => {

      if (!token) {
    throw new Error("User not authorized.");
  }


    const HOST = import.meta.env.VITE_HOST;
    const API_URL =     `${HOST}/user/profile`;
 
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

 
    return response.data;
  } catch (error) {
   
    if (error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data.message || "Request failed");
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
