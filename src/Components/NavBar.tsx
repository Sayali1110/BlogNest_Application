import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar:React.FC = () =>{
    
    const location = useLocation();

    return(
        <AppBar sx={{backgroundColor:"white" ,color:"pink"}}>
            <Toolbar>
                <Typography
                variant="h6"
                sx={{
                flexGrow: 1,
                color: "#e91e63",
                fontWeight: 700,
                textAlign: "left",
                minWidth: 100,
                "&:hover":{
                    color:"#d81b60"
                }
                }}
                component={Link} to="/"
                >
                    Sharelit
                </Typography>


                <Box display={"flex"} gap="2">

                    <Button component={Link} to="/" 
                    sx={{
                        backgroundColor: location.pathname === "/" ? "#e91e63" : "transparent",
                        color: location.pathname === "/" ? "white" : "#e91e63",
                        "&:hover": {
                        backgroundColor: "#fdecef",
                        color: "#880e4f",
                        },
                    }}
                    >
                    Home
                    </Button>

                    <Button component={Link} to='/login' 
                    sx={{
                        backgroundColor: location.pathname === "/login" ? "#e91e63" : "transparent",
                        color: location.pathname === "/login" ? "white" : "#e91e63",
                        "&:hover": {
                        backgroundColor: "#fdecef",
                        color: "#880e4f",
                        },
                    }}
                    >
                    Login
                    </Button>

                    <Button component={Link} to="/signup" 
                    sx={{
                        backgroundColor: location.pathname === "/signup" ? "#e91e63" : "transparent",
                        color: location.pathname === "/signup" ? "white" : "#e91e63",
                        "&:hover": {
                        backgroundColor: "#fdecef",
                        color: "#880e4f",
                        },
                    }}
                    >
                    Sign Up
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        );
}
export default NavBar;