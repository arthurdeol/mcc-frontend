import styled from "styled-components";

export const ContainerPraise = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background: var(--color-light-gray);

  .file-container {
    display: flex;
    justify-content: center;
    margin-top: 4.3rem;
  }

  .file-content {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 0 15px;
  }

  .file {
    width: 100%;
    height: 100%;
    background: var(--color-background-white);
    margin-top: 15px;
  }

  .progress-container {
    display: flex;
    padding-top: 50%;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    .file {
      margin-top: 6px;
    }
  }

  @media (max-width: 768px) {
    .file-content {
      width: 95%;
    }
  }
`;
