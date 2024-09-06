import styled from "styled-components";

export const Container = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    height: 90vh;
    width: 100vw;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-size: 1rem;
    margin: 1% 5% 0 5%;
    width: 80%;
    padding: 20px;
  }

  @media (max-width: 1024px) {
    .box {
      width: 96%;
      height: 93vh;
    }
  }

  @media (max-width: 933px) {
    .box {
      margin: 1%;
    }
  }

  @media (max-width: 768px) {
    .main-container {
      margin: 0;
      height: 100vh;
      box-shadow: none;
      border-radius: 0;
    }

    .box {
      margin: 1%;
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  }
  @media (max-width: 430px) {
    .box {
      box-shadow: none;
    }
  }
`;
