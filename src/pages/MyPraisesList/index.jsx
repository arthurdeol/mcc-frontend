import { ContainerServicePraiseList } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoHeartSharp } from "react-icons/io5";
import PraiseCard from "../../components/PraiseCard";
import SendList from "../../components/SendList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { style, ButtonStyledRed, ButtonStyled, FooterFilter } from "./styles";

export default function MyPraisesList() {
  const [showShareList, setShowShareList] = useState(false);
  const [servicePraises, setServicePraises] = useState(() => {
    const praisesSelected = localStorage.getItem("servicePraisesList");
    if (praisesSelected) {
      return JSON.parse(praisesSelected);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

  const deletePraiseFromServiceList = (praiseId) => {
    setServicePraises(
      servicePraises.filter((praise) => praise.songBookMapId !== praiseId)
    );
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedServicePraises = [...servicePraises];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedPraise] = reorderedServicePraises.splice(sourceIndex, 1);
      reorderedServicePraises.splice(destinationIndex, 0, removedPraise);

      return setServicePraises(reorderedServicePraises);
    }
  };

  const [openModalDeletePraisesList, setOpenModalDeletePraisesList] =
    useState(false);
  const handleOpen = () => setOpenModalDeletePraisesList(true);
  const handleClose = () => setOpenModalDeletePraisesList(false);

  const cleanList = () => {
    setServicePraises([]);
    handleClose();
  };

  return (
    <ContainerServicePraiseList>
      <Header
        servicePraises={servicePraises}
        setShowShareList={setShowShareList}
        showShareList={showShareList}
        setServicePraises={setServicePraises}
        openModalDeletePraisesList={handleOpen}
      />

      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="service-container">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                className="box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {servicePraises.length === 0 && (
                  <div className="praises-not-selected">
                    <IoHeartSharp color={"var(--color-dark-red)"} size={37} />
                    <div>
                      <h3>Your praises list is empty:</h3>
                      <p>You haven't selected any praises yet! </p>
                      <p>
                        You can add praises to your list by clicking on the
                        little hearts.
                      </p>
                      <p> After that, you'll be able to share your list too.</p>
                      {/* <p
                        style={{
                          marginTop: "1rem",
                          color: "var(--color-dark-gray)",
                          fontSize: "0.7rem",
                        }}
                      >
                        Obs.: if you want to open your list in other device,
                        click on the button to share it and save the link!
                      </p> */}
                    </div>
                  </div>
                )}

                {showShareList && (
                  <SendList
                    servicePraises={servicePraises}
                    setShowShareList={setShowShareList}
                    showShareList={showShareList}
                  />
                )}

                {!showShareList && (
                  <div className="praises-container">
                    {servicePraises.map((praise, i) => (
                      <Draggable
                        draggableId={praise.songBookMapId}
                        key={praise.songBookMapId}
                        index={i}
                      >
                        {(provided) => (
                          <div
                            className="praise-container"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div className="praise-sequence">{i + 1}</div>
                            <PraiseCard
                              praise={praise}
                              servicePraises={servicePraises}
                              deletePraiseFromServiceList={
                                deletePraiseFromServiceList
                              }
                              hasCloseButton={true}
                              hasHeartButton={false}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <Modal open={openModalDeletePraisesList} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <h2 style={{ fontSize: "1.1rem" }}>
            Do you want to delete this list?
          </h2>
          <FooterFilter>
            <ButtonStyled onClick={handleClose}>Cancel</ButtonStyled>
            <ButtonStyledRed type="submit" onClick={() => cleanList()}>
              Yes, I want to delete
            </ButtonStyledRed>
          </FooterFilter>
        </Box>
      </Modal>
    </ContainerServicePraiseList>
  );
}
