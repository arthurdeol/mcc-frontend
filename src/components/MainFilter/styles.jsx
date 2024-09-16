import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

  @media (max-width: 933px) {
    .search-container {
      width: 92%;
      padding: 2rem 0;
    }
  }
`;
