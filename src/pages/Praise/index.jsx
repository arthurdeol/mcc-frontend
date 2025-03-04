import React, { useState, useEffect } from "react";
import { ContainerPraise } from "./styles";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

export default function Praise() {
  const navigate = useNavigate();
  const { id, file } = useParams();
  const [louvor, setLouvor] = useState("");
  const [fileArray, setFileArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const [displayChords, setDisplayChords] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
      const response = await fetch(url);
      const louvor = await response.json();

      setLouvor(louvor);
      if (louvor) {
        setActiveTab(file, louvor);
      } else {
        console.log("Praise not found");
      }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, [file]);

  const processChords = (text) => {
    const lines = text.split("\n"); // Divide o texto em linhas
    const elements = [];
    let group = null;
    let groupClass = "";

    lines.forEach((line, index) => {
      const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;
      let lastIndex = 0;
      let match;

      let chordLine = "";
      let textLine = "";

      // Verifica se a linha começa com [.N] para iniciar um grupo
      const groupMatch = line.match(/^\[\.(\d+)\]/);
      const showNumberOfRepetition = /\[@\]/.test(line);

      if (groupMatch) {
        if (group) {
          elements.push(
            <div
              key={`group-${index}`}
              className={groupClass}
              style={{
                borderRight: "2px solid #3a3a3a",
                paddingRight: "1rem",
                position: "relative",
              }}
            >
              {group}
            </div>
          );
        }
        group = [];
        groupClass = `group-${groupMatch[1]}`;
        line = line.replace(/^\[\.(\d+)\]/, "");
        line = line.replace(/\[@\]/g, "");

        if (showNumberOfRepetition) {
          group.push(
            <span
              key={`repeat-${index}`}
              style={{
                position: "absolute",
                right: "-30px",
                color: "black",
              }}
            >
              {groupMatch[1]}x
            </span>
          );
        }
      } else if (group) {
        elements.push(
          <div
            key={`group-${index}`}
            className={groupClass}
            style={{
              borderRight: "2px solid #3a3a3a",
              paddingRight: "1rem",
            }}
          >
            {group}
          </div>
        );
        group = null;
        groupClass = "";
      }

      while ((match = regex.exec(line)) !== null) {
        const chord = match[1];
        const chordIndex = match.index - chordLine.replace(/\s/g, "").length;
        chordLine = chordLine.padEnd(chordIndex, " ") + chord;
        textLine += line.substring(lastIndex, match.index);
        lastIndex = match.index + match[0].length;
      }
      textLine += line.substring(lastIndex);

      // Mapeia tags especiais para estilos específicos
      const specialTags = {
        "[intro]": { label: "Intro:", color: "red", bold: true },
        "[chorus]": {
          label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
          color: "black",
          bold: true,
        },
        "[final]": { label: "Final:", color: "black", bold: true },
        "[b]": {
          label: line.replace(/\[b\]/g, ""),
          color: "black",
          bold: true,
        },
      };

      for (const tag in specialTags) {
        if (line.includes(tag)) {
          const { label, color, bold } = specialTags[tag];
          const element = (
            <div key={index} style={{ color }}>
              <span
                style={{ color: "black", fontWeight: bold ? "bold" : "normal" }}
              >
                {label}
              </span>
              {chordLine}
            </div>
          );
          group ? group.push(element) : elements.push(element);
          return;
        }
      }

      // Tratamento específico para repetições
      if (line.includes("[repeat")) {
        const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
        const element = (
          <div key={index} style={{ fontWeight: "bold" }}>
            Repeat {repeatCount}x:
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Tratamento para marcação de espaço
      if (line.includes("[%%]")) {
        const element = (
          <div key={index} style={{ width: "100%", height: "3rem" }}>
            &nbsp;
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Adiciona as linhas de acordes e letras ao array de elementos
      const chordElement = (
        <div
          key={`chords-${index}`}
          style={{ whiteSpace: "pre", color: "red" }}
        >
          {chordLine}
        </div>
      );

      const textElement = (
        <div
          key={`lyrics-${index}`}
          style={{
            whiteSpace: "pre",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          {line.includes("[arrowR]") && (
            <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
          )}
          {textLine.replace(/\[arrow[L|R]\]/g, "")}
          {line.includes("[arrowL]") && (
            <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
          )}
        </div>
      );

      if (group) {
        group.push(chordElement, textElement);
      } else {
        elements.push(chordElement, textElement);
      }
    });

    // Se houver um grupo aberto no final, adiciona ele aos elementos
    if (group) {
      elements.push(
        <div
          className={groupClass}
          style={{
            borderRight: "2px solid #3a3a3a",
            paddingRight: "1rem",
            position: "relative",
          }}
        >
          {group}
        </div>
      );
    }

    return elements;
  };

  const processLyrics = (text) => {
    const lines = text.split("\n"); // Divide o texto em linhas
    const elements = [];
    let group = null;
    let groupClass = "";

    lines.forEach((line, index) => {
      // Verifica se a linha começa com [.N] para iniciar um grupo
      const groupMatch = line.match(/^\[\.(\d+)\]/);
      const showNumberOfRepetition = /\[@\]/.test(line);

      if (groupMatch) {
        if (group) {
          elements.push(
            <div
              key={`group-${index}`}
              className={groupClass}
              style={{
                borderRight: "2px solid #3a3a3a",
                paddingRight: "1rem",
                position: "relative",
              }}
            >
              {group}
            </div>
          );
        }
        group = [];
        groupClass = `group-${groupMatch[1]}`;
        line = line.replace(/^\[\.(\d+)\]/, "");
        line = line.replace(/\[@\]/g, "");

        if (showNumberOfRepetition) {
          group.push(
            <span
              key={`repeat-${index}`}
              style={{
                position: "absolute",
                right: "-30px",
                color: "black",
              }}
            >
              {groupMatch[1]}x
            </span>
          );
        }
      } else if (group) {
        elements.push(
          <div
            key={`group-${index}`}
            className={groupClass}
            style={{
              borderRight: "2px solid #3a3a3a",
              paddingRight: "1rem",
            }}
          >
            {group}
          </div>
        );
        group = null;
        groupClass = "";
      }

      // Mapeia tags especiais para estilos específicos
      const specialTags = {
        "[intro]": { label: "Intro:", color: "red", bold: true },
        "[chorus]": {
          label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
          color: "black",
          bold: true,
        },
        "[final]": { label: "Final:", color: "black", bold: true },
        "[b]": {
          label: line.replace(/\[b\]/g, ""),
          color: "black",
          bold: true,
        },
      };

      for (const tag in specialTags) {
        if (line.includes(tag)) {
          const { label, color, bold } = specialTags[tag];
          const element = (
            <div key={index} style={{ color }}>
              <span style={{ fontWeight: bold ? "bold" : "normal" }}>
                {label}
              </span>
            </div>
          );
          group ? group.push(element) : elements.push(element);
          return;
        }
      }

      // Tratamento específico para repetições
      if (line.includes("[repeat")) {
        const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
        const element = (
          <div key={index} style={{ fontWeight: "bold" }}>
            Repeat {repeatCount}x:
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Tratamento para marcação de espaço
      if (line.includes("[%%]")) {
        const element = (
          <div key={index} style={{ width: "100%", height: "2rem" }}>
            &nbsp;
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Adiciona a linha de texto ao array de elementos
      const textElement = (
        <div
          key={`lyrics-${index}`}
          style={{ whiteSpace: "pre", color: "black" }}
        >
          {line}
        </div>
      );

      if (group) {
        group.push(textElement);
      } else {
        elements.push(textElement);
      }
    });

    // Se houver um grupo aberto no final, adiciona ele aos elementos
    if (group) {
      elements.push(
        <div
          className={groupClass}
          style={{
            borderRight: "2px solid #3a3a3a",
            paddingRight: "1rem",
            position: "relative",
          }}
        >
          {group}
        </div>
      );
    }

    return elements;
  };

  function setActiveTab(file, louvor) {
    let arrayOfFile = [];

    if (file === "lyrics") {
      louvor.lyricsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
      setDisplayLyrics(true);
      setDisplayChords(false);
    } else if (file === "chords") {
      louvor.chordsPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
      setDisplayChords(true);
      setDisplayLyrics(false);
    } else if (file === "musicSheet") {
      louvor.sheetMusicPdf.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    } else if (file === "audio") {
      louvor.audioFile.map((item) => arrayOfFile.push(setUrl(item)));
      setFileArray(arrayOfFile);
    }

    // Check if the URL is already the same before navigating to avoid unnecessary reloads
    if (window.location.pathname !== `/praise/${id}/${file}`) {
      navigate(`/praise/${id}/${file}`);
    }
  }

  const setUrl = (file) =>
    "data:" + file.document.contentType + ";base64," + file.document.file;

  return (
    <ContainerPraise>
      <Header louvor={louvor} setActiveTab={setActiveTab} />
      {loading ? (
        <div className="progress-container">
          <Stack
            sx={{ color: "var(--color-dark-gray)" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      ) : (
        <div className="file-container">
          <div className="file-content">
            {fileArray.map((url, i) => (
              <img key={i} src={url} alt="praiseImg" className="file" />
            ))}
          </div>
          <div className="praise-container">
            <div className="praise-main">
              {louvor.lyrics && displayLyrics && (
                <>
                  <h1 className="praise-title">{louvor.englishTitle}</h1>
                  <div className="praise-lines-lyrics">
                    {processLyrics(louvor.lyrics)}
                  </div>
                </>
              )}
              {louvor.chords && displayChords && (
                <>
                  <h1 className="praise-title">{louvor.englishTitle}</h1>
                  <div className="praise-lines">
                    {processChords(louvor.chords)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </ContainerPraise>
  );
}

//<div className="praise-container">
//<div className="praise-main">
// <h1 className="praise-title">{louvor.englishTitle}</h1>
//  <div className="praise-lines">{processChords(louvor.chords)}</div>
//  </div>
//  </div>

// const processChords = (text) => {
//   const lines = text.split("\n"); // Divide o texto em linhas
//   const elements = [];

//   lines.forEach((line, index) => {
//     const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;
//     let lastIndex = 0;
//     let match;

//     let chordLine = "";
//     let textLine = "";

//     while ((match = regex.exec(line)) !== null) {
//       const chord = match[1];
//       const chordIndex = match.index - chordLine.replace(/\s/g, "").length;

//       chordLine = chordLine.padEnd(chordIndex, " ") + chord;
//       textLine += line.substring(lastIndex, match.index);
//       lastIndex = match.index + match[0].length;
//     }

//     textLine += line.substring(lastIndex);

//     // Mapeia tags especiais para estilos específicos
//     const specialTags = {
//       "[intro]": { label: "Intro:", color: "red", bold: true },
//       "[chorus]": { label: "Chorus:", color: "black", bold: true },
//       "[final]": { label: "Final:", color: "black", bold: true },
//     };

//     for (const tag in specialTags) {
//       if (line.includes(tag)) {
//         const { label, color, bold } = specialTags[tag];
//         elements.push(
//           <div style={{ color }}>
//             <span
//               style={{ color: "black", fontWeight: bold ? "bold" : "normal" }}
//             >
//               {label}
//             </span>
//             {chordLine}
//           </div>
//         );
//         return;
//       }
//     }

//     // Tratamento específico para repetições
//     if (line.includes("[repeat")) {
//       const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//       elements.push(
//         <div style={{ fontWeight: "bold" }}>Repeat {repeatCount}x:</div>
//       );
//       return;
//     }

//     // Tratamento para marcação de espaço
//     if (line.includes("[%%]")) {
//       elements.push(
//         <div style={{ width: "100%", height: "3rem" }}>&nbsp;</div>
//       );
//       return;
//     }

//     // Adiciona as linhas de acordes e letras ao array de elementos
//     elements.push(
//       <div
//         key={`chords-${index}`}
//         style={{ whiteSpace: "pre", color: "red" }}
//       >
//         {chordLine}
//       </div>
//     );

//     elements.push(
//       <div
//         key={`lyrics-${index}`}
//         style={{ whiteSpace: "pre", color: "black" }}
//       >
//         {textLine}
//       </div>
//     );
//   });

//   return elements;
// };
