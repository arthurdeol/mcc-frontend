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

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-right: 5px;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
    font-size: 1rem;
  }

  .file-content {
    display: flex;
    // flex-direction: row;
    width: 100%;
  }

  .file-container {
    display: flex;
    justify-content: space-between;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 15px;
  }

  .files-praiseData-container {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }

  .file {
    // width: 100%;
    height: 600px;
    background: var(--color-background-white);
    border: 0;
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

  .button-to-split {
    margin-top: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    right: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-light-gray);
    cursor: pointer;
    background-color: var(--color-background-white);
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;

    &:hover {
      border: 1px solid var(--color-dark-gray);
      background: var(--color-light-gray-2);
    }
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  .praise-container {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    background: var(--color-background-white);
    width: 100%;
  }

  .praise-container-chords-not-splitted {
    display: flex;
    justify-self: center;
    overflow-x: auto;
    background: var(--color-background-white);
    max-width: 500px;
  }

  .praise-main {
    width: fit-content;
    padding: 1rem 0 4rem 0;
  }

  .praise-title {
    font-weight: bold;
    text-align: left;
    margin-bottom: 0;
    color: var(--color-black);
    font-size: 1.5rem;
  }

  .praise-lines-container {
    display: flex;
    gap: 3rem;
  }

  .praise-lines-1,
  .praise-lines-not-splitted-1 {
    margin-top: 1.5rem;
    font-family: monospace;
    font-weight: normal;
  }

  .praise-lines-2,
  .praise-lines-not-splitted-2 {
    font-family: monospace;
    font-weight: normal;
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

  @media (max-width: 1300px) {
    .file-content {
      width: 99%;
    }
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

  @media (max-width: 670px) {
    .file-container {
      background: var(--color-white);
      padding-bottom: 2rem;
    }

    .file {
      width: inherit;
      border: 1px solid var(--color-light-gray-1);
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
