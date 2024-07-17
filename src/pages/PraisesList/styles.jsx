import styled from "styled-components";

export const Container = styled.div`
  .main-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: 1% 5% 0 5%;
    border-radius: 20px;
    height: 85vh;
    font-size: 1rem;
  }

  .search-container {
    width: 90%;
    padding: 3rem 20px 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .title {
    color: black;
    font-size: 1.5rem;
    margin: 15px 0;
  }

  .filter {
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #ededed;
    background: #f8f8f8;
    font-size: 1rem;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .praises-container {
    width: 90%;
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .praise-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-self: center;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #ededed;
  }

  // .praise-title {
  //   display: flex;
  //   align-items: center;
  // }

  .praise-title-en {
    color: black;
    font-size: 1rem;
    margin-right: 1rem;
  }

  .praise-title-pt {
    font-size: 0.9rem;
    color: gray;
  }

  .theme-tag {
    display: flex;
    align-items: center;
    width: fit-content;
    //background: #ffcbd1;
    background: #ededed;
    //border-radius: 20px;
    border-radius: 5px;
    font-size: 0.5rem;
    //color: red;
    color: gray;
    text-align: center;
    height: auto;
    padding: 4px 6px;
    // margin-top: 10px;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    padding: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }

  @media (min-width: 768px) and (max-width: 979px) {
    // background: red;
  }

  @media only screen and (max-width: 767px) {
    // background: blue;

    .main-container {
      margin: 0;
      height: 100vh;
      box-shadow: none;
      border-radius: 0;
    }

    .search-container {
      padding: 2rem 0;
    }

    .praises-container {
      width: 90%;
    }

    .praise-container {
      padding: 20px 0;
    }

    .praise-title {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .theme-tag {
      //margin: 1rem 0 5px;
      // background: #ffcbd1;
      // color: red;
      font-size: 0.5rem;
      text-align: center;
      height: fit-content;
      padding: 2px 5px;
    }

    .icons-container {
      margin-left: 5%;
    }

    .footer {
      margin-top: 8px;
    }
  }

  @media (max-width: 480px) {
    // background: purple;

    .praise-container {
      flex-direction: column;
      padding: 20px 0 0 0;
    }

    .icons-container {
      margin-left: 0;
      //margin-top: 1rem;
      display: flex;
      justify-content: end;
    }
  }

  @media (max-width: 280px) {
    // background: green;
  }
`;

//   @media (min-width: 768px) and (max-width: 979px) {
//     h3 {
//       font-size: 20px;
//     }
//   }

//   @media only screen and (max-width: 767px) {
//     h2 {
//       font-size: 30px;
//     }
//   }

//   @media (max-width: 480px) {
//     h2 {
//       font-size: 26px;
//       margin: 0 5px;
//       text-align: center;
//     }
//   }

//   @media (max-width: 280px) {
//     h2 {
//       font-size: 28px;
//     }
//   }
