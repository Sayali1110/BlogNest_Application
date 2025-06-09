import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const loginDetails = () => {
    alert(`Username: ${username} \nPassword: ${pass}`);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #f8bbd0, #fce4ec)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        maxWidth="350px"
        gap={3}
        sx={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 6px 30px rgba(0,0,0,0.1)',
          padding: 5,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#e91e63" textAlign="center" p={0.5}>
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: '#e91e63',
            textDecoration: 'underline',
            padding: "1"
          }}
          onClick={() => navigate('/signup')}
        >
          Need an account? Sign up
        </Typography>

        <TextField
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={loginDetails}
          sx={{
            backgroundColor: '#e91e63',
            color: 'white',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#f06292',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
