import styled from "styled-components";

export const ContainerPraise = styled.div`
  overflow-x: hidden;
  height: 100vh;
  background: var(--color-light-gray);

  .file-container {
    display: flex;
    justify-content: center;
    margin-top: 4.3rem;
  }

  .file-content {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 0 15px;
  }

  .file {
    width: 100%;
    background: var(--color-background-white);
    margin-top: 15px;
  }

  .progress-container {
    display: flex;
    padding-top: 20%;
    justify-content: center;
    width: 100%;
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

  @media (max-width: 1024px) {
    .file-container {
      margin-top: 4.1rem;
    }

    .file {
      margin-top: 6px;
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
