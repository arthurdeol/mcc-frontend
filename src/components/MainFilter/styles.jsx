import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  z-index: 500;
  background-color: var(--color-white);
  margin-top: 3.8rem;

  .search-container {
    display: flex;
    align-items: center;
    align-self: center;
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
   );
  }

  .filter-button,
  .new-praise-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 45px;
    width: 45px;
    margin-left: 5px;
    cursor: pointer;
  }

  .filter-button {
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);

    &:hover {
      background: var(--color-light-gray-2);
      color: var(--color-white) !important;
    }
  }

  .new-praise-button {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);
    margin-left: 1rem;

    &:hover {
      background: var(--color-dark-red);
      color: var(--color-white);
    }
  }

  .active-filters-container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    height: 45px;
    border-radius: 8px;
    border: 1px solid var(--color-light-gray);
    background: #f8f8f8;
  }

  .active-filters {
    display: flex;
    width: max-content;
    gap: 8px;
  }

  .filter-tag {
    display: flex;
    align-items: center;
    background-color: var(--color-dark-gray);
    color: var(--color-white);
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 0.6rem;
    width: max-content;
  }

  .filter-tag.cias-tag {
    background-color: #d32f2f;
    color: white;
  }

  .filter-tag.video-tag {
    background-color: #333;
    color: white;
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
