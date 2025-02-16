import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import {
  style,
  title,
  theme,
  XClose,
  linkInput,
  CopyButton,
  InputContainer,
  WhatsappButton,
  ButtonsContainer,
} from "./styles";

export default function ShareListLinkModal({
  openModal,
  onCloseModal,
  listIdToShare,
  servicePraises,
}) {
  const baseUrl = "https://mccsongbook.netlify.app/";
  const routeUrl = "shared-praises-list/";
  const link = `${baseUrl + routeUrl + listIdToShare}`;

  const shareOnWhatsApp = () => {
    const praisesListWhatsapp = [];

    console.log(servicePraises);
    for (let i = 0; i < servicePraises.length; i++) {
      if (servicePraises[i].englishTitle) {
        if (servicePraises[i].englishSongBookNumber) {
          praisesListWhatsapp.push(
            `${servicePraises[i].englishSongBookNumber} - ${servicePraises[i].englishTitle}`
          );
        } else {
          praisesListWhatsapp.push(servicePraises[i].englishTitle);
        }
      } else {
        if (servicePraises[i].portugueseSongBookNumber) {
          praisesListWhatsapp.push(
            `${servicePraises[i].portugueseSongBookNumber} - ${servicePraises[i].portugueseTitle}`
          );
        } else {
          praisesListWhatsapp.push(servicePraises[i].portugueseTitle);
        }
      }
    }

    const formattedMessage = praisesListWhatsapp.join("\n");

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      formattedMessage + "\n\n" + link
    )}`;

    window.open(whatsappUrl, "_blank");
  };

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

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    handleClickSnackbar();
    setSnackbarData({
      status: "success",
      message: "Link Copied!",
      time: 1000,
    });
    navigator.clipboard.writeText(link);
  }

  return (
    <ThemeProvider theme={theme}>
      <>
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
              Share the list via this link:
            </Typography>
            <InputContainer>
              <TextField
                sx={linkInput}
                value={link}
                slotprops={{
                  input: {
                    readOnly: true,
                  },
                }}
                id="outlined-basic"
                label="Link"
                variant="outlined"
              />
            </InputContainer>
            <ButtonsContainer>
              <CopyButton onClick={handleCopy}>
                {copied ? (
                  <LuCopyCheck color={"var(--color-green)"} size={23} />
                ) : (
                  <LuCopy color={"var(--color-gray-2)"} size={23} />
                )}
              </CopyButton>

              <WhatsappButton onClick={shareOnWhatsApp}>
                <FaWhatsapp
                  className={style.whatsappButton}
                  color={"var(--color-green)"}
                  size={25}
                />
              </WhatsappButton>
            </ButtonsContainer>
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
    </ThemeProvider>
  );
}
