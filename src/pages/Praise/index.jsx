import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Praise() {
  let [louvor, setLouvor] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const location = useLocation();
  const { id, iconName } = location.state;
  const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";

  const activeTab = iconName;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const louvor = await response.json();
      setLouvor(response.data);
      if (louvor) {
        setActiveTab(iconName, louvor);
      } else {
        console.log("praise not found");
      }
    }
    fetchData();
  }, [iconName]);

  function setActiveTab(activeTab, louvor) {
    if (activeTab === "LuType") {
      setIframeUrl(
        "data:" +
          louvor.lyricsPdf.contentType +
          ";base64," +
          louvor.lyricsPdf.file
      );
    } else if (activeTab === "LuListMusic") {
      setIframeUrl(
        "data:" +
          louvor.chordsPdf.contentType +
          ";base64," +
          louvor.chordsPdf.file
      );
    } else if (activeTab === "LuMusic") {
      setIframeUrl(
        "data:" +
          louvor.sheetMusicPdf.contentType +
          ";base64," +
          louvor.sheetMusicPdf.file
      );
    } else if (activeTab === "LuVolume1") {
      setIframeUrl(
        "data:" +
          louvor.audioFile.contentType +
          ";base64," +
          louvor.audioFile.file
      );
    }
  }

  return (
    <Container>
      <Header />
      <embed src={iframeUrl} className="display" />
    </Container>
  );
}
