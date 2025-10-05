import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ThemeProvider } from "@mui/material/styles";
import { style, title, theme, XClose } from "./styles";

export default function CommentModal({ openModal, onCloseModal, comment }) {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={openModal} onClose={onCloseModal}>
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
