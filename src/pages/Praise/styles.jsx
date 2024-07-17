import styled from "styled-components";

export const Container = styled.div`
  // overflow: hidden;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;

  .display {
    width: 100%;
    height: 100%;
  }

  .pdf-reader-container {
    display: flex;
    justify-content: center;
  }

  // .pdf-reader-hidden {
  //   display: none;
  // }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
`;
