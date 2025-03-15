import styled from "styled-components";

export const Container = styled.div`
  .boxContainer {
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  .title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .red-detail {
    width: 90px;
    height: 2px;
    background: var(--color-dark-red);
    display: flex;
    align-self: center;
    margin-bottom: 1rem;
    border-radius: 2px;
  }

  .login-link {
    font-size: 0.9rem;
    color: black;
  }
`;

export const inputs = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "center",
  width: "400px",
  height: "auto",
  border: "1px solid var(--color-light-gray-2)",
  borderRadius: "10px",
  color: "var(--color-black)",
  p: 4,
};

export const ButtonStyledRed = styled.button`
  border: 1px solid var(--color-dark-red);
  background-color: var(--color-dark-red);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-white);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid var(--color-dark-red);
      background-color: var(--color-dark-red);
      color: var(--color-white);
    }
  }
`;

export const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginTop: "40px",
};
