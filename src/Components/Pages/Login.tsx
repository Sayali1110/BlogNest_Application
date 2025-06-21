import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Services/userLogin';


type SignIpProps = {
  setUserData: (userData: any, isAuth?: boolean) => void;
};

const Login: React.FC<SignIpProps> = ({ setUserData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const validate = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const login = async () => {
    if (!validate()) return;

    try {
      const loginResponse = await userLogin(email, password);
      console.log("login Response", loginResponse);
      console.log("token from resonse", loginResponse?.user.token);
      if (loginResponse?.user.token) {
        setUserData(loginResponse, true);
        navigate("/");
      }

    } catch (error: any) {
      const backendError = error?.response?.data?.errors?.body?.[0];
      setError(backendError || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: '93.8vw',
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

        <Typography variant="h4" fontWeight="bold" color="#e91e63" textAlign="center"
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: '#e91e63',
            textDecoration: 'underline',
          }}
          onClick={() => navigate('/signup')}
        >
          Need an account? Sign up
        </Typography>

        {error && (<FormHelperText error>{error}</FormHelperText>)}

        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
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
