import axios from 'axios';
import { Main_URL } from '../constants';

export const downloadActivity = async () => {

    try {
        const url = `${Main_URL}/dashboard/downloadActivity`;
        const response = await axios.get(url);
        console.log('All dowloading history', response.data);
        return response.data;

    } catch (error) {
        console.error("error fethcing downloads inforamtion", error);
    }

}