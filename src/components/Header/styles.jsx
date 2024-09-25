import styled from "styled-components";

export const linkStyle = {
  textDecoration: "none",
  color: "var(--color-black)",
};

export const Container = styled.div`
  position: fixed;
  //position: sticky;
  width: 100%;
  background-color: var(--color-background-white);
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 501;
  padding: 10px 30px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  top: 0;
  left: 0;

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
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
    font-size: 1rem;
  }

  .list-button,
  .share-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
    width: 45px;
    height: 45px;
    margin-left: 5px;
  }

  .list-button:hover,
  .share-button:hover {
    background: var(--color-light-gray-2);
  }

  .list-length {
    position: absolute;
    left: -24%;
    bottom: -13%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-white);
    color: var(--color-dark-red);
    border: 1px solid var(--color-dark-red-1);
    // background: #f9f9f9;
    // border: 1px solid #a5a5a5;
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
      background: var(--color-background-white);
    }
  }

  @media (max-width: 375px) {
    img {
      width: 120px;
    }
  }
`;
