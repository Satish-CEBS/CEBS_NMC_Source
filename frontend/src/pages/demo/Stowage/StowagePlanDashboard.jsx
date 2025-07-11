// // src/pages/demo/Stowage/StowagePlanDashboard.jsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PageWrapper from '../layout/PageWrapper';
// import './StowagePlanDashboard.css';

// const StowagePlanDashboard = () => {
//     const [plans, setPlans] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Load all dynamic stowage plans from localStorage
//         const localPlans = [];
//         for (const key in localStorage) {
//             if (key.startsWith('stowagePlan_')) {
//                 try {
//                     const stored = JSON.parse(localStorage.getItem(key));
//                     if (stored?.vcn) {
//                         localPlans.push(stored);
//                     }
//                 } catch (err) {
//                     console.error(`Error parsing ${key}`);
//                 }
//             }
//         }

//         // Merge static JSON with dynamic
//         const all = [...mockPlans, ...localPlans];
//         setPlans(all);
//     }, []);

//     const handleView = (vcn) => {
//         navigate(`/stowage/view/${vcn}`);
//     };

//     return (
//         <PageWrapper title="Stowage Plans">
//             <div className="dashboard-wrapper">
//                 <div className="header">
//                     <h2>Stowage Plans</h2>
//                     <button className="add-btn" onClick={() => navigate('/stowage/add')}>
//                         + Add New Stowage Plan
//                     </button>
//                 </div>

//                 <table className="stowage-table">
//                     <thead>
//                         <tr>
//                             <th>VCN</th>
//                             <th>Terminal</th>
//                             <th>FWD Draft</th>
//                             <th>AFT Draft</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {plans.map((plan, idx) => (
//                             <tr key={idx}>
//                                 <td>{plan.vcn}</td>
//                                 <td>{plan.terminal || '-'}</td>
//                                 <td>{plan.draftFwd || '-'}</td>
//                                 <td>{plan.draftAft || '-'}</td>
//                                 <td>
//                                     <button className="view-btn" onClick={() => handleView(plan.vcn)}>View</button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {plans.length === 0 && (
//                             <tr>
//                                 <td colSpan="5">No stowage plans found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </PageWrapper>
//     );
// };

// export default StowagePlanDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PageWrapper from "../layout/PageWrapper";
import mockPlans from "../../../mockData/stowagePlans.json";

const StowagePlanDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Load all dynamic stowage plans from localStorage
    const localPlans = [];
    for (const key in localStorage) {
      if (key.startsWith("stowagePlan_")) {
        try {
          const stored = JSON.parse(localStorage.getItem(key));
          if (stored?.vcn) {
            localPlans.push({ ...stored, isLocal: true });
          }
        } catch (err) {
          console.error(`Error parsing ${key}`);
        }
      }
    }

    // Merge with mock data (mock data would need an isLocal: false property)
    const all = [
      ...mockPlans.map((p) => ({ ...p, isLocal: false })),
      ...localPlans,
    ];
    setPlans(all);
  }, []);

  const handleView = (vcn) => {
    navigate(`/stowage/view/${vcn}`);
  };

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete?.isLocal && planToDelete?.vcn) {
      localStorage.removeItem(`stowagePlan_${planToDelete.vcn}`);
      setPlans(plans.filter((p) => p.vcn !== planToDelete.vcn));
    }
    setDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  return (
    <PageWrapper title="Stowage Plans">
      <Box sx={{ p: isMobile ? 2 : 4 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 4,
            mb: 4,
            background: "#f9f8f3",
            backdropFilter: "blur(8px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 2 : 0,
            }}
          >
            <Avatar
              sx={{
                mr: 2,
                width: 56,
                height: 56,
                bgcolor: "#2D3436",
                color: theme.palette.primary.contrastText,
              }}
            >
              <DirectionsBoatIcon fontSize="large" />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Stowage Plans Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and manage all stowage plans
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/stowage/add")}
              sx={{
                ml: isMobile ? 0 : "auto",
                bgcolor: "#2D3436",
                "&:hover": { bgcolor: "#3A4345" },
              }}
            >
              Add New Plan
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Chip
              label={`${plans.length} ${plans.length === 1 ? "Plan" : "Plans"}`}
              color="primary"
              sx={{ px: 2, py: 1, fontSize: "0.875rem" }}
            />
            {!isMobile && (
              <Typography variant="body2" color="text.secondary">
                Click on view to see plan details
              </Typography>
            )}
          </Box>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="stowage plans table">
              <TableHead sx={{ bgcolor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>VCN</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Terminal</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>FWD Draft</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>AFT Draft</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <TableRow
                      key={plan.vcn}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {plan.vcn}
                      </TableCell>
                      <TableCell>{plan.terminal || "-"}</TableCell>
                      <TableCell>{plan.draftFwd || "-"}</TableCell>
                      <TableCell>{plan.draftAft || "-"}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="view"
                          onClick={() => handleView(plan.vcn)}
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {plan.isLocal && (
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteClick(plan)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No stowage plans found. Create your first plan!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the stowage plan for VCN:{" "}
            {planToDelete?.vcn}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default StowagePlanDashboard;
