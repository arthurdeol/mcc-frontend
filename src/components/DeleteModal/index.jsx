import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  style,
  Card,
  ButtonStyledRed,
  ButtonStyled,
  FooterFilter,
} from "./styles";

export default function DeleteModal({
  openModal,
  onCloseModal,
  praiseId,
  praiseData,
}) {
  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.delete("/SongBookMap", {
        data: { songBookMapId: praiseId },
      });

      handleClickSnackbar();
      setSnackbarData({
        status: "success",
        message: "Praise Deleted!",
        time: 1000,
      });
      sendHistory();
    } catch (error) {
      handleClickSnackbar();
      setSnackbarData({
        status: "error",
        message: "Something went wrong! Please, try again later!",
        time: 3000,
      });
    }
  }

  async function sendHistory() {
    const user = JSON.parse(localStorage.getItem("user"));

    const log = JSON.stringify({
      title: praiseData.englishTitle
        ? praiseData.englishTitle
        : praiseData.portugueseTitle,
      praiseNumber: praiseData.englishSongBookNumber
        ? praiseData.englishSongBookNumber
        : praiseData.portugueseSongBookNumber,
      change: ["Deleted"],
    });

    try {
      await api.post("/log", {
        name: user.userName,
        email: user.email,
        action: "Delete",
        log: log,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Modal open={openModal} onClose={onCloseModal}>
        <Box sx={{ ...style }}>
          <h2>Are you sure you want to delete this praise?</h2>
          <Card className="text-container">
            {praiseData.englishTitle && (
              <h6 className="praise-title-en">
                {praiseData.englishSongBookNumber
                  ? praiseData.englishSongBookNumber + " - "
                  : " "}
                {praiseData.englishTitle ? praiseData.englishTitle : ""}
              </h6>
            )}
            {praiseData.portugueseTitle && (
              <p className="praise-title-pt">
                {praiseData.portugueseSongBookNumber
                  ? praiseData.portugueseSongBookNumber + " - "
                  : "Avulso - "}
                {praiseData.portugueseTitle ? praiseData.portugueseTitle : ""}
              </p>
            )}
            <div className="theme-tag-container">
              {praiseData.containsInCiasSongBook && (
                <div className="theme-tag-cia">CIA's</div>
              )}
              <div className="theme-tag">{praiseData.theme}</div>
            </div>
          </Card>
          <FooterFilter>
            <ButtonStyled onClick={onCloseModal}>Cancel</ButtonStyled>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Yes, I want to delete
            </ButtonStyledRed>
          </FooterFilter>
        </Box>
      </Modal>
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
    </>
  );
}
