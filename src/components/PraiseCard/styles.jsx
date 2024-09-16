import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 128px;
  display: flex;
  padding: 20px 10px;

  .text-container {
    margin-bottom: 20px;
    padding-right: 50px;
  }

  .praise-title-en {
    font-size: 1rem;
  }

  .praise-title-pt {
    margin-top: 2px;
    font-size: 0.9rem;
    color: var(--color-dark-gray);
  }

  .theme-tag-container {
    display: flex;
    align-items: center;
    margin-top: 9px;
  }

  .theme-tag {
    display: flex;
    background: var(--color-light-gray);
    border-radius: 10px;
    font-size: 0.5rem;
    color: var(--color-dark-gray);
    text-align: center;
    padding: 2px 8px;
    margin-right: 4px;
  }

  .buttons-container {
    display: flex;
    align-items: end;
    right: 20;
  }

  .icons-container {
    position: absolute;
    display: flex;
    align-items: center;
    cursor: pointer;
    right: 5px;
  }

  .icon-container {
    width: 35px;
    height: 35px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
  }

  .icon-container:hover {
    background: var(--color-light-gray-2);
    color: var(--color-white) !important;
  }

  .edit-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-light-gray-2);
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: var(--color-background-white);
    border-radius: 10px;
    padding: 2px;
    width: 35px;
    height: 35px;
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
  @media (max-width: 628px) {
    height: 138px;
  }

  @media (max-width: 480px) {
    padding: 15px 0;

    .icons-container {
      margin-left: 0;
      display: flex;
      justify-content: end;
    }

    .edit-button {
      right: 5px;
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
    right: 10px;
    top: 15px;
  }
`;

export const XClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border: 1px solid var(--color-light-gray-2);
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: var(--color-background-white);
  border-radius: 5px;
  padding: 2px;

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }

  @media (max-width: 480px) {
    right: 5px;
  }
`;
