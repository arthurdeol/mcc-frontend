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

  .file-input {
    display: flex;
  }
  .file-input > label {
    margin-right: 30px;
    color: gray;
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
`;
