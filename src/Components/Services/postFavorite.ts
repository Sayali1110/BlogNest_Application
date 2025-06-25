import axios from "axios"
import { Main_URL } from "../constants"

export const postFavorite = async (slug: string, isFavorited: boolean) => {
    try {
        console.log("In post favourite service", )
        const token = localStorage.getItem("token");
        const response = await axios({
            method: isFavorited ? "DELETE" : "POST",
            url: `${Main_URL}/articles/${slug}/favorite`,
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        const responseData = response.data.article;
        console.log("data for checking post", responseData)

        return response.data.article;
    }
    catch (error) {
        console.log("error", error)
    }


}