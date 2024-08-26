import { Container } from "./styles";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import api from "../../../services/api";
import Header from "../../../components/Header";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { styled } from "@mui/material/styles";
// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const style = {
  display: "flex",
  flexDirection: "column",
  width: "70%",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "10px",
  color: "black",
  p: 4,
};

const themeStyled = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});

const fieldsContainer = {
  display: "flex",
  justifyContent: "space-between",
};

const nameField = {
  marginRight: "10px",
};

const checked = {
  color: grey[600],
  "&.Mui-checked": {
    color: red[700],
  },
};

const footerFilter = {
  display: "flex",
  justifyContent: "end",
  marginTop: "30px",
};

const title = {
  margin: "0 0 20px",
  color: "grey.700",
};

const button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  borderRadius: "10px",
  borderColor: "grey.800",
  color: "grey.800",
  textTransform: "none",
  fontSize: "16px",
  marginRight: "5px",
};

export default function PraiseSettings() {
  const location = useLocation();
  const [praiseId] = useState(location.state.praiseId);
  const [praiseTheme, setPraiseTheme] = useState("");
  const [portugueseSongBookNumber, setPortugueseSongBookNumber] = useState("");
  const [portugueseTitle, setPortugueseTitle] = useState("");
  const [englishSongBookNumber, setEnglishSongBookNumber] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [filesLyrics, setFilesLyrics] = useState([]);
  const [filesChords, setFilesChords] = useState([]);
  const [filesMusicSheet, setFilesMusicSheet] = useState([]);
  const [previewLyricsImages, setPreviewLyricsImages] = useState([]);
  const [previewChordsImages, setPreviewChordsImages] = useState([]);
  const [previewMusicSheetImages, setPreviewMusicSheetImages] = useState([]);
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

  const handleChangeCheckbox = (event) => {
    setCheckeds({
      ...checkeds,
      [event.target.name]: event.target.checked,
    });
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

  function treatSelectedImages(selectedImages, id) {
    let treatedSelectedImages = [];
    for (let i = 0; i < selectedImages.length; i++) {
      treatedSelectedImages.push({
        fileType: id,
        order: i,
        file: selectedImages[i],
      });
    }
    return treatedSelectedImages;
  }

  const handleChangeLyricsFiles = (event) => {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    const treatedSelectedImages = treatSelectedImages(
      selectedImages,
      event.target.id
    );
    setFilesLyrics(treatedSelectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewLyricsImages(selectedImagesPreview);
  };

  const handleChangeChordsFiles = (event) => {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    const treatedSelectedImages = treatSelectedImages(
      selectedImages,
      event.target.id
    );
    setFilesChords(treatedSelectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewChordsImages(selectedImagesPreview);
  };

  const handleChangeMusicSheetFiles = (event) => {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    const treatedSelectedImages = treatSelectedImages(
      selectedImages,
      event.target.id
    );
    setFilesMusicSheet(treatedSelectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewMusicSheetImages(selectedImagesPreview);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let allFiles = [];
    if (filesLyrics) allFiles.push(...filesLyrics);
    if (filesChords) allFiles.push(...filesChords);
    if (filesMusicSheet) allFiles.push(...filesMusicSheet);

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
    formData.append("theme", praiseTheme);
    formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
    formData.append("portugueseTitle", portugueseTitle);
    formData.append("englishSongBookNumber", englishSongBookNumber);
    formData.append("englishTile", englishTitle);
    formData.append("files", allFiles);

    let form = {
      songBookMapId: praiseId,
      containsInPortugueseSongBook: checkeds.containsInPortugueseSongBook,
      containsInCiasSongBook: checkeds.containsInCiasSongBook,
      containsInSuplementareASongBook: checkeds.containsInSuplementareASongBook,
      containsInSuplementareBSongBook: checkeds.containsInSuplementareBSongBook,
      theme: praiseTheme,
      portugueseSongBookNumber: portugueseSongBookNumber,
      portugueseTitle: portugueseTitle,
      englishSongBookNumber: englishSongBookNumber,
      englishTile: englishTitle,
      files: allFiles,
    };
    console.log(form);

    try {
      const response = await api.put("/SongBookMap", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header />
      <ThemeProvider theme={themeStyled}>
        <Box sx={style}>
          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Praise Settings
          </Typography>
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
              <InputLabel id="demo-simple-select-label">Theme</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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

          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
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
          <br></br>

          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
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
          <br></br>

          <div className="file-container">
            <div className="file-input">
              <label>Lyrics Files: </label>
              <input
                type="file"
                id="Lyrics"
                name="lyricsFiles"
                accept="image/svg"
                multiple
                onChange={handleChangeLyricsFiles}
              />
            </div>
            <div className="images-container">
              {previewLyricsImages.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="image-file"
                  alt={"praise"}
                />
              ))}
            </div>
          </div>
          <br></br>

          <div className="file-container">
            <div className="file-input">
              <label>Chords Files: </label>
              <input
                label="Chords"
                type="file"
                id="Chords"
                name="chordsFiles"
                accept="image/svg"
                multiple
                onChange={handleChangeChordsFiles}
              />
            </div>
            <div className="images-container">
              {previewChordsImages.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="image-file"
                  alt={"praise"}
                />
              ))}
            </div>
          </div>
          <br></br>

          <div className="file-container">
            <div className="file-input">
              <label>Music Sheets Files: </label>
              <input
                type="file"
                id="SheetMusic"
                name="sheetMusicFiles"
                accept="image/svg"
                multiple
                onChange={handleChangeMusicSheetFiles}
              />
            </div>
            <div className="images-container">
              {previewMusicSheetImages.map((image, i) => (
                <img
                  className="image-file"
                  key={i}
                  src={image}
                  alt={"praise"}
                />
              ))}
            </div>
          </div>

          <Box sx={footerFilter}>
            <Button
              variant="outlined"
              size="small"
              type="submit"
              color="error"
              onClick={handleSubmit}
              sx={button}
            >
              Apply Settings
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

/* <TextField
value={order}
id="outlined-basic"
label="Order"
variant="outlined"
type="number"
onChange={handleChangeOrder}
/>
<br></br>

<Box sx={{ minWidth: 120 }}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={typeOfFile}
    label="Type"
    onChange={handleChangeTypeOfFile}
  >
    <MenuItem value={"Lyrics"}>Lyrics</MenuItem>
    <MenuItem value={"Chords"}>Chords</MenuItem>
    <MenuItem value={"SheetMusic"}>Music Sheet</MenuItem>
  </Select>
</FormControl>
</Box> */

// <Button
//           component="label"
//           role={undefined}
//           variant="contained"
//           tabIndex={-1}
//           onChange={handleChangeFiles}
//           multiple
//           startIcon={<CloudUploadIcon />}
//         >
//           Lyrics Files (SVG only)
//           <VisuallyHiddenInput type="file" />
//         </Button>

// "songBookMapId": "string",
// "containsInPortugueseSongBook": true,
// "containsInCiasSongBook": true,
// "containsInSuplementareASongBook": true,
// "containsInSuplementareBSongBook": true,
// "theme": "string",
// "portugueseSongBookNumber": "string",
// "portugueseTitle": "string",
// "englishSongBookNumber": "string",
// "englishTile": "string"
