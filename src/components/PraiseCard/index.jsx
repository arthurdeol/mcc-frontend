import { Card, HeartButton, XClose } from "./styles";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuFolderClosed } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { LuX } from "react-icons/lu";
import { PiHandWaving } from "react-icons/pi";

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

            {praise.containsInCiasSongBook && (
              <Link
                onClick={() => setLastClickedPraise(praise.songBookMapId)}
                to={
                  praise.linkGestures
                    ? `/praise/${praise.songBookMapId}/gestures`
                    : null
                }
                className="icon-container"
              >
                <PiHandWaving
                  color={
                    praise.linkGestures
                      ? "var(--color-black)"
                      : "var(--color-gray-2)"
                  }
                  size={17}
                />
              </Link>
            )}

            <Link
              onClick={() => setLastClickedPraise(praise.songBookMapId)}
              to={
                praise.linkSheetMusic
                  ? `/praise/${praise.songBookMapId}/musicSheet`
                  : null
              }
              className="icon-container"
            >
              <LuMusic
                color={
                  praise.linkSheetMusic
                    ? "var(--color-black)"
                    : "var(--color-gray-2)"
                }
                size={17}
              />
            </Link>

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
              <LuListMusic
                color={
                  (praise.flagChords && praise.chords) ||
                  (!praise.flagChords && praise.linkChords)
                    ? "var(--color-black)"
                    : "var(--color-gray-2)"
                }
                size={19}
              />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
