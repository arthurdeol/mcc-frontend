import { style, ButtonStyledRed, ButtonStyled, FooterFilter } from "./styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function OpenYoutubeModal({
  openModalYoutube,
  handleCloseModalYoutube,
  louvor,
}) {
  return (
    <Modal open={openModalYoutube} onClose={handleCloseModalYoutube}>
      <Box sx={style}>
        <h2 style={{ fontSize: "1.1rem" }}>Play Youtube video?</h2>
        <FooterFilter>
          <ButtonStyled onClick={handleCloseModalYoutube}>Cancel</ButtonStyled>
          <ButtonStyledRed
            onClick={() => {
              window.open(louvor.linkYoutube, "_blank");
              handleCloseModalYoutube();
            }}
          >
            Yes, play it!
          </ButtonStyledRed>
        </FooterFilter>
      </Box>
    </Modal>
  );
}
