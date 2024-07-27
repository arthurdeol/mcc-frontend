import { Container, ErrorPage } from "./styles";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuSettings2 } from "react-icons/lu";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import BasicModal from "../../components/Modal";
// import api from "../../services/api";

const PraisesList = () => {
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const [praiseNotFound, setPraiseNotFound] = useState(false);
  const url = "https://mccapi.up.railway.app/SongBookMap";

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

  function especialCharMask(especialChar) {
    return especialChar.normalize("NFD").replace(/[^a-zA-Z1-9\s]/g, "");
  }

  const handleFilter = (event) => {
    let value = especialCharMask(event.target.value);
    const filtered = louvores.filter(
      (louvor) =>
        especialCharMask(louvor.englishSongBookNumber)
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        especialCharMask(louvor.englishTitle)
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.portugueseSongBookNumber
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        especialCharMask(louvor.portugueseTitle)
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );

    if (!filtered.length) {
      setPraiseNotFound(true);
    } else {
      setPraiseNotFound(false);
    }

    if (value === "") setFilteredLouvores(louvores);
    else setFilteredLouvores(filtered);
  };

  useEffect(() => {
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
  }, []);

  return (
    <Container>
      <Header />
      <div className="main-container">
        <div className="box">
          <div className="search-container">
            <input
              type="text"
              id="filter"
              onChange={handleFilter}
              className="filter"
              placeholder="Which praise song are you looking for?"
            />
            {/* <div className="filter-button" onClick={handleOpen}>
              <LuSettings2 color={"black"} size={17} />
            </div> */}
          </div>
          <BasicModal openModal={openModal} onCloseModal={handleClose} />

          {displayError && (
            <ErrorPage>
              <img
                className="musical-note-error-page"
                src="/images/music-not-found.png"
                alt="musical note error"
              />
              <p className="text-error-page">
                Sorry,
                <br /> we had a problem to show this content.
                <br /> Please try again later!
              </p>
            </ErrorPage>
          )}

          {!displayError && (
            <>
              {praiseNotFound && (
                <ErrorPage>
                  <img
                    className="img-praise-not-found"
                    src="/images/music-not-found.png"
                    alt="musical note error"
                  />
                  <p className="text-error-page">
                    Sorry...
                    <br />
                    The praise song that you are looking for does not exists in
                    our data base!
                  </p>
                </ErrorPage>
              )}

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

                      <div className="footer">
                        <div className="theme-tag">{louvor.theme}</div>

                        {louvor.englishTitle && (
                          <div className="icons-container">
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
                                size={18}
                              />
                            </Link>

                            {/* <Link
                    to={louvor.linkAudioFile ? "/praise" : null}
                    className="icon-container"
                    state={{
                      id: louvor.songBookMapId,
                      iconName: "LuVolume1",
                    }}
                  >
                    <LuVolume1
                      color={louvor.linkAudioFile ? "black" : "#9ca3af"}
                      size={22}
                    />
                  </Link> */}
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

export default PraisesList;
