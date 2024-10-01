import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;

  .main-container {
    display: flex;
    justify-content: center;
  }

  .admin-praises {
    position: fixed;
    margin-top: 7rem;
    width: 80%;
    text-align: left;
    color: var(--color-dark-gray);
    font-weight: 600;
    font-size: 1.4rem;
    background: var(--color-white);
    padding: 1rem 5% 0;
    z-index: 200;
  }

  .praises-container {
    width: 92%;
    margin-top: 11.5rem;
  }

  hr {
    border: 0.02rem solid var(--color-light-gray);
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
    font-size: 1rem;
    margin: 4.5rem 5% 1rem 5%;
    width: 80%;
    overflow-x: hidden;
  }

  .progress-container {
    display: flex;
    padding: 30% 0;
    justify-content: center;
    width: 100%;
    height: auto;
  }

  @media (max-width: 1300px) {
    .box {
      width: 98%;
    }

    .admin-praises {
      width: 90%;
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

    .admin-praises {
      margin-top: 6rem;
    }

    .praises-container {
      margin-top: 10rem;
    }

    .progress-container {
      padding: 35% 0;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 4rem 0 1rem;
      border-radius: 0;
      box-shadow: none;
    }

    .admin-praises {
      margin-top: 5rem;
      width: 100%;
      padding: 1rem 3% 0;
    }
  }
`;
