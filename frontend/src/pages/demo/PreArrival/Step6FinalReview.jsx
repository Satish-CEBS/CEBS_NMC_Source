import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  styled,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  DirectionsBoat as VesselIcon,
  People as CrewIcon,
  Engineering as ServicesIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
}));

const Step6FinalReview = ({ formData = {}, goToStep, onSubmit }) => {
  const {
    voyageDetails = {},
    vesselDocuments = {},
    crewPassenger = {},
    servicesRequested = [],
    securityClearance = {},
  } = formData;

  const handleReset = () => {
    localStorage.removeItem("preArrivalForm");
    window.location.reload();
  };

  const handleSaveDraft = () => {
    localStorage.setItem("preArrivalForm", JSON.stringify(formData));
    alert("Draft saved locally.");
  };

  const renderSection = (title, icon, content) => (
    <StyledPaper>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {content}
    </StyledPaper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AssignmentIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Final Review & Submission
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Review all submitted information before final submission
          </Typography>
        </Box>
      </Box>

      {/* Voyage Details */}
      {renderSection(
        "Voyage Details",
        <VesselIcon sx={{ color: "#2D3436" }} />,
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Voyage Number:</strong>{" "}
              {voyageDetails.voyage_number || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>ETA:</strong> {voyageDetails.eta || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Vessel Name:</strong>{" "}
              {voyageDetails.vessel?.name || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Call Sign:</strong>{" "}
              {voyageDetails.vessel?.call_sign || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Last Port:</strong>{" "}
              {voyageDetails.last_port?.name || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Next Port:</strong>{" "}
              {voyageDetails.next_port?.name || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Purposes:</strong>{" "}
              {voyageDetails.purposes?.join(", ") || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* Vessel Documents */}
      {renderSection(
        "Vessel Documents",
        <DescriptionIcon sx={{ color: "#2D3436" }} />,
        <List dense>
          {Object.entries(vesselDocuments).map(([key, val]) => (
            <ListItem key={key}>
              <ListItemIcon>
                <CheckCircleIcon color={val?.name ? "success" : "disabled"} />
              </ListItemIcon>
              <ListItemText
                primary={key}
                secondary={val?.name || "Not uploaded"}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Crew & Passenger */}
      {renderSection(
        "Crew & Passenger",
        <CrewIcon sx={{ color: "#2D3436" }} />,
        <List dense>
          <ListItem>
            <ListItemText
              primary={`Crew List: ${
                crewPassenger?.crewList?.length || 0
              } entries`}
              secondary={
                crewPassenger?.crewList?.length ? "" : "No crew list entries"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Passenger List: ${
                crewPassenger?.passengerList?.length || 0
              } entries`}
              secondary={
                crewPassenger?.passengerList?.length
                  ? ""
                  : "No passenger list entries"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Crew Effects: ${
                crewPassenger?.crewEffects?.length || 0
              } entries`}
              secondary={
                crewPassenger?.crewEffects?.length
                  ? ""
                  : "No crew effects declared"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Dangerous Goods: ${
                crewPassenger?.dangerousGoods?.length || 0
              } items`}
              secondary={
                crewPassenger?.dangerousGoods?.length
                  ? ""
                  : "No dangerous goods declared"
              }
            />
          </ListItem>
        </List>
      )}

      {/* Services */}
      {renderSection(
        "Requested Services",
        <ServicesIcon sx={{ color: "#2D3436" }} />,
        servicesRequested?.length ? (
          <List dense>
            {servicesRequested.map((srv, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={srv} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Alert severity="info">No services selected</Alert>
        )
      )}

      {/* Security */}
      {renderSection(
        "Security & Clearance",
        <SecurityIcon sx={{ color: "#2D3436" }} />,
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>ISSC No:</strong>{" "}
              {securityClearance?.issc_number || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Issued By:</strong>{" "}
              {securityClearance?.issuing_authority || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              <strong>Valid Until:</strong>{" "}
              {securityClearance?.valid_until || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Security Level:</strong>{" "}
              {securityClearance?.security_level || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => goToStep(5)}
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
          Back to Step 5
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleSaveDraft}
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
            Save Draft
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
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
            Submit Pre-Arrival Notification
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step6FinalReview;
