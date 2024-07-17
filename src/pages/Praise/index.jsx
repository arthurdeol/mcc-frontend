import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { pdfjs } from "react-pdf";
import PdfReader from "../../components/PdfReader";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Praise() {
  const [louvor, setLouvor] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const location = useLocation();
  const [iconName, setIconName] = useState(location.state.iconName);
  const { id } = location.state;
  const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";

  const activeTab = iconName;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const louvor = await response.json();
      setLouvor(louvor);
      louvor ? setActiveTab(iconName, louvor) : console.log("praise not found");
    }
    fetchData();
  }, [iconName]);

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

  const setActiveUrl = (file) =>
    "data:" + file.contentType + ";base64," + file.file;

  function setTab(iconName) {
    setIconName(iconName);
  }

  return (
    <Container>
      <Header louvor={louvor} setActiveTab={setActiveTab} />

      {louvor ? (
        <div className="pdf-reader-container">
          <PdfReader fileLink={iframeUrl} />
        </div>
      ) : (
        // <object
        //   data={iframeUrl}
        //   type="application/pdf"
        //   frameBorder="0"
        //   width="100%"
        //   height="100%"
        // >
        //   <embed src={iframeUrl} className="display" />
        //   {/* <embed
        //     src="https://drive.google.com/file/d/1CRFdbp6uBDE-YKJFaqRm4uy9Z4wgMS7H/preview?usp=sharing"
        //     width="100%"
        //     height="600px"
        //   /> */}
        // </object>
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
