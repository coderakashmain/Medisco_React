

  import axios from "axios";

export const orderCreateApi= async (token, data) => {
  const HOST = import.meta.env.VITE_HOST;
  const API_URL = `${HOST}/user/order-create`;

 

  try {
    const response = await axios.post(
      API_URL,
      {
        plan: data.plan,
        amount: data.amount,
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
        "Failed to create order.";

      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error or server not reachable");
    }
  }
};
