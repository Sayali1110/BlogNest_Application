import axios from "axios"
import { Main_URL } from "../constants"

export const postFollow = async (slug: string, username: string, isFollow: boolean, favoritesCount: number) => {
    try {
        console.log("following data", slug, isFollow);
        const token = localStorage.getItem("token");
        const response = await axios({
            method: "POST",
            url: `${Main_URL}/profiles/${username}/follow`,
            data: {
                article: {
                    slug,
                    username,
                    isFollow,
                    favoritesCount
                }
            },
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("response", response);
        return response.data.profile;
    }
    catch (error) {
        console.error("error", error);

    }


}