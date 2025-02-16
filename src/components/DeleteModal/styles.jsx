import styled from "styled-components";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--color-white)",
  border: "1px solid var(--color-light-gray)",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 1,
  fontSize: "0.9rem",
  width: { xs: "90%", sm: "70%", md: "50%", lg: "auto" },
};

export const Card = styled.div`
  margin: 20px 0;
  border: 1px solid var(--color-dark-red);
  border-radius: 10px;
  padding: 1rem;

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

  .theme-tag,
  .theme-tag-cia {
    display: flex;
    border-radius: 10px;
    font-size: 0.6rem;
    text-align: center;
  }

  .theme-tag {
    background: var(--color-light-gray-1);
    border: 1px solid var(--color-light-gray);
    color: var(--color-dark-gray);
    padding: 1px 7px;
  }

  .theme-tag-cia {
    background: var(--color-white);
    color: var(--color-dark-red);
    border: 1px solid var(--color-dark-red-1);
    padding: 1px 6px;
    margin-right: 4px;
  }
`;

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

export const ButtonStyled = styled.button`
  border: 1px solid var(--color-gray);
  background-color: var(--color-background-white);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
  color: var(--color-black);

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }
`;

export const FooterFilter = styled.div`
  display: flex;
  justify-content: end;
  margin: 30px 0;
`;
