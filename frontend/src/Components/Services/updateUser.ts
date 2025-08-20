import axios from "axios";
import { Main_URL } from "../constants";

export const updateUser = async (profileData: any) => {
    try {
        console.log("profiledata", profileData);
        const token = localStorage.getItem("token");
        console.log("update profile token", token);
        const response = await axios.put(`${Main_URL}/user/update`, profileData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("resposnse from service f", response);

        return response.data;
    } catch (error: any) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
