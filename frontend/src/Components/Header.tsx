import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const Header = () => {
    return (
        <>
            <Box position="static" bgcolor="#8bc34a" py={6} textAlign="center" color="white" width="100%">
                <Typography variant="h3" fontWeight="bold" color="#f3f3f3">Blognest</Typography>
                <Typography variant="h6" color="white">A place to share your knowledge</Typography>
            </Box>
        </>
    );
}
export default Header;



