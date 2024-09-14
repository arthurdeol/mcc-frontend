import styled from "styled-components";

export const linkStyle = {
  textDecoration: "none",
  color: "#000",
};

export const Container = styled.div`
  position: fixed;
  width: 100%;
  background-color: #fff;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // z-index: 9999;
  padding: 10px 30px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  img {
    width: 150px;
    margin-left: 10px;
    margin-top: 2px;
    cursor: pointer;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-right: 5px;
    background: #fff;
    border: 1px solid #ededed;
    border-radius: 10px;
    color: red;
    font-size: 1rem;
  }

  .list-button,
  .share-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid #ededed;
    border-radius: 10px;
    width: 45px;
    height: 100%;
    margin-left: 5px;
  }

  .list-button:hover,
  .share-button:hover {
    background: #eeeeee;
  }

  .list-length {
    position: absolute;
    left: -24%;
    bottom: -13%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
    border: 1px solid #a5a5a5;
    font-size: 0.5rem;
    border-radius: 100%;
    height: 17px;
    width: 17px;
  }

  @media (max-width: 767px) {
    padding: 10px;
    img {
      margin-left: 10px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 8px;
    img {
      margin-left: 5px;
    }

    .list-button,
    .share-button {
      margin-right: 6px;
    }

    .list-button:hover,
    .share-button:hover {
      background: #fff;
    }
  }

  @media (max-width: 375px) {
    img {
      width: 120px;
    }
  }
`;
