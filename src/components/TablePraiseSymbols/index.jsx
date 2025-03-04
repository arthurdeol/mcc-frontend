import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonStyled } from "../FilterModal/styles";

export default function TableSymbols() {
  const rows = [
    createData(
      "Title",
      " ",
      "You don't need to put any simbol. The title will be added automatically. Start with the introduction.",
      {
        url: "../../images/tablePraiseSettings/title.png",
        height: 45,
        width: 210,
      }
    ),
    createData(
      "Introduction",
      "[intro]",
      "On the same line with the following chords. Ex.: [intro] [C7] [F] [C]",
      {
        url: "../../images/tablePraiseSettings/intro.png",
        height: 40,
        width: 200,
      }
    ),
    createData(
      "Introduction with arrows",
      "[arrowR] or [arrowL]",
      "[arrowR] Points to the right: Place it in the line to indicate the intro's start. [arrowL] Points to the left: place it in the line to indicate the intro's finish. Ex.: [arrowR][Dm]You are all I[C/D]want, [arrowL]By Your [C/E] blood I am re[Gm]newed;",
      {
        url: "../../images/tablePraiseSettings/intro-arrows.png",
        height: 100,
        width: 200,
      }
    ),
    createData(
      "Who sings?",
      " ",
      "You don't need to put any symbols. Just add (M), (W) or (All) in the text as normal. Ex.: (W) By Your [C/E] blood I am re[Gm]newed;",
      {
        url: "../../images/tablePraiseSettings/who-sings.png",
        height: 75,
        width: 200,
      }
    ),
    createData(
      "Empty row, space between blocks",
      "[%%]",
      "In a new line and alone. Ex.: in the picture you may see the space before Final",
      {
        url: "../../images/tablePraiseSettings/chords.png",
        height: 110,
        width: 200,
      }
    ),
    createData("Chorus", "[chorus]", "In a new line and alone.", {
      url: "../../images/tablePraiseSettings/chorus.png",
      height: 20,
      width: 60,
    }),

    createData(
      "Repetitions",
      "[.N]",
      "Place it at the beginning of the line in lines that will be repeated to create a group. You will write the number of repetitions in place of N. The number will appear on the line where you place the [@] symbol. Ex.: [.2]To for[C/E]give me and to set me [Gm] free",
      {
        url: "../../images/tablePraiseSettings/repeat-group.png",
        height: 130,
        width: 210,
      }
    ),
    createData(
      "Display repeticion number",
      "[@]",
      "Place it on the line to display the number of repetitions. Ex.: [.2][@]To for[C/E]give me and to set me [Gm] free",
      {
        url: "../../images/tablePraiseSettings/2x.png",
        height: 40,
        width: 45,
      }
    ),
    createData("Final", "[final]", "In a new line and alone.", {
      url: "../../images/tablePraiseSettings/final.png",
      height: 20,
      width: 50,
    }),
    createData(
      "Repeat Nx",
      "[repeat Nx]",
      "In a new line and alone. N is the number of times the next lines will be repeated. It is to be used when you don't want to display the bar with the number of repetitions. Ex.: [repeat 2x]",
      {
        url: "../../images/tablePraiseSettings/repeat2x.png",
        height: 32,
        width: 90,
      }
    ),
    createData(
      "Instrumental",
      "[instrumental]",
      "On the same line with the following chords. Ex.: [instrumental] [C7] [F] [C]",
      {
        url: "../../images/tablePraiseSettings/instr.png",
        height: 20,
        width: 120,
      }
    ),
    createData(
      "Black line",
      "[b]",
      "In a new line, without chords in the text. You may use it for extra information. Ex.: [b]Return to the line 'Jesus you are my Lord'",
      {
        url: "../../images/tablePraiseSettings/return-to.png",
        height: 18,
        width: 200,
      }
    ),
    createData(
      "Chords",
      "[YOUR CHORD HERE]",
      "Place the chord on the line where you want it to appear. It will be displayed at the top of the line. Ex.: Hal[C/E]lelu[Gm]jah, a - [Bb6] men. [C7] [F] [C] [Gm] [Bb] [Dm]",
      {
        url: "../../images/tablePraiseSettings/chords.png",
        height: 110,
        width: 200,
      }
    ),
  ];

  const [displayTable, setDisplayTable] = useState(false);

  function createData(item, simbol, description, display) {
    return { item, simbol, description, display };
  }
  return (
    <>
      <div>
        <ButtonStyled onClick={() => setDisplayTable(!displayTable)}>
          Display Symbols List For Lyrics and Chords Fields
        </ButtonStyled>
      </div>

      {displayTable && (
        <>
          <br></br>
          <div className="data-container">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      align="left"
                    >
                      Component
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      align="left"
                    >
                      Simbol
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      align="left"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      align="left"
                    >
                      Display
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.item}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.item}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ width: 120, fontWeight: "bold" }}
                      >
                        {row.simbol}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <img
                          src={row.display.url}
                          alt={row.item}
                          style={{
                            width: `${row.display.width}px`,
                            height: `${row.display.height}px`,
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </>
  );
}
