import axios from 'axios';
import { Main_URL } from '../constants';

export const tagInfo = async () => {

    try {
        const url = `${Main_URL}/dashboard/pieChart`;
        const response = await axios.get(url);
        console.log('Articles data for tags:', response.data);
        return response.data;

    } catch (error) {
        console.error("error fethcing total articles inforamtion", error);
    }

}