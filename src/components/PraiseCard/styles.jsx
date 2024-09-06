import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-self: center;
  padding: 20px 10px;
  border: 1px solid #ededed;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  touch-action: none;
  margin-bottom: 10px;

  .titles {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  .praise-title-en {
    font-size: 1rem;
  }

  .praise-title-pt {
    margin-top: 2px;
    font-size: 0.9rem;
    color: gray;
  }

  .theme-tag-container {
    display: flex;
    align-items: center;
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
    margin-right: 2px;
  }

  .icons-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    width: 35px;
    height: 35px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid #ededed;
    border-radius: 10px;
  }

  .icon-container:hover {
    background: #eeeeee;
    color: white !important;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  @media (max-width: 768px) {
    .titles {
      width: 80%;
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
    flex-direction: column;
    padding: 15px 0;

    .icons-container {
      margin-left: 0;
      display: flex;
      justify-content: end;
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

export const XClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border: 1px solid #eeeeee;
  top: 10px;
  right: 15px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 5px;
  padding: 2px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
  }

  @media (max-width: 480px) {
    right: 5px;
  }
`;
