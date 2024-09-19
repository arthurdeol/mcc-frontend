import React from "react";
import {
  ContainerPraise,
  // FullScreenButton,
  // ExitFullScreenButton,
} from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
// import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

export default function Praise() {
  const navigate = useNavigate();
  const { id, file } = useParams();
  const [louvor, setLouvor] = useState("");
  const [fileArray, setFileArray] = useState([]);
  // const [goFull, setGoFull] = useState(false);

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

  // useEffect(() => {
  //   let e = document.getElementById("my-fullscreen");
  //   let doc = document.documentElement,
  //     state = document.webkitIsFullScreen || document.isFullScreen,
  //     requestFunc = doc.requestFullscreen || doc.webkitRequestFullScreen,
  //     cancelFunc = document.cancelFullScreen || document.webkitCancelFullScreen;

  //   !state && e ? requestFunc.call(e) : cancelFunc.call(document);
  // }, [goFull]); // eslint-disable-line react-hooks/exhaustive-deps

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
    navigate(`/praise/${id}/${file}`);
  }
  const setUrl = (file) =>
    "data:" + file.document.contentType + ";base64," + file.document.file;

  return (
    <ContainerPraise>
      <Header louvor={louvor} setActiveTab={setActiveTab} />
      {louvor ? (
        <div className="file-container">
          {/* <div
            id="my-fullscreen"
            className={goFull ? "file-fullscreen" : "file-content"}
          >
            {goFull && (
              <ExitFullScreenButton onClick={() => setGoFull(!goFull)}>
                <RxExitFullScreen color={"var(--color-black)"} size={17} />
              </ExitFullScreenButton>
            )} */}
          <div className="file-content">
            {fileArray.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="praiseImg"
                // className={goFull ? "img-fullscreen" : "file"}
                className="file"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="progress-container">
          <Stack
            sx={{ color: "var(--color-dark-gray)" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}

      {/* <FullScreenButton onClick={(e) => setGoFull(!goFull)}>
        <RxEnterFullScreen color={"var(--color-black)"} size={17} />
      </FullScreenButton> */}
    </ContainerPraise>
  );
}
