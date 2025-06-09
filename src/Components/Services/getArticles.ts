import axios from "axios";
import { Main_URL } from "../constants";

export const getArticles = async (page:number, articleOnOnePage:number,tag?:string) => {
    try {
      let parameters:any={
          tag:tag,
          limit: articleOnOnePage,
          offset: page,
        }
        
      const response = await axios.get(`${Main_URL}/articles`, {
        params: parameters
        
      });
      console.log('Articles data:', response.data);
      return response.data;
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
      // Optionally rethrow or handle the error further
      throw error;
    }

};
