import { Container } from "./styles";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MainFilter from "../../../components/MainFilter";
import PraiseNotFound from "../../../components/PraiseNotFound";
import ErrorDisplay from "../../../components/ErrorDisplay";
import PraiseCard from "../../../components/PraiseCard";

const PraisesListAdmin = () => {
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [complexFilterApplied, setComplexFilterApplied] = useState(false);
  const [mainFilterApplied, setMainFilterApplied] = useState(false);

  const [servicePraises] = useState(() => {
    const praisesSelected = localStorage.getItem("servicePraisesList");
    if (praisesSelected) {
      return JSON.parse(praisesSelected);
    }
    return [];
  });

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
    if (!complexFilterApplied && !mainFilterApplied) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => {
            return naturalCompare(
              a.englishSongBookNumber,
              b.englishSongBookNumber
            );
          });
          setLouvores(data);
          let filteredEnSongWithNumber = data.filter(
            (praise) => praise.englishTitle && praise.englishSongBookNumber
          );
          let filteredEnSongWithoutNumber = data.filter(
            (praise) => praise.englishTitle && !praise.englishSongBookNumber
          );
          setFilteredLouvores([
            ...filteredEnSongWithNumber,
            ...filteredEnSongWithoutNumber,
          ]);
        })
        .catch((err) => setDisplayError(true));
    }

    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [complexFilterApplied, mainFilterApplied, servicePraises]);

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
            setMainFilterApplied={setMainFilterApplied}
          />

          {displayError && <ErrorDisplay />}

          {!displayError && (
            <>
              {praiseNotFound && <PraiseNotFound />}

              {filteredLouvores.length < 1 &&
              displayError === false &&
              praiseNotFound === false ? (
                <div className="progress-container">
                  <Stack
                    sx={{ color: "var(--color-dark-gray)" }}
                    spacing={2}
                    direction="row"
                  >
                    <CircularProgress color="inherit" />
                  </Stack>
                </div>
              ) : (
                <div className="praises-container">
                  {filteredLouvores.map((louvor, i) => (
                    <div key={i}>
                      <PraiseCard
                        praise={louvor}
                        servicePraises={servicePraises}
                        hasEditButton={true}
                      />
                      <hr />
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
