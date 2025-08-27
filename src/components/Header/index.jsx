import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import {
  LuType,
  LuListMusic,
  LuMusic,
  LuShare2,
  LuFolderClosed,
} from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { LuListEnd } from "react-icons/lu";
import { PiListHeart, PiHandWaving } from "react-icons/pi";
import { TbClockEdit } from "react-icons/tb";

const Header = ({
  louvor = {},
  openModalDeletePraisesList = () => {},
  setActiveTab = "",
  servicePraises = [],
  setShowShareList = false,
  showShareList,
}) => {
  const navigate = useNavigate();
  const navPath = window.location.pathname?.toString();
  const isPathPraise = navPath.indexOf("/praise/") !== -1;
  // const takeSentServiceListId = localStorage.getItem("sentServiceListId");
  const home = localStorage.getItem("home");

  return (
    <Container>
      <img
        className="logo"
        src="/images/logomcc.jpeg"
        alt="mcc logo"
        onClick={() =>
          home === "adminHome" ? navigate("/praises-admin") : navigate("/")
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

      {navPath === "/my-praises-list" &&
        servicePraises.length > 0 &&
        showShareList === false && (
          <div className="share-delete-container">
            <div
              className="delete-list-button"
              onClick={openModalDeletePraisesList}
            >
              <RiDeleteBin5Line size={20} color="var(--color-black)" />
            </div>

            <div
              className="share-button"
              onClick={() => setShowShareList(true)}
            >
              <LuShare2 size={20} color="var(--color-black)" />
            </div>
          </div>
        )}

      {navPath === "/praises-admin" && (
        <h1 className="praise-settings-title">Admin - Praises</h1>
      )}

      {navPath === "/praises-admin" && (
        <div className="history-button" onClick={() => navigate("/history")}>
          <TbClockEdit size={25} color="var(--color-black)" />
        </div>
      )}

      {isPathPraise && (
        <div className="icons-container">
          {louvor.linkDriveFolder &&
            louvor.linkDriveFolder !== "null" &&
            (louvor.linkDriveFolder?.includes("http://") ||
              louvor.linkDriveFolder?.includes("https://")) && (
              <a
                href={louvor.linkDriveFolder}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon-container">
                  <LuFolderClosed color={"var(--color-black)"} size={18} />
                </div>
              </a>
            )}

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
                  <PiHandWaving color={"var(--color-gray-2)"} size={19} />
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

          {(louvor.flagLyrics && louvor.lyrics) ||
          (!louvor.flagLyrics && louvor.linkPdfLyrics) ? (
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

          {(louvor.flagChords && louvor.chords) ||
          (!louvor.flagChords && louvor.linkChords) ? (
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
          {/* {localStorage.getItem("sentServiceListId") && isPathPraise && (
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
          )} */}
        </div>
      )}
    </Container>
  );
};

export default Header;
