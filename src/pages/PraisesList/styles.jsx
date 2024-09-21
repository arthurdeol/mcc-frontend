import styled from "styled-components";

export const ContainerPraisesList = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-size: 1rem;
    margin: 5rem 5% 1rem;
    width: 80%;
  }

  hr {
    border: 0.02rem solid var(--color-light-gray);
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
  }

  @media (max-width: 1300px) {
    .box {
      width: 98%;
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
    .box {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 4rem 0 0;
      border-radius: 0;
      box-shadow: none;
      border-radius: 0;
    }
  }
`;
