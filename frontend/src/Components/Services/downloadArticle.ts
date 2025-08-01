import axios from "axios";
import { Main_URL } from "../constants";

export const download = async (slug: string) => {
    try {
        const token = localStorage.getItem('token');
        console.log("checking token for downloading", token);

        return axios({
            method: "POST",
            url: `${Main_URL}/article/${slug}/download`,
            headers: {
                Authorization: `Token ${token}`,
            },
        });

    } catch (error) {
        console.error("error while downloading article", error);
        throw error;
    }
}
