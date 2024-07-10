"use client";
import React from "react";
import { useState, useEffect } from "react";
import IconButton from "../../components/IconButton";
import { Praise } from "../../interfaces/Praise";
import NavBar from "../../components/NavBar";

interface SongProps {
  searchParams: {
    id: string;
    activeTab: string;
  };
}

export default function Song({ searchParams }: SongProps) {
  let [louvor, setLouvor] = useState({});
  let [iframeUrl, setIframeUrl] = useState("");
  let [urlChord, setUrlChord] = useState("");
  let [urlLyrics, setUrlLyrics] = useState("");
  let [urlAudio, setUrlAudio] = useState("");
  let [urlSheetMusic, setUrlSheetMusic] = useState("");
  const id = searchParams.id;
  const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
  const activeTab = searchParams.activeTab;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (activeTab === "LuType") {
          setIframeUrl(data.linkPdfLyrics);
          setLouvor(data);
        } else if (activeTab === "LuListMusic") {
          setIframeUrl(data.linkChords);
          setLouvor(data);
        } else if (activeTab === "LuMusic") {
          setIframeUrl(data.linkSheetMusic);
          setLouvor(data);
        } else if (activeTab === "LuVolume1") {
          setIframeUrl(data.linkAudioFile);
          setLouvor(data);
        }
        setUrlAudio(data.linkAudioFile);
        setUrlSheetMusic(data.linkSheetMusic);
        setUrlChord(data.linkChords);
        setUrlLyrics(data.linkPdfLyrics);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-screen h-screen">
      <NavBar
        urlChord={urlChord}
        urlLyrics={urlLyrics}
        urlAudio={urlAudio}
        urlSheetMusic={urlSheetMusic}
        id={id}
      ></NavBar>
      <iframe
        src={iframeUrl}
        width="100%"
        height="100%"
        allow="autoplay"
      ></iframe>
    </div>
  );
}
