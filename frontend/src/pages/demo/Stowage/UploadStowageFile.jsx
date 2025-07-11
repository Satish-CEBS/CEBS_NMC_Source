import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import PageWrapper from "../layout/PageWrapper";

const UploadStowageFile = () => {
  const [vcn, setVcn] = useState("");
  const [terminal, setTerminal] = useState("");
  const [draftFwd, setDraftFwd] = useState("");
  const [draftAft, setDraftAft] = useState("");
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

      const tagged = data.map((item) => ({
        ...item,
        is_dg: !!item["DG Class"] || !!item["UN No"],
      }));
      setRows(tagged);
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = () => {
    const key = `stowagePlan_${vcn}`;
    const plan = {
      vcn,
      terminal,
      draftFwd,
      draftAft,
      planList: rows,
    };
    localStorage.setItem(key, JSON.stringify(plan));
    setDialogMessage(`Draft saved for VCN: ${vcn}`);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const key = `stowagePlan_${vcn}`;
    const plan = {
      vcn,
      terminal,
      draftFwd,
      draftAft,
      planList: rows,
    };
    localStorage.setItem(key, JSON.stringify(plan));
    setDialogMessage(`Stowage Plan submitted for VCN: ${vcn}`);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const terminals = [
    { value: "AEMIN1", label: "AEMIN1" },
    { value: "AEAUH1", label: "AEAUH1" },
    { value: "AEDXB1", label: "AEDXB1" },
  ];

  return (
    <PageWrapper title="Upload Stowage Plan">
      <Box sx={{ p: 4 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 4,
            mb: 4,
            background: "#f9f8f3",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                mr: 2,
                width: 56,
                height: 56,
                bgcolor: "#2D3436",
                color: "white",
              }}
            >
              <DirectionsBoatIcon fontSize="large" />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Upload Stowage Plan
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Upload Excel file with stowage plan details
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              value={vcn}
              onChange={(e) => setVcn(e.target.value)}
              placeholder="Enter VCN"
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Terminal *</InputLabel>
              <Select
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                placeholder="Terminal *"
              >
                <MenuItem value="">
                  <em>-- Select Terminal --</em>
                </MenuItem>
                {terminals.map((terminal) => (
                  <MenuItem key={terminal.value} value={terminal.value}>
                    {terminal.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                placeholder="Draft FWD (m)"
                type="number"
                value={draftFwd}
                onChange={(e) => setDraftFwd(e.target.value)}
                fullWidth
              />
              <TextField
                placeholder="Draft AFT (m)"
                type="number"
                value={draftAft}
                onChange={(e) => setDraftAft(e.target.value)}
                fullWidth
              />
            </Box>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                py: 2,
                borderStyle: "dashed",
                bgcolor: "rgba(0, 0, 0, 0.02)",
              }}
            >
              Upload Excel File
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                hidden
              />
            </Button>
            {fileName && (
              <Chip
                label={fileName}
                variant="outlined"
                onDelete={() => {
                  setFileName("");
                  setRows([]);
                }}
              />
            )}
          </Box>

          {rows.length > 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
                Parsed Stowage Data
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  mb: 4,
                  maxHeight: 500,
                  overflow: "auto",
                }}
              >
                <Table stickyHeader>
                  <TableHead sx={{ bgcolor: "#f0f0f0" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Container No
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>BL No</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Call Sign</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>IMO</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>DG Class</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>UN No</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Flash Point
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Discharge Port
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Tonnage</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Stowage Instruction
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          bgcolor: row.is_dg
                            ? "rgba(255, 0, 0, 0.08)"
                            : "inherit",
                          "&:hover": {
                            bgcolor: row.is_dg
                              ? "rgba(255, 0, 0, 0.12)"
                              : "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <TableCell>{row["Container No"]}</TableCell>
                        <TableCell>{row["BL No"]}</TableCell>
                        <TableCell>{row["Call Sign"]}</TableCell>
                        <TableCell>{row["IMO"]}</TableCell>
                        <TableCell>{row["DG Class"]}</TableCell>
                        <TableCell>{row["UN No"]}</TableCell>
                        <TableCell>{row["Flash Point"]}</TableCell>
                        <TableCell>{row["Discharge Port"]}</TableCell>
                        <TableCell>{row["Tonnage"]}</TableCell>
                        <TableCell>{row["Stowage Instruction"]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!vcn || !terminal}
                  sx={{
                    bgcolor: "white",
                    "&:disabled": { bgcolor: "#e0e0e0" },
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handleSubmit}
                  disabled={!vcn || !terminal}
                  sx={{
                    bgcolor: "#2D3436",
                    "&:hover": { bgcolor: "#3A4345" },
                    "&:disabled": { bgcolor: "#e0e0e0" },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default UploadStowageFile;
