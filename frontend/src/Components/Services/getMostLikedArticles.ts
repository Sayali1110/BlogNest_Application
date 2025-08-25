import axios from "axios";
import { Main_URL } from "../constants";

export const getLikedArticles = async () => {
    try {
         const url = `${Main_URL}/dashboard/mostLikedArticles`;
        const response = await axios.get(url);
        console.log('Articles data for downlods:', response.data);
        return response.data;
    } catch (error) {
        console.error("error fethcing most liked inforamtion", error);
    }

}