import React from "react";
import { Container } from "./styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
// eslint-disable-next-line
import { pdfjs } from "react-pdf";
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

  // eslint-disable-next-line
  const activeTab = iconName;
  // eslint-disable-next-line
  useEffect(() => {
    async function fetchData() {
      const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
      const response = await fetch(url);
      const louvor = await response.json();
      if (louvor.linkPdfLyrics)
        louvor.lyricsPdf.file = await convertPdfToImages(louvor.lyricsPdf.file);
      if (louvor.linkChords)
        louvor.chordsPdf.file = await convertPdfToImages(louvor.chordsPdf.file);
      if (louvor.linkChords)
        louvor.sheetMusicPdf.file = await convertPdfToImages(
          louvor.sheetMusicPdf.file
        );
      setLouvor(louvor);

      louvor ? setActiveTab(iconName, louvor) : console.log("praise not found");
    }

    const convertPdfToImages = async (file) => {
      const base64Response = await fetch(`data:application/pdf;base64,${file}`);
      const blob = await base64Response.blob();
      const images = [];
      const data = await readFileData(blob);
      const pdf = await PDFJS.getDocument(data).promise;
      const canvas = document.createElement("canvas");
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport })
          .promise;
        images.push(canvas.toDataURL());
      }
      return images;
    };

    const PDFJS = require("pdfjs-dist/webpack");
    // eslint-disable-next-line
    fetchData();
  }, [iconName]); // eslint-disable-line react-hooks/exhaustive-deps

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsArrayBuffer(file);
    });
  };

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
  const setActiveUrl = (file) => file.file[0];
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
