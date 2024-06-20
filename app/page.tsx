'use client'
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState, useEffect} from "react";

interface Louvor {
  songBookMapId: number;
  englishSongBookNumber: string;
  englishTitle: string;
  portugueseSongBookNumber: string;
  portugueseTitle: string;
}


export default function Home() {

  const [louvores, setLouvores] = useState<Louvor[]>([]);
  const url = "https://mccapi.up.railway.app/SongBookMap";
  const [filteredLouvores, setFilteredLouvores] = useState<Louvor[]>([]);

  const handleFilter = (event: any) => {
    const value = event.target.value;
    console.log(value);
    const filtered = louvores.filter(louvor => 
       louvor.englishSongBookNumber.toLowerCase().includes(value.toString().toLowerCase()) 
       || louvor.englishTitle.toLowerCase().includes(value.toString().toLowerCase()) 
       || louvor.portugueseSongBookNumber.toLowerCase().includes(value.toString().toLowerCase())
       || louvor.portugueseTitle.toLowerCase().includes(value.toString().toLowerCase())
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
      .then((data) => {setLouvores(data); setFilteredLouvores(data);})
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
      <main className="flex flex-col items-center justify-center w-full flex-l px-20 text-center">
      
        <div className="louvores">
        <input 
        type="text" 
        id="filter"
        onChange={handleFilter} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." 
        />
          {filteredLouvores.map((louvor) => (
            
            <div 
              key={louvor.songBookMapId} 
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div>
              <h6 
                className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900" 
                >
                  {louvor.englishSongBookNumber ? louvor.englishSongBookNumber + " - " : " "}  {louvor.englishTitle ? louvor.englishTitle : ""} 
              </h6>
              <p 
                className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700"
              >
                {louvor.portugueseSongBookNumber ? louvor.portugueseSongBookNumber + " - " : "Avulso - "}  {louvor.portugueseTitle ? louvor.portugueseTitle : ""} 
              </p>
              </div>
              
            </div>
            
          ))}
        </div>
        
      </main>
    </div>
    
  );
}
