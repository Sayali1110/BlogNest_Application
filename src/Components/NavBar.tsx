import { AppBar, Avatar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    setUserData: (userData: any, isAuth?: boolean) => void;
};

const NavBar: React.FC<Props> = ({ setUserData }) => {
    const location = useLocation();
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    console.log("user Is from context", userInfo)

    const Logout = () => {
        localStorage.removeItem("loggedUser");
        setUserData(null, false);
        navigate("/");
    }

    return (
        <AppBar  sx={{ backgroundColor: "white", color: "pink" }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        color: "#8bc34a",
                        fontWeight: 700,
                        textAlign: "left",
                        minWidth: 100,
                        "&:hover": {
                            color: "#4db6ac"
                        }
                    }}
                    component={Link} to="/"
                >
                    Blognest
                </Typography>

                <Box display="flex" alignItems="center">
                    <Button component={Link} to="/"
                        sx={{
                            px: 2,
                            py: 1,
                            backgroundColor: location.pathname === "/" ? "#8bc34a" : "transparent",
                            color: location.pathname === "/" ? "white" : "#7cb342",
                            "&:hover": {
                                backgroundColor: "#fdecef",
                                color: "#33691e",
                            },
                        }}
                    >
                        Home
                    </Button>

                    {userInfo?.isAuth ? (
                        <>
                            <Button component={Link} to="/newArticle"
                                sx={{ color: '#8bc34a' }}>
                                New Article
                            </Button>
                        </>
                    ) : (
                        <Button component={Link} to='/login'
                            sx={{
                                backgroundColor: location.pathname === "/login" ? "#8bc34a" : "transparent",
                                color: location.pathname === "/login" ? "white" : "#689f38",
                                "&:hover": {
                                    backgroundColor: "#fdecef",
                                    color: "#33691e",
                                },
                            }}
                        >
                            Login
                        </Button>
                    )}


                    {userInfo?.isAuth ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Button
                                onClick={handleMenuOpen}
                                sx={{ textTransform: 'none', color: '#8bc34a' }}
                                startIcon={
                                    userInfo?.user?.user?.image ? (
                                        <Avatar  src={userInfo.user.user.image} />
                                    ) : (
                                        <Avatar sx={{ backgroundColor: '#8bc34a'}}>
                                            {userInfo?.user?.user?.username[0]}
                                        </Avatar>
                                    )
                                }
                            >
                                <Typography>  {userInfo?.user?.user?.username}</Typography>
                                <Typography fontSize="large"> ▼</Typography>
                            </Button>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: { width: 200 },
                                }}
                            >
                                <MenuItem onClick={() => { handleMenuClose()}}>Profile</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); Logout(); }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Button
                            component={Link}
                            to="/signup"
                            sx={{
                                backgroundColor: location.pathname === '/signup' ? '#689f38' : 'transparent',
                                color: location.pathname === '/signup' ? 'white' : '#7cb342',
                                '&:hover': {
                                    backgroundColor: '#fdecef',
                                    color: '#33691e',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
        
    );
}
export default NavBar;