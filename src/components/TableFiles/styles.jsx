import styled from "styled-components";

export const Container = styled.div`
  .x-delete-file {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid gray;
    cursor: pointer;
  }

  .x-delete-file: hover {
    background-color: #c4c4c4;
  }

  .table {
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }

  thead {
    border-bottom: 1px solid rgb(160 160 160);
    text-align: center;
    background-color: #b71c1c;
    color: #fff;
  }

  tbody {
    text-align: center;
    background-color: #f2f2f2;
  }

  tr {
    position: relative;
  }
`;
