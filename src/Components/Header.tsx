import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const Header = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#e91e63",
                    py: 7,
                    mt:0,
                    textAlign: "center",
                    borderBottom: "1px solid #ddd",
            
                }}
            >
                <Typography variant="h3" fontWeight="bold" color="#f3f3f3"
                >
                    Sharelit
                </Typography>
                <Typography variant="h6" color="white">
                    A place to share your knowledge
                </Typography>
            </Box>
        </>

    );

}

export default Header;



