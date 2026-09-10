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
import TableSymbols from "../../../components/TablePraiseSymbols";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LyricsField from "../../../components/LyricsField";
import ChordsField from "../../../components/ChordsField";
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
  ButtonStyled,
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
    displayTextLyricsInsteadOfSVG: false,
    displayTextChordsInsteadOfSVG: false,
  });

  const {
    containsInPortugueseSongBook,
    containsInCiasSongBook,
    containsInSuplementareASongBook,
    containsInSuplementareBSongBook,
    displayTextLyricsInsteadOfSVG,
    displayTextChordsInsteadOfSVG,
  } = checkeds;

  const [orderFile, setOrderFile] = useState(1);
  const [typeFile, setTypeFile] = useState("");
  const [fileData, setfileData] = useState([]);
  const [filesSelected, setFilesSelected] = useState([]);
  const [errorMessageFile, setErrorMessageFile] = useState("");
  const [displayFormError, setDisplayFormError] = useState(false);
  const [linkInstruments, setLinkInstruments] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");
  const [lyricsContent, setLyricsContent] = useState("");
  const [chordsContent, setChordsContent] = useState("");
  const [praiseKeyChord, setPraiseKeyChord] = useState("");

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

  const handleChangePraiseChordKey = (event) => {
    setPraiseKeyChord(event.target.value);
  };

  const handleChangeLyricsContent = (event) => {
    setLyricsContent(event.target.value);
  };

  const handleChangeChordsContent = (event) => {
    setChordsContent(event.target.value);
  };

  const handleChangeLinkInstruments = (event) => {
    setLinkInstruments(event.target.value);
  };

  const handleChangeLinkYoutube = (event) => {
    setLinkYoutube(event.target.value);
  };

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
      formData.append("flagLyrics", checkeds.displayTextLyricsInsteadOfSVG);
      formData.append("flagChords", checkeds.displayTextChordsInsteadOfSVG);
      formData.append("theme", praiseTheme);
      formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
      formData.append("portugueseTitle", portugueseTitle);
      formData.append("englishSongBookNumber", englishSongBookNumber);
      formData.append("englishTitle", englishTitle);
      formData.append("linkDriveFolder", linkInstruments);
      formData.append("linkYoutube", linkYoutube);
      formData.append("chords", chordsContent);
      formData.append("lyrics", lyricsContent);
      formData.append("chordsKey", praiseKeyChord);

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
        sendHistory(formData);
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

  async function sendHistory(formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    let changes = verifyChangings(formData);

    const log = JSON.stringify({
      title: englishTitle ? englishTitle : portugueseTitle,
      praiseNumber: englishSongBookNumber
        ? englishSongBookNumber
        : portugueseSongBookNumber,
      portugueseSongBookNumber: portugueseSongBookNumber,
      englishSongBookNumber: englishSongBookNumber,
      change: changes,
    });

    if (changes.length > 0) {
      try {
        await api.post("/log", {
          name: user.userName,
          email: user.email,
          action: "Added",
          log: log,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function verifyChangings(formData) {
    let changedValues = [];
    if (formData.get("theme")) changedValues.push("theme");
    if (formData.get("portugueseSongBookNumber"))
      changedValues.push("portuguese songbook number");
    if (formData.get("portugueseTitle")) changedValues.push("portuguese title");
    if (formData.get("englishSongBookNumber"))
      changedValues.push("english songbook number");
    if (formData.get("englishTitle")) changedValues.push("english title");

    if (formData.get("containsInPortugueseSongBook") === "true")
      changedValues.push("praise contains in Portuguese songbook");

    if (formData.get("containsInCiasSongBook") === "true")
      changedValues.push("praise contains in CIA's songbook");

    if (formData.get("containsInSuplementareASongBook") === "true")
      changedValues.push("praise contains in suplementare-A songbook");

    if (formData.get("containsInSuplementareBSongBook") === "true")
      changedValues.push("praise contains in suplementare-B songbook");

    if (formData.get("flagLyrics") === "true")
      changedValues.push("display text Lyrics");

    if (formData.get("flagChords") === "true")
      changedValues.push("display text Chords");

    if (formData.get("linkDriveFolder"))
      changedValues.push("link of instruments Drive");
    if (formData.get("linkYoutube")) changedValues.push("link Youtube");
    if (formData.get("chords")) changedValues.push("text Chords");
    if (formData.get("lyrics")) changedValues.push("text Lyrics");
    if (formData.get("chordsKey")) changedValues.push("chords key");
    if (filesSelected.length > 0) changedValues.push("files SVG");
    return changedValues;
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
              Link to Instruments Drive:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={linkInstruments}
                id="outlined-basic"
                variant="outlined"
                onChange={handleChangeLinkInstruments}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Youtube Video Link:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={linkYoutube}
                id="outlined-basic"
                variant="outlined"
                onChange={handleChangeLinkYoutube}
              />
            </Box>
          </div>
          <br></br>

          <TableSymbols />
          <br></br>

          <LyricsField
            value={lyricsContent}
            onChange={handleChangeLyricsContent}
            displayAsText={displayTextLyricsInsteadOfSVG}
            onDisplayAsTextChange={handleChangeCheckbox}
            englishTitle={englishTitle}
            englishSongBookNumber={englishSongBookNumber}
            portugueseTitle={portugueseTitle}
            portugueseSongBookNumber={portugueseSongBookNumber}
          />
          <br></br>

          <FormControl style={{ width: "120px", marginBottom: "5px" }}>
            <InputLabel id="simple-select-label">Key / Tone</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={praiseKeyChord}
              label="Key/Tone"
              onChange={handleChangePraiseChordKey}
            >
              <MenuItem value={"C"}>C</MenuItem>
              <MenuItem value={"Cm"}>Cm</MenuItem>
              <MenuItem value={"C#"}>C# - Db</MenuItem>
              <MenuItem value={"C#m"}>C#m - Dbm</MenuItem>
              <MenuItem value={"D"}>D</MenuItem>
              <MenuItem value={"Dm"}>Dm</MenuItem>
              <MenuItem value={"D#"}>D# - Eb</MenuItem>
              <MenuItem value={"D#m"}>D#m - Ebm</MenuItem>
              <MenuItem value={"E"}>E</MenuItem>
              <MenuItem value={"Em"}>Em</MenuItem>
              <MenuItem value={"F"}>F</MenuItem>
              <MenuItem value={"Fm"}>Fm</MenuItem>
              <MenuItem value={"F#"}>F# - Gb</MenuItem>
              <MenuItem value={"F#m"}>F#m - Gbm</MenuItem>
              <MenuItem value={"G"}>G</MenuItem>
              <MenuItem value={"Gm"}>Gm</MenuItem>
              <MenuItem value={"G#"}>G# - Ab</MenuItem>
              <MenuItem value={"G#m"}>G#m - Abm</MenuItem>
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"Am"}>Am</MenuItem>
              <MenuItem value={"A#"}>A# - Bb</MenuItem>
              <MenuItem value={"A#m"}>A#m - Bbm</MenuItem>
              <MenuItem value={"B"}>B</MenuItem>
              <MenuItem value={"Bm"}>Bm</MenuItem>
            </Select>
          </FormControl>

          <ChordsField
            value={chordsContent}
            onChange={handleChangeChordsContent}
            displayAsText={displayTextChordsInsteadOfSVG}
            onDisplayAsTextChange={handleChangeCheckbox}
            englishTitle={englishTitle}
            englishSongBookNumber={englishSongBookNumber}
            portugueseTitle={portugueseTitle}
            portugueseSongBookNumber={portugueseSongBookNumber}
          />
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Files SVG:
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
                        <MenuItem value={"Gestures"}>CIA's Gestures</MenuItem>
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
            <ButtonStyled onClick={() => navigate("/praises-admin")}>
              Return to Admin Home
            </ButtonStyled>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Add Praise
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
