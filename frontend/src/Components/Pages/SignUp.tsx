import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { userRegistration } from '../Services/userRegistration';
import { Password } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';

type SignUpProps = {
  setUserData: (userData: any, isAuth?: boolean) => void;
};

const SignUp: React.FC<SignUpProps> = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const details = () => {
    alert(`\nUsername: ${username} Email: ${email}  \nPassword: ${password}`);
  };

  const validate = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if ("@".includes(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const userReg = async () => {
    if (!validate()) return;
    try {
      const userResopnse = await userRegistration(username, email, password);
      console.log("signup", userResopnse);
      console.log("user signup token", userResopnse?.user.token)
      if (userResopnse?.user.token) {
        setUserData(userResopnse, true);

        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
      }
    }
    catch (error: any) {
      const backendError = error?.response?.data?.errors?.body?.[0];
      console.log("signup error", backendError);
      setError(backendError || "Signup failed. Please try again.");
    }
  };

  return (
    <Box
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      alignItems="center"
      display="flex"
      justifyContent="center"
      minHeight="100vh"
      width="93.8vw"
      sx={{
        // backgroundColor: "#dcedc8",
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
      >

        <Typography variant="h4" fontWeight="bold" color="#689f38" textAlign="center">
          Sign Up
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            color: "#689f38",
            textDecoration: "underline",
          }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign in
        </Typography>

        {error && (<FormHelperText error>{error}</FormHelperText>)}

        <TextField
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Create Password"
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
          sx={{
            backgroundColor: "#689f38",
            color: "white",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#aed581",
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
