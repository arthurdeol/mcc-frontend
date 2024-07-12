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
    padding: 2rem 20px;
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
    align-self: center;
    padding: 20px;
    border-bottom: 1px solid #ededed;
  }

  .praise-title {
    display: flex;
    align-items: center;
  }

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
    background: red;
    border-radius: 20px;
    font-size: 0.5rem;
    text-align: center;
    height: auto;
    padding: 1px 6px;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    padding: 10px;
  }
`;

// h3 {
//     font-size: 22px;
//   }

//   p {
//     font-size: 20px;
//     line-height: 145%;
//   }
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