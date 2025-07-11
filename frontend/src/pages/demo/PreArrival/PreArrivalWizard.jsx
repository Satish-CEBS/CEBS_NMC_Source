import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  styled,
  Alert,
  AlertTitle,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

import InnerHeader from "../../common/InnerHeader";
import InnerSubHeader from "../../common/InnerSubHeader";
import SidebarMenu from "../../common/SidebarMenu";
import Footer from "../../common/Footer";

import Step1VoyageDetails from "./Step1VoyageDetails";
import Step2VesselDocuments from "./Step2VesselDocuments";
import Step3CrewPassenger from "./Step3CrewPassenger";
import Step4ServicesRequested from "./Step4ServicesRequested";
import Step5SecurityClearance from "./Step5SecurityClearance";
import Step6FinalReview from "./Step6FinalReview";
import MaritimeLayout from "../../common/Applayout";

const STORAGE_KEY = "PRE_ARRIVAL_DRAFT";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const PreArrivalWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          voyageDetails: {},
          vesselDocuments: {},
          crewPassengerDocs: {},
          servicesRequested: [],
          securityClearance: {},
          isSubmitted: false,
        };
  });

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const updateArrayField = (section, array) => {
    setFormData((prev) => ({
      ...prev,
      [section]: array,
    }));
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const resetDraft = () => {
    setShowResetAlert(true);
  };

  const confirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      voyageDetails: {},
      vesselDocuments: {},
      crewPassengerDocs: {},
      servicesRequested: [],
      securityClearance: {},
      isSubmitted: false,
    });
    setCurrentStep(1);
    setShowResetAlert(false);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const handleFinalSubmit = () => {
    const updatedData = { ...formData, isSubmitted: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setFormData(updatedData);
    setShowSubmitAlert(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };

  const stepTitles = [
    "Voyage Details",
    "Vessel Documents",
    "Crew & Passenger",
    "Services Requested",
    "Security Clearance",
    "Final Review",
  ];

  return (
    <MaritimeLayout>
      <div className="dashboard">
        <div className="dashboard-body">
          <main className="dashboard-content">
            <StyledPaper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DirectionsBoatIcon
                    sx={{
                      fontSize: 32,
                      color: "#2D3436",
                      mr: 2,
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Pre-Arrival Wizard – {stepTitles[currentStep - 1]}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={saveDraft}
                    sx={{
                      mr: 2,
                      color: "#2D3436",
                      borderColor: "#2D3436",
                      "&:hover": {
                        backgroundColor: "rgba(45, 52, 54, 0.04)",
                        borderColor: "#2D3436",
                      },
                    }}
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={resetDraft}
                    sx={{
                      color: "#d32f2f",
                      borderColor: "#d32f2f",
                      "&:hover": {
                        backgroundColor: "rgba(211, 47, 47, 0.04)",
                        borderColor: "#d32f2f",
                      },
                    }}
                  >
                    Reset Draft
                  </Button>
                </Box>
              </Box>

              {showSaveAlert && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  <AlertTitle>Success</AlertTitle>
                  Draft saved successfully!
                </Alert>
              )}

              {showResetAlert && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  <AlertTitle>Warning</AlertTitle>
                  Are you sure you want to clear all entered data?
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setShowResetAlert(false)}
                      sx={{ mr: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={confirmReset}
                      sx={{
                        backgroundColor: "#d32f2f",
                        "&:hover": { backgroundColor: "#b71c1c" },
                      }}
                    >
                      Confirm Reset
                    </Button>
                  </Box>
                </Alert>
              )}

              {showSubmitAlert && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  <AlertTitle>Success</AlertTitle>
                  Pre-Arrival Notification Submitted!
                </Alert>
              )}

              {currentStep === 1 && (
                <Step1VoyageDetails
                  formData={formData.voyageDetails}
                  updateBasicInfo={(data) =>
                    updateSection("voyageDetails", data)
                  }
                  goToStep={goToStep}
                />
              )}

              {currentStep === 2 && (
                <Step2VesselDocuments
                  data={formData.vesselDocuments}
                  update={(data) => updateSection("vesselDocuments", data)}
                  goToStep={goToStep}
                />
              )}

              {currentStep === 3 && (
                <Step3CrewPassenger
                  data={formData.crewPassengerDocs}
                  update={(data) => updateSection("crewPassengerDocs", data)}
                  goToStep={goToStep}
                />
              )}

              {currentStep === 4 && (
                <Step4ServicesRequested
                  selected={formData.servicesRequested}
                  update={(arr) => updateArrayField("servicesRequested", arr)}
                  goToStep={goToStep}
                />
              )}

              {currentStep === 5 && (
                <Step5SecurityClearance
                  data={formData.securityClearance}
                  update={(data) => updateSection("securityClearance", data)}
                  goToStep={goToStep}
                />
              )}

              {currentStep === 6 && (
                <Step6FinalReview
                  formData={formData}
                  goToStep={goToStep}
                  onSubmit={handleFinalSubmit}
                />
              )}
            </StyledPaper>
          </main>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default PreArrivalWizard;
