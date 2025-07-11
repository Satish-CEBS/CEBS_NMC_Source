import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertTitle,
  styled,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
}));

const requiredDocs = [
  {
    key: "fal_form_1",
    label: "FAL Form 1 – General Declaration",
    required: true,
  },
  {
    key: "security_certificate",
    label: "Security Certificate",
    required: false,
  },
  {
    key: "health_certificate",
    label: "Maritime Health Certificate",
    required: false,
  },
  { key: "checklist", label: "Pre-arrival Checklist", required: false },
];

const Step2VesselDocuments = ({ data = {}, update, goToStep }) => {
  const [localData, setLocalData] = useState({ ...data });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLocalData({ ...data });
  }, [data]);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    const updated = { ...localData, [key]: file };
    setLocalData(updated);
    update(updated);
    // Clear any errors for this field
    setErrors(errors.filter((err) => !err.includes(key)));
  };

  const handleNext = () => {
    const missing = requiredDocs.filter(
      (doc) => doc.required && !localData[doc.key]
    );
    if (missing.length > 0) {
      setErrors(missing.map((doc) => `Please upload ${doc.label}`));
      return;
    }
    goToStep(3);
  };

  const handleBack = () => {
    goToStep(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <SectionHeader
        icon={<DescriptionIcon sx={{ fontSize: 28 }} />}
        title="Upload Vessel Documents"
        subtitle="Please upload required documents for vessel clearance"
      />

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {requiredDocs.map((doc) => (
          <StyledPaper key={doc.key} sx={{ mb: 2 }}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {doc.label}{" "}
                    {doc.required && <span style={{ color: "red" }}>*</span>}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Upload {doc.required ? "required" : "optional"} document as
                    PDF or image
                  </Typography>
                }
              />

              <FormControl fullWidth sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    mt: 1,
                    alignSelf: "flex-start",
                    borderColor: "#2D3436",
                    color: "#2D3436",
                    "&:hover": {
                      backgroundColor: "rgba(45, 52, 54, 0.04)",
                      borderColor: "#2D3436",
                    },
                  }}
                >
                  Select File
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, doc.key)}
                    sx={{ display: "none" }}
                  />
                </Button>
                {localData[doc.key] && (
                  <FormHelperText
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "success.main",
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16, mr: 1 }} />
                    File selected:{" "}
                    <strong style={{ marginLeft: 4 }}>
                      {localData[doc.key].name}
                    </strong>
                  </FormHelperText>
                )}
              </FormControl>
            </ListItem>
          </StyledPaper>
        ))}
      </List>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Missing Required Documents</AlertTitle>
          {errors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
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
          Back
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
          Continue to Step 3
        </Button>
      </Box>
    </Box>
  );
};

// Reusable SectionHeader component from the reference
const SectionHeader = ({ icon, title, subtitle }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
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

export default Step2VesselDocuments;
