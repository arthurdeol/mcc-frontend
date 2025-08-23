import { Container } from "./styles";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function HistoryPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/log`;
      const response = await fetch(url);
      const data = await response.json();
      setRows(data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <div className="data-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Action
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Praise
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Log
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="left"
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" sx={{ width: 120 }}>
                    {row.email}
                  </TableCell>
                  <TableCell align="left">{row.action}</TableCell>
                  <TableCell align="left" sx={{ width: 350 }}>
                    {JSON.parse(row.log).title}
                  </TableCell>
                  <TableCell align="left" sx={{ width: 350 }}>
                    {JSON.parse(row.log).change.join(", ")}
                  </TableCell>
                  <TableCell align="left">
                    {row.registerDate.substring(0, 10).replaceAll("-", "/")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
