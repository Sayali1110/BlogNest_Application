import axios from "axios";

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get("https://conduit-realworld-example-app.fly.dev/api/user", {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  return response.data.user;
};
