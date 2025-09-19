import styled from "styled-components";

export const ContainerServicePraiseList = styled.div`
  // width: 100vw;
  // height: 100vh;
  // background: green;

  .service-container {
    display: flex;
    justify-content: center;
    // height: 89vh;
    height: 90%;
    // background: red;
    margin-top: 4rem;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
    font-size: 1rem;
    // margin: 5rem 5% 0 5%;
    margin: 1rem 5%;
    width: 80%;
    // height: 100%;
    // background: blue;
  }

  .praises-container {
    width: 92%;
    overflow-y: auto;
    margin: 20px 0;
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

  .praises-not-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: var(--color-black);
    padding: 7% 0 4%;

    div {
      display: flex;
      flex-direction: column;
    }

    h3,
    p {
      margin-left: 20px;
    }

    h3 {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 1300px) {
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
    .box {
      width: 90%;
    }

    .praises-not-selected {
      padding: 7% 5% 4%;
    }

    .praise-sequence {
      width: 30px;
      font-size: 1.2rem;
      margin-right: 10px;
      color: var(--color-white);
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 0;
      border-radius: 0;
      box-shadow: none;
    }

    .praises-not-selected {
      padding: 40% 5%;
    }

    .praises-container {
      margin: 20px 0 15px;
    }
  }

  @media (max-width: 430px) {
    .praises-not-selected {
      padding: 40% 8%;
    }
  }

  @media (max-width: 375px) {
    .praises-not-selected {
      padding: 35% 15%;
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

  @media (max-width: 280px) {
    .praises-not-selected {
      flex-direction: column;
      text-align: center;
      padding: 30% 8% 15%;

      div {
        margin-top: 20px;
      }

      h3,
      p {
        margin-left: 0;
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
  border: 1px solid var(--color-gray);
  background-color: var(--color-dark-red);
  color: var(--color-white);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  height: 40px;
  width: 130px;

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }
`;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--color-white)",
  border: "1px solid var(--color-light-gray)",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 1,
  fontSize: "0.9rem",
  width: { xs: "90%", sm: "70%", md: "50%", lg: "auto" },
};

export const ButtonStyledRed = styled.button`
  border: 1px solid var(--color-dark-red);
  background-color: var(--color-dark-red);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-white);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid var(--color-dark-red);
      background-color: var(--color-dark-red);
      color: var(--color-white);
    }
  }
`;

export const ButtonStyled = styled.button`
  border: 1px solid var(--color-gray);
  background-color: var(--color-background-white);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  color: var(--color-black);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }
`;

export const FooterFilter = styled.div`
  display: flex;
  justify-content: end;
  margin: 30px 0;
`;
