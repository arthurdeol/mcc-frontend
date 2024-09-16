import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
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
} from "./styles";

export default function ShareListLinkModal({
  openModal,
  onCloseModal,
  listIdToShare,
  diplayError,
}) {
  const [copied, setCopied] = useState(false);

  const baseUrl = "https://mccsongbook.netlify.app/";
  const routeUrl = "shared-praises-list/";
  const link = `${baseUrl + routeUrl + listIdToShare}`;

  function handleCopy() {
    setCopied(true);
    navigator.clipboard.writeText(link);
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={openModal}>
        <Box sx={style}>
          <XClose onClick={onCloseModal}>
            <LuX />
          </XClose>

          {diplayError ? (
            <Typography
              sx={title}
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              Something went wrong! Please, try again later!
            </Typography>
          ) : (
            <>
              <Typography
                sx={title}
                id="modal-modal-title"
                variant="h5"
                component="h2"
              >
                Share this list throught this link
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

                <CopyButton onClick={handleCopy}>
                  {copied ? (
                    <LuCopyCheck color={"var(--color-green)"} size={23} />
                  ) : (
                    <LuCopy color={"var(--color-gray-2)"} size={23} />
                  )}
                </CopyButton>
              </InputContainer>{" "}
            </>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
