import styled from "styled-components";

export const ContainerPraisesList = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    // height: 91vh;
    height: 89vh;
    width: 100vw;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-size: 1rem;
    margin: 5rem 5% 0 5%;
    width: 80%;
    height: 100%;
  }

  hr {
    border: 0.02rem solid #ededed;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .praises-container {
    width: 92%;
    overflow-y: auto;
  }

  @media (max-width: 1024px) {
    .main-container {
      height: 86vh;
      // height: 90vh;
    }
    .box {
      width: 96%;
    }

    .praises-container {
      width: 95%;
    }
  }

  @media (max-width: 933px) {
    .praises-container {
      width: 93%;
    }
  }

  @media (max-width: 768px) {
    .main-container {
      margin: 0;
      box-shadow: none;
      border-radius: 0;
    }

    .box {
      margin: 5rem 1% 1%;
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 4rem 0;
      border-radius: 0;
    }
  }
  @media (max-width: 430px) {
    .box {
      box-shadow: none;
    }
  }
`;
