import { Password } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Services/userLogin';

type SignIpProps = {
  setUserData: (userData: any) => void;
};

const Login: React.FC<SignIpProps> = ({setUserData}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginDetails = () => {
    alert(`Email: ${email} \nPassword: ${password}`);
  };

  const login = async () =>{
 try{
  const loginResponse = await userLogin(email, password);
  setUserData(loginResponse);
   navigate("/")
 }
 catch(error){
  console.error(error);
 }   
  }

  // const handlePasswordChange = e =>{
  //   setPassword(e.target.value);
  // }

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
          label="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <TextField

          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
         onChange={(e) => setPassword(e.target.value)}
        // onChange = {(e) => handlePasswordChange}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={login}
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
