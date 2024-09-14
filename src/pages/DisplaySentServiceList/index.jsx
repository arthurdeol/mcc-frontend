import { useEffect, useState } from "react";
import { ContainerSentList } from "./styles";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PraiseCard from "../../components/PraiseCard";

export default function DisplaySentServiceList() {
  const url = "/SongBookMapList";
  const { id } = useParams();
  const [list, setList] = useState({});
  const [praises, setPraises] = useState([]);

  useEffect(() => {
    api.get(url + "/" + id).then((res) => {
      const listData = res.data;
      setList(listData);
      setPraises(listData.songs);
    });
    // eslint-disable-next-line
  }, []);

  const newListDate = list.listDate?.substring(0, 10).replaceAll("-", "/");

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedServicePraises = [...praises];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedPraise] = reorderedServicePraises.splice(sourceIndex, 1);
      reorderedServicePraises.splice(destinationIndex, 0, removedPraise);

      return setPraises(reorderedServicePraises);
    }
  };

  return (
    <ContainerSentList>
      <Header />
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="list-container">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                className="box-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <>
                  <div className="title-container">
                    <div className="date-container">
                      {list.church && <h1>{list.church + " -"}&nbsp;</h1>}
                      <h1>{newListDate}</h1>
                    </div>
                    {list.comment && (
                      <p className="comment">"{list.comment}"</p>
                    )}
                    {list.userName && (
                      <p className="sent-by">Sent by: {list.userName}</p>
                    )}
                  </div>
                  <div className="praises-container">
                    {praises.map((praise, i) => (
                      <Draggable
                        draggableId={praise.song.songBookMapId}
                        key={praise.song.songBookMapId}
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
                            <PraiseCard praise={praise.song} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </ContainerSentList>
  );
}

// TODO: code for start service LISTS page
// import { useEffect, useState } from "react";
// import { Container } from "./styles";
// import api from "../../services/api";
// import Header from "../../components/Header";

// export default function DisplaySentServiceList() {
//   const url = "https://mccapi.up.railway.app/SongBookMapList";
//   const [lists, setLists] = useState([]);

//   useEffect(() => {
//     api.get(url).then((res) => {
//       const listsData = res.data;
//       setLists(listsData);
//     });
//   }, []);

//   console.log(lists);
//   return (
//     <Container>
//       <Header />

//       <div className="lists-container">
//         <div className="box">
//           {lists.map((list, i) => (
//             <div>
//               <div>{list.church}</div>
//               <div>{list.listDate}</div>
//               <div>{list.userName}</div>
//               <div>{list.comment}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// }
