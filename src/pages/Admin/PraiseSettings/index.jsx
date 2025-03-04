import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlCloudUpload } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteModal from "../../../components/DeleteModal";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TableFiles from "../../../components/TableFiles";
import TableSymbols from "../../../components/TablePraiseSymbols";
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

export default function PraiseSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [praiseId] = useState(location.state.praiseId);

  const { praiseData } = location.state;

  const [open, setOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    status: "success",
    message: "...",
    time: 1000,
  });

  const handleClickSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackbarData.status === "success") {
      navigate("/praises-admin");
    }
    setOpen(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => setOpenDeleteModal(false);

  const [praiseTheme, setPraiseTheme] = useState(praiseData.theme.trim());
  const [portugueseSongBookNumber, setPortugueseSongBookNumber] = useState(
    praiseData.portugueseSongBookNumber
  );
  const [portugueseTitle, setPortugueseTitle] = useState(
    praiseData.portugueseTitle
  );
  const [englishSongBookNumber, setEnglishSongBookNumber] = useState(
    praiseData.englishSongBookNumber
  );
  const [englishTitle, setEnglishTitle] = useState(praiseData.englishTitle);
  const [checkeds, setCheckeds] = useState({
    containsInPortugueseSongBook: praiseData.containsInPortugueseSongBook,
    containsInCiasSongBook: praiseData.containsInCiasSongBook,
    containsInSuplementareASongBook: praiseData.containsInSuplementareASongBook,
    containsInSuplementareBSongBook: praiseData.containsInSuplementareBSongBook,
    displayFilesSVGInsteadOfText: praiseData.filesSVGFlag,
  });

  const [lyricsContent, setLyricsContent] = useState(
    praiseData.lyrics !== "null" && praiseData.lyrics ? praiseData.lyrics : ""
  );
  const [chordsContent, setChordsContent] = useState(
    praiseData.chords !== "null" && praiseData.chords ? praiseData.chords : ""
  );

  const [orderFile, setOrderFile] = useState(1);
  const [typeFile, setTypeFile] = useState("");
  const [fileData, setfileData] = useState([]);
  const [filesSelected, setFilesSelected] = useState([]);
  const [errorMessageFile, setErrorMessageFile] = useState("");

  const {
    containsInPortugueseSongBook,
    containsInCiasSongBook,
    containsInSuplementareASongBook,
    containsInSuplementareBSongBook,
    displayFilesSVGInsteadOfText,
  } = checkeds;

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

  const handleChangeChordsContent = (event) => {
    setChordsContent(event.target.value);
  };

  const handleChangeLyricsContent = (event) => {
    setLyricsContent(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("songBookMapId", praiseId);
    formData.append(
      "containsInPortugueseSongBook",
      checkeds.containsInPortugueseSongBook
    );
    formData.append("containsInCiasSongBook", checkeds.containsInCiasSongBook);
    formData.append(
      "containsInSuplementareASongBook",
      checkeds.containsInSuplementareASongBook
    );
    formData.append(
      "containsInSuplementareBSongBook",
      checkeds.containsInSuplementareBSongBook
    );
    formData.append("filesSVGFlag", checkeds.displayFilesSVGInsteadOfText);
    formData.append("theme", praiseTheme);
    formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
    formData.append("portugueseTitle", portugueseTitle);
    formData.append("englishSongBookNumber", englishSongBookNumber);
    formData.append("englishTitle", englishTitle);
    formData.append("chords", chordsContent);
    formData.append("lyrics", lyricsContent);

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
      await api.put("/SongBookMap", formData);
      handleClickSnackbar({});
      setSnackbarData({
        status: "success",
        message: "Settings applied with Success",
        time: 2000,
      });
    } catch (error) {
      handleClickSnackbar({});
      setSnackbarData({
        status: "error",
        message: "Something went wrong! Please, try again later!",
        time: 3000,
      });
    }
  }

  return (
    <Container>
      <Header />
      <ThemeProvider theme={themeStyled}>
        <Box sx={style}>
          <div className="initial-container">
            <h1> Praise Settings</h1>

            <div className="delete-button" onClick={handleOpen}>
              <RiDeleteBin5Line size={20} />
            </div>
          </div>

          <h2>{`${englishTitle ? englishTitle : portugueseTitle}`}</h2>
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
              <InputLabel id="simple-select-label">Theme</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={praiseTheme}
                label="Theme"
                onChange={handleChangePraiseTheme}
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

          <TableSymbols />
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Lyrics:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={10}
                variant="outlined"
                onChange={handleChangeLyricsContent}
                value={lyricsContent}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Chords:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={10}
                variant="outlined"
                onChange={handleChangeChordsContent}
                value={chordsContent}
              />
            </Box>
          </div>
          <br></br>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={displayFilesSVGInsteadOfText}
                  onChange={handleChangeCheckbox}
                  name="displayFilesSVGInsteadOfText"
                />
              }
              label="Display Files SVG instead of Text"
            />
          </div>

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

          <FooterFilter>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Apply Settings
            </ButtonStyledRed>
          </FooterFilter>
        </Box>
        <DeleteModal
          openModal={openDeleteModal}
          onCloseModal={handleClose}
          praiseId={praiseId}
          praiseData={praiseData}
        />
      </ThemeProvider>

      <Snackbar
        open={open}
        autoHideDuration={snackbarData.time}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
