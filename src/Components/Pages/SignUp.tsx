import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { userRegistration } from '../Services/userRegistration';
import { Password } from '@mui/icons-material';

type SignUpProps = {
  setUserData: (userData: any) => void;
};

const SignUp: React.FC <SignUpProps>= ({setUserData}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const details = () => {
    alert(`\nUsername: ${username} Email: ${email}  \nPassword: ${password}`);
  };

  const userReg = async () =>{
    try{
      const userResopnse = await userRegistration(username,email, password);
      setUserData(userResopnse)
   navigate("/")
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <Box
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      alignItems="center"
      display="flex"
      justifyContent="center"
      minHeight="92vh"
      width="100vw"
      sx={{
        background: "linear-gradient(to right, #f8bbd0, #fce4ec)", 
        padding: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="80%"
        maxWidth="400px"
        gap={3}
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
          p: 5,
        }}
        // onSubmit={handleSubmit}
      >
        <Typography variant="h4" fontWeight="bold" color="#e91e63" textAlign="center">
          Sign Up
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            color: "#e91e63",
            textDecoration: "underline",
          }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign in
        </Typography>

        <TextField
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
        // required ="Required" 
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Create Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e91e63",
            color: "white",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f06292",
            },
          }}
          onClick={userReg} 
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
