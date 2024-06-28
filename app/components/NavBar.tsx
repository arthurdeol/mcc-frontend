import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";

export default function NavBar(louvor: any, urlCheck: boolean) {
  let [urlCheckIsHome, setUrlCheckIsHome] = useState(true);
  useEffect(() => {
    console.log("checando ", urlCheck);
    urlCheck ? setUrlCheckIsHome(true) : setUrlCheckIsHome(false);
  }, []);
  return (
    <div className="w-screen h-16 flex items-center justify-between px-8 shadow-sm">
      <img src="./images/logomcc.jpeg" alt="MCC logo" className="w-36" />

      {urlCheckIsHome && (
        <button className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-4 border rounded-lg border-red-500 hover:border-transparent">
          Login
        </button>
      )}

      {!urlCheckIsHome && (
        <div className="flex items-center cursor-pointer">
          <IconButton
            hasFile={louvor.linkPdfLyrics}
            iconName={"LuType"}
            size={16}
            href={"/song"}
            id={louvor.songBookMapId}
          ></IconButton>
          <IconButton
            hasFile={louvor.linkChords}
            iconName={"LuListMusic"}
            size={17}
            href={"/song"}
            id={louvor.songBookMapId}
          ></IconButton>
          <IconButton
            hasFile={louvor.linkSheetMusic}
            iconName={"LuMusic"}
            size={16}
            href={"/song"}
            id={louvor.songBookMapId}
          ></IconButton>
          <IconButton
            hasFile={louvor.linkAudioFile}
            iconName={"LuVolume1"}
            size={18}
            href={"/song"}
            id={louvor.songBookMapId}
          ></IconButton>
        </div>
      )}
    </div>
  );
}
