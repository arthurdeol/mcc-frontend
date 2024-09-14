import styled from "styled-components";

export const ContainerServicePraiseList = styled.div`
  .service-container {
    display: flex;
    justify-content: center;
    height: 91vh;
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

  .praises-not-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    color: #000;
    padding: 0 20%;

    div {
      display: flex;
    }

    p {
      margin-left: 20px;
    }
  }

  @media (max-width: 1024px) {
    .box {
      width: 96%;
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
      box-shadow: none;
      border-radius: 0;
    }

    .box {
      margin: 5rem 1% 1%;
      width: 90%;
    }

    .praises-not-selected {
      padding: 0 5%;
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
      margin: 4rem 0;
      border-radius: 0;
    }

    .praises-container {
      margin: 20px 0 0;
    }
  }
  @media (max-width: 430px) {
    .box {
      box-shadow: none;
    }

    .praises-not-selected {
      padding: 0 8%;
    }
  }

  @media (max-width: 375px) {
    .praises-not-selected {
      padding: 0 15%;
      div {
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      p {
        margin-top: 10px;
        text-align: center;
      }
    }
  }
`;

export const footerSendList = {
  width: "92%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const ButtonStyledSendList = styled.button`
  border: 1px solid #acacac;
  background-color: #b71c1c;
  color: #fff;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  height: 40px;
  width: 130px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
  }
`;
