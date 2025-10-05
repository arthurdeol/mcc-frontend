import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { style, title, theme, XClose } from "./styles";

export default function CommentModal({ openModal, onCloseModal, comment }) {
  useEffect(() => {}, []);

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
            Comment:
          </Typography>
          <div>{comment}</div>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
