import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  style,
  title,
  checked,
  themeTitle,
  theme,
  footerFilter,
  ButtonStyled,
  ButtonStyledRed,
  XClose,
} from "./styles";

export default function FilterModal({
  openModal,
  onCloseModal,
  setComplexFilter,
  activeFilters,
}) {
  const [formValue, setFormValue] = useState({
    containsInCiasSongBook: false,
    containsVideo: false,
    pleadingTheme: false,
    chorusesTheme: false,
    comfortAndEncouragementTheme: false,
    dedicationTheme: false,
    deathResurrectionAndSalvationTheme: false,
    eternityAndTheReturnOfJesusTheme: false,
    invocationFellowshipTheme: false,
    santificationOutpouringHSTheme: false,
    praiseGroupTheme: false,
    praiseTheme: false,
  });

  const {
    containsInCiasSongBook,
    containsVideo,
    pleadingTheme,
    chorusesTheme,
    comfortAndEncouragementTheme,
    dedicationTheme,
    deathResurrectionAndSalvationTheme,
    eternityAndTheReturnOfJesusTheme,
    invocationFellowshipTheme,
    santificationOutpouringHSTheme,
    praiseGroupTheme,
    praiseTheme,
  } = formValue;

  // 🔹 Atualiza checkboxes ao abrir modal com filtros ativos
  useEffect(() => {
    if (openModal && activeFilters) {
      setFormValue({
        containsInCiasSongBook: activeFilters.includes("Cias Songbook"),
        containsVideo: activeFilters.includes("Video"),
        pleadingTheme: activeFilters.includes("PLEADING"),
        chorusesTheme: activeFilters.includes("CHORUSES"),
        comfortAndEncouragementTheme: activeFilters.includes(
          "COMFORT AND ENCOURAGEMENT"
        ),
        dedicationTheme: activeFilters.includes("DEDICATION"),
        deathResurrectionAndSalvationTheme: activeFilters.includes(
          "DEATH, RESURRECTION AND SALVATION"
        ),
        eternityAndTheReturnOfJesusTheme: activeFilters.includes(
          "ETERNITY AND THE RETURN OF JESUS"
        ),
        invocationFellowshipTheme: activeFilters.includes(
          "INVOCATION FELLOWSHIP"
        ),
        santificationOutpouringHSTheme: activeFilters.includes(
          "SANTIFICATION AND OUTPOURING OF THE HOLY SPIRIT"
        ),
        praiseGroupTheme: activeFilters.includes("PRAISE GROUP"),
        praiseTheme: activeFilters.includes("PRAISE"),
      });
    }
  }, [openModal, activeFilters]);

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.checked,
    });
  };

  function applyFilter() {
    let themesApplied = [];
    if (formValue) {
      if (formValue.pleadingTheme) themesApplied.push("PLEADING");
      if (formValue.chorusesTheme) themesApplied.push("CHORUSES");
      if (formValue.comfortAndEncouragementTheme)
        themesApplied.push("COMFORT AND ENCOURAGEMENT");
      if (formValue.dedicationTheme) themesApplied.push("DEDICATION");
      if (formValue.deathResurrectionAndSalvationTheme)
        themesApplied.push("DEATH, RESURRECTION AND SALVATION");
      if (formValue.eternityAndTheReturnOfJesusTheme)
        themesApplied.push("ETERNITY AND THE RETURN OF JESUS");
      if (formValue.invocationFellowshipTheme)
        themesApplied.push("INVOCATION FELLOWSHIP");
      if (formValue.santificationOutpouringHSTheme)
        themesApplied.push("SANTIFICATION AND OUTPOURING OF THE HOLY SPIRIT");
      if (formValue.praiseGroupTheme) themesApplied.push("PRAISE GROUP");
      if (formValue.praiseTheme) themesApplied.push("PRAISE");
    }
    onCloseModal();
    setComplexFilter(formValue, themesApplied);
  }

  function cleanFilter() {
    setFormValue({
      containsInCiasSongBook: false,
      containsVideo: false,
      pleadingTheme: false,
      chorusesTheme: false,
      comfortAndEncouragementTheme: false,
      dedicationTheme: false,
      deathResurrectionAndSalvationTheme: false,
      eternityAndTheReturnOfJesusTheme: false,
      invocationFellowshipTheme: false,
      santificationOutpouringHSTheme: false,
      praiseGroupTheme: false,
      praiseTheme: false,
    });
  }

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

            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={containsVideo}
                  onChange={handleChange}
                  name="containsVideo"
                />
              }
              label="With Video"
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
                  checked={comfortAndEncouragementTheme}
                  onChange={handleChange}
                  name="comfortAndEncouragementTheme"
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
                  checked={deathResurrectionAndSalvationTheme}
                  onChange={handleChange}
                  name="deathResurrectionAndSalvationTheme"
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
              <ButtonStyled onClick={cleanFilter}>Unselect</ButtonStyled>
              <ButtonStyledRed onClick={applyFilter}>
                Apply filter
              </ButtonStyledRed>
            </Box>
          </FormGroup>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
