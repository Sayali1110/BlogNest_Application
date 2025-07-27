import axios from 'axios';
import { Main_URL } from '../constants';

export const deleteArticle = async (slug: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${Main_URL}/article/${slug}`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    return response.data;
};