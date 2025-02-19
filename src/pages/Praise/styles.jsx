import styled from "styled-components";

export const ContainerPraise = styled.div`
  overflow-x: hidden;
  //height: 100vh;
  //background: var(--color-light-gray);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  .praise-container {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    background: var(--color-background-white);
    display: none;
  }

  .praise-main {
    width: fit-content;
    padding: 7rem 0 4rem 0;
  }

  .praise-title {
    color: var(--color-black);
    font-size: 1.3rem;
  }

  .praise-lines {
    margin-top: 1rem;
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  .file-container {
    display: flex;
    justify-content: center;
    //margin-top: 15px;
    // background: pink;
    //height: 90%;
    overflow-x: auto;
    background: var(--color-light-gray);
  }

  .file-content {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 0 15px;
    margin-top: 4.2rem;
  }

  .file {
    width: 100%;
    background: var(--color-background-white);
    border: 0;
  }

  .progress-container {
    display: flex;
    padding-top: 20%;
    justify-content: center;
    width: 100%;
    background: var(--color-background-white);
  }

  // .file-fullscreen {
  //   overflow-x: auto;
  //   background: #fff;
  //   width: 100%;
  //   height: auto;
  //   text-align: center;

  //   img {
  //     width: 100%;
  //   }
  // }

  @media (max-width: 1300px) {
    .file-content {
      width: 99%;
    }
  }

  @media (max-width: 1300px) {
    .progress-container {
      padding-top: 40%;
    }

    .file-container {
      margin-top: 5px;
    }
  }

  @media (max-width: 670px) {
    .file-container {
      background: var(--color-white);
    }

    .file {
      border: 1px solid var(--color-light-gray-1);
    }
  }

  @media (max-width: 425px) {
    .progress-container {
      padding-top: 50%;
    }
  }
`;

// export const FullScreenButton = styled.div`
//   position: absolute;
//   top: 5rem;
//   right: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 35px;
//   height: 35px;
//   margin-right: 5px;
//   background: var(--color-background-white);
//   border: 1px solid var(--color-light-gray);
//   border-radius: 10px;
//   font-size: 1rem;

//   @media (max-width: 435px) {
//     right: 0.1rem;
//     width: 25px;
//     height: 25px;
//   }
// `;

// export const ExitFullScreenButton = styled.div`
//   position: fixed;
//   top: 2rem;
//   right: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 35px;
//   height: 35px;
//   margin-right: 5px;
//   background: var(--color-light-gray);
//   border: 1px solid var(--color-gray);
//   border-radius: 10px;
//   font-size: 1rem;

//   @media (max-width: 435px) {
//     top: 0.4rem;
//     right: 0.1rem;
//     width: 25px;
//     height: 25px;
//   }
// `;
