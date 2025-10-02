import { ContainerPraisesList } from "./styles";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MainFilter from "../../components/MainFilter";
import PraiseNotFound from "../../components/PraiseNotFound";
import ErrorDisplay from "../../components/ErrorDisplay";
import PraiseCard from "../../components/PraiseCard";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const PraisesList = () => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [newSelection, setNewSelection] = useState(false);
  const [louvores, setLouvores] = useState([]);
  const [filteredLouvores, setFilteredLouvores] = useState([]);
  const [complexFilterApplied, setComplexFilterApplied] = useState(false);

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
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

  useEffect(() => {
    localStorage.setItem("home", "praisesHome");
    localStorage.setItem("sentServiceListId", "");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Ordena todos os louvores
        data.sort((a, b) =>
          naturalCompare(a.englishSongBookNumber, b.englishSongBookNumber)
        );
        setLouvores(data);

        let restored = false;

        // Função para aplicar filtros salvos (video, cias e temas)
        function applyFilters(savedActive) {
          const formValue = {
            containsInCiasSongBook: savedActive.includes("Cias Songbook"),
            containsVideo: savedActive.includes("Video"),
          };
          // todos os demais filtros são considerados temas
          const themesApplied = savedActive.filter(
            (f) => f !== "Cias Songbook" && f !== "Video"
          );

          let order1 = [];
          let order2 = [];

          for (let i = 0; i < data.length; i++) {
            let match = true;

            if (
              formValue.containsInCiasSongBook &&
              !data[i].containsInCiasSongBook
            )
              match = false;
            if (formValue.containsVideo && !data[i].linkYoutube) match = false;

            if (
              themesApplied.length > 0 &&
              !themesApplied.includes(data[i].theme)
            )
              match = false;

            if (match && data[i].englishTitle) {
              if (data[i].englishSongBookNumber) order1.push(data[i]);
              else order2.push(data[i]);
            }
          }

          const filtered = [...order1, ...order2];
          if (filtered.length > 0) {
            setFilteredLouvores(filtered);
            setComplexFilterApplied(true);
            restored = true;
          }

          // Atualiza estado e localStorage
          // setActiveFilters(savedActive);
          localStorage.setItem("activeFilters", JSON.stringify(savedActive));
        }

        // 🔹 Restaurar filtros
        const savedComplex = localStorage.getItem("complexFilterState");
        const savedActive = localStorage.getItem("activeFilters");

        if (savedComplex) {
          try {
            const parsed = JSON.parse(savedComplex);
            const activeFromComplex = [
              ...(parsed.formValue?.containsInCiasSongBook
                ? ["Cias Songbook"]
                : []),
              ...(parsed.formValue?.containsVideo ? ["Video"] : []),
              ...(parsed.themesApplied || []),
            ];
            applyFilters(activeFromComplex);
          } catch (e) {
            console.error("Erro ao parse complexFilterState:", e);
          }
        } else if (savedActive) {
          try {
            const parsedActive = JSON.parse(savedActive);
            applyFilters(parsedActive);
          } catch (e) {
            console.error("Erro ao parse activeFilters:", e);
          }
        }

        // 🔹 Caso nenhum filtro restaurado, lista completa
        if (!restored) {
          const withNumber = data.filter(
            (p) => p.englishTitle && p.englishSongBookNumber
          );
          const withoutNumber = data.filter(
            (p) => p.englishTitle && !p.englishSongBookNumber
          );
          setFilteredLouvores([...withNumber, ...withoutNumber]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar louvores:", err);
        setDisplayError(true);
      });

    // Persistir servicePraises
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

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

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Mostrar botão de subir (⬆️) quando rolar para baixo
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setShowUpButton(true);
        setShowDownButton(false);
      }
      // Mostrar botão de descer (⬇️) quando rolar para cima
      else if (currentScrollY < lastScrollY && currentScrollY > 200) {
        setShowDownButton(true);
        setShowUpButton(false);
      } else {
        setShowUpButton(false);
        setShowDownButton(false);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  function scrollToBottomOfList() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
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

      {showUpButton && (
        <button className="scroll-to-top" onClick={scrollToTopOfList}>
          <IoArrowUp color={"var(--color-white)"} size={22} />
        </button>
      )}

      {showDownButton && (
        <button className="scroll-to-bottom" onClick={scrollToBottomOfList}>
          <IoArrowDown color={"var(--color-white)"} size={22} />
        </button>
      )}
    </ContainerPraisesList>
  );
};

export default PraisesList;
