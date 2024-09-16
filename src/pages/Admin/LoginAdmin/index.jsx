import { useState } from "react";
import { Container } from "./styles";
import Header from "../../../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const inputs = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "center",
  width: "400px",
  height: "auto",
  border: "1px solid var(--color-light-gray-2)",
  borderRadius: "10px",
  color: "var(--color-black)",
  p: 4,
};

const footer = {
  display: "flex",
  justifyContent: "end",
  marginTop: "40px",
};

const button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "var(--color-background-white)",
  borderRadius: "10px",
  borderColor: "var(--color-dark-gray)",
  color: "var(--color-dark-gray)",
  textTransform: "none",
  fontSize: "16px",
  marginRight: "5px",
};

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  function checkPermissionToEnter() {
    if (email === "adm" && password === "5") {
      navigate("/praises-admin");
    }
  }
  return (
    <Container>
      <Header />
      <div className="boxContainer">
        <Box component="form" sx={inputs} noValidate autoComplete="off">
          <h2 className="title">Login</h2>
          <TextField
            value={email}
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            onChange={handleChangeEmail}
            error={email !== "adm"}
          />
          <br></br>
          <TextField
            value={password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={handleChangePassword}
            error={password !== "5"}
          />
          <Box sx={footer}>
            <Button
              variant="outlined"
              size="small"
              type="submit"
              color="error"
              onClick={checkPermissionToEnter}
              sx={button}
            >
              Enter
            </Button>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
