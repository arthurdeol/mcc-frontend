import styled from "styled-components";

export const ContainerSentList = styled.div`
  .list-container {
    display: flex;
    justify-content: center;
    //height: 89vh;
  }

  .box-list {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
    font-size: 1rem;
    margin: 3.7rem 5% 1rem 5%;
    width: 80%;
    //height: 100%;
  }

  h1 {
    color: var(--color-dark-red);
    font-weight: 600;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  .comment {
    font-size: 1.2rem;
    font-weight: 200;
  }

  .sent-by {
    font-size: 0.8rem;
    font-weight: 100;
    color: var(--color-dark-gray);
  }

  .title-container {
    // margin: 20px 0 5px;
    width: 100%;
    // padding: 0 25px;
    position: fixed;
    width: 80%;

    background-color: var(--color-white);
    //background: pink;
    padding: 1.5rem 3rem 15px;
    z-index: 500;
  }

  .date-container {
    display: flex;
  }

  .praises-container {
    width: 92%;
    overflow-y: auto;
    margin: 20px 0;
    padding-top: 6.5rem;
  }

  .praise-container {
    display: flex;
    box-shadow: rgba(149, 157, 165, 0.1) 0px 4px 4px;
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
    margin-bottom: 5px;
    background-color: var(--color-background-white);
  }

  .praise-sequence {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-dark-red);
    border-radius: 10px 0 0 10px;
    width: 50px;
    font-size: 2rem;
    margin-right: 20px;
    color: var(--color-white);
  }

  @media (max-width: 1024px) {
    // .list-container {
    //   height: 88vh;
    // }

    .title-container {
      width: 90%;
      padding: 1.5rem 2rem 15px;
    }

    .box-list {
      width: 96%;
    }

    .praises-container {
      width: 95%;
    }
  }

  @media (max-width: 933px) {
    .box-list {
      // margin: 5rem 1%;
    }

    .praises-container {
      width: 93%;
    }
  }

  @media (max-width: 768px) {
    // .list-container {
    //   height: 88vh;
    // }

    .box-list {
      // margin: 4rem 1% 1%;
      width: 90%;
    }

    .praise-sequence {
      width: 30px;
      font-size: 1.2rem;
      margin-right: 10px;
      color: var(--color-white);
    }
  }

  @media (max-width: 480px) {
    // .list-container {
    //   height: 80vh;
    // }

    h1 {
      font-size: 1.1rem;
    }

    .comment {
      font-size: 1rem;
    }

    .sent-by {
      font-size: 0.7rem;
    }

    .title-container {
      width: 100%;
      padding: 1.2rem 1.5rem 10px;
    }

    .box-list {
      width: 100%;
      margin: 4rem 0 1rem;
      border-radius: 0;
      box-shadow: none;
    }

    .praises-container {
      margin: 5px 0 0;
    }
  }
`;
