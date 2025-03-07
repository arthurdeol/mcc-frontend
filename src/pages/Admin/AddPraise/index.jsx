import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlCloudUpload } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TableFiles from "../../../components/TableFiles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Container,
  themeStyled,
  style,
  fieldsContainer,
  title,
  nameField,
  checked,
  ButtonStyledRed,
  PlusButton,
  FooterFilter,
} from "./styles";

export default function AddPraise() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    status: "success",
    message: "...",
    time: 1000,
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackbarData.status === "success") {
      navigate("/praises-admin");
    }
    setOpen(false);
  };

  const [praiseTheme, setPraiseTheme] = useState("");
  const [portugueseSongBookNumber, setPortugueseSongBookNumber] = useState("");
  const [portugueseTitle, setPortugueseTitle] = useState("");
  const [englishSongBookNumber, setEnglishSongBookNumber] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [checkeds, setCheckeds] = useState({
    containsInPortugueseSongBook: false,
    containsInCiasSongBook: false,
    containsInSuplementareASongBook: false,
    containsInSuplementareBSongBook: false,
  });

  const {
    containsInPortugueseSongBook,
    containsInCiasSongBook,
    containsInSuplementareASongBook,
    containsInSuplementareBSongBook,
  } = checkeds;

  const [orderFile, setOrderFile] = useState(1);
  const [typeFile, setTypeFile] = useState("");
  const [fileData, setfileData] = useState([]);
  const [filesSelected, setFilesSelected] = useState([]);
  const [errorMessageFile, setErrorMessageFile] = useState("");
  const [displayFormError, setDisplayFormError] = useState(false);

  const handleChangeCheckbox = (event) => {
    setCheckeds({
      ...checkeds,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeOrderFileNumber = (event) => {
    setOrderFile(event.target.value);
  };

  const handleChangeTypeFile = (event) => {
    setTypeFile(event.target.value);
  };

  const handleChangeFileData = (event) => {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);
    setfileData(selectedImages);
  };

  function addFile() {
    if (fileData.length > 0 && typeFile && orderFile) {
      let objFile = {
        fileType: typeFile,
        order: Number(orderFile),
        file: fileData[0],
        filePreview: URL.createObjectURL(fileData[0]),
      };
      setFilesSelected([...filesSelected, objFile]);
      setErrorMessageFile("");
      setTypeFile("");
      setOrderFile(1);
      setfileData([]);
    } else {
      setErrorMessageFile(`Please fill all information about the file!`);
    }
  }

  const handleChangePraiseTheme = (event) => {
    setPraiseTheme(event.target.value);
  };

  const handleChangePortugueseSongBookNumber = (event) => {
    setPortugueseSongBookNumber(event.target.value);
  };

  const handleChangePortugueseTitle = (event) => {
    setPortugueseTitle(event.target.value);
  };

  const handleChangeEnglishSongBookNumber = (event) => {
    setEnglishSongBookNumber(event.target.value);
  };

  const handleChangeEnglishTitle = (event) => {
    setEnglishTitle(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if ((praiseTheme && portugueseTitle) || (praiseTheme && englishTitle)) {
      setDisplayFormError(false);
      const formData = new FormData();
      formData.append(
        "containsInPortugueseSongBook",
        checkeds.containsInPortugueseSongBook
      );
      formData.append(
        "containsInCiasSongBook",
        checkeds.containsInCiasSongBook
      );
      formData.append(
        "containsInSuplementareASongBook",
        checkeds.containsInSuplementareASongBook
      );
      formData.append(
        "containsInSuplementareBSongBook",
        checkeds.containsInSuplementareBSongBook
      );
      formData.append("theme", praiseTheme);
      formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
      formData.append("portugueseTitle", portugueseTitle);
      formData.append("englishSongBookNumber", englishSongBookNumber);
      formData.append("englishTitle", englishTitle);

      if (filesSelected.length > 0) {
        filesSelected.forEach((file, index) => {
          formData.append(`files[${index}].fileType`, file.fileType);
          formData.append(`files[${index}].order`, file.order);
          formData.append(`files[${index}].file`, file.file);
        });
      } else {
        formData.append("files", null);
      }

      try {
        await api.post("/SongBookMap", formData);
        handleClick();
        setSnackbarData({
          status: "success",
          message: "New praise added with Success!",
          time: 2000,
        });
      } catch (error) {
        handleClick();
        setSnackbarData({
          status: "error",
          message: "Something went wrong! Please, try again later!",
          time: 3000,
        });
      }
    } else {
      setDisplayFormError(true);
    }
  }

  return (
    <Container>
      <Header />
      <ThemeProvider theme={themeStyled}>
        <Box sx={style}>
          <h1>New Praise</h1>
          <br></br>
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInPortugueseSongBook}
                onChange={handleChangeCheckbox}
                name="containsInPortugueseSongBook"
              />
            }
            label="Contains in Portuguese Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInCiasSongBook}
                onChange={handleChangeCheckbox}
                name="containsInCiasSongBook"
              />
            }
            label="Contains in CIA's Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInSuplementareASongBook}
                onChange={handleChangeCheckbox}
                name="containsInSuplementareASongBook"
              />
            }
            label="Contains in Suplementare A Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInSuplementareBSongBook}
                onChange={handleChangeCheckbox}
                name="containsInSuplementareBSongBook"
              />
            }
            label="Contains in Suplementare B Songbook"
          />
          <br></br>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label" required>
                Theme
              </InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={praiseTheme}
                label="Theme"
                onChange={handleChangePraiseTheme}
                required
              >
                <MenuItem value={"PLEADING"}>Pleading</MenuItem>
                <MenuItem value={"CHORUSES"}>Choruses</MenuItem>
                <MenuItem value={"CONFORT AND ENCOURAGEMENT"}>
                  Confort and Encouragement
                </MenuItem>
                <MenuItem value={"DEDICATION"}>Dedication</MenuItem>
                <MenuItem value={"DETH, RESSURECTION AND SALVATION"}>
                  Deth, Ressurection and Salvation
                </MenuItem>
                <MenuItem value={"ETERNITY AND THE RETURN OF JESUS"}>
                  Eternity and The Return of Jesus
                </MenuItem>
                <MenuItem value={"INVOCATION FELLOWSHIP"}>
                  Invocation Fellowship
                </MenuItem>
                <MenuItem
                  value={"SANTIFICATION AND OUTPOURING OF THE HOLY SPIRIT"}
                >
                  Santification and Outpouring of The Holy Spirit
                </MenuItem>
                <MenuItem value={"PRAISE GROUP"}>Praise Group</MenuItem>
                <MenuItem value={"PRAISE"}>Praise</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              English Data:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={englishTitle}
                id="outlined-basic"
                label="English Name"
                variant="outlined"
                onChange={handleChangeEnglishTitle}
              />

              <TextField
                value={englishSongBookNumber}
                id="outlined-basic"
                label="Number"
                variant="outlined"
                onChange={handleChangeEnglishSongBookNumber}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Portuguese Data:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={portugueseTitle}
                id="outlined-basic"
                label="Portuguese Name"
                variant="outlined"
                onChange={handleChangePortugueseTitle}
              />

              <TextField
                value={portugueseSongBookNumber}
                id="outlined-basic"
                label="Number"
                variant="outlined"
                onChange={handleChangePortugueseSongBookNumber}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Files:
            </Typography>
            <div className="file-container">
              <div className="file-inputs-content">
                <div className="type-input">
                  <Box sx={{ minWidth: 130 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeFile}
                        label="Type"
                        onChange={handleChangeTypeFile}
                      >
                        <MenuItem value={"Lyrics"}>Lyrics</MenuItem>
                        <MenuItem value={"Chords"}>Chords</MenuItem>
                        <MenuItem value={"SheetMusic"}>Music Sheet</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div className="order-input">
                  <TextField
                    sx={{ minWidth: 165 }}
                    value={orderFile}
                    id="outlined-basic"
                    label="Order to display the file"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    onChange={handleChangeOrderFileNumber}
                  />
                </div>

                <div className="file-data-input">
                  <label htmlFor="fileData">
                    <SlCloudUpload />
                    &nbsp;&nbsp;File:
                  </label>
                  <input
                    type="file"
                    id="fileData"
                    name="fileData"
                    accept="image/svg"
                    onChange={handleChangeFileData}
                  />
                  {fileData.length > 0 && (
                    <span className="file-name">{fileData[0].name}</span>
                  )}
                </div>
              </div>

              <PlusButton onClick={addFile}>
                <LuPlus size={30} color={"var(--color-white)"} />
              </PlusButton>
            </div>
            {errorMessageFile !== "" && (
              <p className="text-error">{errorMessageFile}</p>
            )}
          </div>
          <br></br>

          <TableFiles
            filesSelected={filesSelected}
            setFilesSelected={setFilesSelected}
          />

          {displayFormError && (
            <p className="text-error">
              At Least the Theme and a Name must be filled!
            </p>
          )}

          <FooterFilter>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Send
            </ButtonStyledRed>
          </FooterFilter>
        </Box>
      </ThemeProvider>

      <Snackbar
        open={open}
        autoHideDuration={snackbarData.time}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
