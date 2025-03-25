import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;

  .main-container {
    display: flex;
    justify-content: center;
  }

  .praises-container {
    width: 92%;
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
    margin: 0 5% 1rem 5%;
    width: 80%;
    overflow-x: hidden;
    padding-top: 12.5rem;
  }

  .progress-container {
    display: flex;
    padding: 30% 0;
    justify-content: center;
    width: 100%;
    height: auto;
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

  .checkbox-filters {
    width: 100%;
    // margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--color-light-gray-2);
    padding-bottom: 1rem;
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

    .praises-container {
      margin-top: 3rem;
    }

    .progress-container {
      padding: 35% 0;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 0 0 1rem;
      border-radius: 0;
      box-shadow: none;
      padding-top: 10rem;
    }
  }
`;

export const checked = {
  color: "var(--color-dark-gray)",
  "&.Mui-checked": {
    color: "var(--color-dark-red)",
  },
};
