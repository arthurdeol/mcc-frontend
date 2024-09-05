import { Container, XClose } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic } from "react-icons/lu";
import { LuX } from "react-icons/lu";

export default function ServicePraisesList() {
  const [servicePraises, setServicePraises] = useState(() => {
    const praisesSelected = localStorage.getItem("servicePraisesList");
    if (praisesSelected) {
      return JSON.parse(praisesSelected);
    }
    return [];
  });

  const deletePraiseFromServiceList = (praiseId) => {
    setServicePraises(
      servicePraises.filter((praise) => praise.songBookMapId !== praiseId)
    );
  };

  useEffect(() => {
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

  return (
    <Container>
      <Header />
      <div className="main-container">
        <div className="box">
          {servicePraises.map((praise, i) => (
            <div className="praise-container" key={i}>
              <div className="titles">
                <div>
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
                </div>
                <XClose
                  onClick={() =>
                    deletePraiseFromServiceList(praise.songBookMapId)
                  }
                >
                  <LuX />
                </XClose>
              </div>

              <div className="footer">
                <div className="theme-tag-container">
                  {praise.containsInCiasSongBook && (
                    <div className="theme-tag">CIA</div>
                  )}
                  <div className="theme-tag">{praise.theme}</div>
                </div>

                {praise.englishTitle && (
                  <div className="icons-container">
                    <Link
                      to={praise.linkSheetMusic ? "/praise" : null}
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
                      to={praise.linkPdfLyrics ? "/praise" : null}
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
                      to={praise.linkChords ? "/praise" : null}
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
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
