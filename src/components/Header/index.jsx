import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuShare2 } from "react-icons/lu";
import { PiListHeart } from "react-icons/pi";

const Header = ({
  louvor = {},
  setActiveTab = "",
  servicePraises = [],
  setShowShareList = false,
}) => {
  const navigate = useNavigate();
  const navPath = window.location.pathname?.toString();
  const isPathPraise = navPath.indexOf("/praise/") !== -1;

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
          onClick={() => navigate("/my-praises-list")}
        >
          <PiListHeart size={24} color="black" />
          {servicePraises.length > 0 && (
            <div className="list-length">{servicePraises.length}</div>
          )}
        </div>
      )}
      {/* TODO: change path to = /my-praises-list */}
      {navPath === "/my-praises-list" && servicePraises.length > 0 && (
        <div className="share-button" onClick={() => setShowShareList(true)}>
          <LuShare2 size={20} color="black" />
        </div>
      )}
      {isPathPraise && (
        <div className="icons-container">
          {louvor.linkSheetMusic ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("musicSheet", louvor)}
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
              onClick={() => setActiveTab("lyrics", louvor)}
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
              onClick={() => setActiveTab("chords", louvor)}
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
              onClick={() => setActiveTab("audio", louvor)}
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
