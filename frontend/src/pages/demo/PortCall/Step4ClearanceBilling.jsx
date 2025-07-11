import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Grid,
  Alert,
  AlertTitle,
  MenuItem,
} from "@mui/material";
import {
  ArrowForward,
  CheckCircle,
  Gavel,
  AssignmentTurnedIn,
  LocalShipping,
  MonetizationOn,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const SectionHeader = ({ icon, title, subtitle }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box sx={{ color: "#2D3436", mr: 1.5 }}>{icon}</Box>
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const Step4ClearanceBilling = ({ data, updateClearance, goToStep }) => {
  const [form, setForm] = useState({
    customs_clearance: "Pending",
    immigration_cleared: false,
    berth_allocation: "",
    tariff_group: "",
    charges_applied: {
      pilotage: false,
      wharfage: false,
      towage: false,
    },
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data) {
      setForm((prev) => ({
        ...prev,
        ...data,
        charges_applied: {
          ...prev.charges_applied,
          ...data.charges_applied,
        },
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
    setSuccessMessage("");
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      charges_applied: {
        ...prev.charges_applied,
        [name]: checked,
      },
    }));
    setErrors([]);
    setSuccessMessage("");
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    setErrors([]);
    setSuccessMessage("");
  };

  const validate = () => {
    const errs = [];
    if (!form.berth_allocation) errs.push("Berth Allocation is required.");
    if (!form.tariff_group) errs.push("Tariff Group is required.");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    updateClearance(form);
    setSuccessMessage(
      "Clearance details saved successfully! Proceeding to next step..."
    );
    setTimeout(() => {
      goToStep(5);
    }, 1200);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Clearance Section */}
      <StyledPaper>
        <SectionHeader
          icon={<Gavel sx={{ fontSize: 28 }} />}
          title="Customs & Immigration"
          subtitle="Update clearance status for customs and immigration"
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              select
              fullWidth
              name="customs_clearance"
              value={form.customs_clearance}
              onChange={handleChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cleared">Cleared</MenuItem>
              <MenuItem value="Flagged">Flagged</MenuItem>
            </StyledTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.immigration_cleared}
                    onChange={handleToggle}
                    name="immigration_cleared"
                    color="primary"
                  />
                }
                label="Immigration Cleared"
              />
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Berth & Tariff Section */}
      <StyledPaper>
        <SectionHeader
          icon={<LocalShipping sx={{ fontSize: 28 }} />}
          title="Berth & Tariff Information"
          subtitle="Select berth allocation and tariff group for the vessel"
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              select
              fullWidth
              //   label="Berth Allocation"
              name="berth_allocation"
              value={form.berth_allocation}
              onChange={handleChange}
              error={errors.includes("Berth Allocation is required.")}
            >
              <MenuItem value="Berth A">Berth A</MenuItem>
              <MenuItem value="Berth B">Berth B</MenuItem>
              <MenuItem value="Berth C">Berth C</MenuItem>
            </StyledTextField>
            {errors.includes("Berth Allocation is required.") && (
              <Typography variant="caption" color="error">
                Berth Allocation is required.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              select
              fullWidth
              //   label="Tariff Group"
              name="tariff_group"
              value={form.tariff_group}
              onChange={handleChange}
              error={errors.includes("Tariff Group is required.")}
            >
              <MenuItem value="Small Vessel">Small Vessel</MenuItem>
              <MenuItem value="Medium Vessel">Medium Vessel</MenuItem>
              <MenuItem value="Large Vessel">Large Vessel</MenuItem>
            </StyledTextField>
            {errors.includes("Tariff Group is required.") && (
              <Typography variant="caption" color="error">
                Tariff Group is required.
              </Typography>
            )}
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Charges Section */}
      <StyledPaper>
        <SectionHeader
          icon={<MonetizationOn sx={{ fontSize: 28 }} />}
          title="Applicable Charges"
          subtitle="Select all charges that apply to this vessel"
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.charges_applied.pilotage}
                  onChange={handleCheckboxChange}
                  name="pilotage"
                  color="primary"
                />
              }
              label="Pilotage"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.charges_applied.wharfage}
                  onChange={handleCheckboxChange}
                  name="wharfage"
                  color="primary"
                />
              }
              label="Wharfage"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.charges_applied.towage}
                  onChange={handleCheckboxChange}
                  name="towage"
                  color="primary"
                />
              }
              label="Towage"
            />
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Display errors */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}

      {/* Display success */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {/* Submit button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleNext}
          endIcon={<ArrowForward />}
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
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Step4ClearanceBilling;
