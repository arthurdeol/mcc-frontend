import { Container, checked } from "./styles";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MainFilter from "../../../components/MainFilter";
import PraiseNotFound from "../../../components/PraiseNotFound";
import ErrorDisplay from "../../../components/ErrorDisplay";
import PraiseCard from "../../../components/PraiseCard";
import { IoArrowUp } from "react-icons/io5";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const PraisesListAdmin = () => {
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [complexFilterApplied, setComplexFilterApplied] = useState(false);
  const [mainFilterApplied, setMainFilterApplied] = useState(false);

  const defaultCheckboxValue = {
    missingChords: false,
    missingLyrics: false,
    missingMusicSheet: false,
    missingGestures: false,
    orderPortuguese: false,
    missingChordsLyricsMusicSheet: false,
    orderCiasByPT: false,
    missingDriveLink: false,
  };

  let [checkeds, setCheckeds] = useState(defaultCheckboxValue);

  const {
    missingChords,
    missingLyrics,
    missingMusicSheet,
    missingGestures,
    orderPortuguese,
    missingChordsLyricsMusicSheet,
    orderCiasByPT,
    missingDriveLink,
  } = checkeds;

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
    localStorage.setItem("home", "adminHome");
    const savedPraiseId = localStorage.getItem("praiseIdClicked");
    if (savedPraiseId) {
      const praiseElement = document.getElementById(savedPraiseId);
      if (praiseElement) {
        // Rolagem com margem considerando o cabeçalho e o filtro principal
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const mainFilterHeight =
          document.querySelector(".search-container")?.offsetHeight || 0;

        window.scrollTo({
          top: praiseElement.offsetTop - headerHeight - (mainFilterHeight + 60),
          behavior: "smooth",
        });
        localStorage.removeItem("praiseIdClicked");
      }
    }
  }, [louvores]);

  useEffect(() => {
    if (complexFilterApplied) {
      setCheckeds(defaultCheckboxValue);
    }
    if (!complexFilterApplied && !mainFilterApplied) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => {
            if (orderPortuguese || orderCiasByPT) {
              return naturalCompare(
                a.portugueseSongBookNumber,
                b.portugueseSongBookNumber
              );
            }
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
          let sequenceEN = [
            ...filteredEnSongWithNumber,
            ...filteredEnSongWithoutNumber,
          ];
          let filteredPTSongWithNumber = data.filter(
            (praise) =>
              praise.portugueseTitle &&
              praise.portugueseSongBookNumber &&
              !praise.containsInCiasSongBook
          );
          let filteredPTSongWithoutNumber = data.filter(
            (praise) =>
              praise.portugueseTitle &&
              !praise.portugueseSongBookNumber &&
              !praise.containsInCiasSongBook
          );
          let sequencePT = [
            ...filteredPTSongWithNumber,
            ...filteredPTSongWithoutNumber,
          ];
          let filteredEnSongWithoutChords = sequenceEN.filter(
            (praise) => !praise.chords && !praise.linkChords
          );
          let filteredEnSongWithoutLyrics = sequenceEN.filter(
            (praise) => !praise.lyrics && !praise.linkPdfLyrics
          );
          let filteredEnSongWithoutMusicSheet = sequenceEN.filter(
            (praise) => !praise.linkSheetMusic
          );
          let filteredMissingDriveLink = sequenceEN.filter(
            (praise) => !praise.linkDriveFolder
          );
          let missingLyricsChordsAndMusicSheet = sequenceEN.filter(
            (praise) =>
              !praise.chords &&
              !praise.linkChords &&
              !praise.lyrics &&
              !praise.linkPdfLyrics &&
              !praise.linkSheetMusic
          );
          let filteredEnSongWithoutGestures = sequenceEN.filter(
            (praise) => praise.containsInCiasSongBook && !praise.linkGestures
          );
          let ciasOrderedByPTSongbook = data.filter(
            (praise) => praise.containsInCiasSongBook
          );

          if (missingChords) {
            setFilteredLouvores([...filteredEnSongWithoutChords]);
          } else if (missingLyrics) {
            setFilteredLouvores([...filteredEnSongWithoutLyrics]);
          } else if (missingMusicSheet) {
            setFilteredLouvores([...filteredEnSongWithoutMusicSheet]);
          } else if (missingGestures) {
            setFilteredLouvores([...filteredEnSongWithoutGestures]);
          } else if (missingChordsLyricsMusicSheet) {
            setFilteredLouvores([...missingLyricsChordsAndMusicSheet]);
          } else if (orderPortuguese) {
            setFilteredLouvores([...sequencePT]);
          } else if (orderCiasByPT) {
            setFilteredLouvores([...ciasOrderedByPTSongbook]);
          } else if (missingDriveLink) {
            setFilteredLouvores([...filteredMissingDriveLink]);
          } else {
            setFilteredLouvores([...sequenceEN]);
          }
        })
        .catch((err) => setDisplayError(true));
    }
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
    // eslint-disable-next-line
  }, [
    complexFilterApplied,
    mainFilterApplied,
    servicePraises,
    missingChords,
    missingLyrics,
    missingMusicSheet,
    missingGestures,
    missingChordsLyricsMusicSheet,
    orderPortuguese,
    orderCiasByPT,
    missingDriveLink,
  ]);

  const handleChangeCheckbox = (event) => {
    setCheckeds({
      missingChords: false,
      missingLyrics: false,
      missingMusicSheet: false,
      missingGestures: false,
      orderPortuguese: false,
      missingChordsLyricsMusicSheet: false,
      orderCiasByPT: false,
      missingDriveLink: false,
      [event.target.name]: event.target.checked,
    });
  };

  function setLastClickedPraise(praiseId) {
    localStorage.setItem("praiseIdClicked", praiseId);
  }

  function scrollToTopOfList() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLastClickedPraise(filteredLouvores[0].songBookMapId);
  }

  return (
    <Container>
      <Header />

      <div className="main-container">
        <MainFilter
          louvores={louvores}
          setPraiseNotFound={setPraiseNotFound}
          setFilteredLouvores={setFilteredLouvores}
          setComplexFilterApplied={setComplexFilterApplied}
          setMainFilterApplied={setMainFilterApplied}
        />

        <div className="box">
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
                <>
                  <div className="checkbox-filters">
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingChords}
                          onChange={handleChangeCheckbox}
                          name="missingChords"
                        />
                      }
                      label="Missing Chords"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingLyrics}
                          onChange={handleChangeCheckbox}
                          name="missingLyrics"
                        />
                      }
                      label="Missing Lyrics"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingMusicSheet}
                          onChange={handleChangeCheckbox}
                          name="missingMusicSheet"
                        />
                      }
                      label="Missing Music Sheet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingDriveLink}
                          onChange={handleChangeCheckbox}
                          name="missingDriveLink"
                        />
                      }
                      label="Missing Drive Link"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingChordsLyricsMusicSheet}
                          onChange={handleChangeCheckbox}
                          name="missingChordsLyricsMusicSheet"
                        />
                      }
                      label="Missing Chords, Lyrics and Music Sheet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={orderPortuguese}
                          onChange={handleChangeCheckbox}
                          name="orderPortuguese"
                        />
                      }
                      label="Order By PT Songbook"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={missingGestures}
                          onChange={handleChangeCheckbox}
                          name="missingGestures"
                        />
                      }
                      label="CIA's - Missing Gestures"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={checked}
                          checked={orderCiasByPT}
                          onChange={handleChangeCheckbox}
                          name="orderCiasByPT"
                        />
                      }
                      label="CIA's - Order By PT Songbook"
                    />
                  </div>
                  <div className="praises-container">
                    {filteredLouvores.map((louvor, i) => (
                      <div key={i} id={louvor.songBookMapId}>
                        <PraiseCard
                          praise={louvor}
                          servicePraises={servicePraises}
                          hasEditButton={true}
                          setLastClickedPraise={setLastClickedPraise}
                        />
                        <hr />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <button className="scroll-to-top" onClick={() => scrollToTopOfList()}>
        <IoArrowUp color={"var(--color-dark-gray-2)"} size={22} />
      </button>
    </Container>
  );
};

export default PraisesListAdmin;
