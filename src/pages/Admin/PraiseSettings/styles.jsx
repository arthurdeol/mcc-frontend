import styled from "styled-components";
import { createTheme } from "@mui/material/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: var(--color-dark-red);
    font-weight: 600;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  h2 {
    color: var(--color-black);
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 200;
    color: var(--color-dark-gray);
  }

  .text-error {
    color: var(--color-error);
    margin: 15px 0 0 5px;
  }

  .file-content {
    display: flex;
    width: 100%;
  }

  .file-container {
    display: flex;
    justify-content: space-between;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 15px;
  }

  .file-inputs-content {
    display: flex;
  }

  .file-name {
    font-size: 14px;
    margin-right: 20px;
  }

  input[type="file"] {
    display: none;
  }

  .file-data-input {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid gray;
    border-radius: 7px;
  }

  .file-data-input > input {
    margin-right: 10px;
  }

  .file-data-input > label {
    display: flex;
    align-items: center;
    background-color: gray;
    border-radius: 5px;
    color: var(--color-white);
    cursor: pointer;
    padding: 1rem 20px;
    font-size: 16px;
  }

  .file-data-input > span {
    display: flex;
    align-self: center;
    margin-left: 10px;
  }

  .order-input,
  .type-input {
    margin-right: 10px;
  }

  .images-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .image-file {
    width: 350px;
    border: 1px solid var(--color-light-gray-2);
    margin: 1px;
  }

  .data-container {
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 30px;
  }

  .initial-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .delete-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 45px;
    width: 45px;
    cursor: pointer;
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);

    &:hover {
      background: var(--color-dark-red);
      color: var(--color-white);
    }
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  .praise-container {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    background: var(--color-background-white);
    width: 100%;
    //display: none;
  }

  .praise-main {
    width: fit-content;
    padding: 7rem 0 4rem 0;
  }

  .praise-title {
    font-weight: bold;
    text-align: left;
    margin-bottom: 0;
    color: var(--color-black);
    font-size: 1.5rem;
  }

  .praise-lines {
    margin-top: 1.5rem;
    font-family: monospace;
    font-weight: normal;
  }

  .praise-lines-lyrics {
    margin-top: 2.5rem;
  }

  .repetitions-number {
    position: absolute;
    right: -30px;
    color: black;
  }

  @media (max-width: 1024px) {
    .image-file {
      width: 48%;
    }
  }

  @media (max-width: 770px) {
    .file-container {
      display: flex;
      align-items: center;
    }
    .file-inputs-content {
      flex-direction: column;
      width: 85%;
    }
    .order-input,
    .type-input {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    .image-file {
      width: 100%;
    }
    .file-data-input > label {
      margin-right: 5px;
    }
    .file-inputs-content {
      width: 75%;
    }

    .data-container {
      padding: 10px;
    }

    .file-data-input > span {
      margin: 15px;
    }

    .praise-main {
      // width: 85%;
      font-size: 0.9rem;
    }

    .repetitions-number {
      right: -22px;
    }

    .praise-title {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 320px) {
    .file-inputs-content {
      width: 70%;
    }
  }
`;

export const ButtonStyled = styled.button`
  border: 1px solid var(--color-gray);
  background-color: var(--color-background-white);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  color: var(--color-black);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }
`;

export const ButtonStyledRed = styled.button`
  border: 1px solid var(--color-dark-red);
  background-color: var(--color-dark-red);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-white);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid var(--color-dark-red);
      background-color: var(--color-dark-red);
      color: var(--color-white);
    }
  }
`;

export const FooterFilter = styled.div`
  display: flex;
  justify-content: end;
  margin: 30px 0;
`;

export const PlusButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-dark-red);
    min-width: 50px;
    height: 50px;
    border: 1px solid var(--color-light-gray-2);
    border-radius: 100%;
    padding: 5px;
    cursor: pointer;
  }
`;

export const themeStyled = createTheme({
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

export const style = {
  display: "flex",
  flexDirection: "column",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "10px",
  color: "var(--color-black)",
  p: { xs: 2, sm: 1, lg: 4 },
  marginTop: "5rem",
  width: { xs: "100%", sm: "90%", lg: "70%" },
};

export const fieldsContainer = {
  display: "flex",
  justifyContent: "space-between",
};

export const nameField = {
  marginRight: "10px",
};

export const checked = {
  color: "var(--color-dark-gray)",
  "&.Mui-checked": {
    color: "var(--color-dark-red)",
  },
};

export const title = {
  margin: "0 0 20px",
  color: "var(--color-dark-gray)",
};
