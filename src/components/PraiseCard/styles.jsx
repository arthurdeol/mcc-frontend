import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 128px;
  display: flex;
  padding: 20px 10px;
  border-bottom: 1px solid #ededed;

  .text-container {
    margin-bottom: 20px;
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
    margin-top: 9px;
  }

  .theme-tag {
    display: flex;
    background: #ededed;
    border-radius: 10px;
    font-size: 0.5rem;
    color: gray;
    text-align: center;
    padding: 2px 8px;
    margin-right: 4px;
  }

  .buttons-container {
    display: flex;
    align-items: end;
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

  @media (max-width: 768px) {
    .titles {
      width: 80%;
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

export const HeartButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;

  @media (max-width: 480px) {
    right: 5px;
  }
`;