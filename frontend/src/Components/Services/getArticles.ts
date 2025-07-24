import axios from "axios";
import { Main_URL } from "../constants";
import { useContext } from "react";
import { UserContext } from "../../App";

export const getArticles = async (page: number, articleOnOnePage: number, tag?: string, token?: string, isFeed?: boolean, author?: string, favorited?: string) => {

  try {
    let parameters: any = {
      // tag: tag,
      // author:author,
      // favorited : favorited,
      limit: articleOnOnePage,
      offset: page,
    }

    if (tag) parameters.tag = tag;
    if (favorited) {
      parameters.favorited = favorited
    }
    else {
      if (author) parameters.author = author;
    }
    
    const headers = token ? { Authorization: `Token ${token}`} : {};

     const url = isFeed ? `${Main_URL}/articles/feed` : `${Main_URL}/articles`;
  

    const response = await axios.get(url, {
      params: parameters,
      headers,
     
    });

    console.log('Articles data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
