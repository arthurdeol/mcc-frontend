import React from "react";
import axios from "axios";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

export default function Praise() {
  let [louvor, setLouvor] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const location = useLocation();
  const { id, iconName } = location.state;
  const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";

  const activeTab = iconName;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLouvor(data);
        if (activeTab === "LuType") {
          setIframeUrl(
            "data:" +
              data.lyricsPdf.contentType +
              ";base64," +
              data.lyricsPdf.file
          );
        } else if (activeTab === "LuListMusic") {
          setIframeUrl(
            "data:" +
              data.chordsPdf.contentType +
              ";base64," +
              data.chordsPdf.file
          );
        } else if (activeTab === "LuMusic") {
          setIframeUrl(
            "data:" +
              data.sheetMusicPdf.contentType +
              ";base64," +
              data.sheetMusicPdf.file
          );
        } else if (activeTab === "LuVolume1") {
          setIframeUrl(
            "data:" +
              data.audioFile.contentType +
              ";base64," +
              data.audioFile.file
          );
        }
      })
      .catch((err) => console.error(err));
  }, [iconName]);

  // console.log("louvor", louvor);

  return (
    <Container>
      <Header />
      <embed src={iframeUrl} className="display" />
    </Container>
  );
}
