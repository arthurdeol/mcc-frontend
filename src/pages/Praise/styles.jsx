import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background: #ededed;

  .file-container {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
  }

  .file-content {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 0 15px;
  }

  .file {
    background: white;
    margin-top: 15px;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 1024px) {
    .file-content {
      width: 99%;
    }

    .file {
      margin-top: 6px;
    }
  }
`;
