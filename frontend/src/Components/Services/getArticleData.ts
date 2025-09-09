import axios from "axios";
import { Main_URL } from "../constants";

export const getArticleData = async (slug:string) => {
  try {
    console.log("Slug to fetch artcile data:",slug);

    const response = await axios.get(`${Main_URL}/articles/${slug}/articleData`);
     console.log("cdata",response.data ) 
    return response.data;
   
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};