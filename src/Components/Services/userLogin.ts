import axios from "axios"
import { Main_URL } from "../constants";

export const userLogin = async (email: string, password: string) => {

    try {
        const { data } = await axios({
            data: { user: { email, password } },
            method: "POST",
            url: `${Main_URL}/users/login`,
        });

        console.log("login data fetched ", data)

        const token = data.user.token;
        console.log("token generated after login", token)

        return { token, user: data.user };
    }

    catch (error) {
        console.error(error);

    }



}