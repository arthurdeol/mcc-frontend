import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Praise() {
  const [louvor, setLouvor] = useState("");
  const [fileArray, setFileArray] = useState([]);
  const location = useLocation();
  const [iconName] = useState(location.state.iconName);
  // const [iconName, setIconName] = useState(location.state.iconName);
  const { id } = location.state;
  //const activeTab = iconName;

  useEffect(() => {
    async function fetchData() {
      const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
      const response = await fetch(url);
      const louvor = await response.json();

      setLouvor(louvor);
      louvor ? setActiveTab(iconName, louvor) : console.log("praise not found");
    }

    fetchData();
  }, [iconName]); // eslint-disable-line react-hooks/exhaustive-deps

  function setActiveTab(activeTab, louvor) {
    let arrayOfFile = [];

    if (activeTab === "LuType") {
      louvor.lyricsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (activeTab === "LuListMusic") {
      louvor.chordsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (activeTab === "LuMusic") {
      louvor.sheetMusicPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (activeTab === "LuVolume1") {
      louvor.audioFile.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    }
  }
  const setUrl = (file) =>
    "data:" + file.document.contentType + ";base64," + file.document.file;

  return (
    <Container>
      <Header louvor={louvor} setActiveTab={setActiveTab} />
      {louvor ? (
        <div className="file-container">
          <div className="file-content">
            {fileArray.map((url, i) => (
              <img key={i} src={url} alt="praiseImg" className="file" />
            ))}
          </div>
        </div>
      ) : (
        <div className="progress-container">
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}
    </Container>
  );
}
