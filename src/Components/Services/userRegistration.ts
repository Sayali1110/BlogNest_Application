import axios from "axios";
import { Main_URL } from "../constants";

export const userRegistration = async(username: string, email: string, password: string) => {
    try {
        const { data } = await axios({
            data: { user: { username, email, password } },
            method: "POST",
            url: `${Main_URL}/users`,
        });

console.log("datafetched",data)

const token = data.user.token;
console.log("token generated", token )

return {token, user:data.user};
    }

    catch (error) {
        console.error("Error fetching tags:", error);
    }

};