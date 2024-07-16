import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #dedede;
  margint-top: 50px;

  canvas.react-pdf__Page__canvas {
    margin-bottom: 10px;
  }

  .page-number {
    width: 100%;
    font-size: 0.8rem;
    text-align: right;
  }

  @media only screen and (max-width: 767px) {
    //background: blue;

    canvas.react-pdf__Page__canvas {
      width: 100% !important;
      height: auto !important;
    }
  }
`;
