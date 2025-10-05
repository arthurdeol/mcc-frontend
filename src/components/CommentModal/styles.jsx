import { createTheme } from "@mui/material/styles";
import styled from "styled-components";

export const XClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border: 1px solid var(--color-gray);
  top: 25px;
  right: 20px;
  background-color: var(--color-background-white);
  border-radius: 5px;
  padding: 3px;

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }
`;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  bgcolor: "var(--color-white)",
  border: "1px solid var(--color-light-gray)",
  borderRadius: "10px",
  boxShadow: 24,
  color: "var(--color-black)",
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

export const title = {
  margin: "0 0 20px",
  color: "var(--color-dark-gray)",
};
