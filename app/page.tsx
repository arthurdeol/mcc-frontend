'use client'
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState, useEffect} from "react";
import { Praise } from "../src/interfaces/Praise";
import Link from "next/link";

function naturalCompare(a: any, b: any) {
  var ax: any = [], bx: any = [];

  a.replace(/(\d+)|(\D+)/g, function (_ : any, $1 : any, $2: any) { ax.push([$1 || Infinity, $2 || ""]) });
  b.replace(/(\d+)|(\D+)/g, function (_ : any, $1 : any, $2: any) { bx.push([$1 || Infinity, $2 || ""]) });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
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
    const filtered = louvores.filter(louvor => 
       louvor.englishSongBookNumber.toLowerCase().includes(value.toString().toLowerCase()) 
       || louvor.englishTitle.toLowerCase().includes(value.toString().toLowerCase()) 
       || louvor.portugueseSongBookNumber.toString().toLowerCase().includes(value.toString().toLowerCase())
       || louvor.portugueseTitle.toLowerCase().includes(value.toString().toLowerCase())
       || louvor.theme?.toString().toLowerCase().includes(value.toString().toLowerCase())
    );
    console.log(filtered);
    
    if(value === "")
      setFilteredLouvores(louvores);
    else
      setFilteredLouvores(filtered);
    
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a: Praise, b : Praise) => 
          {
            return naturalCompare(a.portugueseSongBookNumber, b.portugueseSongBookNumber);
        }
      );
        setLouvores(data); 
        setFilteredLouvores(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <main 
      className="flex flex-col items-center justify-center w-full flex-l px-20 text-center"
      >
      <div
          className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Praise songs
              </h5>
            </div>
            <input type="text" id="filter" onChange={handleFilter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            <div className="divide-y divide-gray-200">
            {filteredLouvores.map((louvor) => ( <div className="flex items-center justify-between pb-3 pt-3 last:pb-0" key={louvor.songBookMapId} >
                <div className="flex items-center gap-x-3">
                  <div>
                    {
                      louvor.englishTitle &&
                    
                      <div
                      className="flex items-center gap-x-3"
                      >
                        <h6
                          className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
                        >
                          {louvor.englishSongBookNumber ? louvor.englishSongBookNumber + " - " : " "}  {louvor.englishTitle ? louvor.englishTitle : ""} 
                        </h6>
                        <div
                        className="bg-red-500 text-white text-xs font-bold uppercase px-2 py-1 rounded-full inline-block"
                        > {louvor.theme}</div>
                      </div>
                    }
                    {
                      louvor.portugueseTitle &&
                      <p
                      className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased text-align-left"
                    >
                       {louvor.portugueseSongBookNumber ? louvor.portugueseSongBookNumber + " - " : "Avulso - "}  {louvor.portugueseTitle ? louvor.portugueseTitle : ""} 
                    </p>
                    }
                    
                  </div>
                  
                </div>
                <button className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                  type="button"
                >      
                <Link href={`/song`}>            
                  Edit
                </Link>
                </button>
              </div>
            ))}
            </div>
          </div>
        </div>        
      </main>
    </div>
  );
}