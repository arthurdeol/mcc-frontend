import styled from "styled-components";

export const Container = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    height: 90vh;
    width: 100vw;
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
  }

  .search-container {
    display: flex;
    align-items: center;
    width: 94%;
    padding: 3rem 20px 2rem;
    font-size: 1rem;
  }

  .filter {
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #ededed;
    background: #f8f8f8;
    font-size: 1rem;
  }

  .filter-button {
    width: 45px;
    height: 100%;
    margin-left: 5px;
  }

  .progress-container {
    display: flex;
    padding-top: 15%;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .praises-container {
    width: 92%;
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
    padding: 20px 10px;
    border-bottom: 1px solid #ededed;
  }

  .titles {
    margin-bottom: 10px;
  }

  .praise-title-en {
    color: black;
    font-size: 1rem;
  }

  .praise-title-pt {
    margin-top: 2px;
    font-size: 0.9rem;
    color: gray;
  }

  .theme-tag {
    display: flex;
    align-items: center;
    width: fit-content;
    background: #ededed;
    border-radius: 10px;
    font-size: 0.5rem;
    color: gray;
    text-align: center;
    height: auto;
    padding: 2px 8px;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .filter-button,
  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid #ededed;
    border-radius: 10px;
  }

  .icon-container {
    width: 35px;
    height: 35px;
    margin-right: 5px;
  }

  .icon-container:hover,
  .filter-button:hover {
    background: #eeeeee;
    color: white !important;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: start;
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

    .search-container {
      width: 92%;
      padding: 2rem 0;
    }
  }

  @media (max-width: 768px) {
    .main-container {
      margin: 0;
      height: 100vh;
      box-shadow: none;
      border-radius: 0;
    }

    .box {
      margin: 1%;
      width: 90%;
    }

    .praise-title {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .theme-tag {
      font-size: 0.5rem;
      text-align: center;
      height: fit-content;
      padding: 2px 5px;
    }

    .icons-container {
      margin-left: 5%;
    }
  }

  @media (max-width: 480px) {
    .box {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }

    .search-container > input {
      font-size: 0.9rem;
    }

    .praise-container {
      flex-direction: column;
      padding: 15px 0;
    }

    .icons-container {
      margin-left: 0;
      display: flex;
      justify-content: end;
    }
  }
  @media (max-width: 430px) {
    .box {
      box-shadow: none;
    }
  }

  @media (max-width: 425px) {
    .praise-title-en {
      font-size: 0.9rem;
    }

    .praise-title-pt {
      font-size: 0.8rem;
    }

    .theme-tag {
      font-size: 0.45rem;
    }

    .icon-container {
      width: 30px;
      height: 30px;
      border-radius: 8px;
    }
  }
`;

export const ErrorPage = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  // margin-top: 10%;
  padding: 10%;

  .musical-note-error-page {
    width: 120px;
    height: 120px;
    margin-right: 50px;
  }

  .text-error-page {
    width: 80%;
    // margin: 10px 0;
    font-size: 1.5rem;
    color: black;
  }

  .img-praise-not-found {
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }

  @media (max-width: 1024px) {
    // margin-top: 0;
    padding: 6% 8%;
  }

  @media (max-width: 768px) {
    // padding: 8%;
    // margin-top: 20%;

    .musical-note-error-page {
      margin-right: 25px;
      width: 100px;
      height: 100px;
    }
    .text-error-page {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 435px) {
    .musical-note-error-page {
      width: 90px;
      height: 90px;
    }
    .text-error-page {
      font-size: 1rem;
    }
  }

  @media (max-width: 320px) {
    .musical-note-error-page {
      width: 80px;
      height: 80px;
    }
    .text-error-page {
      font-size: 0.9rem;
    }
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
