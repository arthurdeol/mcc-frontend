import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Praise() {
  const [louvor, setLouvor] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const location = useLocation();
  const [iconName, setIconName] = useState(location.state.iconName);
  const { id } = location.state;

  // eslint-disable-next-line
  const activeTab = iconName;
  // eslint-disable-next-line
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
    if (activeTab === "LuType") {
      setIframeUrl(setActiveUrl(louvor.lyricsPdf));
    } else if (activeTab === "LuListMusic") {
      setIframeUrl(setActiveUrl(louvor.chordsPdf));
    } else if (activeTab === "LuMusic") {
      setIframeUrl(setActiveUrl(louvor.sheetMusicPdf));
    } else if (activeTab === "LuVolume1") {
      setIframeUrl(setActiveUrl(louvor.audioFile));
    }
  }
  // eslint-disable-next-line
  const setActiveUrl = (file) =>
    "data:" + file.contentType + ";base64," + file.file;
  // eslint-disable-next-line
  function setTab(iconName) {
    setIconName(iconName);
  }

  return (
    <Container>
      <Header louvor={louvor} setActiveTab={setActiveTab} />
      {/* // eslint-disable-next-line */}
      {louvor ? (
        <div className="pdf-reader-container">
          <img src={iframeUrl} alt="praiseImg" />
        </div>
      ) : (
        // <embed src={iframeUrl} className="display" />
        <div className="progress-container">
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}
    </Container>
  );
}
