import React, { useState, useEffect } from "react";
import "./Step3LandingPage.css";
import Step3Sidebar from "./Step3Sidebar";

import DPGForm from "../forms/DPGForm";
import CargoForm from "../forms/CargoForm";
import ShipStoresForm from "../forms/ShipStoresForm";
import CrewForm from "../forms/CrewForm";
import PaxForm from "../forms/PaxForm";
import SecurityForm from "../forms/SecurityForm";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Card,
  TextField,
  Chip,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
} from "@mui/material";

const STORAGE_KEY = "NMC_DRAFT_DATA";

const PORT_CALL_PURPOSES = [
  "Bunkering",
  "Loading",
  "Discharging",
  "Repairs",
  "Cruising",
  "Weather Restrictions",
  "Other",
  "Crew change",
  "Force Majeure",
  "Lifting",
  "Provisioning",
  "Processing Fish",
  "Arrested",
  "For Orders",
  "Stand By",
  "Lay Up",
  "Anchoring",
  "Towing",
  "Testing",
  "Medical Assistance",
  "Wrecked Ship",
  "Ship To Ship Operations",
  "Research",
  "Seismic Activity",
  "Diving",
  "Underwater Work",
];

const REPORTING_CATEGORIES = [
  { id: "dpg", label: "Dangerous Goods (DPG)", icon: <ReportProblemIcon /> },
  { id: "cargo", label: "Cargo", icon: <Inventory2Icon /> },
  { id: "shipStores", label: "Ship Stores", icon: <StoreIcon /> },
  { id: "crew", label: "Crew", icon: <GroupIcon /> },
  { id: "pax", label: "Pax", icon: <AirlineSeatReclineNormalIcon /> },
  { id: "security", label: "Security", icon: <SecurityIcon /> },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StatusChip = ({ status }) => {
  const color = status === "completed" ? "success" : "warning";
  const icon = status === "completed" ? <CheckCircleIcon /> : <ErrorIcon />;

  return (
    <Chip
      icon={icon}
      label={status}
      color={color}
      size="small"
      sx={{ ml: 1, textTransform: "capitalize" }}
    />
  );
};

const Step3LandingPage = ({ data, onDataChange, goToPrev, goToStep }) => {
  // Destructure with default empty objects to avoid undefined errors
  const {
    basicInfo = {},
    selectedReports = {},
    formsData = {},
    formStatus = {},
    isActivated = false,
  } = data || {};

  // Local state mirrors data to allow form interaction
  const [crewCount, setCrewCount] = useState(basicInfo.crew_count || "");
  const [passengerCount, setPassengerCount] = useState(
    basicInfo.passenger_count || ""
  );
  const [actualDraught, setActualDraught] = useState(
    basicInfo.actual_draught || ""
  );
  const [airDraught, setAirDraught] = useState(basicInfo.air_draught || "");
  const [cargoBrief, setCargoBrief] = useState(basicInfo.cargo_brief || "");
  const [portCallPurpose, setPortCallPurpose] = useState(
    basicInfo.port_call_purpose || ""
  );

  const [localSelectedReports, setLocalSelectedReports] =
    useState(selectedReports);
  const [localFormsData, setLocalFormsData] = useState(formsData);
  const [localFormStatus, setLocalFormStatus] = useState(formStatus);

  // Feedback messages
  const [basicSaveMessage, setBasicSaveMessage] = useState("");
  const [formSaveMessages, setFormSaveMessages] = useState({});

  // Sync local states with incoming data props
  useEffect(() => {
    setCrewCount(basicInfo.crew_count || "");
    setPassengerCount(basicInfo.passenger_count || "");
    setActualDraught(basicInfo.actual_draught || "");
    setAirDraught(basicInfo.air_draught || "");
    setCargoBrief(basicInfo.cargo_brief || "");
    setPortCallPurpose(basicInfo.port_call_purpose || "");

    setLocalSelectedReports(selectedReports);
    setLocalFormsData(formsData);
    setLocalFormStatus(formStatus);
  }, [basicInfo, selectedReports, formsData, formStatus]);

  // Save all data to localStorage + propagate to parent
  const saveAllData = (overrides = {}) => {
    const updatedData = {
      basicInfo: {
        crew_count: crewCount,
        passenger_count: passengerCount,
        actual_draught: actualDraught,
        air_draught: airDraught,
        cargo_brief: cargoBrief,
        port_call_purpose: portCallPurpose,
        ...overrides.basicInfo,
      },
      selectedReports: {
        ...localSelectedReports,
        ...overrides.selectedReports,
      },
      formsData: { ...localFormsData, ...overrides.formsData },
      formStatus: { ...localFormStatus, ...overrides.formStatus },
      isActivated:
        overrides.isActivated !== undefined
          ? overrides.isActivated
          : isActivated,
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

    // Propagate to parent component (wizard)
    if (onDataChange) onDataChange(updatedData);

    return updatedData;
  };

  // Save basics handler
  const onSaveBasics = () => {
    saveAllData();
    setBasicSaveMessage("Basic port call info saved locally.");
    setTimeout(() => setBasicSaveMessage(""), 3000);
  };

  // Toggle reporting checkbox
  const toggleReport = (id) => {
    const newSelected = {
      ...localSelectedReports,
      [id]: !localSelectedReports[id],
    };
    setLocalSelectedReports(newSelected);
    saveAllData({ selectedReports: newSelected });
  };

  // Save individual form data
  const onSaveForm = (id, formData) => {
    const newFormsData = { ...localFormsData, [id]: formData };
    const newFormStatus = { ...localFormStatus, [id]: "completed" };
    setLocalFormsData(newFormsData);
    setLocalFormStatus(newFormStatus);
    saveAllData({ formsData: newFormsData, formStatus: newFormStatus });
    setFormSaveMessages((prev) => ({
      ...prev,
      [id]: `${id.toUpperCase()} form saved locally.`,
    }));
    setTimeout(() => {
      setFormSaveMessages((prev) => ({ ...prev, [id]: "" }));
    }, 3000);
  };

  // Reset all step 3 data locally and in localStorage
  const resetStep3Data = () => {
    if (window.confirm("Reset all Step 3 data? This cannot be undone.")) {
      const resetData = {
        basicInfo: {},
        selectedReports: {},
        formsData: {},
        formStatus: {},
        isActivated: false,
      };
      localStorage.removeItem(STORAGE_KEY);
      setCrewCount("");
      setPassengerCount("");
      setActualDraught("");
      setAirDraught("");
      setCargoBrief("");
      setPortCallPurpose("");
      setLocalSelectedReports({});
      setLocalFormsData({});
      setLocalFormStatus({});
      setBasicSaveMessage("");
      setFormSaveMessages({});
      if (onDataChange) onDataChange(resetData);
    }
  };

  // Render forms dynamically
  const renderForm = (id) => {
    const props = {
      savedData: localFormsData[id],
      onSave: (data) => onSaveForm(id, data),
    };
    switch (id) {
      case "dpg":
        return <DPGForm {...props} />;
      case "cargo":
        return <CargoForm {...props} />;
      case "shipStores":
        return <ShipStoresForm {...props} />;
      case "crew":
        return <CrewForm {...props} />;
      case "pax":
        return <PaxForm {...props} />;
      case "security":
        return <SecurityForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StyledPaper sx={{ mb: 2 }}>
        <h2>Port Call Registration - Reporting Forms</h2>
      </StyledPaper>

      <Box sx={{ display: "flex", flexGrow: 1, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <StyledCard sx={{ p: 3 }}>
            <h3>Crew, Passengers and Dimensions</h3>
            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
              <StyledTextField
                placeholder="Number of Crew"
                type="number"
                fullWidth
                value={crewCount}
                onChange={(e) => setCrewCount(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <StyledTextField
                placeholder="Number of Passengers"
                type="number"
                fullWidth
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <StyledTextField
                placeholder="Actual Draught"
                fullWidth
                value={actualDraught}
                onChange={(e) => setActualDraught(e.target.value)}
              />
              <StyledTextField
                placeholder="Air Draught"
                fullWidth
                value={airDraught}
                onChange={(e) => setAirDraught(e.target.value)}
              />
            </Box>
          </StyledCard>

          <StyledCard sx={{ p: 3 }}>
            <h3>Cargo Brief Description</h3>
            <StyledTextField
              multiline
              rows={4}
              fullWidth
              value={cargoBrief}
              onChange={(e) => setCargoBrief(e.target.value)}
              placeholder="Brief description of cargo"
            />
          </StyledCard>

          <StyledCard sx={{ p: 3 }}>
            <h3>Port Call Purpose</h3>
            <FormControl fullWidth>
              <InputLabel>Select purpose</InputLabel>
              <Select
                value={portCallPurpose}
                onChange={(e) => {
                  setPortCallPurpose(e.target.value);
                  onDataChange({
                    ...data,
                    basicInfo: {
                      ...basicInfo,
                      port_call_purpose: e.target.value,
                    },
                  });
                }}
                input={<OutlinedInput placeholder="Select purpose" />}
              >
                {PORT_CALL_PURPOSES.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledCard>

          {basicSaveMessage && (
            <Box sx={{ color: "success.main", mb: 2 }}>{basicSaveMessage}</Box>
          )}

          <Button
            variant="contained"
            onClick={onSaveBasics}
            sx={{
              px: 4,
              py: 1.5,
              mb: 3,
              borderRadius: 2,
              background: "#2D3436",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                background: "#1a1f21",
              },
            }}
          >
            Save Basic Info
          </Button>

          <StyledCard sx={{ p: 3 }}>
            <h3>Reporting for this Port Call</h3>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {REPORTING_CATEGORIES.map(({ id, label, icon }) => (
                <Button
                  key={id}
                  variant={localSelectedReports[id] ? "contained" : "outlined"}
                  startIcon={icon}
                  onClick={() => toggleReport(id)}
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {label}
                  {localFormStatus[id] && (
                    <StatusChip status={localFormStatus[id]} />
                  )}
                </Button>
              ))}
            </Box>
          </StyledCard>

          {Object.entries(localSelectedReports).map(
            ([id, selected]) =>
              selected && (
                <StyledCard key={id} sx={{ p: 3 }}>
                  {renderForm(id)}
                  {formSaveMessages[id] && (
                    <Box sx={{ color: "success.main", mt: 2 }}>
                      {formSaveMessages[id]}
                    </Box>
                  )}
                </StyledCard>
              )
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" onClick={goToPrev}>
              ← Back
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" color="error" onClick={resetStep3Data}>
                Reset Data
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => goToStep(4)}
                disabled={isActivated}
                sx={{ background: "#2D3436" }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: "300px" }}>
          <Step3Sidebar formData={basicInfo} formStatus={formStatus} />
        </Box>
      </Box>
    </Box>
  );
};

export default Step3LandingPage;
