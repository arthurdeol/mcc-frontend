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
import ShareListLinkModal from "../ShareListLinkModal";
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
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [fillError, setFillError] = useState(false);
  const [comment, setComment] = useState("");
  const [church, setChurch] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [listIdToShare, setListIdToShare] = useState("");
  const [diplayError, setDisplayError] = useState(false);

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleChangeChurch = (event) => {
    setChurch(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
    setFillError(false);
  };

  async function sendListEvent(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("listDate", date.toJSON());
    formData.append("church", church);
    formData.append("userName", userName);

    if (servicePraises.length > 0) {
      servicePraises.forEach((file, index) => {
        formData.append(`songs[${index}].order`, index);
        formData.append(`songs[${index}].songBookMapId`, file.songBookMapId);
      });
    } else {
      formData.append("songs", null);
    }

    if (userName !== "") {
      try {
        const response = await api.post("/SongBookMapList", formData);
        setListIdToShare(response.data);
        handleOpen();
        console.log(listIdToShare);
      } catch (error) {
        setDisplayError(true);
        console.log(error);
      }
    } else {
      setFillError(true);
    }
  }

  function toggleList() {
    setShowShareList(!showShareList);
  }

  return (
    <Container>
      <ShareListLinkModal
        openModal={openModal}
        onCloseModal={handleClose}
        listIdToShare={listIdToShare}
        diplayError={diplayError}
      />

      <div className="main">
        <XClose onClick={toggleList}>
          <LuX />
        </XClose>

        <div className="title-list-container">
          <h2 className="title-list-to-share">
            Do you want to share this list?
          </h2>
        </div>

        <div className="list-content">
          {servicePraises.map((praise, i) => (
            <div className="item-container">
              <div className="number">{i + 1}</div>
              {praise.containsInCiasSongBook && (
                <div className="theme-tag-cia">CIA's</div>
              )}
              <p>
                {praise.englishSongBookNumber &&
                  `${praise.englishSongBookNumber} - `}
                {praise.englishTitle
                  ? praise.englishTitle
                  : praise.portugueseSongBookNumber
                  ? praise.portugueseSongBookNumber +
                    " - " +
                    praise.portugueseTitle
                  : praise.portugueseTitle}
              </p>
            </div>
          ))}
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
                <MenuItem value={"CALGARY"}>Calgary</MenuItem>
                <MenuItem value={"VANCOUVER"}>Vancouver</MenuItem>
                <MenuItem value={"WINNIPEG"}>Winnipeg</MenuItem>
                <MenuItem value={"FREDERICTON"}>Fredericton</MenuItem>
                <MenuItem value={"OTTAWA"}>Ottawa</MenuItem>
                <MenuItem value={"AJAX"}>Ajax</MenuItem>
                <MenuItem value={"WATERLOO"}>Waterloo</MenuItem>
                <MenuItem value={"SARNIA"}>Sarnia</MenuItem>
                <MenuItem value={"QUEBEC"}>Quebec</MenuItem>
                <MenuItem value={"MONTREAL"}>Montreal</MenuItem>
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
              error={fillError}
              sx={{ width: "100%" }}
              value={userName}
              label="Your Name"
              variant="outlined"
              required
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
          <ButtonStyledSendList type="button" onClick={sendListEvent}>
            Share List
          </ButtonStyledSendList>
        </Box>
      </div>
    </Container>
  );
}
