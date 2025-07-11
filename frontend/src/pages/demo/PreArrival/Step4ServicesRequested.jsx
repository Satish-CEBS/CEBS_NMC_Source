import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Alert,
  AlertTitle,
  Dialog,
  styled,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
}));

const portServicesList = [
  "Pilotage",
  "Towage",
  "Garbage Collection",
  "Bunkering",
  "Water Supply",
  "Crew Transfer",
  "Provisioning",
  "Medical Evacuation",
  "Quarantine Boarding",
  "Port Health Inspection",
  "Immigration Boarding",
  "Customs Boarding",
  "Freshwater Delivery",
  "Cargo Survey",
  "Other",
];

const Step4ServicesRequested = ({ data = [], update, goToStep }) => {
  const [selectedServices, setSelectedServices] = useState(data || []);
  const [otherNote, setOtherNote] = useState("");
  const [errors, setErrors] = useState([]);

  const toggleService = (service) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(updated);
    setErrors([]);
  };

  const handleNext = () => {
    const errs = [];
    if (selectedServices.length === 0) {
      errs.push("Please select at least one service.");
    }
    if (selectedServices.includes("Other") && !otherNote.trim()) {
      errs.push('Please specify the "Other" service requested.');
    }

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    const updatedWithNote = selectedServices.filter((s) => s !== "Other");
    if (selectedServices.includes("Other")) {
      updatedWithNote.push(`Other: ${otherNote.trim()}`);
    }

    update(updatedWithNote);
    goToStep(5);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <DescriptionIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Port Services Requested
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Select all port services required for this vessel's call
          </Typography>
        </Box>
      </Box>

      <StyledPaper>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Available Port Services
        </Typography>

        {errors.length > 0 && (
          <Alert
            severity="error"
            icon={<WarningIcon fontSize="inherit" />}
            sx={{ mb: 3 }}
          >
            <AlertTitle>Validation Errors</AlertTitle>
            {errors.map((err, idx) => (
              <div key={idx}>• {err}</div>
            ))}
          </Alert>
        )}

        <Grid container spacing={2}>
          {portServicesList.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                    color="primary"
                  />
                }
                label={service}
              />
            </Grid>
          ))}
        </Grid>

        {selectedServices.includes("Other") && (
          <Box sx={{ mt: 3 }}>
            <TextField
              placeholder="Specify Other Service"
              fullWidth
              value={otherNote}
              onChange={(e) => setOtherNote(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Box>
        )}
      </StyledPaper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => goToStep(3)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderColor: "#2D3436",
            color: "#2D3436",
            "&:hover": {
              backgroundColor: "rgba(45, 52, 54, 0.04)",
              borderColor: "#2D3436",
            },
          }}
        >
          Back to Step 3
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          sx={{
            px: 4,
            py: 1.5,
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
          Continue to Step 5
        </Button>
      </Box>
    </Box>
  );
};

export default Step4ServicesRequested;
