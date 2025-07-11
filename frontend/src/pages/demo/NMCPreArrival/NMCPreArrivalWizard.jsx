import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Divider,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import PageWrapper from "../layout/PageWrapper";

// Import all your step components
import Step1VoyageDetails from "./steps/Step1VoyageDetails";
import Step2VesselCertificates from "./steps/Step2VesselCertificates";
import Step3CrewPassenger from "./steps/Step3CrewPassenger";
import Step4CargoStores from "./steps/Step4CargoStores";
import Step5HealthDeclarations from "./steps/Step5HealthDeclarations";
import Step6BallastGarbage from "./steps/Step6BallastGarbage";
import Step7PortServiceRequests from "./steps/Step7PortServiceRequests";
import Step8ISPSDocuments from "./steps/Step8ISPSDocuments";
import Step9UploadedPDFReview from "./steps/Step9UploadedPDFReview";
import Step10DynamicCompliance from "./steps/Step10DynamicCompliance";
import Step11FinalReview from "./steps/Step11FinalReview";
import Step12SubmitConfirm from "./steps/Step12SubmitConfirm";
import SubmissionSuccess from "./steps/SubmissionSuccess";

const steps = [
  "Voyage Details",
  "Vessel Certificates",
  "Crew & Passenger",
  "Cargo & Stores",
  "Health Declarations",
  "Ballast & Garbage",
  "Port Service Requests",
  "ISPS Documents",
  "PDF Review",
  "Dynamic Compliance",
  "Final Review",
  "Submit Confirmation",
];

const NMCPreArrivalWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submissionId, setSubmissionId] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  // Load saved draft
  useEffect(() => {
    const saved = localStorage.getItem("nmcPreArrivalData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.warn("Invalid saved form data.");
      }
    }
  }, []);

  // Save automatically
  useEffect(() => {
    localStorage.setItem("nmcPreArrivalData", JSON.stringify(formData));
  }, [formData]);

  const updateStepData = (stepKey, newData) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...newData },
    }));
  };

  const resetStep = (stepKey) => {
    const updated = { ...formData, [stepKey]: {} };
    setFormData(updated);
    localStorage.setItem("nmcPreArrivalData", JSON.stringify(updated));
  };

  const goToStep = (stepNum) => {
    setCurrentStep(Math.max(1, Math.min(stepNum, 13)));
  };

  const saveDraft = () => {
    localStorage.setItem("nmcPreArrivalData", JSON.stringify(formData));
    setSaveDialogOpen(true);
  };

  const handleFinalSubmit = () => {
    const id = "NMC-" + Date.now();
    setSubmissionId(id);
    setSubmittedAt(new Date().toLocaleString());
    goToStep(13);
  };

  const getComplianceScore = () => {
    let score = 0;
    if (formData.step1?.vesselName) score += 10;
    if ((formData.step2?.certificates || []).length > 0) score += 10;
    if (
      formData.step3?.fal4 ||
      formData.step3?.fal5 ||
      formData.step3?.fal6 ||
      formData.step3?.fal7
    )
      score += 20;
    if (formData.step4?.cargoList || formData.step4?.storesList) score += 10;
    if (formData.step5?.captainName) score += 10;
    if (formData.step6?.garbageUploaded || formData.step6?.ballastInfo)
      score += 10;
    if (formData.step7?.servicesRequested) score += 10;
    if (formData.step8?.ispsCertificate) score += 10;
    if (formData.step10?.complianceIssues?.length === 0) score += 10;
    return Math.min(score, 100);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1VoyageDetails
            data={formData.step1}
            updateData={(d) => updateStepData("step1", d)}
            goToStep={goToStep}
          />
        );
      case 2:
        return (
          <Step2VesselCertificates
            data={formData.step2}
            updateData={(d) => updateStepData("step2", d)}
            goToStep={goToStep}
          />
        );
      // ... all other cases

      case 3:
        return (
          <Step3CrewPassenger
            data={formData.step3}
            updateData={(d) => updateStepData("step3", d)}
            goToStep={goToStep}
          />
        );
      case 4:
        return (
          <Step4CargoStores
            data={formData.step4}
            updateData={(d) => updateStepData("step4", d)}
            goToStep={goToStep}
          />
        );
      case 5:
        return (
          <Step5HealthDeclarations
            data={formData.step5}
            updateData={(d) => updateStepData("step5", d)}
            goToStep={goToStep}
          />
        );
      case 6:
        return (
          <Step6BallastGarbage
            data={formData.step6}
            updateData={(d) => updateStepData("step6", d)}
            goToStep={goToStep}
          />
        );
      case 7:
        return (
          <Step7PortServiceRequests
            data={formData.step7}
            updateData={(d) => updateStepData("step7", d)}
            goToStep={goToStep}
          />
        );
      case 8:
        return (
          <Step8ISPSDocuments
            data={formData.step8}
            updateData={(d) => updateStepData("step8", d)}
            goToStep={goToStep}
          />
        );
      case 9:
        return <Step9UploadedPDFReview data={formData} goToStep={goToStep} />;
      case 10:
        return (
          <Step10DynamicCompliance
            data={formData}
            updateData={(d) => updateStepData("step10", d)}
            goToStep={goToStep}
          />
        );
      case 11:
        return <Step11FinalReview data={formData} goToStep={goToStep} />;
      case 12:
        return (
          <Step12SubmitConfirm
            data={formData}
            agreed={agreed}
            setAgreed={setAgreed}
          />
        );
      case 13:
        return (
          <SubmissionSuccess
            submissionId={submissionId}
            submittedAt={submittedAt}
          />
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <PageWrapper title="Create New Port Call Notification">
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
                NMC Pre-Arrival Notification
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Complete all steps to submit your port call notification
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <VerifiedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ mr: 2 }}>
              IMO Compliance Status: <strong>{getComplianceScore()}%</strong>
            </Typography>
            <LinearProgress
              variant="determinate"
              value={getComplianceScore()}
              sx={{
                flexGrow: 1,
                height: 10,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor:
                    getComplianceScore() > 75
                      ? "#4caf50"
                      : getComplianceScore() > 50
                      ? "#ff9800"
                      : "#f44336",
                },
              }}
            />
          </Box>

          <Stepper activeStep={currentStep - 1} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStep()}

          {currentStep <= 12 && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Box>
                {currentStep > 1 && (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => goToStep(currentStep - 1)}
                    sx={{ mr: 2 }}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={() => resetStep(`step${currentStep}`)}
                >
                  Reset Step
                </Button>
              </Box>

              <Box>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={saveDraft}
                  sx={{ mr: 2 }}
                >
                  Save Draft
                </Button>

                {currentStep < 12 ? (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => goToStep(currentStep + 1)}
                    sx={{
                      bgcolor: "#2D3436",
                      "&:hover": { bgcolor: "#3A4345" },
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleFinalSubmit}
                    disabled={!agreed}
                    sx={{
                      bgcolor: "#2D3436",
                      "&:hover": { bgcolor: "#3A4345" },
                    }}
                  >
                    Confirm & Submit
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        aria-labelledby="save-dialog-title"
      >
        <DialogTitle id="save-dialog-title">Draft Saved</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your draft has been successfully saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default NMCPreArrivalWizard;
