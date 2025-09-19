import styled from "styled-components";

export const ContainerPraisesList = styled.div`
  overflow-x: hidden;

  .main-container {
    display: flex;
    justify-content: center;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
    font-size: 1rem;
    margin: 0 5% 3rem 5%;
    width: 80%;
    overflow-x: hidden;
    padding-top: 4.5rem;
    padding-bottom: 0rem;
  }

  hr {
    border: 0.02rem solid var(--color-light-gray);
  }

  .progress-container {
    display: flex;
    padding: 30% 0;
    justify-content: center;
    width: 100%;
    height: auto;
  }

  .praises-container {
    width: 92%;
    margin-top: 8rem;
  }

  .scroll-to-top {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    right: 2%;
    bottom: 2%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-light-gray);
    cursor: pointer;
    background-color: var(--color-background-white);
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;

    &:hover {
      border: 1px solid var(--color-dark-gray);
      background: var(--color-light-gray-2);
    }
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

    .progress-container {
      padding: 35% 0;
    }

    .scroll-to-top {
      right: 1%;
      bottom: 1%;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 0 0 1rem;
      border-radius: 0;
      box-shadow: none;
      padding-top: 4.2rem;
      padding-bottom: 4rem;
    }

    .praises-container {
      margin-top: 5rem;
    }
  }
`;
