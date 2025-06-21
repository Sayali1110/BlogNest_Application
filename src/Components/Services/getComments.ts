import axios from "axios";
import { Main_URL } from "../constants";

export const getComments = async (slug:string) => {
  try {
    console.log("Slug to fetch comments:",slug);

    const response = await axios.get(`${Main_URL}/articles/${slug}/comments`);
     console.log("comments",response.data ) 
    return response.data;
   
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};