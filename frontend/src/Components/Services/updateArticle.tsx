import axios from 'axios';
import { Main_URL } from '../constants';

interface ArticleData {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export const updateArticle = async (
    slug: string,
    articleData: ArticleData

) => {

    const token = localStorage.getItem("token");

    const response = await axios({
        method: "PUT",
        url: `${Main_URL}/article/${slug}`,
        data: {
            article: articleData
        },
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    });
    return response.data.article;
}