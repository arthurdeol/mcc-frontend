import { useState } from "react";
import { Container } from "./styles";
import { LuSettings2 } from "react-icons/lu";
import FilterModal from "../../components/FilterModal";

export default function MainFilter({
  louvores,
  setPraiseNotFound,
  setFilteredLouvores,
  setComplexFilterApplied,
}) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function especialCharMask(especialChar) {
    return especialChar.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "");
  }

  const handleFilter = (event) => {
    let eventValue = event.target.value;
    const value = especialCharMask(eventValue);
    const checkIfValueIsNumber = /^\d+(?:\.\d+)?$/.test(value);
    let filtered = [];

    if (checkIfValueIsNumber) {
      filtered = louvores.filter(
        (louvor) =>
          especialCharMask(louvor.englishSongBookNumber) === value ||
          especialCharMask(louvor.portugueseSongBookNumber) === value
      );
    } else {
      const valueSubstring = eventValue.toString().substring(2, 0);
      const valueMaskSubstring = especialCharMask(
        value.toString().toLowerCase().substring(2, 0)
      );
      if (
        valueSubstring === "A-" ||
        valueSubstring === "a-" ||
        valueSubstring === "B-" ||
        valueSubstring === "b-"
      ) {
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
        filtered = louvores.filter((louvor) =>
          especialCharMask(louvor.englishSongBookNumber)
            .toLowerCase()
            .includes(eventValue.toString().toLowerCase())
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

    if (!filtered.length) {
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
    } else setFilteredLouvores(filtered);
  };

  function setComplexFilter(formValue, themesApplied) {
    let filteredPraises = [];

    if (formValue.containsInCiasSongBook) {
      if (formValue.containsInCiasSongBook && themesApplied.length > 0) {
        for (let i = 0; i < louvores.length; i++) {
          for (let j = 0; j < themesApplied.length; j++) {
            if (
              louvores[i].theme === themesApplied[j] &&
              louvores[i].containsInCiasSongBook
            ) {
              filteredPraises.push(louvores[i]);
            }
          }
        }
      } else {
        filteredPraises = louvores.filter(
          (louvor) => louvor.containsInCiasSongBook
        );
      }
    } else {
      for (let i = 0; i < louvores.length; i++) {
        for (let j = 0; j < themesApplied.length; j++) {
          if (louvores[i].theme === themesApplied[j]) {
            filteredPraises.push(louvores[i]);
          }
        }
      }
    }
    if (filteredPraises.length < 1) {
      filteredPraises = louvores;
    }
    setComplexFilterApplied(true);
    setFilteredLouvores(filteredPraises);
  }

  return (
    <Container>
      <div className="search-container">
        <input
          type="text"
          id="filter"
          onChange={handleFilter}
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
      />
    </Container>
  );
}
