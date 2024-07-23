import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background: #ededed;

  .display {
    width: 100%;
    height: 100%;
  }

  .file-container {
    display: flex;
    justify-content: center;
  }

  .file {
    margin: 15px 0;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  @media only screen and (max-width: 768px) {
    .file {
      width: 98%;
      margin: 5px 0;
    }
  }

  @media (max-width: 480px) {
    .file {
      width: 99%;
      margin: 15px 0;
    }
  }
`;
