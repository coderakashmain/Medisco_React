import axios from "axios";

export const UpdateDiscountsApi = async (token, discountList) => {



      
    const HOST = import.meta.env.VITE_HOST;
    const API_URL = `${HOST}/user/update-discount`;
    try {
        const response = await axios.post(
                API_URL,
            {
                discount_on: discountList.map((item) => ({
                    id: item.id,
                    discount: Number(item.discount)
                })),
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
        console.error("UpdateDiscountsApi error:", error);
        throw error.response?.data || error;
    }
};
