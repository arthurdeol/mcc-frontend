import { Card, HeartButton, XClose } from "./styles";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { LuX } from "react-icons/lu";

export default function PraiseCard({
  praise,
  selectPraise,
  hasCloseButton = false,
  hasHeartButton = false,
  hasEditButton = false,
  servicePraises = null,
  unSelectPraise = null,
  deletePraiseFromServiceList = null,
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
            <div className="theme-tag">CIA</div>
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
                color={"#b71c1c"}
                size={19}
                onClick={() => unSelectPraise(praise)}
              />
            ) : (
              <IoHeartOutline
                color={"gray"}
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
            className="edit-button"
            to={"/praise-settings"}
            state={{
              praiseId: praise.songBookMapId,
              praiseData: praise,
            }}
          >
            <BiEditAlt color={"black"} size={22} />
          </Link>
        )}

        {praise.englishTitle && (
          <div className="icons-container">
            <Link
              to={
                praise.linkSheetMusic ? `/praise/${praise.songBookMapId}` : null
              }
              className="icon-container"
              state={{
                id: praise.songBookMapId,
                iconName: "LuMusic",
              }}
            >
              <LuMusic
                color={praise.linkSheetMusic ? "black" : "#9ca3af"}
                size={17}
              />
            </Link>

            <Link
              to={
                praise.linkPdfLyrics ? `/praise/${praise.songBookMapId}` : null
              }
              className="icon-container"
              state={{
                id: praise.songBookMapId,
                iconName: "LuType",
              }}
            >
              <LuType
                color={praise.linkPdfLyrics ? "black" : "#9ca3af"}
                size={17}
              />
            </Link>

            <Link
              to={praise.linkChords ? `/praise/${praise.songBookMapId}` : null}
              className="icon-container"
              state={{
                id: praise.songBookMapId,
                iconName: "LuListMusic",
              }}
            >
              <LuListMusic
                color={praise.linkChords ? "black" : "#9ca3af"}
                size={19}
              />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
