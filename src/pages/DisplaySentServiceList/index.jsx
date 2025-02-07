import { useEffect, useState } from "react";
import { ContainerSentList } from "./styles";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
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
      localStorage.setItem("sentServiceListId", id);
    });
    // eslint-disable-next-line
  }, []);

  const newListDate = list.listDate?.substring(0, 10).replaceAll("-", "/");

  return (
    <ContainerSentList>
      <Header />

      <div className="list-container">
        <div className="box-list">
          <div className="title-container">
            <div className="date-container">
              {list.church && <h1>{list.church + " -"}&nbsp;</h1>}
              <h1>{newListDate}</h1>
            </div>
            {list.comment && <p className="comment">"{list.comment}"</p>}
            {list.userName && (
              <p className="sent-by">Sent by: {list.userName}</p>
            )}
          </div>
          <div className="praises-container">
            {praises.map((praise, i) => (
              <div className="praise-container" key={i}>
                <div className="praise-sequence">{i + 1}</div>
                <PraiseCard praise={praise.song} />
              </div>
            ))}
          </div>
        </div>
      </div>
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
