import { useEffect, useState } from "react";
import { Container } from "./styles";
import { LuSettings2 } from "react-icons/lu";
import FilterModal from "../../components/FilterModal";

export default function MainFilter({
  louvores,
  setPraiseNotFound,
  setFilteredLouvores,
  complexFilterApplied,
  setComplexFilterApplied,
  setMainFilterApplied,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [eventValue, setEventValue] = useState("");
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function especialCharMask(especialChar) {
    return especialChar.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "");
  }

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
        .substring(2, 0);
      const valueMaskSubstring = especialCharMask(
        value.toString().toLowerCase().substring(2, 0)
      );
      if (valueSubstring === "a-" || valueSubstring === "b-") {
        filtered = louvores.filter((louvor) =>
          louvor.englishSongBookNumber
            .toLowerCase()
            .includes(eventValue.toString().toLowerCase())
        );
      } else if (
        valueMaskSubstring === "a1" ||
        valueMaskSubstring === "a2" ||
        valueMaskSubstring === "a3" ||
        valueMaskSubstring === "a4" ||
        valueMaskSubstring === "a5" ||
        valueMaskSubstring === "a6" ||
        valueMaskSubstring === "a7" ||
        valueMaskSubstring === "a8" ||
        valueMaskSubstring === "a9" ||
        valueMaskSubstring === "b1" ||
        valueMaskSubstring === "b2" ||
        valueMaskSubstring === "b3" ||
        valueMaskSubstring === "b4" ||
        valueMaskSubstring === "b5" ||
        valueMaskSubstring === "b6" ||
        valueMaskSubstring === "b7" ||
        valueMaskSubstring === "b8" ||
        valueMaskSubstring === "b9"
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
      setMainFilterApplied(true);
    }
  }

  function setComplexFilter(formValue, themesApplied) {
    setEventValue("");
    let filteredPraises = [];
    let order1 = [];
    let order2 = [];

    if (formValue.containsInCiasSongBook) {
      if (formValue.containsInCiasSongBook && themesApplied.length > 0) {
        for (let i = 0; i < louvores.length; i++) {
          for (let j = 0; j < themesApplied.length; j++) {
            if (
              louvores[i].theme === themesApplied[j] &&
              louvores[i].containsInCiasSongBook &&
              louvores[i].englishTitle
            ) {
              louvores[i].englishSongBookNumber
                ? order1.push(louvores[i])
                : order2.push(louvores[i]);
            }
          }
        }
        filteredPraises = [...order1, ...order2];
      } else {
        for (let i = 0; i < louvores.length; i++) {
          if (louvores[i].containsInCiasSongBook && louvores[i].englishTitle) {
            louvores[i].englishSongBookNumber
              ? order1.push(louvores[i])
              : order2.push(louvores[i]);
          }
        }
        filteredPraises = [...order1, ...order2];
      }
    } else {
      for (let i = 0; i < louvores.length; i++) {
        for (let j = 0; j < themesApplied.length; j++) {
          if (
            louvores[i].theme === themesApplied[j] &&
            !louvores[i].containsInCiasSongBook &&
            louvores[i].englishTitle
          ) {
            louvores[i].englishSongBookNumber
              ? order1.push(louvores[i])
              : order2.push(louvores[i]);
          }
        }
      }
      filteredPraises = [...order1, ...order2];
    }
    if (filteredPraises.length > 0) {
      setComplexFilterApplied(true);
      setFilteredLouvores(filteredPraises);
    } else {
      setComplexFilterApplied(false);
    }
    setPraiseNotFound(false);
  }

  return (
    <Container>
      <div className="search-container">
        <input
          type="text"
          id="filter"
          value={eventValue}
          onChange={(e) => setEventValue(e.target.value)}
          className="filter"
          placeholder="Which praise song are you looking for?"
        />
        <div className="filter-button" onClick={handleOpen}>
          <LuSettings2 color={"black"} size={17} />
        </div>
      </div>

      <FilterModal
        openModal={openModal}
        onCloseModal={handleClose}
        setComplexFilter={setComplexFilter}
        complexFilterApplied={complexFilterApplied}
      />
    </Container>
  );
}
