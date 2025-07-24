import axios from "axios";
import { Main_URL } from "../constants";

export const postComment = async (slug: string, body: string,) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios({
            data: { comment: { body } },
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            url: `${Main_URL}/article/${slug}/comments`,
        });
        return (data.comment);
    }
    catch (error) {
        console.error(error);
    }
}