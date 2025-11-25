// src/APIs/updateCardNo.js
import axios from "axios";

export const updateCardNo = async (token, cardNo) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/update-cardno`;

  try {
    const response = await axios.post(
      API_URL,
      {
        card_no: cardNo,   
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
        "Failed to update card number";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
