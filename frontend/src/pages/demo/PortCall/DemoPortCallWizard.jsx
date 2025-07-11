import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MaritimeLayout from "../../common/Applayout";
import VoyagesStep from "../Voyages/VoyagesStep";
import PortCallDetailsStep from "./PortCallDetailsStep";
import Step3LandingPage from "./Step3LandingPage";
import Step4ClearanceBilling from "./Step4ClearanceBilling";
import Step5ReviewSubmit from "./Step5ReviewSubmit";

const STORAGE_KEY = "NMC_FORM_DATA";

const steps = [
  "Voyage Selection",
  "Port Call Details",
  "Forms Selection",
  "Clearance & Billing",
  "Review & Submit",
];

const DemoPortCallWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      console.log("Loaded formData from localStorage:", JSON.parse(saved));
    }
    return saved
      ? JSON.parse(saved)
      : {
          basicInfo: {},
          selectedReports: {},
          formsData: {},
          formStatus: {},
          clearance: {},
          isActivated: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log("Saved formData to localStorage:", formData);
  }, [formData]);

  const updateFormData = (updatedData) => {
    setFormData((prev) => {
      const newData = { ...prev, ...updatedData };
      console.log("Updated centralized formData:", newData);
      return newData;
    });
  };

  const updateBasicInfo = (basicInfo) => {
    setFormData((prev) => {
      const newData = { ...prev, basicInfo };
      console.log("Updated basicInfo:", basicInfo);
      return newData;
    });
  };

  const updateClearance = (clearance) => {
    setFormData((prev) => {
      const newData = { ...prev, clearance };
      console.log("Updated clearance info:", clearance);
      return newData;
    });
  };

  const activateAndSubmit = () => {
    const finalData = { ...formData, isActivated: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
    setFormData(finalData);
    console.log("Port Call Final Submission:", finalData);
    window.location.href = "/dashboard";
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log("Draft saved:", formData);
  };

  const handleResetClick = () => {
    setResetDialogOpen(true);
  };

  const resetDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      basicInfo: {},
      selectedReports: {},
      formsData: {},
      formStatus: {},
      clearance: {},
      isActivated: false,
    });
    setCurrentStep(1);
    console.log("Draft reset and localStorage cleared");
    setResetDialogOpen(false);
  };

  const goToStep = (stepNum) => {
    console.log(`Navigating to step ${stepNum}`);
    setCurrentStep(stepNum);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VoyagesStep
            formData={formData.basicInfo}
            updateBasicInfo={updateBasicInfo}
            goToStep={goToStep}
          />
        );
      case 2:
        return (
          <PortCallDetailsStep
            formData={formData}
            setFormData={updateFormData}
            goToStep={goToStep}
          />
        );
      case 3:
        return (
          <Step3LandingPage
            data={formData}
            onDataChange={updateFormData}
            goToStep={goToStep}
          />
        );
      case 4:
        return (
          <Step4ClearanceBilling
            data={formData.clearance || {}}
            updateClearance={updateClearance}
            goToStep={goToStep}
          />
        );
      case 5:
        return (
          <Step5ReviewSubmit
            data={formData}
            goToStep={goToStep}
            onFinalSubmit={activateAndSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MaritimeLayout>
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
                Port Call Notification Wizard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Complete all steps to submit your port call notification
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={saveDraft}
                sx={{ ml: isMobile ? 0 : "auto" }}
              >
                Save Draft
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<RestartAltIcon />}
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Chip
                label={`Step ${currentStep} of ${steps.length}`}
                color="#2D3436"
                sx={{
                  ml: isMobile ? 0 : "auto",
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  display: isMobile ? "none" : "flex",
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Stepper
            activeStep={currentStep - 1}
            alternativeLabel={!isMobile}
            sx={{
              mb: 6,
              "& .MuiStepLabel-label": {
                fontWeight: 600,
                color: theme.palette.text.primary,
              },
              "& .MuiStepLabel-label.Mui-active": {
                fontWeight: 700,
              },
              "& .MuiStepLabel-label.Mui-completed": {
                color: theme.palette.text.secondary,
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent()}

          {currentStep > 1 && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => goToStep(currentStep - 1)}
                sx={{ mr: 2 }}
              >
                Back
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        aria-labelledby="reset-dialog-title"
      >
        <DialogTitle id="reset-dialog-title">Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the entire draft? This will erase all
            your data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
          <Button onClick={resetDraft} color="error" autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </MaritimeLayout>
  );
};

export default DemoPortCallWizard;
