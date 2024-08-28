import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .text {
    color: black;
  }

  .file-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    padding: 15px;
  }

  .file-name {
    color: black;
    font-size: 14px;
    margin-right: 20px;
  }

  input[type="file"] {
    display: none;
  }

  .file-input {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .file-input > input {
    margin-right: 10px;
  }
  .file-input > label {
    display: flex;
    align-items: center;
    background-color: #b71c1c;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    margin: 10px;
    padding: 6px 20px;
    font-size: 16px;
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
  @media (max-width: 1024px) {
    .image-file {
      width: 48%;
    }
  }

  @media (max-width: 480px) {
    .image-file {
      width: 100%;
    }
    .file-input > label {
      margin-right: 5px;
    }
  }
`;