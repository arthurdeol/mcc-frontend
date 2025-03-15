import { useState } from "react";
import {
  TextField,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, inputs, footer, ButtonStyledRed } from "./styles";

export default function RegisterAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let valid = true;

    if (formData.userName.length === 0) {
      setNameError("Please enter your name");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (formData.password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      await api.post("/Account/register", formData);
      setSuccess("Registration successful!");
      setFormData({ userName: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/login-admin");
      }, 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This email is already registered!");
      } else {
        setError("Error registering. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Header />
      <div className="boxContainer">
        <Box component="form" sx={inputs} noValidate autoComplete="off">
          <h2 className="title">Admin Registration</h2>
          <div className="red-detail"></div>
          <TextField
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!nameError}
            helperText={nameError}
            autoComplete="user name"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!emailError}
            helperText={emailError}
            autoComplete="email"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={footer}>
            <Link to="/login-admin" className="login-link">
              Already have an account? Log in
            </Link>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Register
            </ButtonStyledRed>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
