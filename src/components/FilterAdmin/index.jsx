import {
  Modal,
  Box,
  FormControlLabel,
  Checkbox,
  ThemeProvider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { LuX } from "react-icons/lu";
import { style, checked, theme, XClose, title } from "./styles";

const FilterAdmin = ({ open, handleClose, checkeds, handleChangeCheckbox }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <>
          <Box sx={style}>
            <XClose onClick={handleClose}>
              <LuX />
            </XClose>
            <Typography
              sx={title}
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              Extra Admin Filters
            </Typography>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingChords || false}
                    onChange={handleChangeCheckbox}
                    name="missingChords"
                  />
                }
                label="Missing Chords"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingLyrics || false}
                    onChange={handleChangeCheckbox}
                    name="missingLyrics"
                  />
                }
                label="Missing Lyrics"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingMusicSheet || false}
                    onChange={handleChangeCheckbox}
                    name="missingMusicSheet"
                  />
                }
                label="Missing Music Sheet"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingChordsLyricsMusicSheet || false}
                    onChange={handleChangeCheckbox}
                    name="missingChordsLyricsMusicSheet"
                  />
                }
                label="Missing Chords, Lyrics and Music Sheet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingDriveLink || false}
                    onChange={handleChangeCheckbox}
                    name="missingDriveLink"
                  />
                }
                label="Missing Drive Link"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.orderPortuguese || false}
                    onChange={handleChangeCheckbox}
                    name="orderPortuguese"
                  />
                }
                label="Order By PT Songbook"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.chordsAsText || false}
                    onChange={handleChangeCheckbox}
                    name="chordsAsText"
                  />
                }
                label="Chords as text"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.lyricsAsText || false}
                    onChange={handleChangeCheckbox}
                    name="lyricsAsText"
                  />
                }
                label="Lyrics as text"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.missingGestures || false}
                    onChange={handleChangeCheckbox}
                    name="missingGestures"
                  />
                }
                label="CIA's - Missing Gestures"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={checked}
                    checked={checkeds?.orderCiasByPT || false}
                    onChange={handleChangeCheckbox}
                    name="orderCiasByPT"
                  />
                }
                label="CIA's - Order By PT Songbook"
              />
            </div>
          </Box>
        </>
      </Modal>
    </ThemeProvider>
  );
};

export default FilterAdmin;
