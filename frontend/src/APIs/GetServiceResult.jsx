import axios from "axios";




export const GetServiceResult = async (token, data) => {




  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/search-service-provider`;



  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        state: data.state,
        city: data.city,
        service_id: data.service_id,
        organization_name:data.organization_name
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
