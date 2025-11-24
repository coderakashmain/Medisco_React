// src/APIs/UpdateSpecializationApi.js
import axios from "axios";

export const updateSpecialization = async (token, specializationIds) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/update-specialization`;

  try {
    const response = await axios.post(
      API_URL,
      {
        specialization: specializationIds,  // e.g. [1, 2]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data?.error?.message ||
        error.response.data?.message ||
        "Failed to update specialization";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
