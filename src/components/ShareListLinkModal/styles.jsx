import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import styled from "styled-components";
import { LuFileX } from "react-icons/lu";

export const ButtonStyled = styled.button`
  border: 1px solid #acacac;
  background-color: #fff;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
  }
`;

export const ButtonStyledRed = styled.button`
  border: 1px solid #b71c1c;
  background-color: #b71c1c;
  color: #fff;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
    background-color: #fff;
  }
`;

export const InputContainer = styled.div`
  display: flex;
`;

export const CopyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: inherit;
  margin-right: 5px;
  background: #fff;
  border: 1px solid #acacac;
  border-radius: 10px;
  margin-left: 10px;

  &:hover {
    border: 1px solid #ededed;
    background-color: #fff;
  }
`;

export const XClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border: 1px solid #acacac;
  top: 25px;
  right: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 3px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
  }
`;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid #ededed",
  borderRadius: "10px",
  boxShadow: 24,
  color: "black",
  p: 4,
  width: { xs: "90%", sm: "70%", md: "50%", lg: "auto" },
};

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const checked = {
  color: grey[600],
  "&.Mui-checked": {
    color: red[700],
  },
};

export const themeTitle = {
  margin: "10px 0 8px",
  color: "grey.700",
  fontSize: "16px",
};

export const title = {
  margin: "0 0 20px",
  color: "grey.700",
  fontSize: "1.2rem",
};

export const button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  borderRadius: "10px",
  borderColor: "grey.800",
  color: "grey.800",
  textTransform: "none",
  fontSize: "16px",
  marginRight: "5px",
};

export const footerFilter = {
  display: "flex",
  justifyContent: "end",
  marginTop: "10px",
};

export const linkInput = {
  width: "90%",
};
