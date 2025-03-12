import { ContainerPraisesList } from "./styles";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MainFilter from "../../components/MainFilter";
import PraiseNotFound from "../../components/PraiseNotFound";
import ErrorDisplay from "../../components/ErrorDisplay";
import PraiseCard from "../../components/PraiseCard";
import { IoArrowUp } from "react-icons/io5";

const PraisesList = () => {
  const [newSelection, setNewSelection] = useState(false);
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [complexFilterApplied, setComplexFilterApplied] = useState(false);
  const [mainFilterApplied, setMainFilterApplied] = useState(false);

  const [servicePraises, setServicePraises] = useState(() => {
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
    localStorage.setItem("home", "praisesHome");
    localStorage.setItem("sentServiceListId", "");
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

  useEffect(() => {
    const savedPraiseId = localStorage.getItem("praiseIdClicked");
    if (savedPraiseId && !newSelection) {
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
  }, [louvores, newSelection]);

  function selectPraise(praise) {
    setServicePraises([...servicePraises, praise]);
    setLastClickedPraise(praise.songBookMapId);
  }

  function unSelectPraise(praise) {
    const praises = servicePraises.filter(
      (item) => item.songBookMapId !== praise.songBookMapId
    );
    setServicePraises(praises);
    setLastClickedPraise(praise.songBookMapId);
  }

  function setLastClickedPraise(praiseId) {
    setNewSelection(true);
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
    <ContainerPraisesList>
      <Header servicePraises={servicePraises} />
      <div className="main-container">
        <MainFilter
          louvores={louvores}
          setPraiseNotFound={setPraiseNotFound}
          setFilteredLouvores={setFilteredLouvores}
          complexFilterApplied={complexFilterApplied}
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
                <div className="praises-container">
                  {filteredLouvores.map((louvor, i) => (
                    <div key={i} id={louvor.songBookMapId}>
                      <PraiseCard
                        praise={louvor}
                        servicePraises={servicePraises}
                        unSelectPraise={unSelectPraise}
                        selectPraise={selectPraise}
                        hasCloseButton={false}
                        hasHeartButton={true}
                        setLastClickedPraise={setLastClickedPraise}
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

      <button className="scroll-to-top" onClick={() => scrollToTopOfList()}>
        <IoArrowUp color={"var(--color-dark-gray-2)"} size={22} />
      </button>
    </ContainerPraisesList>
  );
};

export default PraisesList;
