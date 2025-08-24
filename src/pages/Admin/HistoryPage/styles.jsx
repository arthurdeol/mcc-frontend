import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 425px) {
    padding: 0 0.5rem;
  }
`;
