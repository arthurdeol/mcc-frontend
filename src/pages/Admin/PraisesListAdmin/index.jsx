import { Container } from "./styles";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MainFilter from "../../../components/MainFilter";
import PraiseNotFound from "../../../components/PraiseNotFound";
import ErrorDisplay from "../../../components/ErrorDisplay";

const PraisesListAdmin = () => {
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [complexFilterApplied, setComplexFilterApplied] = useState(false);

  const [displayError, setDisplayError] = useState(false);
  const [praiseNotFound, setPraiseNotFound] = useState(false);
  const url = "https://mccapi.up.railway.app/SongBookMap";

  function naturalCompare(a, b) {
    let ax = [],
      bx = [];

    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      ax.push([$1 || Infinity, $2 || ""]);
    });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      bx.push([$1 || Infinity, $2 || ""]);
    });

    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }

    return ax.length - bx.length;
  }

  useEffect(() => {
    if (!complexFilterApplied) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => {
            return naturalCompare(
              a.portugueseSongBookNumber,
              b.portugueseSongBookNumber
            );
          });
          setLouvores(data);
          setFilteredLouvores(data);
        })
        .catch((err) => setDisplayError(true));
    }
  }, [complexFilterApplied]);

  return (
    <Container>
      <Header />
      <div className="main-container">
        <div className="box">
          <h1>Admin - Praises</h1>
          <MainFilter
            louvores={louvores}
            setPraiseNotFound={setPraiseNotFound}
            setFilteredLouvores={setFilteredLouvores}
            setComplexFilterApplied={setComplexFilterApplied}
          />

          {displayError && <ErrorDisplay />}

          {!displayError && (
            <>
              {praiseNotFound && <PraiseNotFound />}

              {filteredLouvores.length < 1 &&
              displayError === false &&
              praiseNotFound === false ? (
                <div className="progress-container">
                  <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                    <CircularProgress color="inherit" />
                  </Stack>
                </div>
              ) : (
                <div className="praises-container">
                  {filteredLouvores.map((louvor, i) => (
                    <div className="praise-container" key={i}>
                      <div className="titles">
                        <div>
                          {louvor.englishTitle && (
                            <h6 className="praise-title-en">
                              {louvor.englishSongBookNumber
                                ? louvor.englishSongBookNumber + " - "
                                : " "}
                              {louvor.englishTitle ? louvor.englishTitle : ""}
                            </h6>
                          )}
                          {louvor.portugueseTitle && (
                            <p className="praise-title-pt">
                              {louvor.portugueseSongBookNumber
                                ? louvor.portugueseSongBookNumber + " - "
                                : "Avulso - "}
                              {louvor.portugueseTitle
                                ? louvor.portugueseTitle
                                : ""}
                            </p>
                          )}
                        </div>

                        <Link
                          to={"/praise-settings"}
                          className="icon-container"
                          state={{
                            praiseId: louvor.songBookMapId,
                            praiseData: louvor,
                          }}
                        >
                          <BiEditAlt color={"black"} size={22} />
                        </Link>
                      </div>

                      <div className="footer">
                        <div className="theme-tag-container">
                          {louvor.containsInCiasSongBook && (
                            <div className="theme-tag">CIA</div>
                          )}
                          <div className="theme-tag">{louvor.theme}</div>
                        </div>

                        {louvor.englishTitle && (
                          <div className="icons-container">
                            <Link
                              to={louvor.linkSheetMusic ? "/praise" : null}
                              className="icon-container"
                              state={{
                                id: louvor.songBookMapId,
                                iconName: "LuMusic",
                              }}
                            >
                              <LuMusic
                                color={
                                  louvor.linkSheetMusic ? "black" : "#9ca3af"
                                }
                                size={17}
                              />
                            </Link>

                            <Link
                              to={louvor.linkPdfLyrics ? "/praise" : null}
                              className="icon-container"
                              state={{
                                id: louvor.songBookMapId,
                                iconName: "LuType",
                              }}
                            >
                              <LuType
                                color={
                                  louvor.linkPdfLyrics ? "black" : "#9ca3af"
                                }
                                size={17}
                              />
                            </Link>

                            <Link
                              to={louvor.linkChords ? "/praise" : null}
                              className="icon-container"
                              state={{
                                id: louvor.songBookMapId,
                                iconName: "LuListMusic",
                              }}
                            >
                              <LuListMusic
                                color={louvor.linkChords ? "black" : "#9ca3af"}
                                size={19}
                              />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PraisesListAdmin;
