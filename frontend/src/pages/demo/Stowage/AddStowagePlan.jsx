import React, { useState, useEffect } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageWrapper from "../layout/PageWrapper";
import AddContainerRowModal from "./AddContainerRowModal";
import getFlagImage from "../../../utils/getFlagImage";
import locations from "../../../mockData/locations.json";
import stowagePlansJson from "../../../mockData/stowagePlans.json";

const AddStowagePlan = () => {
  const [formData, setFormData] = useState({
    vcn: "",
    terminal: "",
    draftFwd: "",
    draftAft: "",
    portOfLoading: null,
    portOfDischarge: null,
    containers: [],
  });

  const [availableVCNs, setAvailableVCNs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fromLS = JSON.parse(localStorage.getItem("stowagePlans") || "[]");
    const all = [...stowagePlansJson, ...fromLS];
    const deduped = Array.from(new Set(all.map((p) => p.vcn))).map((vcn) => ({
      label: vcn,
      value: vcn,
    }));
    setAvailableVCNs(deduped);
  }, []);

  const portOptions = locations.map((loc) => ({
    value: loc.location_code,
    label: loc.name,
    flag: loc.flag_code,
    code: loc.location_code,
  }));

  const handleAddContainer = (container) => {
    if (container) {
      // Only add if container exists (not cancelled)
      setFormData((prev) => ({
        ...prev,
        containers: [...prev.containers, container],
      }));
    }
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const updated = [...formData.containers];
    updated.splice(index, 1);
    setFormData({ ...formData, containers: updated });
  };

  const handleSubmit = () => {
    const saved = JSON.parse(localStorage.getItem("stowagePlans") || "[]");
    saved.push(formData);
    localStorage.setItem("stowagePlans", JSON.stringify(saved));
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <PageWrapper title="Add Stowage Plan">
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
          {/* Header and form sections remain the same as before */}
          {/* ... */}

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Container List
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowModal(true)}
              sx={{ bgcolor: "#2D3436", "&:hover": { bgcolor: "#3A4345" } }}
            >
              Add Container
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Container No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>BL No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>DG Class</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Discharge Port</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.containers.length > 0 ? (
                  formData.containers.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.containerNo}</TableCell>
                      <TableCell>{item.blNo}</TableCell>
                      <TableCell>{item.dgClass}</TableCell>
                      <TableCell>{item.dischargePort}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(i)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No containers added yet
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              disabled={!formData.vcn}
              sx={{
                bgcolor: "#2D3436",
                "&:hover": { bgcolor: "#3A4345" },
                "&:disabled": { bgcolor: "#e0e0e0" },
              }}
            >
              Save Stowage Plan
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Add Container Row Modal - ensure it only opens when showModal is true */}
      {showModal && (
        <AddContainerRowModal
          onAdd={handleAddContainer}
          onClose={() => setShowModal(false)}
        />
      )}

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Stowage Plan Saved</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The stowage plan has been successfully saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default AddStowagePlan;
