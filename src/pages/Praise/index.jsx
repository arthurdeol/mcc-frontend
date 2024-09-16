import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

export default function Praise() {
  const { id, file } = useParams();
  const [louvor, setLouvor] = useState("");
  const [fileArray, setFileArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
      const response = await fetch(url);
      const louvor = await response.json();

      setLouvor(louvor);
      louvor ? setActiveTab(file, louvor) : console.log("praise not found");
    }

    fetchData();
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  function setActiveTab(file, louvor) {
    let arrayOfFile = [];

    if (file === "lyrics") {
      louvor.lyricsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (file === "chords") {
      louvor.chordsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (file === "musicSheet") {
      louvor.sheetMusicPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (file === "audio") {
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
