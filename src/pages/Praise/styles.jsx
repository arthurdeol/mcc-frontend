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
    width: 100%;
    //display: none;
  }

  .praise-main {
    width: fit-content;
    padding: 7rem 0 4rem 0;
  }

  .praise-title {
    color: var(--color-black);
    font-size: 1.5rem;
  }

  .praise-lines {
    margin-top: 1.5rem;
    font-family: monospace;
    font-weight: normal;
  }

  .praise-lines-lyrics {
    margin-top: 2.5rem;
  }

  .repetitions-number {
    position: absolute;
    right: -30px;
    color: black;
  }

  .chord-key-container {
    display: flex;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-light-gray);
    width: fit-content;
    padding: 5px;
    border-radius: 10px;
    // position: absolute;
    // right: 40px;
  }

  .button-change-key {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    font-size: 1rem;
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
    //display: none;
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

    .praise-main {
      // width: 85%;
      font-size: 0.8rem;
      max-width: 90%;
    }

    .repetitions-number {
      right: -22px;
    }

    .praise-title {
      font-size: 1.2rem;
    }

    .button-change-key {
      width: 25px;
      height: 25px;
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
