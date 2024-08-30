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
    const value = especialCharMask(event.target.value);
    const checkIfValueIsNumber = /^\d+(?:\.\d+)?$/.test(value);
    let filtered = [];

    if (checkIfValueIsNumber) {
      filtered = louvores.filter(
        (louvor) =>
          especialCharMask(louvor.englishSongBookNumber) === value ||
          especialCharMask(louvor.portugueseSongBookNumber) === value
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

    if (!filtered.length) {
      setPraiseNotFound(true);
    } else {
      setPraiseNotFound(false);
    }

    if (value === "") setFilteredLouvores(louvores);
    else setFilteredLouvores(filtered);
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
