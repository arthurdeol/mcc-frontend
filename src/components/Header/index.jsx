import { useState } from "react";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuShare2 } from "react-icons/lu";
import { PiListHeart } from "react-icons/pi";
import SendListModal from "../../components/SendListModal";

const Header = ({ louvor = {}, setActiveTab = "", servicePraises = [] }) => {
  const navigate = useNavigate();
  const navPath = window.location.pathname?.toString();

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Container>
      <img
        className="logo"
        src="/images/logomcc.jpeg"
        alt="mcc logo"
        onClick={() =>
          navPath === "/praise-settings" || navPath === "/praises-admin"
            ? navigate("/praises-admin")
            : navigate("/")
        }
      />

      {navPath === "/" && (
        <div
          className="list-button"
          onClick={() => navigate("/service-praises-list")}
        >
          <PiListHeart size={24} color="black" />
          {servicePraises.length > 0 && (
            <div className="list-length">{servicePraises.length}</div>
          )}
        </div>
      )}

      {navPath === "/service-praises-list" && (
        <>
          <div className="share-button" onClick={handleOpen}>
            <LuShare2 size={22} color="black" />
          </div>

          <SendListModal
            openModal={openModal}
            onCloseModal={handleClose}
            servicePraises={servicePraises}
          />
        </>
      )}

      {navPath === "/praise" && (
        <div className="icons-container">
          {louvor.linkSheetMusic ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuMusic", louvor)}
            >
              <LuMusic color={"black"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuMusic color={"#9ca3af"} size={17} />
            </div>
          )}

          {louvor.linkPdfLyrics ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuType", louvor)}
            >
              <LuType color={"black"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuType color={"#9ca3af"} size={17} />
            </div>
          )}

          {louvor.linkChords ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuListMusic", louvor)}
            >
              <LuListMusic color={"black"} size={19} />
            </div>
          ) : (
            <div className="icon-container">
              <LuListMusic color={"#9ca3af"} size={19} />
            </div>
          )}

          {/* {louvor.linkAudioFile ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuVolume1", louvor)}
            >
              <LuVolume1 color={"black"} size={20} />
            </div>
          ) : (
            <div className="icon-container">
              <LuVolume1 color={"#9ca3af"} size={20} />
            </div>
          )} */}
        </div>
      )}
    </Container>
  );
};

export default Header;
