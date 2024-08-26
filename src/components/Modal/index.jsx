import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { red, grey } from "@mui/material/colors";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
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
  marginTop: "10px",
};

const checked = {
  color: grey[600],
  "&.Mui-checked": {
    color: red[700],
  },
};

const themeTitle = {
  margin: "10px 0 8px",
  color: "grey.700",
  fontSize: "16px",
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

export default function BasicModal({
  openModal,
  onCloseModal,
  setComplexFilter,
}) {
  const [formValue, setFormValue] = useState({
    containsInCiasSongBook: false,
    pleadingTheme: false,
    chorusesTheme: false,
    confortAndEncouragementTheme: false,
    dedicationTheme: false,
    dethRessurectionAndSalvationTheme: false,
    eternityAndTheReturnOfJesusTheme: false,
    invocationFellowshipTheme: false,
    santificationOutpouringHSTheme: false,
    praiseGroupTheme: false,
    praiseTheme: false,
  });

  const {
    containsInCiasSongBook,
    pleadingTheme,
    chorusesTheme,
    confortAndEncouragementTheme,
    dedicationTheme,
    dethRessurectionAndSalvationTheme,
    eternityAndTheReturnOfJesusTheme,
    invocationFellowshipTheme,
    santificationOutpouringHSTheme,
    praiseGroupTheme,
    praiseTheme,
  } = formValue;

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.checked,
    });
  };

  function applyFilter() {
    let themesApplied = [];
    if (formValue) {
      if (formValue.pleadingTheme) {
        themesApplied.push("PLEADING");
      }
      if (formValue.chorusesTheme) {
        themesApplied.push("CHORUSES");
      }
      if (formValue.confortAndEncouragementTheme) {
        themesApplied.push("CONFORT AND ENCOURAGEMENT");
      }
      if (formValue.dedicationTheme) {
        themesApplied.push("DEDICATION");
      }
      if (formValue.dethRessurectionAndSalvationTheme) {
        themesApplied.push("DETH, RESSURECTION AND SALVATION");
      }
      if (formValue.eternityAndTheReturnOfJesusTheme) {
        themesApplied.push("ETERNITY AND THE RETURN OF JESUS");
      }
      if (formValue.invocationFellowshipTheme) {
        themesApplied.push("INVOCATION FELLOWSHIP");
      }
      if (formValue.santificationOutpouringHSTheme) {
        themesApplied.push("SANTIFICATION AND OUTPOURING OF THE HOLY SPIRIT");
      }
      if (formValue.praiseGroupTheme) {
        themesApplied.push("PRAISE GROUP");
      }
      if (formValue.praiseTheme) {
        themesApplied.push("PRAISE");
      }
    }
    onCloseModal();
    setComplexFilter(formValue, themesApplied);
  }

  function cleanFilter() {
    setFormValue({
      containsInCiasSongBook: false,
      pleadingTheme: false,
      chorusesTheme: false,
      confortAndEncouragementTheme: false,
      dedicationTheme: false,
      dethRessurectionAndSalvationTheme: false,
      eternityAndTheReturnOfJesusTheme: false,
      invocationFellowshipTheme: false,
      santificationOutpouringHSTheme: false,
      praiseGroupTheme: false,
      praiseTheme: false,
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={xClose} onClick={onCloseModal}>
            <LuX />
          </Box>

          <Typography
            sx={title}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Filter
          </Typography>

          <FormGroup>
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

            <Typography sx={themeTitle}>Theme:</Typography>

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={pleadingTheme}
                  onChange={handleChange}
                  name="pleadingTheme"
                />
              }
              label="Pleading"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={confortAndEncouragementTheme}
                  onChange={handleChange}
                  name="confortAndEncouragementTheme"
                />
              }
              label="Comfort and Encouragement"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={dedicationTheme}
                  onChange={handleChange}
                  name="dedicationTheme"
                />
              }
              label="Dedication"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={invocationFellowshipTheme}
                  onChange={handleChange}
                  name="invocationFellowshipTheme"
                />
              }
              label="Invocation and Fellowship"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={dethRessurectionAndSalvationTheme}
                  onChange={handleChange}
                  name="dethRessurectionAndSalvationTheme"
                />
              }
              label="Death, Resurrection and Salvation"
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={santificationOutpouringHSTheme}
                  onChange={handleChange}
                  name="santificationOutpouringHSTheme"
                />
              }
              label="Santification and Outpouring of the Holy Spirit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={eternityAndTheReturnOfJesusTheme}
                  onChange={handleChange}
                  name="eternityAndTheReturnOfJesusTheme"
                />
              }
              label="Eternity and the Return of Jesus"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={praiseTheme}
                  onChange={handleChange}
                  name="praiseTheme"
                />
              }
              label="Praise"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={praiseGroupTheme}
                  onChange={handleChange}
                  name="praiseGroupTheme"
                />
              }
              label="Praise Group"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={chorusesTheme}
                  onChange={handleChange}
                  name="chorusesTheme"
                />
              }
              label="Choruses"
            />
            <Box sx={footerFilter}>
              <Button
                variant="outlined"
                type="button"
                size="small"
                color="error"
                onClick={cleanFilter}
                sx={button}
              >
                Unselect
              </Button>
              <Button
                variant="outlined"
                size="small"
                type="submit"
                color="error"
                onClick={applyFilter}
                sx={button}
              >
                Apply filter
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
