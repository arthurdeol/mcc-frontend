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
  }

  .title-list-container,
  .title-list {
    text-align: left;
    width: 100%;
    padding: 0 25px;
  }

  .title-list-to-share,
  .title-list {
    color: #808080;
    font-weight: 600;
  }

  .title-list-container {
    margin: 30px 0;
  }

  .title-list {
    margin-bottom: 10px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    .title-list-container {
      margin: 30px 0 15px;
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

  @media (max-width: 480px) {
    .title-list-container {
      margin: 15px 0;
    }
  }
`;

export const dateCalendar = {
  ".MuiPaper-root": {
    border: "1px solid #b71c1c",
    borderRadius: "10px",
  },
  ".css-23p0if-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#b71c1c !important",
  },
  ".css-innj4t-MuiPickersYear-yearButton.Mui-selected": {
    backgroundColor: "#b71c1c !important",
  },
  ".css-bw88rr-MuiPickersMonth-monthButton.Mui-selected": {
    backgroundColor: "#b71c1c !important",
  },
  ".css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#b71c1c !important",
  },
  ".css-cyfsxc-MuiPickersCalendarHeader-labelContainer": {
    color: "#b71c1c",
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
  border: 1px solid #acacac;
  top: 20px;
  right: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 3px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid #acacac;
      color: #000;
    }
  }
`;

export const inputsContainer = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
  flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
  width: "100%",
  marginBottom: { xs: "15px", sm: "10px", md: "20px", lg: "20px" },
  padding: "0 25px",
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
  color: "grey.700",
};

export const footerSendList = {
  margin: { xs: "0", sm: "0", md: "0 0 20px", lg: "0 0 20px" },
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  padding: "0 25px",
};

export const ButtonStyledSendList = styled.button`
  border: 1px solid #b71c1c;
  background-color: #b71c1c;
  color: #fff;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  height: 40px;

  &:hover {
    border: 1px solid #b71c1c;
    color: #b71c1c;
    background-color: #fff;
  }

  @media (max-width: 480px) {
    &:hover {
      border: 1px solid #b71c1c;
      color: #fff;
      background-color: #b71c1c;
    }
  }
`;
