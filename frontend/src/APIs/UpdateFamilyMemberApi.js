// src/APIs/UpdateFamilyMemberApi.js
import axios from "axios";

export const updateFamilyMember = async (token, memberId, familyMemberData) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/api/user/family-member/${memberId}`;

  try {
    const response = await axios.put(
      API_URL,
      {
        name: familyMemberData.name,
        dob: familyMemberData.dob,
        aadhar: familyMemberData.aadhar,
        aadhar_photo: familyMemberData.aadhar_photo,
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
        "Failed to update family member";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
