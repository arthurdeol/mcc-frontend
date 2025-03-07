import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import {
  LuType,
  LuListMusic,
  LuMusic,
  LuShare2,
  LuListEnd,
} from "react-icons/lu";
import { PiListHeart, PiHandWaving } from "react-icons/pi";

const Header = ({
  louvor = {},
  setActiveTab = "",
  servicePraises = [],
  setShowShareList = false,
}) => {
  const navigate = useNavigate();
  const navPath = window.location.pathname?.toString();
  const isPathPraise = navPath.indexOf("/praise/") !== -1;
  const takeSentServiceListId = localStorage.getItem("sentServiceListId");

  return (
    <Container>
      <img
        className="logo"
        src="/images/logomcc.jpeg"
        alt="mcc logo"
        onClick={() =>
          navPath === "/praise-settings" ||
          navPath === "/praises-admin" ||
          navPath === "/add-praise"
            ? navigate("/praises-admin")
            : navigate("/")
        }
      />
      {navPath === "/" && (
        <div
          className="list-button"
          onClick={() => navigate("/my-praises-list")}
        >
          <PiListHeart size={24} color="var(--color-black)" />
          {servicePraises.length > 0 && (
            <div className="list-length">{servicePraises.length}</div>
          )}
        </div>
      )}

      {navPath === "/my-praises-list" && servicePraises.length > 0 && (
        <div className="share-button" onClick={() => setShowShareList(true)}>
          <LuShare2 size={20} color="var(--color-black)" />
        </div>
      )}

      {navPath === "/praises-admin" && (
        <h1 className="praise-settings-title">Admin - Praises</h1>
      )}

      {isPathPraise && (
        <div className="icons-container">
          {louvor.containsInCiasSongBook && (
            <>
              {louvor.linkGestures ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("gestures", louvor)}
                >
                  <PiHandWaving color={"var(--color-black)"} size={19} />
                </div>
              ) : (
                <div className="icon-container">
                  <PiHandWaving color={"var(--color-gray-2)"} size={17} />
                </div>
              )}
            </>
          )}

          {louvor.linkSheetMusic ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("musicSheet", louvor)}
            >
              <LuMusic color={"var(--color-black)"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuMusic color={"var(--color-gray-2)"} size={17} />
            </div>
          )}

          {(louvor.filesSVGFlag && louvor.linkPdfLyrics) ||
          (!louvor.filesSVGFlag && louvor.lyrics) ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("lyrics", louvor)}
            >
              <LuType color={"var(--color-black)"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuType color={"var(--color-gray-2)"} size={17} />
            </div>
          )}

          {(louvor.filesSVGFlag && louvor.linkChords) ||
          (!louvor.filesSVGFlag && louvor.chords) ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("chords", louvor)}
            >
              <LuListMusic color={"var(--color-black)"} size={19} />
            </div>
          ) : (
            <div className="icon-container">
              <LuListMusic color={"var(--color-gray-2)"} size={19} />
            </div>
          )}

          {/* {louvor.linkAudioFile ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("audio", louvor)}
            >
              <LuVolume1 color={"var(--color-black)"} size={20} />
            </div>
          ) : (
            <div className="icon-container">
              <LuVolume1 color={"var(--color-gray-2)"} size={20} />
            </div>
          )} */}

          {/* ----------------Return to Service List------------------ */}
          {localStorage.getItem("sentServiceListId") && isPathPraise && (
            <div
              className="sent-service-list-button"
              onClick={() =>
                navigate(`/shared-praises-list/${takeSentServiceListId}`)
              }
            >
              <LuListEnd size={20} color="var(--color-black)" />
              {servicePraises.length > 0 && (
                <div className="list-length">{servicePraises.length}</div>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Header;
