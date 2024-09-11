import Box from "@mui/material/Box";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import {
  style,
  title,
  //   checked,
  //   themeTitle,
  theme,
  //   footerFilter,
  //   ButtonStyled,
  XClose,
  //   datePicker,
} from "./styles";

export default function SendListModal({
  openModal,
  onCloseModal,
  servicePraises,
}) {
  const url = "https://mccapi.up.railway.app/api/SongBookMapList";
  const [comment, setComment] = useState("");

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  function sendList(event) {
    const data = {
      comment: "culto sabado",
      listDate: "2024-09-11T15:51:55.922Z",
      church: "TORONTO",
      songs: [servicePraises],
    };
    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  // async function sendList() {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("songBookMapId", praiseId);
  //   formData.append(
  //     "containsInPortugueseSongBook",
  //     checkeds.containsInPortugueseSongBook
  //   );
  //   formData.append("containsInCiasSongBook", checkeds.containsInCiasSongBook);
  //   formData.append(
  //     "containsInSuplementareASongBook",
  //     checkeds.containsInSuplementareASongBook
  //   );
  //   formData.append(
  //     "containsInSuplementareBSongBook",
  //     checkeds.containsInSuplementareBSongBook
  //   );
  //   formData.append("theme", praiseTheme);
  //   formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
  //   formData.append("portugueseTitle", portugueseTitle);
  //   formData.append("englishSongBookNumber", englishSongBookNumber);
  //   formData.append("englishTitle", englishTitle);

  //   if (filesSelected.length > 0) {
  //     filesSelected.forEach((file, index) => {
  //       formData.append(`files[${index}].fileType`, file.fileType);
  //       formData.append(`files[${index}].order`, file.order);
  //       formData.append(`files[${index}].file`, file.file);
  //     });
  //   } else {
  //     formData.append("files", null);
  //   }

  //   try {
  //     const response = await api.put("/SongBookMap", formData);
  //     alert("Settings applied with Success");
  //     navigate("/praises-admin");
  //     console.log(response);
  //   } catch (error) {
  //     alert("Something went wrong! Please, try again later!");
  //     console.log(error);
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={openModal}>
        <Box sx={style}>
          <XClose onClick={onCloseModal}>
            <LuX />
          </XClose>

          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Do you want to share this list?
          </Typography>

          <TextField
            fullWidth
            value={comment}
            id="outlined-basic"
            label="Commet"
            variant="outlined"
            onChange={handleChangeComment}
          />
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
