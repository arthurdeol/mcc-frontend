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

  .icon-container,
  .sent-service-list-button {
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

  .sent-service-list-button {
    margin-left: 30px;
  }

  .list-button,
  .share-button,
  .history-button {
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
  .share-button:hover,
  .history-button:hover {
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

  .praise-settings-title {
    width: 100%;
    position: absolute;
    text-align: center;
    margin-left: -2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-dark-red);
  }

  @media (max-width: 767px) {
    padding: 10px;
    img {
      margin-left: 8px;
    }
  }

  @media (max-width: 570px) {
    .praise-settings-title {
      text-align: right;
      padding-right: 45px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 8px;
    img {
      margin-left: 5px;
      width: 140px;
    }

    .list-button,
    .share-button,
    .history-button {
      margin-right: 6px;
    }

    .list-button:hover,
    .share-button:hover,
    .history-button:hover {
      background: var(--color-background-white);
    }
  }

  @media (max-width: 425px) {
    .praise-settings-title {
      font-size: 1.2rem;
      padding-right: 55px;
    }
    img {
      margin-left: 3px;
    }
  }

  @media (max-width: 375px) {
    img {
      margin-left: 2px;
      width: 110px;
    }
  }

  @media (max-width: 320px) {
    .praise-settings-title {
      font-size: 1rem;
      padding-right: 43px;
    }
  }
`;
