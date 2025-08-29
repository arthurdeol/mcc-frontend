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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [order, setOrder] = useState("desc"); // newest first by default

  useEffect(() => {
    async function fetchData() {
      const url = `https://mccapi.up.railway.app/log`;
      const response = await fetch(url);
      const data = await response.json();
      setRows(data);
    }
    fetchData();
  }, []);

  // Extract unique values
  const uniqueNames = [...new Set(rows.map((row) => row.name))];
  const uniqueTitles = [
    ...new Set(rows.map((row) => JSON.parse(row.log).title)),
  ];
  const uniqueDates = [
    ...new Set(rows.map((row) => row.registerDate.substring(0, 10))),
  ];
  const uniqueActions = [...new Set(rows.map((row) => row.action))];

  // Apply filters
  const filteredRows = rows
    .filter((row) => {
      const title = JSON.parse(row.log).title;
      const date = row.registerDate.substring(0, 10);
      return (
        (selectedName ? row.name === selectedName : true) &&
        (selectedTitle ? title === selectedTitle : true) &&
        (selectedDate ? date === selectedDate : true) &&
        (selectedAction ? row.action === selectedAction : true)
      );
    })
    .sort(
      (a, b) =>
        order === "desc"
          ? new Date(b.registerDate) - new Date(a.registerDate) // newest first
          : new Date(a.registerDate) - new Date(b.registerDate) // oldest first
    );

  return (
    <Container>
      <Header />
      <div className="data-container">
        {/* Filters */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Name</InputLabel>
              <Select
                value={selectedName}
                label="Name"
                onChange={(e) => setSelectedName(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueNames.map((name, i) => (
                  <MenuItem key={i} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Action</InputLabel>
              <Select
                value={selectedAction}
                label="Action"
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueActions.map((action, i) => (
                  <MenuItem key={i} value={action}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Praise Title</InputLabel>
              <Select
                value={selectedTitle}
                label="Praise Title"
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueTitles.map((title, i) => (
                  <MenuItem key={i} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Date</InputLabel>
              <Select
                value={selectedDate}
                label="Date"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueDates.map((date, i) => (
                  <MenuItem key={i} value={date}>
                    {date.replaceAll("-", "/")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Order by date</InputLabel>
              <Select
                value={order}
                label="Order by date"
                onChange={(e) => setOrder(e.target.value)}
              >
                <MenuItem value="desc">Newest first</MenuItem>
                <MenuItem value="asc">Oldest first</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="history table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Action
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem", width: 500 }}
                >
                  Praise
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Fields Changed
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div>{row.name}</div>
                    <div
                      style={{ fontSize: "0.7rem", color: "var(--color-gray)" }}
                    >
                      {row.email}
                    </div>
                  </TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{JSON.parse(row.log).title}</TableCell>
                  <TableCell>{JSON.parse(row.log).change.join(", ")}</TableCell>
                  <TableCell>
                    {row.registerDate.substring(0, 10).replaceAll("-", "/")}
                  </TableCell>
                </TableRow>
              ))}

              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
