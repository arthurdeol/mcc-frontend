import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background: #ededed;

  .file-container {
    display: flex;
    justify-content: center;
  }

  .file {
    margin: 15px 0;
    width: 60%;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 1024px) {
    .file {
      width: 98%;
      margin: 5px 0;
    }
  }
`;
