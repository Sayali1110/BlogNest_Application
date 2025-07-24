import axios from "axios"
import { Main_URL } from "../constants";

export const userLogin = async (email: string, password: string) => {
    try {
        const { data } = await axios({
            data: { user: { email, password } },
            method: "POST",
            url: `${Main_URL}/users/login`,
        });
        const token = data?.user?.token;
        console.log("token", token)
        return { token, user: data.user };
    }
    catch (error) {
        console.error("Login API error", error);
        throw error;
    }
}

