"use client";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Praise } from "./interfaces/Praise";
import IconButton from "./components/IconButton";

function naturalCompare(a: any, b: any) {
  var ax: any = [],
    bx: any = [];

  a.replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.replace(/(\d+)|(\D+)/g, function (_: any, $1: any, $2: any) {
    bx.push([$1 || Infinity, $2 || ""]);
  });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

export default function Home() {
  const [louvores, setLouvores] = useState<Praise[]>([]);
  const url = "https://mccapi.up.railway.app/SongBookMap";
  const [filteredLouvores, setFilteredLouvores] = useState<Praise[]>([]);

  const handleFilter = (event: any) => {
    const value = event.target.value;
    console.log(value);
    const filtered = louvores.filter(
      (louvor) =>
        louvor.englishSongBookNumber
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.englishTitle
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.portugueseSongBookNumber
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.portugueseTitle
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        louvor.theme
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );
    console.log(filtered);

    if (value === "") setFilteredLouvores(louvores);
    else setFilteredLouvores(filtered);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a: Praise, b: Praise) => {
          return naturalCompare(
            a.portugueseSongBookNumber,
            b.portugueseSongBookNumber
          );
        });
        setLouvores(data);
        setFilteredLouvores(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <main className="flex flex-col items-center justify-center w-full flex-l px-20 text-center mt-4">
        <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Praise songs
              </h5>
            </div>
            <input
              type="text"
              id="filter"
              onChange={handleFilter}
              className="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
            <div className="divide-y divide-gray-200">
              {filteredLouvores.map((louvor) => (
                <div
                  className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                  key={louvor.songBookMapId}
                >
                  <div className="flex items-center gap-x-3">
                    <div>
                      {louvor.englishTitle && (
                        <div className="flex items-center gap-x-3">
                          <h6 className="font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                            {louvor.englishSongBookNumber
                              ? louvor.englishSongBookNumber + " - "
                              : " "}
                            {louvor.englishTitle ? louvor.englishTitle : ""}
                          </h6>
                          <div className="bg-red-500 text-white text-xs uppercase px-2 py-1 rounded-full inline-block">
                            {" "}
                            {louvor.theme}
                          </div>
                        </div>
                      )}
                      {louvor.portugueseTitle && (
                        <p className="flex font-sans text-sm font-light leading-normal text-gray-700 antialiased text-align-left">
                          {louvor.portugueseSongBookNumber
                            ? louvor.portugueseSongBookNumber + " - "
                            : "Avulso - "}
                          {louvor.portugueseTitle ? louvor.portugueseTitle : ""}
                        </p>
                      )}
                    </div>
                  </div>
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

                    {/* PARA USAR QUANDO DER PRA SALVAR NA LISTA DE FAVORITOS 
                     <IconButton
                      hasFile={louvor.linkAudioFile}
                      iconName={"LuList"}
                      size={17}
                      href={"/song"}
                    ></IconButton>
                     <IconButton
                      hasFile={louvor.linkAudioFile}
                      iconName={"LuStar"}
                      size={16}
                      href={"/song"}
                    ></IconButton>*/}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
