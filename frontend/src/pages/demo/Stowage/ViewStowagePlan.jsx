import React, { useEffect, useState } from "react";
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
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageWrapper from "../layout/PageWrapper";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import stowageData from "../../../mockData/stowagePlans.json";

const ViewStowagePlan = () => {
  const [params] = useSearchParams();
  const paramVCN = params.get("vcn");
  const { vcn: routeVCN } = useParams();
  const vcn = routeVCN || paramVCN;
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem(`stowagePlan_${vcn}`);
    if (local) {
      setPlanData(JSON.parse(local));
    } else {
      const match = stowageData.find((p) => p.vcn === vcn);
      if (match) {
        setPlanData(match);
      } else {
        setErrorDialogOpen(true);
      }
    }
  }, [vcn]);

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    navigate("/stowage-dashboard");
  };

  if (!planData) {
    return (
      <PageWrapper title="Stowage Plan View">
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
            <Typography
              variant="h6"
              color="error"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <WarningIcon /> No Stowage Plan found for VCN: {vcn}
            </Typography>
          </Paper>
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={`Stowage Plan – ${planData.vcn}`}>
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
                Stowage Plan: {planData.vcn}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Detailed view of the vessel stowage plan
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/stowage-dashboard")}
              sx={{ ml: "auto" }}
            >
              Back to Dashboard
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
            <Chip
              icon={<InfoIcon />}
              label={`Terminal: ${planData.terminal}`}
              variant="outlined"
              sx={{ fontSize: "0.875rem", p: 1.5 }}
            />
            <Chip
              icon={<InfoIcon />}
              label={`Draft FWD: ${planData.draftFwd} m`}
              variant="outlined"
              sx={{ fontSize: "0.875rem", p: 1.5 }}
            />
            <Chip
              icon={<InfoIcon />}
              label={`Draft AFT: ${planData.draftAft} m`}
              variant="outlined"
              sx={{ fontSize: "0.875rem", p: 1.5 }}
            />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Container List
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, mb: 4, maxHeight: 600, overflow: "auto" }}
          >
            <Table stickyHeader>
              <TableHead sx={{ bgcolor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Container No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>BL No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Call Sign</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>IMO</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>DG Class</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>UN No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Flash Point</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Discharge Port</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tonnage</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Stowage Instruction
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(planData.planList || []).map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      bgcolor: item.is_dg ? "rgba(255, 0, 0, 0.08)" : "inherit",
                      "&:hover": {
                        bgcolor: item.is_dg
                          ? "rgba(255, 0, 0, 0.12)"
                          : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <TableCell>{item["Container No"]}</TableCell>
                    <TableCell>{item["BL No"]}</TableCell>
                    <TableCell>{item["Call Sign"]}</TableCell>
                    <TableCell>{item["IMO"]}</TableCell>
                    <TableCell>{item["DG Class"] || "-"}</TableCell>
                    <TableCell>{item["UN No"] || "-"}</TableCell>
                    <TableCell>{item["Flash Point"] || "-"}</TableCell>
                    <TableCell>{item["Discharge Port"]}</TableCell>
                    <TableCell>{item["Tonnage"]}</TableCell>
                    <TableCell>{item["Stowage Instruction"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title">
          Stowage Plan Not Found
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            No stowage plan found for VCN: {vcn}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default ViewStowagePlan;
