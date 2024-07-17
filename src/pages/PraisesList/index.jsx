import { Container } from "./styles";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuVolume1 } from "react-icons/lu";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
// import api from "../../services/api";

const PraisesList = () => {
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
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

  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = louvores.filter(
      (louvor) =>
        louvor.englishSongBookNumber
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.englishTitle
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.portugueseSongBookNumber
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.portugueseTitle
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.theme
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );

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
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Header />
      <div className="main-container">
        <div className="search-container">
          <input
            type="text"
            id="filter"
            onChange={handleFilter}
            className="filter"
            placeholder="Search..."
          />
        </div>

        {filteredLouvores.length < 1 ? (
          <div className="progress-container">
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="inherit" />
            </Stack>
          </div>
        ) : (
          <div className="praises-container">
            {filteredLouvores.map((louvor, index) => (
              <div className="praise-container" key={index}>
                <div>
                  {louvor.englishTitle && (
                    // <div className="praise-title">
                    <h6 className="praise-title-en">
                      {louvor.englishSongBookNumber
                        ? louvor.englishSongBookNumber + " - "
                        : " "}
                      {louvor.englishTitle ? louvor.englishTitle : ""}
                    </h6>
                    // </div>
                  )}
                  {louvor.portugueseTitle && (
                    <p className="praise-title-pt">
                      {louvor.portugueseSongBookNumber
                        ? louvor.portugueseSongBookNumber + " - "
                        : "Avulso - "}
                      {louvor.portugueseTitle ? louvor.portugueseTitle : ""}
                    </p>
                  )}
                </div>

                <div className="footer">
                  <div className="theme-tag">{louvor.theme}</div>

                  <div className="icons-container">
                    <Link
                      to={louvor.linkPdfLyrics ? "/praise" : null}
                      className="icon-container"
                      state={{ id: louvor.songBookMapId, iconName: "LuType" }}
                    >
                      <LuType
                        color={louvor.linkPdfLyrics ? "black" : "#9ca3af"}
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
                      state={{ id: louvor.songBookMapId, iconName: "LuMusic" }}
                    >
                      <LuMusic
                        color={louvor.linkSheetMusic ? "black" : "#9ca3af"}
                        size={18}
                      />
                    </Link>

                    <Link
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default PraisesList;
