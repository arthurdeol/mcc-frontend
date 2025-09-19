import { useState } from "react";
import { Card, HeartButton, XClose } from "./styles";
import { Link } from "react-router-dom";
import { LuType, LuMusic, LuFolderClosed } from "react-icons/lu";
import { LiaGuitarSolid } from "react-icons/lia";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { LuX } from "react-icons/lu";
import { PiHandWaving } from "react-icons/pi";
import { FiYoutube } from "react-icons/fi";
import OpenYoutubeModal from "../OpenYoutubeModal";

export default function PraiseCard({
  praise,
  selectPraise,
  hasCloseButton = false,
  hasHeartButton = false,
  hasEditButton = false,
  servicePraises = null,
  unSelectPraise = null,
  deletePraiseFromServiceList = null,
  setLastClickedPraise,
}) {
  const [openModalYoutube, setOpenModalYoutube] = useState(false);
  const handleOpenModalYoutube = () => setOpenModalYoutube(true);
  const handleCloseModalYoutube = () => setOpenModalYoutube(false);

  return (
    <Card>
      <div className="text-container">
        {praise.englishTitle && (
          <h6 className="praise-title-en">
            {praise.englishSongBookNumber
              ? praise.englishSongBookNumber + " - "
              : " "}
            {praise.englishTitle ? praise.englishTitle : ""}
          </h6>
        )}
        {praise.portugueseTitle && (
          <p className="praise-title-pt">
            {praise.portugueseSongBookNumber
              ? praise.portugueseSongBookNumber + " - "
              : "Avulso - "}
            {praise.portugueseTitle ? praise.portugueseTitle : ""}
          </p>
        )}
        <div className="theme-tag-container">
          {praise.containsInCiasSongBook && (
            <div className="theme-tag-cia">CIA's</div>
          )}
          <div className="theme-tag">{praise.theme}</div>
        </div>
      </div>

      <div className="buttons-container">
        {hasHeartButton && (
          <HeartButton>
            {servicePraises.find(
              (item) => item.songBookMapId === praise.songBookMapId
            ) ? (
              <IoHeartSharp
                color={"var(--color-dark-red)"}
                size={19}
                onClick={() => unSelectPraise(praise)}
              />
            ) : (
              <IoHeartOutline
                color={"var(--color-gray)"}
                size={19}
                onClick={() => selectPraise(praise)}
              />
            )}
          </HeartButton>
        )}
        {hasCloseButton && (
          <XClose
            onClick={() => deletePraiseFromServiceList(praise.songBookMapId)}
          >
            <LuX />
          </XClose>
        )}

        {hasEditButton && (
          <Link
            onClick={() => setLastClickedPraise(praise.songBookMapId)}
            className="edit-button"
            to={"/praise-settings"}
            state={{
              praiseId: praise.songBookMapId,
              praiseData: praise,
            }}
          >
            <BiEditAlt color={"var(--color-black)"} size={22} />
          </Link>
        )}

        {praise.englishTitle && (
          <div className="icons-container">
            <div
              style={{
                borderRight: "1px solid var(--color-light-gray)",
                marginRight: "7px",
                paddingRight: "4px",
                display: "flex",
              }}
            >
              {praise.linkYoutube &&
                praise.linkYoutube !== "null" &&
                (praise.linkYoutube?.includes("http://") ||
                  praise.linkYoutube?.includes("https://")) && (
                  <div
                    className="icon-container"
                    onClick={handleOpenModalYoutube}
                  >
                    <FiYoutube color={"var(--color-black)"} size={17} />
                  </div>
                )}

              {praise.linkDriveFolder &&
                praise.linkDriveFolder !== "null" &&
                (praise.linkDriveFolder?.includes("http://") ||
                  praise.linkDriveFolder?.includes("https://")) && (
                  <a
                    href={praise.linkDriveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon-container">
                      <LuFolderClosed color={"var(--color-black)"} size={17} />
                    </div>
                  </a>
                )}

              {praise.containsInCiasSongBook && praise.linkGestures && (
                <Link
                  onClick={() => setLastClickedPraise(praise.songBookMapId)}
                  to={`/praise/${praise.songBookMapId}/gestures`}
                  className="icon-container"
                >
                  <PiHandWaving color={"var(--color-black)"} size={17} />
                </Link>
              )}

              {praise.linkSheetMusic && (
                <Link
                  onClick={() => setLastClickedPraise(praise.songBookMapId)}
                  to={`/praise/${praise.songBookMapId}/musicSheet`}
                  className="icon-container"
                >
                  <LuMusic color={"var(--color-black)"} size={17} />
                </Link>
              )}
            </div>

            <Link
              onClick={() => setLastClickedPraise(praise.songBookMapId)}
              to={
                praise.linkPdfLyrics || praise.lyrics
                  ? `/praise/${praise.songBookMapId}/lyrics`
                  : null
              }
              className="icon-container"
            >
              <LuType
                color={
                  (praise.flagLyrics && praise.lyrics) ||
                  (!praise.flagLyrics && praise.linkPdfLyrics)
                    ? "var(--color-black)"
                    : "var(--color-gray-2)"
                }
                size={17}
              />
            </Link>

            <Link
              onClick={() => setLastClickedPraise(praise.songBookMapId)}
              to={
                praise.linkChords || praise.chords
                  ? `/praise/${praise.songBookMapId}/chords`
                  : null
              }
              className="icon-container"
            >
              <LiaGuitarSolid
                color={
                  (praise.flagChords && praise.chords) ||
                  (!praise.flagChords && praise.linkChords)
                    ? "var(--color-black)"
                    : "var(--color-gray-2)"
                }
                size={22}
              />
            </Link>
          </div>
        )}
        <OpenYoutubeModal
          openModalYoutube={openModalYoutube}
          handleCloseModalYoutube={handleCloseModalYoutube}
          louvor={praise}
        />
      </div>
    </Card>
  );
}
