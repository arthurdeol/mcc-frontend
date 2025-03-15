import { useState } from "react";
import Header from "../../../components/Header";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { Container, inputs, footer, ButtonStyledRed } from "./styles";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  TextField,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let valid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const response = await axios.post(
        "https://mccapi.up.railway.app/Account/login",
        {
          email,
          password,
        },
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        login(email, password);
        navigate("/praises-admin");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError(
          "This email is not registered as an admin, request permission from the developer! Contact: arthurdeol@gmail.com"
        );
      } else {
        setError("Invalid credentials! Please check your email and password.");
      }
    }
  };

  return (
    <Container>
      <Header />
      <div className="boxContainer">
        <Box component="form" sx={inputs} noValidate autoComplete="off">
          <h2 className="title">Praises Admin Login</h2>
          <div className="red-detail"></div>
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            onChange={handleChangeEmail}
            fullWidth
            required
            error={!!emailError}
            helperText={emailError}
            autoComplete="email"
          />
          <br></br>
          <TextField
            value={password}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={handleChangePassword}
            fullWidth
            required
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <>
              <br></br> <Alert severity="error">{error}</Alert>
            </>
          )}
          <Box sx={footer}>
            <Link to="/register-admin" className="register-link">
              Don't have an account? Register
            </Link>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Enter
            </ButtonStyledRed>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
