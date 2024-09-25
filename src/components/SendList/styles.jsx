import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;

  .main {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    background-color: var(--color-white);
  }

  .title-list-container,
  .title-list {
    text-align: left;
    width: 100%;
    padding: 0 25px;
  }

  .title-list-to-share,
  .title-list {
    color: var(--color-dark-gray);
    font-weight: 600;
  }

  .title-list-container {
    margin: 30px 0;
  }

  .title-list {
    margin-bottom: 10px;
  }

  .theme-tag {
    display: flex;
    align-self: center;
    background: var(--color-white);
    border: 1px solid var(--color-dark-red);
    border-radius: 10px;
    font-size: 0.5rem;
    color: var(--color-dark-red);
    text-align: center;
    padding: 2px 8px;
    margin-right: 4px;
    height: 15px;
    width: fit-content;
  }

  .list-content {
    width: 95%;
  }

  .item-container {
    display: flex;
    border: 1px solid var(--color-light-gray-3);
    border-radius: 5px;
    margin-bottom: 1px;

    p {
      padding: 3px;
    }
  }

  .number {
    background-color: var(--color-dark-red);
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    min-width: 30px;
    margin-right: 10px;
    border-radius: 4px 0 0 4px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    .list-content {
      width: 92%;
    }

    .title-list {
      margin-bottom: 0;
    }

    .title-list-to-share {
      width: 94%;
      padding-right: 40px;
    }

    .title-list-to-share,
    .title-list {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 430px) {
    .main {
      border-radius: 0;
    }
    .list-content {
      width: 88%;
    }
  }
`;

export const dateCalendar = {
  ".MuiPaper-root": {
    border: "1px solid var(--color-dark-red)",
    borderRadius: "10px",
  },
  ".css-23p0if-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--color-dark-red) !important",
  },
  ".css-innj4t-MuiPickersYear-yearButton.Mui-selected": {
    backgroundColor: "var(--color-dark-red) !important",
  },
  ".css-bw88rr-MuiPickersMonth-monthButton.Mui-selected": {
    backgroundColor: "var(--color-dark-red) !important",
  },
  ".css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--color-dark-red) !important",
  },
  ".css-cyfsxc-MuiPickersCalendarHeader-labelContainer": {
    color: "var(--color-dark-red)",
  },
  // ".css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
  //   // backgroundColor: "#f7f7f7",
  //   // borderRadius: "50%",
  //   // height: "35px",
  //   // width: "36px",
  // },
};

export const XClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border: 1px solid var(--color-gray);
  top: 20px;
  right: 20px;
  background-color: var(--color-background-white);
  border-radius: 5px;
  padding: 3px;

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid var(--color-gray);
      color: var(--color-black);
    }
  }
`;

export const inputsContainer = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
  flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
  width: "100%",
  marginBottom: { xs: "15px", sm: "10px", md: "20px", lg: "20px" },
  padding: "40px 25px 0",
};

export const churchesSelect = {
  minWidth: { xs: "40%", sm: "50%", md: "20%", lg: "20%" },
  marginTop: "8px",
  marginRight: { xs: "0", sm: "10px", md: "10px", lg: "10px" },
};

export const dateInput = {
  width: { xs: "100%", sm: "48%", md: "40%", lg: "40%" },
};

export const commentInput = {
  width: "100%",
  marginTop: "8px",
  marginLeft: { xs: "0", sm: "0", md: "10px", lg: "10px" },
};

export const userNameInput = {
  width: "100%",
  marginTop: "8px",
  marginLeft: { xs: "0", sm: "0", md: "10px", lg: "10px" },
};

export const title = {
  margin: "0 0 20px",
  color: "var(--color-dark-gray)",
};

export const footerSendList = {
  margin: { xs: "0 0 20px", sm: "0 0 20px", md: "0 0 30px", lg: "0 0 20px" },
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  padding: "0 25px",
};

export const ButtonStyledSendList = styled.button`
  border: 1px solid var(--color-dark-red);
  background-color: var(--color-dark-red);
  margin-top: 20px;
  color: var(--color-white);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  height: 40px;

  &:hover {
    border: 1px solid var(--color-dark-red);
    color: var(--color-dark-red);
    background-color: var(--color-background-white);
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid var(--color-dark-red);
      color: var(--color-background-white);
      background-color: var(--color-dark-red);
    }
  }
`;
