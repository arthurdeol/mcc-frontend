import styled from "styled-components";

export const ContainerPraisesList = styled.div`
  // width: 100vw;
  // height: 100vh;
  // height: 100%;
  //background: purple;
  overflow-x: hidden;

  .main-container {
    display: flex;
    justify-content: center;
    // overflow-y: hidden;
    //height: 100%;
    //background: blue;
  }

  .box {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
    font-size: 1rem;
    // margin: 5rem 5% 1rem;
    margin: 4.5rem 5% 1rem 5%;
    //padding: 4rem 0 0;
    width: 80%;
    //background: pink;
    // height: auto;
    overflow-x: hidden;
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
    // overflow-y: auto;
    // overflow-x: auto;
    margin-top: 8rem;
    //background: yellow;
  }

  @media (max-width: 1300px) {
    // height: 92vh;

    // .main-container {
    //   height: 94%;
    // }

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
  }

  @media (max-width: 480px) {
    // height: 81vh;

    .box {
      width: 100%;
      margin: 4rem 0;
      border-radius: 0;
      box-shadow: none;
    }

    .praises-container {
      margin-top: 5rem;
    }
  }
`;
