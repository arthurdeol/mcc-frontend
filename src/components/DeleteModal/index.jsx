import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LuX } from "react-icons/lu";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  style,
  Card,
  XClose,
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.delete("/SongBookMap", {
        data: { songBookMapId: praiseId },
      });

      alert("Praise Deleted");
      navigate("/praises-admin");
      console.log(response);
    } catch (error) {
      alert("Something went wrong! Please, try again later!");
      console.log(error);
    }
  }
  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Box sx={{ ...style }}>
        <XClose onClick={onCloseModal}>
          <LuX />
        </XClose>
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
  );
}
