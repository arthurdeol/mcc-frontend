import React, { useState, useEffect } from "react";
import { ContainerPraise } from "./styles";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { FiPlus, FiMinus, FiColumns } from "react-icons/fi";
import { LuListEnd } from "react-icons/lu";

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
  const takeSentServiceListId = localStorage.getItem("sentServiceListId");
  const navPath = window.location.pathname?.toString();
  const isPathPraise = navPath.indexOf("/praise/") !== -1;
  const [praiseChordsFirstPart, setPraiseChordsFirstPart] = useState("");
  const [praiseChordsSecondPart, setPraiseChordsSecondPart] = useState("");
  const [praiseLyricsFirstPart, setPraiseLyricsFirstPart] = useState("");
  const [praiseLyricsSecondPart, setPraiseLyricsSecondPart] = useState("");
  const [splitTextLyrics, setSplitTextLyrics] = useState(false);
  const [splitTextChords, setSplitTextChords] = useState(false);
  const [constainsBreakLyrics, setContainsBreakLyrics] = useState(false);
  const [constainsBreakChords, setContainsBreakChords] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/SongBookMap/${id}/Get`;
      const response = await fetch(url);
      const louvorData = await response.json();
      const keyWithouScale = louvorData.chordsKey;

      setLouvor(louvorData);

      if (louvorData.chords) {
        const textChords = louvorData.chords;
        const textChordsDevided = textChords.split("[break]");

        if (textChordsDevided.length > 1) {
          setPraiseChordsFirstPart(textChordsDevided[0]);
          setPraiseChordsSecondPart(textChordsDevided[1]);
          setContainsBreakChords(true);
        } else {
          setPraiseChordsFirstPart(textChordsDevided[0]);
          setPraiseChordsSecondPart("");
        }
      }

      if (louvorData.lyrics) {
        const textLyrics = louvorData.lyrics;
        const textLyricsDevided = textLyrics.split("[break]");

        if (textLyricsDevided.length > 1) {
          setPraiseLyricsFirstPart(textLyricsDevided[0]);
          setPraiseLyricsSecondPart(textLyricsDevided[1]);
          setContainsBreakLyrics(true);
        } else {
          setPraiseLyricsFirstPart(textLyricsDevided[0]);
          setPraiseLyricsSecondPart("");
        }
      }

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

  const NOTES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

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
    // const CHORD_REGEX =
    //   /\[([A-G][#b]?(?:m|M|maj7|7|9|11|13|sus4|sus2|dim|aug|add9|6|°|°7|m7|m9|m11|m13|7#9|7b9|7#5|7b5|9#11|13b9|13#11|6\/9)?(?:\(\d+\))?(?:\/[A-G][#b]?)?)\]/g;
    const CHORD_REGEX = /\[([A-G][#b]?[a-zA-Z0-9#/°()+]*)\]/g;

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

  const transposedChords = (text) => {
    if (!text) text = louvor.chords;
    const steps = getTransposeSteps(praiseKeyChord, currentKey);
    return steps !== 0 ? transposeTextChords(text, steps) : text;
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
      //   /\[([A-G][#b]?(?:m|M|maj7|7|9|11|13|sus2|sus4|dim|aug|add9|6|°|°7|m7|m9|m11|m13|7#9|7b9|7#5|7b5|9#11|13b9|13#11|6\/9)?(?:\(\d+\))?(?:\/[A-G][#b]?)?)\]/g;
      const regex = /\[([A-G][#b]?[a-zA-Z0-9#/°()+]*)\]/g;

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
                borderRight: "1.5px solid #3a3a3a",
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
        if (showNumberOfRepetition) {
          group.push(
            <span
              key={`repeat-${index}-${Math.random()}`}
              className={
                splitTextChords
                  ? "repetitions-number-chords"
                  : "repetitions-number-chords-not-splitted"
              }
            >
              {groupMatch[1]}x
            </span>
          );
        }
      } else if (group) {
        elements.push(
          <div
            key={`group-final-${index}-${Math.random()}`}
            className={groupClass}
            style={{
              borderRight: "1.5px solid #3a3a3a",
              paddingRight: "1rem",
              position: "relative",
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
        "[instrumental]": { label: "Instr:", color: "red", bold: true },
        "[chorus]": {
          label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
          color: "black",
          bold: true,
        },
        "[final]": { label: "Final:", color: "black", bold: true },
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
          <div
            key={index}
            className={
              splitTextChords
                ? "space-blanck-chords-splitted"
                : "space-blanck-chords"
            }
          >
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
          {originalLine.includes("[b]") ? (
            <b>
              {plainTextLine
                .replace(/\[arrow[L|R]\]/g, "")
                .replace(/\[b\]/g, "")}
            </b>
          ) : originalLine.includes("[M]") ? (
            <>
              <b>M:</b>
              {plainTextLine.replace(/\[M\]/g, "")}
            </>
          ) : originalLine.includes("[W]") ? (
            <>
              <b>W:</b>
              {plainTextLine.replace(/\[W\]/g, "")}
            </>
          ) : (
            plainTextLine.replace(/\[arrow[L|R]\]/g, "")
          )}
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
          key={`special-${Math.random()}`}
          className={groupClass}
          style={{
            borderRight: "1.5px solid #3a3a3a",
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
                borderRight: "1.5px solid #3a3a3a",
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
              className={
                splitTextLyrics
                  ? "repetitions-number"
                  : "repetitions-number-not-splitted"
              }
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
              borderRight: "1.5px solid #3a3a3a",
              paddingRight: "1rem",
              position: "relative",
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
        "[instrumental]": {
          label: "Instrumental",
          color: "black",
          bold: true,
        },
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
        "[M]": {
          label: `M:`,
          color: "black",
          bold: true,
          italic: false,
          content: line.replace(/\[M\]/g, ""),
        },
        "[W]": {
          label: `W:`,
          color: "black",
          bold: true,
          italic: false,
          content: line.replace(/\[W\]/g, ""),
        },
      };

      for (const tag in specialTags) {
        if (line.includes(tag)) {
          const { label, color, bold, italic, content } = specialTags[tag];
          const element = (
            <div key={index} style={{ color }}>
              <span
                style={{
                  fontWeight: bold ? "bold" : "normal",
                  fontFamily: "arial",
                  fontStyle: italic ? "italic" : "normal",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontWeight: "normal",
                  fontFamily: "arial",
                  fontStyle: "normal",
                }}
              >
                {content}
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
          key={`special-${Math.random()}`}
          className={groupClass}
          style={{
            borderRight: "1.5px solid #3a3a3a",
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
      gestures: louvor.gesturesFile,
    };

    if (fileMap[file]) {
      setFileArray(fileMap[file].map(setUrl));
    }

    setDisplayLyrics(file === "lyrics");
    setDisplayChords(file === "chords");

    const shouldDisplay = {
      musicSheet: true,
      gestures: true,
      lyrics: !louvor.flagLyrics,
      chords: !louvor.flagChords,
    };

    setDisplayFilesSVGFlag(shouldDisplay[file] ?? false);

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
          <div className="top-right-buttons">
            {/* -------------- BUTTON TO SPLIT THE PRAISE ------------------------*/}
            {displayLyrics && constainsBreakLyrics && (
              <div
                className="button-to-split"
                onClick={() => setSplitTextLyrics(!splitTextLyrics)}
              >
                <FiColumns size={20} color="var(--color-black)" />
              </div>
            )}
            {displayChords && constainsBreakChords && (
              <div
                className="button-to-split"
                onClick={() => setSplitTextChords(!splitTextChords)}
              >
                <FiColumns size={20} color="var(--color-black)" />
              </div>
            )}

            {/* ----------------Return to Service List------------------ */}
            {localStorage.getItem("sentServiceListId") && isPathPraise && (
              <div
                className="button-to-service-list"
                onClick={() =>
                  navigate(`/shared-praises-list/${takeSentServiceListId}`)
                }
              >
                <LuListEnd size={20} color="var(--color-black)" />
              </div>
            )}
          </div>
          {/* --------------------CHANGE CHORD KEY--------------------------------*/}
          {displayChords && louvor.chordsKey && !displayFilesSVGFlag && (
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

          {/* -------------------------- File SVG ------------------------------ */}
          {displayFilesSVGFlag && (
            <div className="file-content">
              {fileArray.map((url, i) => (
                <img key={i} src={url} alt="praiseImg" className="file" />
              ))}
            </div>
          )}

          {/* -------------------------- Praise in Text ------------------------------ */}
          {!displayFilesSVGFlag && (
            <div className="praise-container">
              <div
                className={`praise-main ${
                  displayLyrics ? "large-text" : "small-text"
                }`}
              >
                {louvor.lyrics && displayLyrics && (
                  <>
                    {louvor.englishTitle.includes("(") ? (
                      <>
                        <h1
                          className={
                            splitTextLyrics
                              ? "lyrics-praise-title"
                              : "lyrics-praise-title-not-splitted"
                          }
                        >
                          {louvor.englishSongBookNumber
                            ? louvor.englishSongBookNumber + " - "
                            : ""}
                          {louvor.englishTitle.split("(")[0].trim()}
                        </h1>
                        <h2
                          className={
                            splitTextLyrics
                              ? "lyrics-praise-title"
                              : "lyrics-praise-title-not-splitted"
                          }
                        >
                          {"(" + louvor.englishTitle.split("(")[1].trim()}
                        </h2>
                      </>
                    ) : (
                      <h1
                        className={
                          splitTextLyrics
                            ? "lyrics-praise-title"
                            : "lyrics-praise-title-not-splitted"
                        }
                      >
                        {louvor.englishSongBookNumber
                          ? louvor.englishSongBookNumber + " - "
                          : ""}
                        {louvor.englishTitle}
                      </h1>
                    )}
                    {louvor.portugueseTitle && (
                      <h3
                        className={
                          splitTextLyrics
                            ? "lyrics-praise-title-portuguese"
                            : "lyrics-praise-title-portuguese-not-splitted"
                        }
                      >
                        {louvor.portugueseSongBookNumber
                          ? louvor.portugueseSongBookNumber + " - "
                          : ""}
                        {louvor.portugueseTitle}
                      </h3>
                    )}

                    <div
                      className={
                        splitTextLyrics ? "praise-lines-container" : ""
                      }
                    >
                      <div className="praise-lines-lyrics">
                        {processLyrics(praiseLyricsFirstPart)}
                      </div>
                      {constainsBreakLyrics && (
                        <div className="praise-lines-lyrics">
                          {processLyrics(praiseLyricsSecondPart)}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {louvor.chords && displayChords && (
                  <>
                    {louvor.englishTitle.includes("(") ? (
                      <>
                        <h1
                          className={
                            splitTextChords
                              ? "praise-title"
                              : "praise-title-not-splitted"
                          }
                        >
                          {louvor.englishSongBookNumber
                            ? louvor.englishSongBookNumber + " - "
                            : ""}
                          {louvor.englishTitle.split("(")[0].trim()}
                        </h1>
                        <h2
                          className={
                            splitTextChords
                              ? "praise-title"
                              : "praise-title-not-splitted"
                          }
                        >
                          {"(" + louvor.englishTitle.split("(")[1].trim()}
                        </h2>
                      </>
                    ) : (
                      <>
                        <h1
                          className={
                            splitTextChords
                              ? "praise-title"
                              : "praise-title-not-splitted"
                          }
                        >
                          {louvor.englishSongBookNumber
                            ? louvor.englishSongBookNumber + " - "
                            : ""}
                          {louvor.englishTitle}
                        </h1>
                      </>
                    )}
                    {louvor.portugueseTitle && (
                      <h3
                        className={
                          splitTextChords
                            ? "praise-title-portuguese"
                            : "praise-title-portuguese-not-splitted"
                        }
                      >
                        {louvor.portugueseSongBookNumber
                          ? louvor.portugueseSongBookNumber + " - "
                          : ""}
                        {louvor.portugueseTitle}
                      </h3>
                    )}

                    <div
                      className={
                        splitTextChords ? "praise-lines-container" : ""
                      }
                    >
                      <div
                        className={
                          splitTextChords
                            ? "praise-lines-1"
                            : "praise-lines-not-splitted-1"
                        }
                      >
                        {processChords(transposedChords(praiseChordsFirstPart))}
                      </div>
                      {constainsBreakChords && (
                        <div
                          className={
                            splitTextChords
                              ? "praise-lines-2"
                              : "praise-lines-not-splitted-2"
                          }
                        >
                          {processChords(
                            transposedChords(praiseChordsSecondPart)
                          )}
                        </div>
                      )}
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
