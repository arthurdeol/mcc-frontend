import styled from "styled-components";
import { red, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    color: black;
  }

  .text-error {
    color: red;
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
    color: black;
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
    color: #fff;
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
    width: 300px;
    border: 1px solid #eeeeee;
    margin: 1px;
  }

  .data-container {
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 30px;
  }

  .plus-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b71c1c;
    min-width: 50px;
    height: 50px;
    border: 1px solid #eeeeee;
    border-radius: 100%;
    padding: 5px;
    cursor: pointer;
  }

  .table {
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  thead {
    border-bottom: 1px solid rgb(160 160 160);
    text-align: center;
    background-color: #b71c1c;
    color: #fff;
  }

  tbody {
    text-align: center;
    background-color: #f2f2f2;
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
  }

  @media (max-width: 320px) {
    .file-inputs-content {
      width: 70%;
    }
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
  color: "black",
  p: { xs: 2, sm: 1, lg: 4 },
  marginTop: "20px",
  width: { xs: "100%", sm: "90%", lg: "70%" },
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

export const fieldsContainer = {
  display: "flex",
  justifyContent: "space-between",
};

export const nameField = {
  marginRight: "10px",
};

export const checked = {
  color: grey[600],
  "&.Mui-checked": {
    color: red[700],
  },
};

export const footerFilter = {
  display: "flex",
  justifyContent: "end",
  marginTop: "30px",
};

export const title = {
  margin: "0 0 20px",
  color: "grey.700",
};
