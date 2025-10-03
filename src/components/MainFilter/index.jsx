import { useEffect, useState } from "react";
import { Container } from "./styles";
import { LuSettings2 } from "react-icons/lu";
import { PiPlusBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import FilterModal from "../../components/FilterModal";
import { useNavigate } from "react-router-dom";

export default function MainFilter({
  louvores,
  setPraiseNotFound,
  setFilteredLouvores,
  complexFilterApplied,
  setComplexFilterApplied,
}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [eventValue, setEventValue] = useState("");
  const [activeFilters, setActiveFilters] = useState([]); // filtros ativos do modal

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navPath = window.location.pathname?.toString();

  function especialCharMask(especialChar) {
    return especialChar.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "");
  }

  useEffect(() => {
    const savedState = localStorage.getItem("complexFilterState");
    if (savedState) {
      try {
        const { formValue, themesApplied, applied } = JSON.parse(savedState);

        // aplica de fato os filtros
        setComplexFilter(formValue, themesApplied);

        // restaura as tags visuais
        if (applied && applied.length > 0) {
          setActiveFilters(applied);
        }
      } catch (e) {
        console.error("Erro ao restaurar filtros:", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sempre que activeFilters mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
  }, [activeFilters]);

  useEffect(() => {
    if (!complexFilterApplied || eventValue !== "") {
      handleFilter(eventValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventValue]);

  function handleFilter(eventValue) {
    setComplexFilterApplied(false);
    const value = especialCharMask(eventValue).trim();
    const valueIsNumber = /^\d+(?:\.\d+)?$/.test(value);
    let filtered = [];

    if (valueIsNumber) {
      filtered = louvores.filter(
        (louvor) =>
          especialCharMask(louvor.englishSongBookNumber) === value ||
          louvor.englishSongBookNumber === "B-" + value ||
          louvor.englishSongBookNumber === "A-" + value ||
          especialCharMask(louvor.portugueseSongBookNumber) === value
      );
    } else {
      const valueSubstring = eventValue
        .toString()
        .toLowerCase()
        .substring(0, 2);
      const valueMaskSubstring = especialCharMask(
        value.toString().toLowerCase().substring(0, 2)
      );

      if (valueSubstring === "a-" || valueSubstring === "b-") {
        filtered = louvores.filter((louvor) =>
          louvor.englishSongBookNumber
            .toLowerCase()
            .includes(eventValue.toString().toLowerCase())
        );
      } else if (
        [
          "a1",
          "a2",
          "a3",
          "a4",
          "a5",
          "a6",
          "a7",
          "a8",
          "a9",
          "b1",
          "b2",
          "b3",
          "b4",
          "b5",
          "b6",
          "b7",
          "b8",
          "b9",
        ].includes(valueMaskSubstring)
      ) {
        filtered = louvores.filter(
          (louvor) =>
            especialCharMask(louvor.englishSongBookNumber).toLowerCase() ===
            eventValue.toString().toLowerCase()
        );
      } else {
        filtered = louvores.filter(
          (louvor) =>
            especialCharMask(louvor.englishTitle)
              .toLowerCase()
              .includes(value.toString().toLowerCase()) ||
            especialCharMask(louvor.portugueseTitle)
              .toLowerCase()
              .includes(value.toString().toLowerCase())
        );
      }
    }

    if (!filtered.length && eventValue !== "") {
      setPraiseNotFound(true);
    } else {
      setPraiseNotFound(false);
    }

    if (value === "") {
      let filteredEnSongWithNumber = louvores.filter(
        (praise) => praise.englishTitle && praise.englishSongBookNumber
      );
      let filteredEnSongWithoutNumber = louvores.filter(
        (praise) => praise.englishTitle && !praise.englishSongBookNumber
      );
      setFilteredLouvores([
        ...filteredEnSongWithNumber,
        ...filteredEnSongWithoutNumber,
      ]);
    } else {
      let filteredEnPraisesWithNumber = filtered.filter(
        (praise) => praise.englishTitle && praise.englishSongBookNumber
      );
      let filteredEnSongWithoutNumber = filtered.filter(
        (praise) => praise.englishTitle && !praise.englishSongBookNumber
      );
      let filteredPtPraises = filtered.filter((praise) => !praise.englishTitle);
      setFilteredLouvores([
        ...filteredEnPraisesWithNumber,
        ...filteredEnSongWithoutNumber,
        ...filteredPtPraises,
      ]);
    }
  }

  // Função que aplica filtros do modal
  function setComplexFilter(formValue, themesApplied) {
    setEventValue(""); // limpa search
    let order1 = [];
    let order2 = [];
    let applied = [];

    for (let i = 0; i < louvores.length; i++) {
      const louvor = louvores[i];
      let match = true;

      if (formValue.containsVideo && !louvor.linkYoutube) match = false;
      if (themesApplied.length > 0 && !themesApplied.includes(louvor.theme)) {
        match = false;
      }

      // Regra CIA’s
      if (!formValue.containsInCiasSongBook && louvor.containsInCiasSongBook) {
        match = false;
      }
      if (formValue.containsInCiasSongBook && !louvor.containsInCiasSongBook) {
        match = false;
      }

      // Se passou em todos os filtros
      if (match && louvor.englishTitle) {
        console.log(louvor);
        if (louvor.englishSongBookNumber) order1.push(louvor);
        else order2.push(louvor);
      }
    }

    const filteredPraises = [...order1, ...order2];

    // cria tags apenas para filtros do modal
    if (formValue.containsInCiasSongBook) applied.push("Cias Songbook");
    if (formValue.containsVideo) applied.push("Video");
    if (themesApplied.length > 0) applied.push(...themesApplied);

    setActiveFilters(applied);

    // salva filtros no localStorage **sempre**, mesmo se não houver resultado**
    localStorage.setItem("activeFilters", JSON.stringify(applied));
    localStorage.setItem(
      "complexFilterState",
      JSON.stringify({ formValue, themesApplied, applied })
    );

    setFilteredLouvores(filteredPraises);
    setComplexFilterApplied(filteredPraises.length > 0);
    setPraiseNotFound(filteredPraises.length === 0);
  }

  // Recalcula os filtros ativos ao remover uma tag
  function removeFilterTag(tag) {
    const updated = activeFilters.filter((f) => f !== tag);
    setActiveFilters(updated);

    let formValue = {
      containsInCiasSongBook: updated.includes("Cias Songbook"),
      containsVideo: updated.includes("Video"),
    };
    let themesApplied = updated.filter(
      (f) => f !== "Cias Songbook" && f !== "Video"
    );

    setComplexFilter(formValue, themesApplied);
  }

  return (
    <Container>
      <div className="search-container">
        {/* TAGS DE FILTROS DO MODAL */}
        {activeFilters.length > 0 && (
          <div className="active-filters-container">
            <div className="active-filters">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className={`filter-tag ${
                    filter === "Cias Songbook"
                      ? "cias-tag"
                      : filter === "Video"
                      ? "video-tag"
                      : ""
                  }`}
                >
                  {filter}
                  <IoClose
                    size={16}
                    style={{ marginLeft: 6, cursor: "pointer" }}
                    onClick={() => removeFilterTag(filter)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeFilters.length === 0 && (
          <input
            type="text"
            id="filter"
            value={eventValue}
            onChange={(e) => setEventValue(e.target.value)}
            className="filter"
            placeholder="Which praise song are you looking for?"
          />
        )}

        <div className="filter-button" onClick={handleOpen}>
          <LuSettings2 color={"var(--color-black)"} size={17} />
        </div>
        {navPath === "/praises-admin" && (
          <div
            className="new-praise-button"
            onClick={() => navigate("/add-praise")}
          >
            <PiPlusBold size={17} />
          </div>
        )}
      </div>

      <FilterModal
        openModal={openModal}
        onCloseModal={handleClose}
        setComplexFilter={setComplexFilter}
        complexFilterApplied={complexFilterApplied}
        activeFilters={activeFilters}
      />
    </Container>
  );
}
