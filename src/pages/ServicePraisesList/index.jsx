import { Container, XClose } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ServicePraisesList() {
  const [servicePraises, setServicePraises] = useState(() => {
    const praisesSelected = localStorage.getItem("servicePraisesList");
    if (praisesSelected) {
      return JSON.parse(praisesSelected);
    }
    return [];
  });

  const deletePraiseFromServiceList = (praiseId) => {
    setServicePraises(
      servicePraises.filter((praise) => praise.songBookMapId !== praiseId)
    );
  };

  useEffect(() => {
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

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
    <Container>
      <Header />
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="service-container">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                className="box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
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
                          <div className="titles">
                            <div>
                              {praise.englishTitle && (
                                <h6 className="praise-title-en">
                                  {praise.englishSongBookNumber
                                    ? praise.englishSongBookNumber + " - "
                                    : " "}
                                  {praise.englishTitle
                                    ? praise.englishTitle
                                    : ""}
                                </h6>
                              )}
                              {praise.portugueseTitle && (
                                <p className="praise-title-pt">
                                  {praise.portugueseSongBookNumber
                                    ? praise.portugueseSongBookNumber + " - "
                                    : "Avulso - "}
                                  {praise.portugueseTitle
                                    ? praise.portugueseTitle
                                    : ""}
                                </p>
                              )}
                              {!praise.portugueseTitle && (
                                <p className="praise-title-pt">&nbsp;</p>
                              )}
                            </div>
                            <XClose
                              onClick={() =>
                                deletePraiseFromServiceList(
                                  praise.songBookMapId
                                )
                              }
                            >
                              <LuX />
                            </XClose>
                          </div>

                          <div className="footer">
                            <div className="theme-tag-container">
                              {praise.containsInCiasSongBook && (
                                <div className="theme-tag">CIA</div>
                              )}
                              <div className="theme-tag">{praise.theme}</div>
                            </div>

                            {praise.englishTitle && (
                              <div className="icons-container">
                                <Link
                                  to={praise.linkSheetMusic ? "/praise" : null}
                                  className="icon-container"
                                  state={{
                                    id: praise.songBookMapId,
                                    iconName: "LuMusic",
                                  }}
                                >
                                  <LuMusic
                                    color={
                                      praise.linkSheetMusic
                                        ? "black"
                                        : "#9ca3af"
                                    }
                                    size={17}
                                  />
                                </Link>

                                <Link
                                  to={praise.linkPdfLyrics ? "/praise" : null}
                                  className="icon-container"
                                  state={{
                                    id: praise.songBookMapId,
                                    iconName: "LuType",
                                  }}
                                >
                                  <LuType
                                    color={
                                      praise.linkPdfLyrics ? "black" : "#9ca3af"
                                    }
                                    size={17}
                                  />
                                </Link>

                                <Link
                                  to={praise.linkChords ? "/praise" : null}
                                  className="icon-container"
                                  state={{
                                    id: praise.songBookMapId,
                                    iconName: "LuListMusic",
                                  }}
                                >
                                  <LuListMusic
                                    color={
                                      praise.linkChords ? "black" : "#9ca3af"
                                    }
                                    size={19}
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
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
    </Container>
  );
}
