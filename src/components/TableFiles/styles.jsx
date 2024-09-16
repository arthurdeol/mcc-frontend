import styled from "styled-components";

export const Container = styled.div`
  .x-delete-file {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-background-white);
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid var(--color-dark-gray);
    cursor: pointer;
  }

  .x-delete-file: hover {
    background-color: #c4c4c4;
  }

  .table {
    font-size: 1rem;
    width: 100%;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  thead {
    border-bottom: 1px solid rgb(160 160 160);
    text-align: center;
    background-color: var(--color-dark-red);
    color: var(--color-white);
  }

  th,
  td {
    padding: 0 10px;
  }

  tbody {
    text-align: center;
    background-color: #f2f2f2;
  }

  tr {
    position: relative;
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 0 4px;
    }
  }
`;
