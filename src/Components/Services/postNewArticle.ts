import axios from "axios";
import { Main_URL } from "../constants";

export const postNewArticle = async (
  body: string,
  description: string,
  tagList: string[],
  title: string
) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetched token from localStorage:", token);
    const response = await axios({
      method: "POST",
      url: `${Main_URL}/articles`,
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.article;
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
};
