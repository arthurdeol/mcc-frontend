import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #fff;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  padding: 10px 30px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  img {
    width: 150px;
    margin-left: 30px;
    margin-top: 2px;
    cursor: pointer;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    padding: 10px;
  }

  .login-button {
    background: #fff;
    border: 1px solid red;
    border-radius: 10px;
    padding: 5px 1rem;
    color: red;
    font-size: 1rem;
  }
`;

// export const Desktop = styled.div`
//   display: none;

//   .item-menu {
//     margin: 0 15px;
//   }

//   .item-menu-2 {
//     margin-right: 30px;
//   }

//   p {
//     margin-bottom: 4px;
//   }

//   .item-menu:hover {
//     border-bottom: 2px solid #ffbe0b;
//     box-sizing: border-box;
//     height: 25px;
//     cursor: pointer;
//   }

//   @media (min-width: 480px) {
//     display: flex;
//     font-size: 17px;
//   }
// `;

// export const Mobile = styled.div`
//   margin-right: 2rem;

//   @media (min-width: 480px) {
//     display: none !important;
//     visibility: hidden !important;
//   }
// `;

// export const MobileList = styled.div`
//   color: white;
//   background-color: rgba(0, 187, 250, 0.95);
//   font-size: 1.3rem;
//   font-weight: bold;
//   position: absolute;
//   z-index: 99;
//   top: 50px;
//   right: 20px;
//   z-index: 9999;

//   border-radius: 10px;

//   ul {
//     list-style: none;
//     padding: 0 1rem;
//     z-index: 9999;

//     li {
//       margin: 0.5rem 0;
//       z-index: 9999;
//     }
//   }
// `;
