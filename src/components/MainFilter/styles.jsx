import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  // width: 90%;
  width: 80%;
  z-index: 500;
  // border-radius: 20px 20px 0 0;
  background-color: var(--color-white);
  margin-top: 3.8rem;

  // padding-top: 5rem;

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
    border: 1px solid var(--color-light-gray);
    background: #f8f8f8;
    font-size: 1rem;
  }

  .filter-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    border-radius: 10px;
    width: 45px;
    height: 100%;
    margin-left: 5px;
  }

  .filter-button:hover {
    background: var(--color-light-gray-2);
    color: var(--color-white) !important;
  }

  @media (max-width: 1300px) {
    width: 90%;
  }

  @media (max-width: 933px) {
    .search-container {
      width: 92%;
      padding: 2rem 0;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 0;
    margin-top: 4rem;

    .search-container {
      padding: 1.2rem 10px;
      width: 100%;
    }
  }
`;
