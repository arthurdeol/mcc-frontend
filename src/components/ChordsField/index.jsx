import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FiColumns } from "react-icons/fi";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

const title = {
  margin: "0 0 20px",
  color: "var(--color-dark-gray)",
};

const checked = {
  color: "var(--color-dark-gray)",
  "&.Mui-checked": {
    color: "var(--color-dark-red)",
  },
};

const fieldsContainer = {
  display: "flex",
  justifyContent: "space-between",
};

// Renders chord tags ("[C]", "[Am7]"...), group markers ("[.N]", "[@]") and
// special tags used in the chords text into aligned chord/lyric elements.
function processChords(text) {
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
            {plainTextLine.replace(/\[arrow[L|R]\]/g, "").replace(/\[b\]/g, "")}
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
}

/**
 * Editor + live preview for a praise's chords, used in both the "Add Praise"
 * and "Praise Settings" admin screens. `value`/`onChange` control the raw
 * text; `displayAsText`/`onDisplayAsTextChange` control the "display this
 * text instead of file SVG" checkbox. Title fields are only used to render
 * the preview header.
 */
export default function ChordsField({
  value,
  onChange,
  displayAsText,
  onDisplayAsTextChange,
  englishTitle,
  englishSongBookNumber,
  portugueseTitle,
  portugueseSongBookNumber,
}) {
  const [splitText, setSplitText] = useState(false);
  const containsBreak = value.includes("[break]");
  const [firstPart, secondPart] = value.split("[break]");

  return (
    <div className="data-container">
      <div className="editor-preview-columns">
        <div className="editor-column">
          <Typography sx={title} component="h2">
            Chords:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={displayAsText}
                onChange={onDisplayAsTextChange}
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
              variant="outlined"
              onChange={onChange}
              value={value}
              inputProps={{
                style: {
                  height: "fit-content",
                },
              }}
            />
          </Box>
        </div>

        {value && (
          <div className="preview-column">
            <div className="preview-column-header">
              <Typography sx={{ ...title, margin: 0 }} component="h2">
                How it will be displayed
              </Typography>
              {containsBreak && (
                <div
                  className="button-to-split"
                  onClick={() => setSplitText(!splitText)}
                >
                  <FiColumns size={18} color="var(--color-black)" />
                </div>
              )}
            </div>
            <div
              className={`preview-box ${
                splitText ? "preview-box-split" : ""
              }`}
            >
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
                  <div className="praise-lines-1">
                    {processChords(firstPart)}
                  </div>
                  {containsBreak && (
                    <div className="praise-lines-2">
                      {processChords(secondPart)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
