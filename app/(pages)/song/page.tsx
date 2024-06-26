"use client";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Praise } from "../../interfaces/Praise";

interface SongProps {
  searchParams: {
    id: string;
    activeTab: string;
  };
}

export default function Song({ searchParams }: SongProps) {
  const [louvor, setLouvor] = useState<Praise>();
  let [iframeUrl, setIframeUrl] = useState("");
  const id = searchParams.id;
  const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
  const activeTab = searchParams.activeTab;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLouvor(data);
        console.log(activeTab);
        if (activeTab === "LuType") {
          setIframeUrl(data.linkPdfLyrics);
        } else if (activeTab === "LuListMusic") {
          setIframeUrl(data.linkChords);
        } else if (activeTab === "LuMusic") {
          setIframeUrl(data.linkSheetMusic);
        } else if (activeTab === "LuVolume1") {
          setIframeUrl(data.linkAudioFile);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-screen h-screen">
      <NavBar></NavBar>
      <iframe
        src={iframeUrl}
        width="100%"
        height="100%"
        allow="autoplay"
      ></iframe>
    </div>
  );
}
