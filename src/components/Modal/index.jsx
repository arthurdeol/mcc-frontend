import { Container } from "./styles";
import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { red, grey } from "@mui/material/colors";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid #ededed",
  borderRadius: "10px",
  boxShadow: 24,
  color: "black",
  p: 4,
};

const xClose = {
  position: "absolute",
  top: 25,
  right: 20,
};

const footerFilter = {
  display: "flex",
  justifyContent: "end",
};

const checked = {
  color: grey[600],
  "&.Mui-checked": {
    color: red[700],
  },
};

export default function BasicModal({ openModal, onCloseModal }) {
  const [formValue, setFormValue] = useState({
    containsInSongBook: true,
    containsInSuplementareASongBook: true,
    containsInSuplementareBSongBook: true,
    containsInCiasSongBook: true,
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.checked,
    });
    // console.log(formValue);
  };

  const {
    containsInSongBook,
    containsInSuplementareASongBook,
    containsInSuplementareBSongBook,
    containsInCiasSongBook,
  } = formValue;

  function applyFilter() {
    console.log(formValue);
  }

  return (
    <Container>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={xClose} onClick={onCloseModal}>
            <LuX />
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={containsInSongBook}
                  onChange={handleChange}
                  name="containsInSongBook"
                />
              }
              label="Song Book"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={containsInSuplementareASongBook}
                  onChange={handleChange}
                  name="containsInSuplementareASongBook"
                />
              }
              label="Suplementare A"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={containsInSuplementareBSongBook}
                  onChange={handleChange}
                  name="containsInSuplementareBSongBook"
                />
              }
              label="Suplementare B"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={containsInCiasSongBook}
                  onChange={handleChange}
                  name="containsInCiasSongBook"
                />
              }
              label="CIA's"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Pleading"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Invocation and Fellowship"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Death, Resurrection and Salvation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Dedication"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Comfort and Encouragement"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Santification and Outpouring of the Holy Spirit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Eternity and the Return of Jesus"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Praise"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={songBook}
                  onChange={handleChange}
                  name="songBook"
                />
              }
              label="Praise Group"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox defaultChecked sx={checked} />}
              label="Suplementare A"
            /> */}
            <Box sx={footerFilter}>
              <button>Undo</button>
              <button type="submit" onClick={applyFilter}>
                Apply
              </button>
            </Box>
          </FormGroup>
        </Box>
      </Modal>
    </Container>
  );
}
