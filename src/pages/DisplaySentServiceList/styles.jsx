import styled from "styled-components";

export const ContainerSentList = styled.div`
  .list-container {
    display: flex;
    justify-content: center;
    height: 89vh;
  }

  .box-list {
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

  h1 {
    color: #b71c1c;
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
    color: #808080;
  }

  .title-container {
    margin: 20px 0 5px;
    width: 100%;
    padding: 0 25px;
  }

  .date-container {
    display: flex;
  }

  .praises-container {
    width: 92%;
    overflow-y: auto;
    margin: 20px 0;
  }

  .praise-container {
    display: flex;
    box-shadow: rgba(149, 157, 165, 0.1) 0px 4px 4px;
    border: 1px solid #ededed;
    border-radius: 10px;
    margin-bottom: 5px;
    background-color: #fff;
  }

  .praise-sequence {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b71c1c;
    border-radius: 10px 0 0 10px;
    width: 50px;
    font-size: 2rem;
    margin-right: 20px;
    color: #fff;
  }

  @media (max-width: 1024px) {
    .list-container {
      height: 88vh;
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
      margin: 1%;
    }

    .praises-container {
      width: 93%;
    }
  }

  @media (max-width: 768px) {
    .list-container {
      height: 88vh;
    }

    .box-list {
      margin: 5rem 1% 1%;
      width: 90%;
    }

    .praise-sequence {
      width: 30px;
      font-size: 1.2rem;
      margin-right: 10px;
      color: #fff;
    }
  }

  @media (max-width: 480px) {
    .list-container {
      height: 80vh;
    }

    .box-list {
      width: 100%;
      margin: 4rem 0;
      border-radius: 0;
    }

    .praises-container {
      margin: 20px 0 0;
    }
  }
  @media (max-width: 430px) {
    .box-list {
      box-shadow: none;
    }
  }
`;
