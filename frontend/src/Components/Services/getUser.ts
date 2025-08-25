import axios from "axios";
import { Main_URL } from "../constants";

export const getUser = async () => {
  console.log("in get user function");
  const token = localStorage.getItem("token");

  if (!token) return null;

  const response = await axios.get(`${Main_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  return response.data.user || response.data;
};
