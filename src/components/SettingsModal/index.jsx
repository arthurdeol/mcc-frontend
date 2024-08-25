import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "../../services/api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid #ededed",
  borderRadius: "10px",
  boxShadow: 24,
  color: "black",
  p: 4,
  width: { xs: "90%", sm: "70%", md: "50%", lg: "auto" },
};

const theme = createTheme({
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

const xClose = {
  position: "absolute",
  top: 25,
  right: 20,
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

export default function SettingsModal({
  openModalSettings,
  onCloseModalSettings,
  praiseId,
}) {
  // const [cloudUrl, setCloudUrl] = useState("");
  const [typeOfFile, setTypeOfFile] = useState("");
  const [order, setOrder] = useState(0);
  const [files, setFiles] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (event) => {
    setTypeOfFile(event.target.value);
    console.log(typeOfFile);
  };

  // const handleChangeCloudUrl = (event) => {
  //   setCloudUrl(event.target.value);
  // };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const handleChangeFiles = (event) => {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);
    setFiles(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let data = {
      songBookMapId: praiseId,
      fileType: typeOfFile,
      // fileUrl: cloudUrl,
      order: Number(order),
      file: files[0],
    };

    console.log(data);
    await api.post("/orphanages", data);
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalSettings}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={xClose} onClick={onCloseModalSettings}>
            <LuX />
          </Box>

          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Settings
          </Typography>

          {/* <TextField
            value={cloudUrl}
            id="outlined-basic"
            label="Cloud Url"
            variant="outlined"
            onChange={handleChangeCloudUrl}
          /> */}

          <br></br>

          <TextField
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
                onChange={handleChange}
              >
                <MenuItem value={"Lyrics"}>Lyrics</MenuItem>
                <MenuItem value={"Chords"}>Chords</MenuItem>
                <MenuItem value={"SheetMusic"}>Music Sheet</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <br></br>
          <div className="images-container">
            {previewImages.map((image) => (
              <img
                key={image}
                src={image}
                style={{ width: "200px" }}
                alt={"praise"}
              />
            ))}
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onChange={handleChangeFiles}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>

          <Box sx={footerFilter}>
            <Button
              variant="outlined"
              size="small"
              type="submit"
              color="error"
              onClick={handleSubmit}
              sx={button}
            >
              Add file
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
