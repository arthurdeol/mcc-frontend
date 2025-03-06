import React, { useState, useEffect } from "react";
import { ContainerPraise } from "./styles";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { FiPlus, FiMinus } from "react-icons/fi";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const FLAT_TO_SHARP = {
  Db: "C#",
  Eb: "D#",
  Fb: "E",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Cb: "B",
};

const SHARP_TO_FLAT = {
  "C#": "Db",
  "D#": "Eb",
  E: "Fb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
  B: "Cb",
};

function normalizeToFlats(chord) {
  const SHARP_TO_FLAT = {
    "A#": "Bb",
    "D#": "Eb",
  };

  const match = chord.match(/^([A-Ga-g#b]+)(.*)$/);
  if (!match) return chord;

  let [, root, suffix] = match;

  if (SHARP_TO_FLAT[root]) {
    root = SHARP_TO_FLAT[root];
  }

  return root + suffix;
}

function transposeChord(chord, steps) {
  const match = chord.match(/^([A-Ga-g#b]+)(.*)$/);
  if (!match) return chord;

  let [, root, suffix] = match;

  root = FLAT_TO_SHARP[root] || root;

  const rootIndex = NOTES.indexOf(root);
  if (rootIndex === -1) return chord;

  const newIndex = (rootIndex + steps + NOTES.length) % NOTES.length;
  let newRoot = NOTES[newIndex];

  if (Object.keys(FLAT_TO_SHARP).includes(root)) {
    newRoot = SHARP_TO_FLAT[newRoot] || newRoot;
  }

  return newRoot + suffix;
}

function transposeTextChords(text, steps) {
  const CHORD_REGEX =
    /\[([A-G][#b]?(m|M|maj7|7|sus4|sus2|dim|aug|add9|6|9|11|13|°|°7)?(?:\/[A-G][#b]?)?)\]/g;

  return text.replace(CHORD_REGEX, (match, chord) => {
    let transposedChord;

    if (chord.includes("/")) {
      const [base, bass] = chord.split("/");
      transposedChord = `${transposeChord(base, steps)}/${transposeChord(
        bass,
        steps
      )}`;
    } else {
      transposedChord = transposeChord(chord, steps);
    }

    return `[${normalizeToFlats(transposedChord)}]`;
  });
}

// function transposeTextChords(text, steps) {
//   const CHORD_REGEX =
//     /\[([A-G][#b]?(°|°7|m|M|maj7|7|sus4|sus2|dim|aug|add9|6)?(?:\/[A-G][#b]?)?)\]/g;
//   return text.replace(CHORD_REGEX, (match, chord) => {
//     if (chord.includes("/")) {
//       const [base, bass] = chord.split("/");
//       return `[${transposeChord(base, steps)}/${transposeChord(bass, steps)}]`;
//     } else {
//       return `[${transposeChord(chord, steps)}]`;
//     }
//   });
// }

export default function Praise() {
  const navigate = useNavigate();
  const { id, file } = useParams();
  const [louvor, setLouvor] = useState("");
  const [fileArray, setFileArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const [displayChords, setDisplayChords] = useState(false);
  const [displayFilesSVGFlag, setDisplayFilesSVGFlag] = useState(false);
  const [praiseKeyChord, setPraiseKeyChord] = useState(null);
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/SongBookMap/${id}/Get`;
      const response = await fetch(url);
      const louvorData = await response.json();
      const keyWithouScale = louvorData.chordsKey;

      setLouvor(louvorData);

      if (louvorData.chordsKey) {
        setCurrentKey(louvorData.chordsKey.replace(/m$/, ""));
        setPraiseKeyChord(keyWithouScale.replace(/m$/, ""));
      }

      if (louvorData) {
        setActiveTab(file, louvorData);
      } else {
        console.log("Praise not found");
      }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line
  }, [file, id]);

  function changeKey(steps) {
    const currentIndex = NOTES.indexOf(currentKey);
    if (currentIndex === -1) return;

    const newIndex = (currentIndex + steps + NOTES.length) % NOTES.length;
    setCurrentKey(NOTES[newIndex]);
  }

  function getTransposeSteps(fromKey, toKey) {
    const fromIndex = NOTES.indexOf(fromKey);
    const toIndex = NOTES.indexOf(toKey);
    if (fromIndex === -1 || toIndex === -1) return 0;
    return toIndex - fromIndex;
  }

  const transposedChords = () => {
    const steps = getTransposeSteps(praiseKeyChord, currentKey);
    return steps !== 0
      ? transposeTextChords(louvor.chords, steps)
      : louvor.chords;
  };

  const processChords = (text) => {
    if (!text) return [];

    const lines = text.split("\n");
    const elements = [];
    let group = null;
    let groupClass = "";

    lines.forEach((line, index) => {
      if (!line.trim()) return; // Ignora linhas em branco

      // Remove as tags [ . ] e [ @ ] do texto, mas preserva o formato de grupos
      const originalLine = line;
      line = line.replace(/\[\..*?\]/g, "").replace(/\[@\]/g, "");

      // const regex =
      //   /\[([A-G][#b]?(°|°7|m|M|maj7|7|sus4|sus2|dim|aug|add9|6)?(?:\/[A-G][#b]?)?)\]/g;
      const regex =
        /\[([A-G][#b]?(m|M|maj7|7|9|11|13|sus2|sus4|dim|aug|add9|6|°|°7|m7|m9|m11|m13|7#9|7b9|7#5|7b5|9#11|13b9|13#11|6\/9)?(?:\/[A-G][#b]?)?)\]/g;

      // const regex = /\[([A-G](?:#°|[#b°])?[mM\d]*(?:\/[A-G][#b°]?)?)\]/g;

      // Extrai acordes da linha e gera a linha de texto sem acordes
      const chordPositions = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        chordPositions.push({ chord: match[1], index: match.index });
      }

      let plainTextLine = line.replace(regex, ""); // Texto sem acordes
      const chordLine = Array(plainTextLine.length).fill(" ");

      chordPositions.forEach(({ chord, index }) => {
        let adjustedIndex =
          index -
          (line.substring(0, index).match(/\[.*?\]/g) || []).join("").length;
        if (adjustedIndex < 0) adjustedIndex = 0;
        chordLine.splice(adjustedIndex, chord.length, ...chord.split(""));
      });

      const chordLineString = chordLine.join("").trimEnd();

      // Verifica e controla grupos [.N] e [@]
      const groupMatch = originalLine.match(/^\[\.(\d+)\]/);
      const showNumberOfRepetition = /\[@\]/.test(originalLine);

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
        line = line.replace(/^\[\.(\d+)\]/, "").replace(/\[@\]/g, "");

        if (showNumberOfRepetition) {
          group.push(
            <span key={`repeat-${index}`} className="repetitions-number">
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

      const specialTags = {
        "[intro]": { label: "Intro:", color: "red", bold: true },
        "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
        "[chorus]": { label: "Chorus:", color: "black", bold: true },
        "[final]": { label: "Final:", color: "black", bold: true },
        "[b]": { label: "", color: "black", bold: true },
      };

      for (const tag in specialTags) {
        if (originalLine.includes(tag)) {
          const { label, color, bold } = specialTags[tag];
          const content = originalLine.replace(
            new RegExp(`\\[/?${tag.replace(/[[]]/g, "")}\\]`, "g"),
            ""
          );

          const chordsWithBrackets = (content.match(regex) || [])
            .map((chord) => chord.replace(/\[|\]/g, "")) // Remove os colchetes
            .join(" ");

          const element = (
            <div key={index} style={{ color }}>
              <span
                style={{
                  color: "black",
                  fontWeight: bold ? "bold" : "normal",
                  marginRight: "5px",

                  fontStyle: "italic",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  color: "red",

                  fontWeight: "normal",
                }}
              >
                {chordsWithBrackets}
              </span>
            </div>
          );

          group ? group.push(element) : elements.push(element);
          return;
        }
      }

      if (originalLine.includes("[repeat")) {
        const repeatCount = originalLine.match(/\[repeat (\d+)x\]/)?.[1] || "?";
        const element = (
          <div
            key={index}
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Repeat {repeatCount}x:
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      if (originalLine.includes("[%%]")) {
        const element = (
          <div key={index} style={{ width: "100%", height: "3rem" }}>
            &nbsp;
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Remover as tags especiais do texto, mas manter grupos e margin-right
      line = line.replace(/\[\..*\]/g, "").replace(/\[@\]/g, "");

      const chordElement = (
        <pre
          key={`chords-${index}`}
          style={{
            whiteSpace: "pre",
            color: "red",

            margin: 0,
            paddingBottom: "2px",
          }}
        >
          {chordLineString}
        </pre>
      );

      const textElement = (
        <pre
          key={`lyrics-${index}`}
          style={{
            whiteSpace: "pre",
            color: "black",

            margin: 0,
            paddingBottom: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {originalLine.includes("[arrowR]") && (
            <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
          )}
          {plainTextLine.replace(/\[arrow[L|R]\]/g, "")}
          {originalLine.includes("[arrowL]") && (
            <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
          )}
        </pre>
      );

      if (group) {
        group.push(chordElement, textElement);
      } else {
        elements.push(chordElement, textElement);
      }
    });

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
            <span key={`repeat-${index}`} className="repetitions-number">
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
        "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
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
                style={{
                  fontWeight: bold ? "bold" : "normal",
                  fontFamily: "arial",
                  fontStyle: "italic",
                }}
              >
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
          <div key={index} style={{ fontWeight: "bold", fontFamily: "arial" }}>
            Repeat {repeatCount}x:
          </div>
        );
        group ? group.push(element) : elements.push(element);
        return;
      }

      // Tratamento para marcação de espaço
      if (line.includes("[%%]")) {
        const element = (
          <div key={index} style={{ width: "100%", height: "1.5rem" }}>
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
          style={{
            whiteSpace: "pre",
            color: "black",
            fontFamily: "arial",
            fontWeight: "normal",
            paddingBottom: "5px",
          }}
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

  const [isNavigating, setIsNavigating] = useState(false);

  function setActiveTab(file, louvor) {
    if (isNavigating) return;

    setIsNavigating(true);

    const fileMap = {
      lyrics: louvor.lyricsPdf,
      chords: louvor.chordsPdf,
      musicSheet: louvor.sheetMusicPdf,
      audio: louvor.audioFile,
    };

    if (fileMap[file]) {
      setFileArray(fileMap[file].map(setUrl));
    }

    setDisplayLyrics(file === "lyrics");
    setDisplayChords(file === "chords");
    setDisplayFilesSVGFlag(file === "musicSheet" || louvor.filesSVGFlag);

    if (window.location.pathname !== `/praise/${id}/${file}`) {
      navigate(`/praise/${id}/${file}`);
    }

    setTimeout(() => setIsNavigating(false), 500);
  }

  function setUrl(file) {
    return `data:${file.document.contentType};base64,${file.document.file}`;
  }

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
          {displayFilesSVGFlag && (
            <div className="file-content">
              {fileArray.map((url, i) => (
                <img key={i} src={url} alt="praiseImg" className="file" />
              ))}
            </div>
          )}
          {!displayFilesSVGFlag && (
            <div className="praise-container">
              <div className="praise-main">
                {louvor.lyrics && displayLyrics && (
                  <>
                    {louvor.englishTitle.includes("(") ? (
                      <>
                        <h1 className="praise-title">
                          {louvor.englishTitle.split("(")[0].trim()}
                        </h1>
                        <h2 className="praise-title">
                          {"(" + louvor.englishTitle.split("(")[1].trim()}
                        </h2>
                      </>
                    ) : (
                      <h1 className="praise-title">{louvor.englishTitle}</h1>
                    )}
                    <div className="praise-lines-lyrics">
                      {processLyrics(louvor.lyrics)}
                    </div>
                  </>
                )}

                {louvor.chords && displayChords && (
                  <>
                    {louvor.englishTitle.includes("(") ? (
                      <>
                        <h1 className="praise-title">
                          {louvor.englishTitle.split("(")[0].trim()}
                        </h1>
                        <h2 className="praise-title">
                          {"(" + louvor.englishTitle.split("(")[1].trim()}
                        </h2>
                      </>
                    ) : (
                      <h1 className="praise-title">{louvor.englishTitle}</h1>
                    )}

                    {displayChords && louvor.chordsKey && (
                      <div className="chord-key-container">
                        <button
                          className="button-change-key"
                          style={{ marginRight: "15px" }}
                          onClick={() => changeKey(-1)}
                        >
                          <FiMinus />
                        </button>
                        <p
                          style={{
                            color: "red",
                            width: "40px",
                            textAlign: "center",
                          }}
                        >
                          <strong>
                            {louvor.chordsKey.includes("m")
                              ? currentKey + "m"
                              : currentKey}
                          </strong>
                        </p>

                        <button
                          className="button-change-key"
                          style={{ marginLeft: "15px" }}
                          onClick={() => changeKey(1)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    )}

                    <div className="praise-lines">
                      {processChords(transposedChords())}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </ContainerPraise>
  );
}

// import React, { useState, useEffect } from "react";
// import { ContainerPraise } from "./styles";
// import Header from "../../components/Header";
// import Stack from "@mui/material/Stack";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate, useParams } from "react-router-dom";
// import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

// // Mapeamento das notas para transposição
// const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// function transposeChord(chord, steps) {
//   const match = chord.match(/^([A-Ga-g#b]+)(.*)$/);
//   if (!match) return chord;

//   const [_, root, suffix] = match;
//   const rootIndex = NOTES.findIndex(
//     (n) => n === root.replace("b", "B").replace("#", "#")
//   );
//   if (rootIndex === -1) return chord;

//   const newIndex = (rootIndex + steps + NOTES.length) % NOTES.length;
//   const newRoot = NOTES[newIndex];

//   return newRoot + suffix;
// }

// function transposeTextChords(text, steps) {
//   return text.replace(
//     /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g,
//     (match, chord) => {
//       if (chord.includes("/")) {
//         const [base, bass] = chord.split("/");
//         return `[${transposeChord(base, steps)}/${transposeChord(
//           bass,
//           steps
//         )}]`;
//       } else {
//         return `[${transposeChord(chord, steps)}]`;
//       }
//     }
//   );
// }

// export default function Praise() {
//   const navigate = useNavigate();
//   const { id, file } = useParams();
//   const [louvor, setLouvor] = useState("");
//   const [fileArray, setFileArray] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [displayLyrics, setDisplayLyrics] = useState(false);
//   const [displayChords, setDisplayChords] = useState(false);
//   const [displayFilesSVGFlag, setDisplayFilesSVGFlag] = useState(
//     louvor.filesSVGFlag
//   );

//   // Adicionando estado para o tom e tom original
//   const [originalKey, setOriginalKey] = useState("C"); // Defina um valor padrão ou busque da API
//   const [selectedKey, setSelectedKey] = useState("C");

//   useEffect(() => {
//     async function fetchData() {
//       const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
//       const response = await fetch(url);
//       const louvor = await response.json();

//       setLouvor(louvor);

//       // Se tiver o campo de tom original, defina
//       if (louvor.key) {
//         setOriginalKey(louvor.key);
//         setSelectedKey(louvor.key); // Começa no tom original
//       }

//       if (louvor) {
//         setActiveTab(file, louvor);
//       } else {
//         console.log("Praise not found");
//       }
//       setLoading(false);
//     }
//     fetchData();
//   }, [file, id]);

//   function getTransposeSteps(fromKey, toKey) {
//     const fromIndex = NOTES.indexOf(fromKey);
//     const toIndex = NOTES.indexOf(toKey);
//     if (fromIndex === -1 || toIndex === -1) return 0;
//     return toIndex - fromIndex;
//   }

//   function handleKeyChange(e) {
//     setSelectedKey(e.target.value);
//   }

//   const transposedChords = () => {
//     const steps = getTransposeSteps(originalKey, selectedKey);
//     return steps !== 0
//       ? transposeTextChords(louvor.chords, steps)
//       : louvor.chords;
//   };

//   const [isNavigating, setIsNavigating] = useState(false);

//   function setActiveTab(file, louvor) {
//     if (isNavigating) return;

//     setIsNavigating(true);

//     const fileMap = {
//       lyrics: louvor.lyricsPdf,
//       chords: louvor.chordsPdf,
//       musicSheet: louvor.sheetMusicPdf,
//       audio: louvor.audioFile,
//     };

//     if (fileMap[file]) {
//       setFileArray(fileMap[file].map(setUrl));
//     }

//     setDisplayLyrics(file === "lyrics");
//     setDisplayChords(file === "chords");
//     setDisplayFilesSVGFlag(file === "musicSheet" || louvor.filesSVGFlag);

//     if (window.location.pathname !== `/praise/${id}/${file}`) {
//       navigate(`/praise/${id}/${file}`);
//     }
//     setTimeout(() => setIsNavigating(false), 500);
//   }

//   const setUrl = (file) =>
//     "data:" + file.document.contentType + ";base64," + file.document.file;

//   const processChords = (text) => {
//     if (!text) return [];

//     const lines = text.split("\n");
//     const elements = [];
//     let group = null;
//     let groupClass = "";

//     lines.forEach((line, index) => {
//       if (!line.trim()) return; // Ignora linhas em branco

//       // Remove as tags [ . ] e [ @ ] do texto, mas preserva o formato de grupos
//       const originalLine = line;
//       line = line.replace(/\[\..*?\]/g, "").replace(/\[@\]/g, "");

//       const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;

//       // Extrai acordes da linha e gera a linha de texto sem acordes
//       const chordPositions = [];
//       let match;
//       while ((match = regex.exec(line)) !== null) {
//         chordPositions.push({ chord: match[1], index: match.index });
//       }

//       let plainTextLine = line.replace(regex, ""); // Texto sem acordes
//       const chordLine = Array(plainTextLine.length).fill(" ");

//       chordPositions.forEach(({ chord, index }) => {
//         let adjustedIndex =
//           index -
//           (line.substring(0, index).match(/\[.*?\]/g) || []).join("").length;
//         if (adjustedIndex < 0) adjustedIndex = 0;
//         chordLine.splice(adjustedIndex, chord.length, ...chord.split(""));
//       });

//       const chordLineString = chordLine.join("").trimEnd();

//       // Verifica e controla grupos [.N] e [@]
//       const groupMatch = originalLine.match(/^\[\.(\d+)\]/);
//       const showNumberOfRepetition = /\[@\]/.test(originalLine);

//       if (groupMatch) {
//         if (group) {
//           elements.push(
//             <div
//               key={`group-${index}`}
//               className={groupClass}
//               style={{
//                 borderRight: "2px solid #3a3a3a",
//                 paddingRight: "1rem",
//                 position: "relative",
//               }}
//             >
//               {group}
//             </div>
//           );
//         }
//         group = [];
//         groupClass = `group-${groupMatch[1]}`;
//         line = line.replace(/^\[\.(\d+)\]/, "").replace(/\[@\]/g, "");

//         if (showNumberOfRepetition) {
//           group.push(
//             <span key={`repeat-${index}`} className="repetitions-number">
//               {groupMatch[1]}x
//             </span>
//           );
//         }
//       } else if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//             }}
//           >
//             {group}
//           </div>
//         );
//         group = null;
//         groupClass = "";
//       }

//       const specialTags = {
//         "[intro]": { label: "Intro:", color: "red", bold: true },
//         "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//         "[chorus]": { label: "Chorus:", color: "black", bold: true },
//         "[final]": { label: "Final:", color: "black", bold: true },
//         "[b]": { label: "", color: "black", bold: true },
//       };

//       for (const tag in specialTags) {
//         if (originalLine.includes(tag)) {
//           const { label, color, bold } = specialTags[tag];
//           const content = originalLine.replace(
//             new RegExp(`\\[/?${tag.replace(/[[]]/g, "")}\\]`, "g"),
//             ""
//           );

//           const chordsWithBrackets = (content.match(regex) || [])
//             .map((chord) => chord.replace(/\[|\]/g, "")) // Remove os colchetes
//             .join(" ");

//           const element = (
//             <div key={index} style={{ color }}>
//               <span
//                 style={{
//                   color: "black",
//                   fontWeight: bold ? "bold" : "normal",
//                   marginRight: "5px",

//                   fontStyle: "italic",
//                 }}
//               >
//                 {label}
//               </span>
//               <span
//                 style={{
//                   color: "red",

//                   fontWeight: "normal",
//                 }}
//               >
//                 {chordsWithBrackets}
//               </span>
//             </div>
//           );

//           group ? group.push(element) : elements.push(element);
//           return;
//         }
//       }

//       if (originalLine.includes("[repeat")) {
//         const repeatCount = originalLine.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//         const element = (
//           <div
//             key={index}
//             style={{
//               fontWeight: "bold",
//               fontStyle: "italic",
//             }}
//           >
//             Repeat {repeatCount}x:
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       if (originalLine.includes("[%%]")) {
//         const element = (
//           <div key={index} style={{ width: "100%", height: "3rem" }}>
//             &nbsp;
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Remover as tags especiais do texto, mas manter grupos e margin-right
//       line = line.replace(/\[\..*\]/g, "").replace(/\[@\]/g, "");

//       const chordElement = (
//         <pre
//           key={`chords-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "red",

//             margin: 0,
//             paddingBottom: "2px",
//           }}
//         >
//           {chordLineString}
//         </pre>
//       );

//       const textElement = (
//         <pre
//           key={`lyrics-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "black",

//             margin: 0,
//             paddingBottom: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {originalLine.includes("[arrowR]") && (
//             <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
//           )}
//           {plainTextLine.replace(/\[arrow[L|R]\]/g, "")}
//           {originalLine.includes("[arrowL]") && (
//             <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
//           )}
//         </pre>
//       );

//       if (group) {
//         group.push(chordElement, textElement);
//       } else {
//         elements.push(chordElement, textElement);
//       }
//     });

//     if (group) {
//       elements.push(
//         <div
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//             position: "relative",
//           }}
//         >
//           {group}
//         </div>
//       );
//     }

//     return elements;
//   };

//   const processLyrics = (text) => {
//     const lines = text.split("\n"); // Divide o texto em linhas
//     const elements = [];
//     let group = null;
//     let groupClass = "";

//     lines.forEach((line, index) => {
//       // Verifica se a linha começa com [.N] para iniciar um grupo
//       const groupMatch = line.match(/^\[\.(\d+)\]/);
//       const showNumberOfRepetition = /\[@\]/.test(line);

//       if (groupMatch) {
//         if (group) {
//           elements.push(
//             <div
//               key={`group-${index}`}
//               className={groupClass}
//               style={{
//                 borderRight: "2px solid #3a3a3a",
//                 paddingRight: "1rem",
//                 position: "relative",
//               }}
//             >
//               {group}
//             </div>
//           );
//         }
//         group = [];
//         groupClass = `group-${groupMatch[1]}`;
//         line = line.replace(/^\[\.(\d+)\]/, "");
//         line = line.replace(/\[@\]/g, "");

//         if (showNumberOfRepetition) {
//           group.push(
//             <span key={`repeat-${index}`} className="repetitions-number">
//               {groupMatch[1]}x
//             </span>
//           );
//         }
//       } else if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//             }}
//           >
//             {group}
//           </div>
//         );
//         group = null;
//         groupClass = "";
//       }

//       // Mapeia tags especiais para estilos específicos
//       const specialTags = {
//         "[intro]": { label: "Intro:", color: "red", bold: true },
//         "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//         "[chorus]": {
//           label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
//           color: "black",
//           bold: true,
//         },
//         "[final]": { label: "Final:", color: "black", bold: true },
//         "[b]": {
//           label: line.replace(/\[b\]/g, ""),
//           color: "black",
//           bold: true,
//         },
//       };

//       for (const tag in specialTags) {
//         if (line.includes(tag)) {
//           const { label, color, bold } = specialTags[tag];
//           const element = (
//             <div key={index} style={{ color }}>
//               <span
//                 style={{
//                   fontWeight: bold ? "bold" : "normal",
//                   fontFamily: "arial",
//                   fontStyle: "italic",
//                 }}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//           group ? group.push(element) : elements.push(element);
//           return;
//         }
//       }

//       // Tratamento específico para repetições
//       if (line.includes("[repeat")) {
//         const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//         const element = (
//           <div key={index} style={{ fontWeight: "bold", fontFamily: "arial" }}>
//             Repeat {repeatCount}x:
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Tratamento para marcação de espaço
//       if (line.includes("[%%]")) {
//         const element = (
//           <div key={index} style={{ width: "100%", height: "1.5rem" }}>
//             &nbsp;
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Adiciona a linha de texto ao array de elementos
//       const textElement = (
//         <div
//           key={`lyrics-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "black",
//             fontFamily: "arial",
//             fontWeight: "normal",
//             paddingBottom: "5px",
//           }}
//         >
//           {line}
//         </div>
//       );

//       if (group) {
//         group.push(textElement);
//       } else {
//         elements.push(textElement);
//       }
//     });

//     // Se houver um grupo aberto no final, adiciona ele aos elementos
//     if (group) {
//       elements.push(
//         <div
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//             position: "relative",
//           }}
//         >
//           {group}
//         </div>
//       );
//     }

//     return elements;
//   };

//   return (
//     <ContainerPraise>
//       <Header louvor={louvor} setActiveTab={setActiveTab} />
//       {loading ? (
//         <div className="progress-container">
//           <Stack
//             sx={{ color: "var(--color-dark-gray)" }}
//             spacing={2}
//             direction="row"
//           >
//             <CircularProgress color="inherit" />
//           </Stack>
//         </div>
//       ) : (
//         <div className="file-container">
//           {displayFilesSVGFlag && (
//             <div className="file-content">
//               {fileArray.map((url, i) => (
//                 <img key={i} src={url} alt="praiseImg" className="file" />
//               ))}
//             </div>
//           )}
//           {!displayFilesSVGFlag && (
//             <div className="praise-container">
//               <div className="praise-main">
//                 {displayChords && (
//                   <div style={{ marginBottom: "10px" }}>
//                     <label>Tom: </label>
//                     <select value={selectedKey} onChange={handleKeyChange}>
//                       {NOTES.map((note) => (
//                         <option key={note} value={note}>
//                           {note}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {louvor.lyrics && displayLyrics && (
//                   <>
//                     <h1 className="praise-title">{louvor.englishTitle}</h1>
//                     <div className="praise-lines-lyrics">
//                       {/* Mantém a função original de processLyrics */}
//                       {processLyrics(louvor.lyrics)}
//                     </div>
//                   </>
//                 )}
//                 {louvor.chords && displayChords && (
//                   <>
//                     <h1 className="praise-title">{louvor.englishTitle}</h1>
//                     <div className="praise-lines">
//                       {/* Processa os acordes transpostos */}
//                       {processChords(transposedChords())}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </ContainerPraise>
//   );
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import React, { useState, useEffect } from "react";
// import { ContainerPraise } from "./styles";
// import Header from "../../components/Header";
// import Stack from "@mui/material/Stack";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate, useParams } from "react-router-dom";
// import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

// export default function Praise() {
//   const navigate = useNavigate();
//   const { id, file } = useParams();
//   const [louvor, setLouvor] = useState("");
//   const [fileArray, setFileArray] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [displayLyrics, setDisplayLyrics] = useState(false);
//   const [displayChords, setDisplayChords] = useState(false);
//   const [displayFilesSVGFlag, setDisplayFilesSVGFlag] = useState(
//     louvor.filesSVGFlag
//   );

//   useEffect(() => {
//     async function fetchData() {
//       const url = "https://mccapi.up.railway.app/SongBookMap/" + id + "/Get";
//       const response = await fetch(url);
//       const louvor = await response.json();

//       setLouvor(louvor);
//       if (louvor) {
//         setActiveTab(file, louvor);
//       } else {
//         console.log("Praise not found");
//       }
//       setLoading(false);
//     }
//     fetchData();
//     // eslint-disable-next-line
//   }, [file]);

//   const processChords = (text) => {
//     if (!text) return [];

//     const lines = text.split("\n");
//     const elements = [];
//     let group = null;
//     let groupClass = "";

//     lines.forEach((line, index) => {
//       if (!line.trim()) return; // Ignora linhas em branco

//       // Remove as tags [ . ] e [ @ ] do texto, mas preserva o formato de grupos
//       const originalLine = line;
//       line = line.replace(/\[\..*?\]/g, "").replace(/\[@\]/g, "");

//       const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;

//       // Extrai acordes da linha e gera a linha de texto sem acordes
//       const chordPositions = [];
//       let match;
//       while ((match = regex.exec(line)) !== null) {
//         chordPositions.push({ chord: match[1], index: match.index });
//       }

//       let plainTextLine = line.replace(regex, ""); // Texto sem acordes
//       const chordLine = Array(plainTextLine.length).fill(" ");

//       chordPositions.forEach(({ chord, index }) => {
//         let adjustedIndex =
//           index -
//           (line.substring(0, index).match(/\[.*?\]/g) || []).join("").length;
//         if (adjustedIndex < 0) adjustedIndex = 0;
//         chordLine.splice(adjustedIndex, chord.length, ...chord.split(""));
//       });

//       const chordLineString = chordLine.join("").trimEnd();

//       // Verifica e controla grupos [.N] e [@]
//       const groupMatch = originalLine.match(/^\[\.(\d+)\]/);
//       const showNumberOfRepetition = /\[@\]/.test(originalLine);

//       if (groupMatch) {
//         if (group) {
//           elements.push(
//             <div
//               key={`group-${index}`}
//               className={groupClass}
//               style={{
//                 borderRight: "2px solid #3a3a3a",
//                 paddingRight: "1rem",
//                 position: "relative",
//               }}
//             >
//               {group}
//             </div>
//           );
//         }
//         group = [];
//         groupClass = `group-${groupMatch[1]}`;
//         line = line.replace(/^\[\.(\d+)\]/, "").replace(/\[@\]/g, "");

//         if (showNumberOfRepetition) {
//           group.push(
//             <span key={`repeat-${index}`} className="repetitions-number">
//               {groupMatch[1]}x
//             </span>
//           );
//         }
//       } else if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//             }}
//           >
//             {group}
//           </div>
//         );
//         group = null;
//         groupClass = "";
//       }

//       const specialTags = {
//         "[intro]": { label: "Intro:", color: "red", bold: true },
//         "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//         "[chorus]": { label: "Chorus:", color: "black", bold: true },
//         "[final]": { label: "Final:", color: "black", bold: true },
//         "[b]": { label: "", color: "black", bold: true },
//       };

//       for (const tag in specialTags) {
//         if (originalLine.includes(tag)) {
//           const { label, color, bold } = specialTags[tag];
//           const content = originalLine.replace(
//             new RegExp(`\\[/?${tag.replace(/[[]]/g, "")}\\]`, "g"),
//             ""
//           );

//           const chordsWithBrackets = (content.match(regex) || [])
//             .map((chord) => chord.replace(/\[|\]/g, "")) // Remove os colchetes
//             .join(" ");

//           const element = (
//             <div key={index} style={{ color }}>
//               <span
//                 style={{
//                   color: "black",
//                   fontWeight: bold ? "bold" : "normal",
//                   marginRight: "5px",

//                   fontStyle: "italic",
//                 }}
//               >
//                 {label}
//               </span>
//               <span
//                 style={{
//                   color: "red",

//                   fontWeight: "normal",
//                 }}
//               >
//                 {chordsWithBrackets}
//               </span>
//             </div>
//           );

//           group ? group.push(element) : elements.push(element);
//           return;
//         }
//       }

//       if (originalLine.includes("[repeat")) {
//         const repeatCount = originalLine.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//         const element = (
//           <div
//             key={index}
//             style={{
//               fontWeight: "bold",
//               fontStyle: "italic",
//             }}
//           >
//             Repeat {repeatCount}x:
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       if (originalLine.includes("[%%]")) {
//         const element = (
//           <div key={index} style={{ width: "100%", height: "3rem" }}>
//             &nbsp;
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Remover as tags especiais do texto, mas manter grupos e margin-right
//       line = line.replace(/\[\..*\]/g, "").replace(/\[@\]/g, "");

//       const chordElement = (
//         <pre
//           key={`chords-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "red",

//             margin: 0,
//             paddingBottom: "2px",
//           }}
//         >
//           {chordLineString}
//         </pre>
//       );

//       const textElement = (
//         <pre
//           key={`lyrics-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "black",

//             margin: 0,
//             paddingBottom: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {originalLine.includes("[arrowR]") && (
//             <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
//           )}
//           {plainTextLine.replace(/\[arrow[L|R]\]/g, "")}
//           {originalLine.includes("[arrowL]") && (
//             <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
//           )}
//         </pre>
//       );

//       if (group) {
//         group.push(chordElement, textElement);
//       } else {
//         elements.push(chordElement, textElement);
//       }
//     });

//     if (group) {
//       elements.push(
//         <div
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//             position: "relative",
//           }}
//         >
//           {group}
//         </div>
//       );
//     }

//     return elements;
//   };

//   const processLyrics = (text) => {
//     const lines = text.split("\n"); // Divide o texto em linhas
//     const elements = [];
//     let group = null;
//     let groupClass = "";

//     lines.forEach((line, index) => {
//       // Verifica se a linha começa com [.N] para iniciar um grupo
//       const groupMatch = line.match(/^\[\.(\d+)\]/);
//       const showNumberOfRepetition = /\[@\]/.test(line);

//       if (groupMatch) {
//         if (group) {
//           elements.push(
//             <div
//               key={`group-${index}`}
//               className={groupClass}
//               style={{
//                 borderRight: "2px solid #3a3a3a",
//                 paddingRight: "1rem",
//                 position: "relative",
//               }}
//             >
//               {group}
//             </div>
//           );
//         }
//         group = [];
//         groupClass = `group-${groupMatch[1]}`;
//         line = line.replace(/^\[\.(\d+)\]/, "");
//         line = line.replace(/\[@\]/g, "");

//         if (showNumberOfRepetition) {
//           group.push(
//             <span key={`repeat-${index}`} className="repetitions-number">
//               {groupMatch[1]}x
//             </span>
//           );
//         }
//       } else if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//             }}
//           >
//             {group}
//           </div>
//         );
//         group = null;
//         groupClass = "";
//       }

//       // Mapeia tags especiais para estilos específicos
//       const specialTags = {
//         "[intro]": { label: "Intro:", color: "red", bold: true },
//         "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//         "[chorus]": {
//           label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
//           color: "black",
//           bold: true,
//         },
//         "[final]": { label: "Final:", color: "black", bold: true },
//         "[b]": {
//           label: line.replace(/\[b\]/g, ""),
//           color: "black",
//           bold: true,
//         },
//       };

//       for (const tag in specialTags) {
//         if (line.includes(tag)) {
//           const { label, color, bold } = specialTags[tag];
//           const element = (
//             <div key={index} style={{ color }}>
//               <span
//                 style={{
//                   fontWeight: bold ? "bold" : "normal",
//                   fontFamily: "arial",
//                   fontStyle: "italic",
//                 }}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//           group ? group.push(element) : elements.push(element);
//           return;
//         }
//       }

//       // Tratamento específico para repetições
//       if (line.includes("[repeat")) {
//         const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//         const element = (
//           <div key={index} style={{ fontWeight: "bold", fontFamily: "arial" }}>
//             Repeat {repeatCount}x:
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Tratamento para marcação de espaço
//       if (line.includes("[%%]")) {
//         const element = (
//           <div key={index} style={{ width: "100%", height: "1.5rem" }}>
//             &nbsp;
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }

//       // Adiciona a linha de texto ao array de elementos
//       const textElement = (
//         <div
//           key={`lyrics-${index}`}
//           style={{
//             whiteSpace: "pre",
//             color: "black",
//             fontFamily: "arial",
//             fontWeight: "normal",
//             paddingBottom: "5px",
//           }}
//         >
//           {line}
//         </div>
//       );

//       if (group) {
//         group.push(textElement);
//       } else {
//         elements.push(textElement);
//       }
//     });

//     // Se houver um grupo aberto no final, adiciona ele aos elementos
//     if (group) {
//       elements.push(
//         <div
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//             position: "relative",
//           }}
//         >
//           {group}
//         </div>
//       );
//     }

//     return elements;
//   };

//   const [isNavigating, setIsNavigating] = useState(false);

//   function setActiveTab(file, louvor) {
//     if (isNavigating) return;

//     setIsNavigating(true);

//     const fileMap = {
//       lyrics: louvor.lyricsPdf,
//       chords: louvor.chordsPdf,
//       musicSheet: louvor.sheetMusicPdf,
//       audio: louvor.audioFile,
//     };

//     if (fileMap[file]) {
//       setFileArray(fileMap[file].map(setUrl));
//     }

//     setDisplayLyrics(file === "lyrics");
//     setDisplayChords(file === "chords");
//     setDisplayFilesSVGFlag(file === "musicSheet" || louvor.filesSVGFlag);

//     if (window.location.pathname !== `/praise/${id}/${file}`) {
//       navigate(`/praise/${id}/${file}`);
//     }
//     setTimeout(() => setIsNavigating(false), 500);
//   }

//   const setUrl = (file) =>
//     "data:" + file.document.contentType + ";base64," + file.document.file;

//   return (
//     <ContainerPraise>
//       <Header louvor={louvor} setActiveTab={setActiveTab} />
//       {loading ? (
//         <div className="progress-container">
//           <Stack
//             sx={{ color: "var(--color-dark-gray)" }}
//             spacing={2}
//             direction="row"
//           >
//             <CircularProgress color="inherit" />
//           </Stack>
//         </div>
//       ) : (
//         <div className="file-container">
//           {displayFilesSVGFlag && (
//             <div className="file-content">
//               {fileArray.map((url, i) => (
//                 <img key={i} src={url} alt="praiseImg" className="file" />
//               ))}
//             </div>
//           )}
//           {!displayFilesSVGFlag && (
//             <div className="praise-container">
//               <div className="praise-main">
//                 {louvor.lyrics && displayLyrics && (
//                   <>
//                     {louvor.englishTitle.includes("(") ? (
//                       <>
//                         <h1 className="praise-title">
//                           {louvor.englishTitle.split("(")[0].trim()}
//                         </h1>
//                         <h2 className="praise-title">
//                           {"(" + louvor.englishTitle.split("(")[1].trim()}
//                         </h2>
//                       </>
//                     ) : (
//                       <h1 className="praise-title">{louvor.englishTitle}</h1>
//                     )}
//                     <div className="praise-lines-lyrics">
//                       {processLyrics(louvor.lyrics)}
//                     </div>
//                   </>
//                 )}
//                 {louvor.chords && displayChords && (
//                   <>
//                     {louvor.englishTitle.includes("(") ? (
//                       <>
//                         <h1 className="praise-title">
//                           {louvor.englishTitle.split("(")[0].trim()}
//                         </h1>
//                         <h2 className="praise-title">
//                           {"(" + louvor.englishTitle.split("(")[1].trim()}
//                         </h2>
//                       </>
//                     ) : (
//                       <h1 className="praise-title">{louvor.englishTitle}</h1>
//                     )}

//                     <div className="praise-lines">
//                       {processChords(louvor.chords)}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </ContainerPraise>
//   );
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function setActiveTab(file, louvor) {
//   let arrayOfFile = [];

//   if (file === "lyrics") {
//     louvor.lyricsPdf.map((item) => arrayOfFile.push(setUrl(item)));
//     setFileArray(arrayOfFile);
//     setDisplayLyrics(true);
//     setDisplayChords(false);
//     setDisplayFilesSVGFlag(louvor.filesSVGFlag);
//   } else if (file === "chords") {
//     louvor.chordsPdf.map((item) => arrayOfFile.push(setUrl(item)));
//     setFileArray(arrayOfFile);
//     setDisplayChords(true);
//     setDisplayLyrics(false);
//     setDisplayFilesSVGFlag(louvor.filesSVGFlag);
//   } else if (file === "musicSheet") {
//     louvor.sheetMusicPdf.map((item) => arrayOfFile.push(setUrl(item)));
//     setFileArray(arrayOfFile);
//     setDisplayLyrics(false);
//     setDisplayChords(false);
//     setDisplayFilesSVGFlag(true);
//   } else if (file === "audio") {
//     louvor.audioFile.map((item) => arrayOfFile.push(setUrl(item)));
//     setFileArray(arrayOfFile);
//   }

//   // Check if the URL is already the same before navigating to avoid unnecessary reloads
//   if (window.location.pathname !== `/praise/${id}/${file}`) {
//     navigate(`/praise/${id}/${file}`);
//   }
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function setActiveTab(file, louvor) {
//   const fileMap = {
//     lyrics: louvor.lyricsPdf,
//     chords: louvor.chordsPdf,
//     musicSheet: louvor.sheetMusicPdf,
//     audio: louvor.audioFile,
//   };

//   if (fileMap[file]) {
//     setFileArray(fileMap[file].map(setUrl));
//   }

//   setDisplayLyrics(file === "lyrics");
//   setDisplayChords(file === "chords");
//   setDisplayFilesSVGFlag(file === "musicSheet" || louvor.filesSVGFlag);

//   if (window.location.pathname !== `/praise/${id}/${file}`) {
//     navigate(`/praise/${id}/${file}`);
//   }
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const processChords = (text) => {
//   const lines = text.split("\n"); // Divide o texto em linhas
//   const elements = [];
//   let group = null;
//   let groupClass = "";

//   lines.forEach((line, index) => {
//     const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;

//     let chordLine = "";
//     let textLine = "";
//     let lastIndex = 0;
//     let match = null;

//     // Inicializa chordLine como uma string de espaços do mesmo comprimento da linha
//     chordLine = " ".repeat(line.length);

//     const groupMatch = line.match(/^\[\.(\d+)\]/);
//     const showNumberOfRepetition = /\[@\]/.test(line);

//     if (groupMatch) {
//       if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//               position: "relative",
//             }}
//           >
//             {group}
//           </div>
//         );
//       }
//       group = [];
//       groupClass = `group-${groupMatch[1]}`;
//       line = line.replace(/^\[\.(\d+)\]/, "").replace(/\[@\]/g, "");

//       if (showNumberOfRepetition) {
//         group.push(
//           <span
//             key={`repeat-${index}`}
//             style={{ position: "absolute", right: "-30px", color: "black" }}
//           >
//             {groupMatch[1]}x
//           </span>
//         );
//       }
//     } else if (group) {
//       elements.push(
//         <div
//           key={`group-${index}`}
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//           }}
//         >
//           {group}
//         </div>
//       );
//       group = null;
//       groupClass = "";
//     }

//     let adjustedLine = line;
//     let chordOffset = 0;

//     // Processa cada acorde na linha
//     while ((match = regex.exec(line)) !== null) {
//       const chord = match[1];
//       const start = match.index - chordOffset;

//       // Posiciona o acorde em chordLine (mesma posição do colchete inicial)
//       chordLine =
//         chordLine.substring(0, start) +
//         chord +
//         chordLine.substring(start + chord.length);

//       // Remove o acorde da linha de texto real, mas ajusta a posição
//       adjustedLine =
//         adjustedLine.substring(0, start) +
//         adjustedLine.substring(start + match[0].length);

//       chordOffset += match[0].length - chord.length;
//     }

//     textLine = adjustedLine;

//     // Mapeia tags especiais para estilos específicos
//     const specialTags = {
//       "[intro]": { label: "Intro:", color: "red", bold: true },
//       "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//       "[chorus]": {
//         label: `Chorus: ${adjustedLine.replace(/\[\/?chorus\]/g, "")}`,
//         color: "black",
//         bold: true,
//       },
//       "[final]": { label: "Final:", color: "black", bold: true },
//       "[b]": {
//         label: adjustedLine.replace(/\[b\]/g, ""),
//         color: "black",
//         bold: true,
//       },
//     };

//     for (const tag in specialTags) {
//       if (line.includes(tag)) {
//         const { label, color, bold } = specialTags[tag];
//         const element = (
//           <div key={index} style={{ color }}>
//             <span
//               style={{ color: "black", fontWeight: bold ? "bold" : "normal" }}
//             >
//               {label}
//             </span>
//             {chordLine}
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }
//     }

//     if (line.includes("[repeat")) {
//       const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//       const element = (
//         <div key={index} style={{ fontWeight: "bold" }}>
//           Repeat {repeatCount}x:
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     if (line.includes("[%%]")) {
//       const element = (
//         <div key={index} style={{ width: "100%", height: "3rem" }}>
//           &nbsp;
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     const chordElement = (
//       <div
//         key={`chords-${index}`}
//         style={{
//           whiteSpace: "pre",
//           color: "red",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//         }}
//       >
//         {chordLine}
//       </div>
//     );

//     const textElement = (
//       <div
//         key={`lyrics-${index}`}
//         style={{
//           whiteSpace: "pre",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//           color: "black",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         {line.includes("[arrowR]") && (
//           <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
//         )}
//         {textLine.replace(/\[arrow[L|R]\]/g, "")}
//         {line.includes("[arrowL]") && (
//           <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
//         )}
//       </div>
//     );

//     if (group) {
//       group.push(chordElement, textElement);
//     } else {
//       elements.push(chordElement, textElement);
//     }
//   });

//   if (group) {
//     elements.push(
//       <div
//         className={groupClass}
//         style={{
//           borderRight: "2px solid #3a3a3a",
//           paddingRight: "1rem",
//           position: "relative",
//         }}
//       >
//         {group}
//       </div>
//     );
//   }

//   return elements;
// };

//   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VERSAO COM TODAS AS TAGS MAS O ACORDE NAO FICA NO LUGAR CERTO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// const processChords = (text) => {
//   const lines = text.split("\n"); // Divide o texto em linhas
//   const elements = [];
//   let group = null;
//   let groupClass = "";

//   lines.forEach((line, index) => {
//     const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;
//     let lastIndex = 0;
//     let match;

//     let chordLine = "";
//     let textLine = "";

//     // Verifica se a linha começa com [.N] para iniciar um grupo
//     const groupMatch = line.match(/^\[\.(\d+)\]/);
//     const showNumberOfRepetition = /\[@\]/.test(line);

//     if (groupMatch) {
//       if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//               position: "relative",
//             }}
//           >
//             {group}
//           </div>
//         );
//       }
//       group = [];
//       groupClass = `group-${groupMatch[1]}`;
//       line = line.replace(/^\[\.(\d+)\]/, "");
//       line = line.replace(/\[@\]/g, "");

//       if (showNumberOfRepetition) {
//         group.push(
//           <span
//             key={`repeat-${index}`}
//             style={{
//               position: "absolute",
//               right: "-30px",
//               color: "black",
//             }}
//           >
//             {groupMatch[1]}x
//           </span>
//         );
//       }
//     } else if (group) {
//       elements.push(
//         <div
//           key={`group-${index}`}
//           className={groupClass}
//           style={{
//             borderRight: "2px solid #3a3a3a",
//             paddingRight: "1rem",
//           }}
//         >
//           {group}
//         </div>
//       );
//       group = null;
//       groupClass = "";
//     }

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
//       "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//       "[chorus]": {
//         label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
//         color: "black",
//         bold: true,
//       },
//       "[final]": { label: "Final:", color: "black", bold: true },
//       "[b]": {
//         label: line.replace(/\[b\]/g, ""),
//         color: "black",
//         bold: true,
//       },
//     };

//     for (const tag in specialTags) {
//       if (line.includes(tag)) {
//         const { label, color, bold } = specialTags[tag];
//         const element = (
//           <div key={index} style={{ color }}>
//             <span
//               style={{ color: "black", fontWeight: bold ? "bold" : "normal" }}
//             >
//               {label}
//             </span>
//             {chordLine}
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }
//     }

//     // Tratamento específico para repetições
//     if (line.includes("[repeat")) {
//       const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//       const element = (
//         <div key={index} style={{ fontWeight: "bold" }}>
//           Repeat {repeatCount}x:
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     // Tratamento para marcação de espaço
//     if (line.includes("[%%]")) {
//       const element = (
//         <div key={index} style={{ width: "100%", height: "3rem" }}>
//           &nbsp;
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     // Adiciona as linhas de acordes e letras ao array de elementos
//     const chordElement = (
//       <div
//         key={`chords-${index}`}
//         style={{
//           whiteSpace: "pre",
//           color: "red",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//         }}
//       >
//         {chordLine}
//       </div>
//     );

//     const textElement = (
//       <div
//         key={`lyrics-${index}`}
//         style={{
//           whiteSpace: "pre",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//           color: "black",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         {line.includes("[arrowR]") && (
//           <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
//         )}
//         {textLine.replace(/\[arrow[L|R]\]/g, "")}
//         {line.includes("[arrowL]") && (
//           <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
//         )}
//       </div>
//     );

//     if (group) {
//       group.push(chordElement, textElement);
//     } else {
//       elements.push(chordElement, textElement);
//     }
//   });

//   // Se houver um grupo aberto no final, adiciona ele aos elementos
//   if (group) {
//     elements.push(
//       <div
//         className={groupClass}
//         style={{
//           borderRight: "2px solid #3a3a3a",
//           paddingRight: "1rem",
//           position: "relative",
//         }}
//       >
//         {group}
//       </div>
//     );
//   }

//   return elements;
// };

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VERSAO COM OS O LUGAR CERTO MAS DESCONFIGUROU AS TAGS ESPECIAIS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const processChords = (text) => {
//   if (!text) return [];

//   const lines = text.split("\n");
//   const elements = [];
//   let group = null;
//   let groupClass = "";

//   lines.forEach((line, index) => {
//     if (!line.trim()) return; // Ignora linhas em branco

//     const regex = /\[([A-G][#b]?[mM\d]*(?:\/[A-G][#b]?)?)\]/g;

//     const chordPositions = [];
//     let match;
//     while ((match = regex.exec(line)) !== null) {
//       chordPositions.push({ chord: match[1], index: match.index });
//     }

//     let plainTextLine = line.replace(regex, ""); // Linha sem acordes
//     const chordLine = Array(plainTextLine.length).fill(" "); // Inicia linha de acordes vazia

//     chordPositions.forEach(({ chord, index }) => {
//       let adjustedIndex =
//         index -
//         (line.substring(0, index).match(/\[.*?\]/g) || []).join("").length;
//       if (adjustedIndex < 0) adjustedIndex = 0;
//       chordLine.splice(adjustedIndex, chord.length, ...chord.split(""));
//     });

//     const chordLineString = chordLine.join("").trimEnd();

//     // Verifica e controla grupos [.N] e [@]
//     const groupMatch = line.match(/^\[\.(\d+)\]/);
//     const showNumberOfRepetition = /\[@\]/.test(line);

//     if (groupMatch) {
//       if (group) {
//         elements.push(
//           <div
//             key={`group-${index}`}
//             className={groupClass}
//             style={{
//               borderRight: "2px solid #3a3a3a",
//               paddingRight: "1rem",
//               position: "relative",
//             }}
//           >
//             {group}
//           </div>
//         );
//       }
//       group = [];
//       groupClass = `group-${groupMatch[1]}`;
//       line = line.replace(/^\[\.(\d+)\]/, "").replace(/\[@\]/g, "");

//       if (showNumberOfRepetition) {
//         group.push(
//           <span
//             key={`repeat-${index}`}
//             style={{ position: "absolute", right: "-30px", color: "black" }}
//           >
//             {groupMatch[1]}x
//           </span>
//         );
//       }
//     } else if (group) {
//       elements.push(
//         <div
//           key={`group-${index}`}
//           className={groupClass}
//           style={{ borderRight: "2px solid #3a3a3a", paddingRight: "1rem" }}
//         >
//           {group}
//         </div>
//       );
//       group = null;
//       groupClass = "";
//     }

//     const specialTags = {
//       "[intro]": { label: "Intro:", color: "red", bold: true },
//       "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
//       "[chorus]": { label: "Chorus:", color: "black", bold: true },
//       "[final]": { label: "Final:", color: "black", bold: true },
//       "[b]": { label: "", color: "black", bold: true },
//     };

//     for (const tag in specialTags) {
//       if (line.includes(tag)) {
//         const { label, color, bold } = specialTags[tag];
//         const content = line.replace(
//           new RegExp(`\\[/?${tag.replace(/[\[\]]/g, "")}\\]`, "g"),
//           ""
//         );
//         const element = (
//           <div key={index} style={{ color }}>
//             {/* <span style={{ fontWeight: bold ? "bold" : "normal" }}>
//               {label} {content}
//             </span> */}
//             <span
//               style={{ color: "black", fontWeight: bold ? "bold" : "normal" }}
//             >
//               {label}
//             </span>
//             {content}
//           </div>
//         );
//         group ? group.push(element) : elements.push(element);
//         return;
//       }
//     }

//     if (line.includes("[repeat")) {
//       const repeatCount = line.match(/\[repeat (\d+)x\]/)?.[1] || "?";
//       const element = (
//         <div key={index} style={{ fontWeight: "bold" }}>
//           Repeat {repeatCount}x:
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     if (line.includes("[%%]")) {
//       const element = (
//         <div key={index} style={{ width: "100%", height: "3rem" }}>
//           &nbsp;
//         </div>
//       );
//       group ? group.push(element) : elements.push(element);
//       return;
//     }

//     const chordElement = (
//       <pre
//         key={`chords-${index}`}
//         style={{
//           whiteSpace: "pre",
//           color: "red",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//           margin: 0,
//           marginBottom: "2px",
//         }}
//       >
//         {chordLineString}
//       </pre>
//     );

//     const textElement = (
//       <pre
//         key={`lyrics-${index}`}
//         style={{
//           whiteSpace: "pre",
//           color: "black",
//           fontFamily: "monospace",
//           fontWeight: "normal",
//           margin: 0,
//           marginBottom: "5px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         {line.includes("[arrowR]") && (
//           <HiArrowCircleRight color="red" style={{ marginRight: "2px" }} />
//         )}
//         {plainTextLine.replace(/\[arrow[L|R]\]/g, "")}
//         {line.includes("[arrowL]") && (
//           <HiArrowCircleLeft color="red" style={{ marginLeft: "2px" }} />
//         )}
//       </pre>
//     );

//     if (group) {
//       group.push(chordElement, textElement);
//     } else {
//       elements.push(chordElement, textElement);
//     }
//   });

//   if (group) {
//     elements.push(
//       <div
//         className={groupClass}
//         style={{
//           borderRight: "2px solid #3a3a3a",
//           paddingRight: "1rem",
//           position: "relative",
//         }}
//       >
//         {group}
//       </div>
//     );
//   }

//   return elements;
// };
