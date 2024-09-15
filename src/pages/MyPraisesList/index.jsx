import { ContainerServicePraiseList } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoHeartSharp } from "react-icons/io5";
import PraiseCard from "../../components/PraiseCard";
import SendList from "../../components/SendList";

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

  return (
    <ContainerServicePraiseList>
      <Header
        servicePraises={servicePraises}
        setShowShareList={setShowShareList}
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
                    <div>
                      <IoHeartSharp color={"#b71c1c"} size={37} />
                      <p>
                        You have no praises songs selected yet! <br /> You can
                        add praises songs clicking in the little hearts...
                      </p>
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
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </ContainerServicePraiseList>
  );
}
