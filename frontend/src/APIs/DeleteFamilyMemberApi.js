// src/APIs/DeleteFamilyMemberApi.js
import axios from "axios";

export const deleteFamilyMember = async (token, memberId) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/api/user/family-member/${memberId}`;

  try {
    const response = await axios.patch(
      API_URL,
      {}, // PATCH with empty body
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
        "Failed to delete family member";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
