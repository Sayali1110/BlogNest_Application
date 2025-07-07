import axios from "axios";
import { Main_URL } from "../constants";

export const getTags = async () => {
  try {
    const response = await axios.get(`${Main_URL}/tags`);
    return response.data; 
  } catch (error: any) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};


