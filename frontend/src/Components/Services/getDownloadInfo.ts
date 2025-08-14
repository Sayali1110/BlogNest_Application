import axios from 'axios';
import { Main_URL } from '../constants';

export const downloadInfo = async () => {

    try {
        const url = `${Main_URL}/dashboard/barChart`;
        const response = await axios.get(url);
        console.log('Articles data for downlods:', response.data);
        return response.data;

    } catch (error) {
        console.error("error fethcing downloads inforamtion", error);
    }

}