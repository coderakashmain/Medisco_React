
    import axios from "axios";

    export const UploadPhoto = async (token, file, type) => {
        const HOST = import.meta.env.VITE_HOST;
        const API_URL = `${HOST}/user/uploadimage`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

       



        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Error:", error.response.data);
                throw new Error(error.response.data?.error?.message || "Upload failed");
            } else {
                console.error("Error:", error.message);
                throw new Error("Network error or server not reachable");
            }
        }
    };
