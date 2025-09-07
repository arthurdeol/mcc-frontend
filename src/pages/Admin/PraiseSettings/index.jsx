import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlCloudUpload } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import api from "../../../services/api";
import Header from "../../../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteModal from "../../../components/DeleteModal";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TableFiles from "../../../components/TableFiles";
import TableSymbols from "../../../components/TablePraiseSymbols";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LuType, LuListMusic, LuMusic, LuFolderClosed } from "react-icons/lu";
import { PiHandWaving } from "react-icons/pi";
import { FiColumns } from "react-icons/fi";
import {
  Container,
  themeStyled,
  style,
  fieldsContainer,
  title,
  nameField,
  checked,
  ButtonStyledRed,
  PlusButton,
  FooterFilter,
  ButtonStyled,
} from "./styles";

export default function PraiseSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [praiseId] = useState(location.state.praiseId);

  const { praiseData } = location.state;

  const [louvor, setLouvor] = useState("");

  const [open, setOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    status: "success",
    message: "...",
    time: 1000,
  });

  const handleClickSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => setOpenDeleteModal(false);

  const [praiseTheme, setPraiseTheme] = useState(praiseData.theme.trim());
  const [portugueseSongBookNumber, setPortugueseSongBookNumber] = useState(
    praiseData.portugueseSongBookNumber
  );
  const [portugueseTitle, setPortugueseTitle] = useState(
    praiseData.portugueseTitle
  );
  const [englishSongBookNumber, setEnglishSongBookNumber] = useState(
    praiseData.englishSongBookNumber
  );
  const [englishTitle, setEnglishTitle] = useState(praiseData.englishTitle);
  const [checkeds, setCheckeds] = useState({
    containsInPortugueseSongBook: praiseData.containsInPortugueseSongBook,
    containsInCiasSongBook: praiseData.containsInCiasSongBook,
    containsInSuplementareASongBook: praiseData.containsInSuplementareASongBook,
    containsInSuplementareBSongBook: praiseData.containsInSuplementareBSongBook,
    displayTextLyricsInsteadOfSVG: praiseData.flagLyrics,
    displayTextChordsInsteadOfSVG: praiseData.flagChords,
  });

  const [fileArray, setFileArray] = useState([]);

  const [linkInstruments, setLinkInstruments] = useState(
    praiseData.linkDriveFolder !== "null" && praiseData.linkDriveFolder
      ? praiseData.linkDriveFolder
      : ""
  );

  const [praiseKeyChord, setPraiseKeyChord] = useState(
    praiseData.chordsKey !== null ? praiseData.chordsKey : ""
  );

  const [lyricsContent, setLyricsContent] = useState(
    praiseData.lyrics !== "null" && praiseData.lyrics ? praiseData.lyrics : ""
  );
  const [chordsContent, setChordsContent] = useState(
    praiseData.chords !== "null" && praiseData.chords ? praiseData.chords : ""
  );

  const [orderFile, setOrderFile] = useState(1);
  const [typeFile, setTypeFile] = useState("");
  const [fileData, setfileData] = useState([]);
  const [filesSelected, setFilesSelected] = useState([]);
  const [errorMessageFile, setErrorMessageFile] = useState("");

  const {
    containsInPortugueseSongBook,
    containsInCiasSongBook,
    containsInSuplementareASongBook,
    containsInSuplementareBSongBook,
    displayTextLyricsInsteadOfSVG,
    displayTextChordsInsteadOfSVG,
  } = checkeds;

  const [praiseChordsFirstPart, setPraiseChordsFirstPart] = useState("");
  const [praiseChordsSecondPart, setPraiseChordsSecondPart] = useState("");
  const [praiseLyricsFirstPart, setPraiseLyricsFirstPart] = useState("");
  const [praiseLyricsSecondPart, setPraiseLyricsSecondPart] = useState("");
  const [splitText, setSplitText] = useState(false);
  const [constainsBreakLyrics, setContainsBreakLyrics] = useState(false);
  const [constainsBreakChords, setContainsBreakChords] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/SongBookMap/${praiseId}/Get`;
      const response = await fetch(url);
      const louvorData = await response.json();
      setLouvor(louvorData);
    }
    fetchData();
    // eslint-disable-next-line
  }, [praiseId]);

  useEffect(() => {
    const textChords = chordsContent;
    const textChordsDevided = textChords.split("[break]");

    if (textChordsDevided.length > 1) {
      setPraiseChordsFirstPart(textChordsDevided[0]);
      setPraiseChordsSecondPart(textChordsDevided[1]);
      setContainsBreakChords(true);
    } else {
      setPraiseChordsFirstPart(textChordsDevided[0]);
      setPraiseChordsSecondPart("");
      setContainsBreakChords(false);
    }
  }, [chordsContent]);

  useEffect(() => {
    const textLyrics = lyricsContent;
    const textLyricsDevided = textLyrics.split("[break]");

    if (textLyricsDevided.length > 1) {
      setPraiseLyricsFirstPart(textLyricsDevided[0]);
      setPraiseLyricsSecondPart(textLyricsDevided[1]);
      setContainsBreakLyrics(true);
    } else {
      setPraiseLyricsFirstPart(textLyricsDevided[0]);
      setPraiseLyricsSecondPart("");
      setContainsBreakLyrics(false);
    }
  }, [lyricsContent]);

  function setActiveTab(file) {
    const fileMap = {
      lyrics: louvor.lyricsPdf,
      chords: louvor.chordsPdf,
      musicSheet: louvor.sheetMusicPdf,
      gestures: louvor.gesturesFile,
    };

    if (fileMap[file]) {
      setFileArray(fileMap[file].map(setUrl));
    }
  }

  function setUrl(file) {
    return `data:${file.document.contentType};base64,${file.document.file}`;
  }

  const handleChangeCheckbox = (event) => {
    setCheckeds({
      ...checkeds,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeOrderFileNumber = (event) => {
    setOrderFile(event.target.value);
  };

  const handleChangeTypeFile = (event) => {
    setTypeFile(event.target.value);
  };

  const handleChangeFileData = (event) => {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);
    setfileData(selectedImages);
  };

  function addFile() {
    if (fileData.length > 0 && typeFile && orderFile) {
      let objFile = {
        fileType: typeFile,
        order: Number(orderFile),
        file: fileData[0],
        filePreview: URL.createObjectURL(fileData[0]),
      };
      setFilesSelected([...filesSelected, objFile]);
      setErrorMessageFile("");
      setTypeFile("");
      setOrderFile(1);
      setfileData([]);
    } else {
      setErrorMessageFile(`Please fill all information about the file!`);
    }
  }

  const handleChangePraiseTheme = (event) => {
    setPraiseTheme(event.target.value);
  };

  const handleChangePortugueseSongBookNumber = (event) => {
    setPortugueseSongBookNumber(event.target.value);
  };

  const handleChangePortugueseTitle = (event) => {
    setPortugueseTitle(event.target.value);
  };

  const handleChangeEnglishSongBookNumber = (event) => {
    setEnglishSongBookNumber(event.target.value);
  };

  const handleChangeEnglishTitle = (event) => {
    setEnglishTitle(event.target.value);
  };

  const handleChangeLinkInstruments = (event) => {
    setLinkInstruments(event.target.value);
  };

  const handleChangeChordsContent = (event) => {
    setChordsContent(event.target.value);
  };

  const handleChangeLyricsContent = (event) => {
    setLyricsContent(event.target.value);
  };

  const handleChangePraiseChordKey = (event) => {
    setPraiseKeyChord(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("songBookMapId", praiseId);
    formData.append(
      "containsInPortugueseSongBook",
      checkeds.containsInPortugueseSongBook
    );
    formData.append("containsInCiasSongBook", checkeds.containsInCiasSongBook);
    formData.append(
      "containsInSuplementareASongBook",
      checkeds.containsInSuplementareASongBook
    );
    formData.append(
      "containsInSuplementareBSongBook",
      checkeds.containsInSuplementareBSongBook
    );
    formData.append("flagLyrics", checkeds.displayTextLyricsInsteadOfSVG);
    formData.append("flagChords", checkeds.displayTextChordsInsteadOfSVG);
    formData.append("theme", praiseTheme);
    formData.append("portugueseSongBookNumber", portugueseSongBookNumber);
    formData.append("portugueseTitle", portugueseTitle);
    formData.append("englishSongBookNumber", englishSongBookNumber);
    formData.append("englishTitle", englishTitle);
    formData.append("linkDriveFolder", linkInstruments);
    formData.append("chords", chordsContent);
    formData.append("lyrics", lyricsContent);
    formData.append("chordsKey", praiseKeyChord);

    if (filesSelected.length > 0) {
      filesSelected.forEach((file, index) => {
        formData.append(`files[${index}].fileType`, file.fileType);
        formData.append(`files[${index}].order`, file.order);
        formData.append(`files[${index}].file`, file.file);
      });
    } else {
      formData.append("files", null);
    }

    try {
      await api.put("/SongBookMap", formData);
      handleClickSnackbar({});
      setSnackbarData({
        status: "success",
        message: "Settings applied with Success",
        time: 2000,
      });
      sendHistory(formData);
    } catch (error) {
      handleClickSnackbar({});
      setSnackbarData({
        status: "error",
        message: "Something went wrong! Please, try again later!",
        time: 3000,
      });
    }
  }

  async function sendHistory(formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    let changes = verifyChangings(formData);

    const log = JSON.stringify({
      title: louvor.englishTitle ? louvor.englishTitle : louvor.portugueseTitle,
      praiseNumber: louvor.englishSongBookNumber
        ? louvor.englishSongBookNumber
        : louvor.portugueseSongBookNumber,
      change: changes,
    });

    if (changes.length > 0) {
      try {
        await api.post("/log", {
          name: user.userName,
          email: user.email,
          action: "Update",
          log: log,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function verifyChangings(formData) {
    let changedValues = [];
    if (praiseData.theme !== formData.get("theme")) changedValues.push("theme");
    if (
      praiseData.portugueseSongBookNumber !==
      formData.get("portugueseSongBookNumber")
    )
      changedValues.push("portuguese songbook number");
    if (praiseData.portugueseTitle !== formData.get("portugueseTitle"))
      changedValues.push("portuguese title");
    if (
      praiseData.englishSongBookNumber !== formData.get("englishSongBookNumber")
    )
      changedValues.push("english songbook number");
    if (praiseData.englishTitle !== formData.get("englishTitle"))
      changedValues.push("english title");
    if (
      praiseData.containsInPortugueseSongBook !==
      (formData.get("containsInPortugueseSongBook") === "true")
    )
      changedValues.push("praise contains in Portuguese songbook");
    if (
      praiseData.containsInCiasSongBook !==
      (formData.get("containsInCiasSongBook") === "true")
    )
      changedValues.push("praise contains in CIA's songbook");
    if (
      praiseData.containsInSuplementareASongBook !==
      (formData.get("containsInSuplementareASongBook") === "true")
    )
      changedValues.push("praise contains in suplementare-A songbook");
    if (
      praiseData.containsInSuplementareBSongBook !==
      (formData.get("containsInSuplementareBSongBook") === "true")
    )
      changedValues.push("praise contains in suplementare-B songbook");
    if (praiseData.flagLyrics !== (formData.get("flagLyrics") === "true"))
      changedValues.push("display text Lyrics");
    if (praiseData.flagChords !== (formData.get("flagChords") === "true"))
      changedValues.push("display text Chords");

    if (
      (formData.get("linkDriveFolder") === "" &&
        praiseData.linkDriveFolder &&
        praiseData.linkDriveFolder.length > 6) ||
      (formData.get("linkDriveFolder") !== "" &&
        formData.get("linkDriveFolder") !== praiseData.linkDriveFolder)
    ) {
      changedValues.push("link of instruments Drive");
    }

    if (praiseData.chords !== formData.get("chords"))
      changedValues.push("text Chords");
    if (praiseData.lyrics !== formData.get("lyrics"))
      changedValues.push("text Lyrics");

    if (
      (formData.get("chordsKey") === "" && praiseData.chordsKey) ||
      (formData.get("chordsKey") !== "" &&
        praiseData.chordsKey !== formData.get("chordsKey"))
    )
      changedValues.push("chords key");
    if (filesSelected.length > 0) changedValues.push("files SVG");
    return changedValues;
  }

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

      const regex =
        /\[([A-G][#b]?(?:m|M|maj7|7|9|11|13|sus2|sus4|dim|aug|add9|6|°|°7|m7|m9|m11|m13|7#9|7b9|7#5|7b5|9#11|13b9|13#11|6\/9)?(?:\(\d+\))?(?:\/[A-G][#b]?)?)\]/g;

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
        line = line.replace(/^\[\.(\d+)\]/, "");

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
        "[instrumental]": { label: "Instrumental:", color: "red", bold: true },
        "[chorus]": {
          label: `Chorus: ${line.replace(/\[\/?chorus\]/g, "")}`,
          color: "black",
          bold: true,
        },
        "[final]": { label: "Final:", color: "black", bold: true },
        // "[b]": { label: "", color: "black", bold: true },
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

  return (
    <Container>
      <Header />
      <ThemeProvider theme={themeStyled}>
        <Box sx={style}>
          <div className="initial-container">
            <h1>Praise Settings</h1>

            <div className="delete-button" onClick={handleOpen}>
              <RiDeleteBin5Line size={20} />
            </div>
          </div>

          <h2>{`${englishTitle ? englishTitle : portugueseTitle}`}</h2>
          <br></br>

          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInPortugueseSongBook}
                onChange={handleChangeCheckbox}
                name="containsInPortugueseSongBook"
              />
            }
            label="Contains in Portuguese Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInCiasSongBook}
                onChange={handleChangeCheckbox}
                name="containsInCiasSongBook"
              />
            }
            label="Contains in CIA's Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInSuplementareASongBook}
                onChange={handleChangeCheckbox}
                name="containsInSuplementareASongBook"
              />
            }
            label="Contains in Suplementare A Songbook"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={containsInSuplementareBSongBook}
                onChange={handleChangeCheckbox}
                name="containsInSuplementareBSongBook"
              />
            }
            label="Contains in Suplementare B Songbook"
          />
          <br></br>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Theme</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={praiseTheme}
                label="Theme"
                onChange={handleChangePraiseTheme}
              >
                <MenuItem value={"PLEADING"}>Pleading</MenuItem>
                <MenuItem value={"CHORUSES"}>Choruses</MenuItem>
                <MenuItem value={"CONFORT AND ENCOURAGEMENT"}>
                  Confort and Encouragement
                </MenuItem>
                <MenuItem value={"DEDICATION"}>Dedication</MenuItem>
                <MenuItem value={"DETH, RESSURECTION AND SALVATION"}>
                  Deth, Ressurection and Salvation
                </MenuItem>
                <MenuItem value={"ETERNITY AND THE RETURN OF JESUS"}>
                  Eternity and The Return of Jesus
                </MenuItem>
                <MenuItem value={"INVOCATION FELLOWSHIP"}>
                  Invocation Fellowship
                </MenuItem>
                <MenuItem
                  value={"SANTIFICATION AND OUTPOURING OF THE HOLY SPIRIT"}
                >
                  Santification and Outpouring of The Holy Spirit
                </MenuItem>
                <MenuItem value={"PRAISE GROUP"}>Praise Group</MenuItem>
                <MenuItem value={"PRAISE"}>Praise</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              English Data:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={englishTitle}
                id="outlined-basic"
                label="English Name"
                variant="outlined"
                onChange={handleChangeEnglishTitle}
              />

              <TextField
                value={englishSongBookNumber}
                id="outlined-basic"
                label="Number"
                variant="outlined"
                onChange={handleChangeEnglishSongBookNumber}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Portuguese Data:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={portugueseTitle}
                id="outlined-basic"
                label="Portuguese Name"
                variant="outlined"
                onChange={handleChangePortugueseTitle}
              />

              <TextField
                value={portugueseSongBookNumber}
                id="outlined-basic"
                label="Number"
                variant="outlined"
                onChange={handleChangePortugueseSongBookNumber}
              />
            </Box>
          </div>
          <br></br>

          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Link to Instruments Drive:
            </Typography>
            <Box sx={fieldsContainer}>
              <TextField
                sx={nameField}
                fullWidth
                value={linkInstruments}
                id="outlined-basic"
                variant="outlined"
                onChange={handleChangeLinkInstruments}
              />
            </Box>
          </div>
          <br></br>

          <TableSymbols />
          <br></br>

          {/* --------------------- LYRICS: text input ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Lyrics:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={displayTextLyricsInsteadOfSVG}
                  onChange={handleChangeCheckbox}
                  name="displayTextLyricsInsteadOfSVG"
                />
              }
              label="Display This Text for Lyrics Instead of File SVG"
            />
            <Box sx={fieldsContainer}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                // rows={10}
                variant="outlined"
                onChange={handleChangeLyricsContent}
                value={lyricsContent}
                inputProps={{
                  style: {
                    height: "fit-content",
                  },
                }}
              />
            </Box>
            {/* -------------- BUTTON TO SPLIT THE PRAISE ------------------------*/}
            {constainsBreakLyrics && (
              <div
                className="button-to-split"
                onClick={() => setSplitText(!splitText)}
              >
                <FiColumns size={20} color="var(--color-black)" />
              </div>
            )}
            {/* --------------------- LYRICS: display example ----------------------------------- */}
            {lyricsContent && (
              <div className="praise-container">
                <div className="praise-main">
                  {englishTitle.includes("(") ? (
                    <>
                      <h1 className="praise-title">
                        {englishSongBookNumber
                          ? englishSongBookNumber + " - "
                          : ""}
                        {englishTitle.split("(")[0].trim()}
                      </h1>
                      <h2 className="praise-title">
                        {"(" + englishTitle.split("(")[1].trim()}
                      </h2>
                    </>
                  ) : (
                    <h1 className="praise-title">
                      {englishSongBookNumber
                        ? englishSongBookNumber + " - "
                        : ""}
                      {englishTitle}
                    </h1>
                  )}
                  {portugueseTitle && (
                    <h3>
                      {portugueseSongBookNumber
                        ? portugueseSongBookNumber + " - "
                        : ""}
                      {portugueseTitle}
                    </h3>
                  )}
                  <div className={splitText ? "praise-lines-container" : ""}>
                    <div className="praise-lines-lyrics">
                      {processLyrics(praiseLyricsFirstPart)}
                    </div>
                    {constainsBreakLyrics && (
                      <div className="praise-lines-lyrics">
                        {processLyrics(praiseLyricsSecondPart)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <br></br>

          {/* --------------------- Chord Key ----------------------------------- */}
          <FormControl style={{ width: "120px", marginBottom: "5px" }}>
            <InputLabel id="simple-select-label">Key / Tone</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={praiseKeyChord}
              label="Key/Tone"
              onChange={handleChangePraiseChordKey}
            >
              <MenuItem value={"C"}>C</MenuItem>
              <MenuItem value={"Cm"}>Cm</MenuItem>
              <MenuItem value={"C#"}>C# - Db</MenuItem>
              <MenuItem value={"C#m"}>C#m - Dbm</MenuItem>
              <MenuItem value={"D"}>D</MenuItem>
              <MenuItem value={"Dm"}>Dm</MenuItem>
              <MenuItem value={"D#"}>D# - Eb</MenuItem>
              <MenuItem value={"D#m"}>D#m - Ebm</MenuItem>
              <MenuItem value={"E"}>E</MenuItem>
              <MenuItem value={"Em"}>Em</MenuItem>
              <MenuItem value={"F"}>F</MenuItem>
              <MenuItem value={"Fm"}>Fm</MenuItem>
              <MenuItem value={"F#"}>F# - Gb</MenuItem>
              <MenuItem value={"F#m"}>F#m - Gbm</MenuItem>
              <MenuItem value={"G"}>G</MenuItem>
              <MenuItem value={"Gm"}>Gm</MenuItem>
              <MenuItem value={"G#"}>G# - Ab</MenuItem>
              <MenuItem value={"G#m"}>G#m - Abm</MenuItem>
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"Am"}>Am</MenuItem>
              <MenuItem value={"A#"}>A# - Bb</MenuItem>
              <MenuItem value={"A#m"}>A#m - Bbm</MenuItem>
              <MenuItem value={"B"}>B</MenuItem>
              <MenuItem value={"Bm"}>Bm</MenuItem>
            </Select>
          </FormControl>

          {/* --------------------- CHORDS: text input ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Chords:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  sx={checked}
                  checked={displayTextChordsInsteadOfSVG}
                  onChange={handleChangeCheckbox}
                  name="displayTextChordsInsteadOfSVG"
                />
              }
              label="Display This Text for Chords Instead of File SVG"
            />
            <Box sx={fieldsContainer}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                // rows={10}
                variant="outlined"
                onChange={handleChangeChordsContent}
                value={chordsContent}
                inputProps={{
                  style: {
                    height: "fit-content",
                  },
                }}
              />
            </Box>
            {/* -------------- BUTTON TO SPLIT THE PRAISE ------------------------*/}
            <div className="top-right-buttons">
              {constainsBreakChords && (
                <div
                  className="button-to-split"
                  onClick={() => setSplitText(!splitText)}
                >
                  <FiColumns size={20} color="var(--color-black)" />
                </div>
              )}
            </div>
            {/* --------------------- CHORDS: display example ----------------------------------- */}
            {chordsContent && (
              <div className="praise-container">
                <div className="praise-main">
                  {englishTitle.includes("(") ? (
                    <>
                      <h1 className="praise-title">
                        {englishSongBookNumber
                          ? englishSongBookNumber + " - "
                          : ""}
                        {englishTitle.split("(")[0].trim()}
                      </h1>
                      <h2 className="praise-title">
                        {"(" + englishTitle.split("(")[1].trim()}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h1 className="praise-title">
                        {englishSongBookNumber
                          ? englishSongBookNumber + " - "
                          : ""}
                        {englishTitle}
                      </h1>
                    </>
                  )}
                  {portugueseTitle && (
                    <h3>
                      {portugueseSongBookNumber
                        ? portugueseSongBookNumber + " - "
                        : ""}
                      {portugueseTitle}
                    </h3>
                  )}

                  <div className={splitText ? "praise-lines-container" : ""}>
                    <div
                      className={
                        splitText
                          ? "praise-lines-1"
                          : "praise-lines-not-splitted-1"
                      }
                    >
                      {processChords(praiseChordsFirstPart)}
                    </div>
                    {constainsBreakChords && (
                      <div
                        className={
                          splitText
                            ? "praise-lines-2"
                            : "praise-lines-not-splitted-2"
                        }
                      >
                        {processChords(praiseChordsSecondPart)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <br></br>

          {/* --------------------- Already saved SVGs ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Click to See Already Saved files SVG and Instruments Drive Folder
              Link:
            </Typography>
            <div className="icons-container">
              {louvor.linkDriveFolder &&
                louvor.linkDriveFolder !== "null" &&
                (louvor.linkDriveFolder?.includes("http://") ||
                  louvor.linkDriveFolder?.includes("https://")) && (
                  <a
                    href={louvor.linkDriveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon-container">
                      <LuFolderClosed color={"var(--color-black)"} size={18} />
                    </div>
                  </a>
                )}

              {louvor.containsInCiasSongBook && (
                <>
                  {louvor.linkGestures ? (
                    <div
                      className="icon-container"
                      onClick={() => setActiveTab("gestures")}
                    >
                      <PiHandWaving color={"var(--color-black)"} size={19} />
                    </div>
                  ) : (
                    <div className="icon-container">
                      <PiHandWaving color={"var(--color-gray-2)"} size={19} />
                    </div>
                  )}
                </>
              )}

              {louvor.linkSheetMusic ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("musicSheet")}
                >
                  <LuMusic color={"var(--color-black)"} size={17} />
                </div>
              ) : (
                <div className="icon-container">
                  <LuMusic color={"var(--color-gray-2)"} size={17} />
                </div>
              )}

              {louvor.linkPdfLyrics ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("lyrics")}
                >
                  <LuType color={"var(--color-black)"} size={17} />
                </div>
              ) : (
                <div className="icon-container">
                  <LuType color={"var(--color-gray-2)"} size={17} />
                </div>
              )}

              {louvor.linkChords ? (
                <div
                  className="icon-container"
                  onClick={() => setActiveTab("chords")}
                >
                  <LuListMusic color={"var(--color-black)"} size={19} />
                </div>
              ) : (
                <div className="icon-container">
                  <LuListMusic color={"var(--color-gray-2)"} size={19} />
                </div>
              )}
            </div>
            <div className="files-praiseData-container">
              {fileArray.map((url, i) => (
                <img key={i} src={url} alt="praiseImg" className="file" />
              ))}
            </div>
          </div>
          <br></br>

          {/* --------------------- UPLOAD FILES SVGs ----------------------------------- */}
          <div className="data-container">
            <Typography sx={title} id="modal-modal-title" component="h2">
              Upload Files SVG:
            </Typography>
            <div className="file-container">
              <div className="file-inputs-content">
                <div className="type-input">
                  <Box sx={{ minWidth: 130 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeFile}
                        label="Type"
                        onChange={handleChangeTypeFile}
                      >
                        <MenuItem value={"Lyrics"}>Lyrics</MenuItem>
                        <MenuItem value={"Chords"}>Chords</MenuItem>
                        <MenuItem value={"SheetMusic"}>Music Sheet</MenuItem>
                        <MenuItem value={"Gestures"}>CIA's Gestures</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div className="order-input">
                  <TextField
                    sx={{ minWidth: 165 }}
                    value={orderFile}
                    id="outlined-basic"
                    label="Order to display the file"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    onChange={handleChangeOrderFileNumber}
                  />
                </div>

                <div className="file-data-input">
                  <label htmlFor="fileData">
                    <SlCloudUpload />
                    &nbsp;&nbsp;File:
                  </label>
                  <input
                    type="file"
                    id="fileData"
                    name="fileData"
                    accept="image/svg"
                    onChange={handleChangeFileData}
                  />
                  {fileData.length > 0 && (
                    <span className="file-name">{fileData[0].name}</span>
                  )}
                </div>
              </div>

              <PlusButton onClick={addFile}>
                <LuPlus size={30} color={"var(--color-white)"} />
              </PlusButton>
            </div>
            {errorMessageFile !== "" && (
              <p className="text-error">{errorMessageFile}</p>
            )}
          </div>
          <br></br>

          {/* ---------------------Display: UPLOAD FILES SVGs ----------------------------------- */}
          <TableFiles
            filesSelected={filesSelected}
            setFilesSelected={setFilesSelected}
          />

          {/* ---------------------BUTTONS return and save ----------------------------------- */}
          <FooterFilter>
            <ButtonStyled onClick={() => navigate("/praises-admin")}>
              Return to Admin Home
            </ButtonStyled>
            <ButtonStyledRed type="submit" onClick={handleSubmit}>
              Apply Settings
            </ButtonStyledRed>
          </FooterFilter>
        </Box>
        <DeleteModal
          openModal={openDeleteModal}
          onCloseModal={handleClose}
          praiseId={praiseId}
          praiseData={praiseData}
        />
      </ThemeProvider>

      <Snackbar
        open={open}
        autoHideDuration={snackbarData.time}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
