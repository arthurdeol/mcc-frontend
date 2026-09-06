import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

// Renders the "[.N]", "[@]" and special-tag markup used in the lyrics text
// into styled elements, grouping lines wrapped in "[.N]...[.N]" blocks.
function processLyrics(text) {
  const lines = text.split("\n");
  const elements = [];
  let group = null;
  let groupClass = "";

  lines.forEach((line, index) => {
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

    if (line.includes("[%%]")) {
      const element = (
        <div key={index} style={{ width: "100%", height: "1.5rem" }}>
          &nbsp;
        </div>
      );
      group ? group.push(element) : elements.push(element);
      return;
    }

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
 * Editor + live preview for a praise's lyrics, used in both the "Add Praise"
 * and "Praise Settings" admin screens. `value`/`onChange` control the raw
 * text; `displayAsText`/`onDisplayAsTextChange` control the "display this
 * text instead of file SVG" checkbox. Title fields are only used to render
 * the preview header.
 */
export default function LyricsField({
  value,
  onChange,
  displayAsText,
  onDisplayAsTextChange,
  englishTitle,
  englishSongBookNumber,
  portugueseTitle,
  portugueseSongBookNumber,
}) {
  return (
    <div className="data-container">
      <div className="editor-preview-columns">
        <div className="editor-column">
          <Typography sx={title} component="h2">
            Lyrics:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                sx={checked}
                checked={displayAsText}
                onChange={onDisplayAsTextChange}
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
            </div>
            <div className="preview-box">
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
                <div className="praise-lines-lyrics">
                  {processLyrics(value)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
