import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlCloudUpload } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteModal from "../../../components/DeleteModal";
import LyricsField from "../../../components/LyricsField";
import ChordsField from "../../../components/ChordsField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import TableFiles from "../../../components/TableFiles";
import TableSymbols from "../../../components/TablePraiseSymbols";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LuType, LuMusic, LuFolderClosed } from "react-icons/lu";
import { LiaGuitarSolid } from "react-icons/lia";
import { PiHandWaving } from "react-icons/pi";
import {
  Container,
  themeStyled,
  style,
  fieldsContainer,
  title,
  nameField,
  checked,
  switchStyled,
  ButtonStyledRed,
  PlusButton,
  FooterFilter,
  ButtonStyled,
} from "./styles";

export default function PraiseSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [praiseId] = useState(location.state.praiseId);

  const { praiseData } = location.state;

  const [louvor, setLouvor] = useState("");

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
    setOpen(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => setOpenDeleteModal(false);

  const [active, setActive] = useState(
    praiseData.active !== undefined && praiseData.active !== null
      ? praiseData.active
      : true
  );
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
    displayTextLyricsInsteadOfSVG: praiseData.flagLyrics,
    displayTextChordsInsteadOfSVG: praiseData.flagChords,
  });

  const [fileArray, setFileArray] = useState([]);

  const [linkInstruments, setLinkInstruments] = useState(
    praiseData.linkDriveFolder !== "null" && praiseData.linkDriveFolder
      ? praiseData.linkDriveFolder
      : ""
  );

  const [linkYoutube, setLinkYoutube] = useState(
    praiseData.linkYoutube !== "null" && praiseData.linkYoutube
      ? praiseData.linkYoutube
      : ""
  );

  const [praiseKeyChord, setPraiseKeyChord] = useState(
    praiseData.chordsKey !== null ? praiseData.chordsKey : ""
  );

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
    displayTextLyricsInsteadOfSVG,
    displayTextChordsInsteadOfSVG,
  } = checkeds;

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/SongBookMap/${praiseId}/Get`;
      const response = await fetch(url);
      const louvorData = await response.json();
      setLouvor(louvorData);
    }
    fetchData();
    // eslint-disable-next-line
  }, [praiseId]);

  function setActiveTab(file) {
    const fileMap = {
      lyrics: louvor.lyricsPdf,
      chords: louvor.chordsPdf,
      musicSheet: louvor.sheetMusicPdf,
      gestures: louvor.gesturesFile,
    };

    if (fileMap[file]) {
      setFileArray(fileMap[file].map(setUrl));
    }
  }

  function setUrl(file) {
    return `data:${file.document.contentType};base64,${file.document.file}`;
  }

  const handleChangeCheckbox = (event) => {
    setCheckeds({
      ...checkeds,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeActive = (event) => {
    setActive(event.target.checked);
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

  const handleChangeLinkInstruments = (event) => {
    setLinkInstruments(event.target.value);
  };

  const handleChangeLinkYoutube = (event) => {
    setLinkYoutube(event.target.value);
  };

  const handleChangeChordsContent = (event) => {
    setChordsContent(event.target.value);
  };

  const handleChangeLyricsContent = (event) => {
    setLyricsContent(event.target.value);
  };

  const handleChangePraiseChordKey = (event) => {
    setPraiseKeyChord(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("songBookMapId", praiseId);
    formData.append("active", active);
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
      await api.put("/SongBookMap", formData);
      handleClickSnackbar({});
      setSnackbarData({
        status: "success",
        message: "Settings applied with Success",
        time: 2000,
      });
      sendHistory(formData);
    } catch (error) {
      handleClickSnackbar({});
      setSnackbarData({
        status: "error",
        message: "Something went wrong! Please, try again later!",
        time: 3000,
      });
    }
  }

  async function sendHistory(formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    let changes = verifyChangings(formData);

    const log = JSON.stringify({
      title: louvor.englishTitle ? louvor.englishTitle : louvor.portugueseTitle,
      praiseNumber: louvor.englishSongBookNumber
        ? louvor.englishSongBookNumber
        : louvor.portugueseSongBookNumber,
      portugueseSongBookNumber: louvor.portugueseSongBookNumber,
      englishSongBookNumber: louvor.englishSongBookNumber,
      change: changes,
    });

    if (changes.length > 0) {
      try {
        await api.post("/log", {
          name: user.userName,
          email: user.email,
          action: "Update",
          log: log,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function verifyChangings(formData) {
    let changedValues = [];
    const praiseDataActive =
      praiseData.active !== undefined && praiseData.active !== null
        ? praiseData.active
        : true;
    if (praiseDataActive !== (formData.get("active") === "true"))
      changedValues.push(
        formData.get("active") === "true" ? "active status" : "inactive status"
      );
    if (praiseData.theme !== formData.get("theme")) changedValues.push("theme");
    if (
      praiseData.portugueseSongBookNumber !==
      formData.get("portugueseSongBookNumber")
    )
      changedValues.push("portuguese songbook number");
    if (praiseData.portugueseTitle !== formData.get("portugueseTitle"))
      changedValues.push("portuguese title");
    if (
      praiseData.englishSongBookNumber !== formData.get("englishSongBookNumber")
    )
      changedValues.push("english songbook number");
    if (praiseData.englishTitle !== formData.get("englishTitle"))
      changedValues.push("english title");
    if (
      praiseData.containsInPortugueseSongBook !==
      (formData.get("containsInPortugueseSongBook") === "true")
    )
      changedValues.push("praise contains in Portuguese songbook");
    if (
      praiseData.containsInCiasSongBook !==
      (formData.get("containsInCiasSongBook") === "true")
    )
      changedValues.push("praise contains in CIA's songbook");
    if (
      praiseData.containsInSuplementareASongBook !==
      (formData.get("containsInSuplementareASongBook") === "true")
    )
      changedValues.push("praise contains in suplementare-A songbook");
    if (
      praiseData.containsInSuplementareBSongBook !==
      (formData.get("containsInSuplementareBSongBook") === "true")
    )
      changedValues.push("praise contains in suplementare-B songbook");
    if (praiseData.flagLyrics !== (formData.get("flagLyrics") === "true"))
      changedValues.push("display text Lyrics");
    if (praiseData.flagChords !== (formData.get("flagChords") === "true"))
      changedValues.push("display text Chords");

    if (
      (formData.get("linkDriveFolder") === "" &&
        praiseData.linkDriveFolder &&
        praiseData.linkDriveFolder.length > 6) ||
      (formData.get("linkDriveFolder") !== "" &&
        formData.get("linkDriveFolder") !== praiseData.linkDriveFolder)
    ) {
      changedValues.push("link of instruments Drive");
    }

    if (
      (formData.get("linkYoutube") === "" &&
        praiseData.linkYoutube &&
        praiseData.linkYoutube.length > 6) ||
      (formData.get("linkYoutube") !== "" &&
        formData.get("linkYoutube") !== praiseData.linkYoutube)
    ) {
      changedValues.push("link Youtube");
    }

    if (praiseData.chords !== formData.get("chords"))
      changedValues.push("text Chords");
    if (praiseData.lyrics !== formData.get("lyrics"))
      changedValues.push("text Lyrics");

    if (
      (formData.get("chordsKey") === "" && praiseData.chordsKey) ||
      (formData.get("chordsKey") !== "" &&
        praiseData.chordsKey !== formData.get("chordsKey"))
    )
      changedValues.push("chords key");
    if (filesSelected.length > 0) changedValues.push("files SVG");
    return changedValues;
  }

  return (
    <Container>
      <Header />
      <ThemeProvider theme={themeStyled}>
        <Box sx={style}>
          <div className="initial-container">
            <h1>Praise Settings</h1>

            <div className="header-actions">
              <FormControlLabel
                sx={switchStyled}
                control={
                  <Switch
                    checked={active}
                    onChange={handleChangeActive}
                    name="active"
                  />
                }
                label={active ? "Active" : "Inactive"}
              />

              <div className="delete-button" onClick={handleOpen}>
                <RiDeleteBin5Line size={20} />
              </div>
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

          {/* --------------------- LYRICS ----------------------------------- */}
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
          <br></br>

          {/* --------------------- Chord Key ----------------------------------- */}
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

          {/* --------------------- CHORDS ----------------------------------- */}
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

          {/* --------------------- Already saved SVGs ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Click to See Already Saved files SVG and Instruments Drive Folder
              Link:
            </Typography>
            <div className="icons-container">
              {louvor.linkDriveFolder &&
                louvor.linkDriveFolder !== "null" &&
                (louvor.linkDriveFolder?.includes("http://") ||
                  louvor.linkDriveFolder?.includes("https://")) && (
                  <a
                    href={louvor.linkDriveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon-container">
                      <LuFolderClosed color={"var(--color-black)"} size={18} />
                    </div>
                  </a>
                )}

              {louvor.containsInCiasSongBook && (
                <>
                  {louvor.linkGestures ? (
                    <div
                      className="icon-container"
                      onClick={() => setActiveTab("gestures")}
                    >
                      <PiHandWaving color={"var(--color-black)"} size={19} />
                    </div>
                  ) : (
                    <div className="icon-container">
                      <PiHandWaving color={"var(--color-gray-2)"} size={19} />
                    </div>
                  )}
                </>
              )}

              {louvor.linkSheetMusic ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("musicSheet")}
                >
                  <LuMusic color={"var(--color-black)"} size={17} />
                </div>
              ) : (
                <div className="icon-container">
                  <LuMusic color={"var(--color-gray-2)"} size={17} />
                </div>
              )}

              {louvor.linkPdfLyrics ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("lyrics")}
                >
                  <LuType color={"var(--color-black)"} size={17} />
                </div>
              ) : (
                <div className="icon-container">
                  <LuType color={"var(--color-gray-2)"} size={17} />
                </div>
              )}

              {louvor.linkChords ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("chords")}
                >
                  <LiaGuitarSolid color={"var(--color-black)"} size={22} />
                </div>
              ) : (
                <div className="icon-container">
                  <LiaGuitarSolid color={"var(--color-gray-2)"} size={22} />
                </div>
              )}
            </div>
            <div className="files-praiseData-container">
              {fileArray.map((url, i) => (
                <img key={i} src={url} alt="praiseImg" className="file" />
              ))}
            </div>
          </div>
          <br></br>

          {/* --------------------- UPLOAD FILES SVGs ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Upload Files SVG:
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

          {/* ---------------------Display: UPLOAD FILES SVGs ----------------------------------- */}
          <TableFiles
            filesSelected={filesSelected}
            setFilesSelected={setFilesSelected}
          />

          {/* ---------------------BUTTONS return and save ----------------------------------- */}
          <FooterFilter>
            <ButtonStyled onClick={() => navigate("/praises-admin")}>
              Return to Admin Home
            </ButtonStyled>
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
