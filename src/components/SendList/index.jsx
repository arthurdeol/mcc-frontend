import Box from "@mui/material/Box";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import api from "../../services/api";
import {
  Container,
  ButtonStyledSendList,
  inputsContainer,
  XClose,
  churchesSelect,
  commentInput,
  dateInput,
  footerSendList,
  dateCalendar,
  userNameInput,
} from "./styles";

export default function SendList({
  servicePraises,
  showShareList,
  setShowShareList,
}) {
  const [comment, setComment] = useState("");
  const [church, setChurch] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleChangeChurch = (event) => {
    setChurch(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  async function sendList(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("listDate", date.toJSON());
    formData.append("church", church);

    if (servicePraises.length > 0) {
      servicePraises.forEach((file, index) => {
        formData.append(`songs[${index}].order`, index);
        formData.append(`songs[${index}].songBookMapId`, file.songBookMapId);
      });
    } else {
      formData.append("songs", null);
    }

    try {
      const response = await api.post("/SongBookMapList", formData);
      alert("Service list sent");
      console.log(response);
    } catch (error) {
      alert("Something went wrong! Please, try again later!");
      console.log(error);
    }
  }

  function toggleList() {
    setShowShareList(!showShareList);
  }

  return (
    <Container>
      <div className="main">
        <XClose onClick={toggleList}>
          <LuX />
        </XClose>

        <div className="title-list-container">
          <h2 className="title-list-to-share">
            Do you want to share this list below?
          </h2>
        </div>

        <Box sx={inputsContainer}>
          <Box sx={churchesSelect}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Church</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={church}
                label="Church"
                onChange={handleChangeChurch}
              >
                <MenuItem value={"TORONTO"}>Toronto</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={dateInput}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{
                    popper: {
                      sx: dateCalendar,
                    },
                  }}
                  views={["year", "month", "day"]}
                  label="Date"
                  value={date}
                  format={"YYYY/MM/DD"}
                  onChange={(newDate) => setDate(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={userNameInput}>
            <TextField
              sx={{ width: "100%" }}
              value={userName}
              label="Your Name"
              variant="outlined"
              onChange={handleChangeUserName}
            />
          </Box>

          <Box sx={commentInput}>
            <TextField
              sx={{ width: "100%" }}
              value={comment}
              label="Comment"
              variant="outlined"
              onChange={handleChangeComment}
            />
          </Box>
        </Box>

        <Box sx={footerSendList}>
          <ButtonStyledSendList type="submit" onClick={sendList}>
            Share List
          </ButtonStyledSendList>
        </Box>

        <h2 className="title-list">List to be shared:</h2>
      </div>
    </Container>
  );
}
