import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";

interface propsNavbar {
  urlChord?: any;
  urlLyrics?: any;
  urlAudio?: any;
  urlSheetMusic?: any;
  id?: any;
}

export default function NavBar({
  urlChord,
  urlLyrics,
  urlAudio,
  urlSheetMusic,
  id,
}: propsNavbar) {
  let [isHome, setUrlCheckIsHome] = useState(true);
  useEffect(() => {
    const isHomecheck = window.location.href.toString().indexOf("/song") != -1;
    if (isHomecheck) {
      setUrlCheckIsHome(true);
    } else {
      setUrlCheckIsHome(false);
    }
  }, []);
  return (
    <div className="w-screen h-16 flex items-center justify-between px-8 shadow-sm">
      <img src="./images/logomcc.jpeg" alt="MCC logo" className="w-36" />

      {!isHome && (
        <button className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-4 border rounded-lg border-red-500 hover:border-transparent">
          Login
        </button>
      )}

      {isHome && (
        <div className="flex items-center cursor-pointer">
          <IconButton
            hasFile={urlLyrics}
            iconName={"LuType"}
            size={16}
            href={"/song"}
            id={id}
          ></IconButton>
          <IconButton
            hasFile={urlChord}
            iconName={"LuListMusic"}
            size={17}
            href={"/song"}
            id={id}
          ></IconButton>
          <IconButton
            hasFile={urlSheetMusic}
            iconName={"LuMusic"}
            size={16}
            href={"/song"}
            id={id}
          ></IconButton>
          <IconButton
            hasFile={urlAudio}
            iconName={"LuVolume1"}
            size={18}
            href={"/song"}
            id={id}
          ></IconButton>
        </div>
      )}
    </div>
  );
}
