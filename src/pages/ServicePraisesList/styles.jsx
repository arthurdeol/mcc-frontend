import styled from "styled-components";

export const Container = styled.div`
  .service-container {
    display: flex;
    justify-content: center;
    height: 90vh;
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
    padding: 20px 0;
  }

  .praises-container {
    width: 92%;
    overflow-y: auto;
  }

  .praise-container {
    display: flex;
    // padding: 0 20px 0 0;
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
    .box {
      width: 96%;
      height: 93vh;
    }

    .praises-container {
      width: 95%;
    }
  }

  @media (max-width: 933px) {
    .box {
      margin: 1%;
    }

    .praises-container {
      width: 93%;
    }
  }

  @media (max-width: 768px) {
    .service-container {
      margin: 0;
      height: 100vh;
      box-shadow: none;
      border-radius: 0;
    }

    .box {
      margin: 1%;
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
