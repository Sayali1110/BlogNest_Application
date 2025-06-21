export const userLogout = () => {
    localStorage.removeItem("loggedUser");

    return {
        isAuth: false,
        user: {
            token: "",
            user: {
                bio: null,
                email: "",
                image: null,
                token: "",
                username: "",
            }
        },
    };
} 