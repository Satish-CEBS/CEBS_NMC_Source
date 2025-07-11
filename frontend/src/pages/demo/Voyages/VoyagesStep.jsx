import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Paper,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Search as SearchIcon,
  DirectionsBoat,
  Flag,
  CalendarToday,
  ArrowForward,
  CheckCircle,
  Error,
  Sailing,
  Anchor,
  LocationOn,
  DepartureBoard,
  Navigation,
  Schedule,
} from "@mui/icons-material";
import vesselsList from "../../../mockData/vessels.json";
import locationsList from "../../../mockData/locations.json";
import { styled } from "@mui/material/styles";

const country3to2 = {
  ARE: "ae",
  BHS: "bs",
  PAN: "pa",
  DNK: "dk",
  LBR: "lr",
  USA: "us",
  GBR: "gb",
  ITA: "it",
  SGP: "sg",
  KOR: "kr",
  CHN: "cn",
  BRA: "br",
  MNE: "me",
  FRA: "fr",
  HKG: "hk",
  IND: "in",
  JPN: "jp",
  SAU: "sa",
  NLD: "nl",
  DEU: "de",
  ESP: "es",
  PRT: "pt",
  TUR: "tr",
  GRC: "gr",
  POL: "pl",
  UKR: "ua",
  RUS: "ru",
  ZAF: "za",
  OMN: "om",
  QAT: "qa",
  BHR: "bh",
  KWT: "kw",
  IRN: "ir",
  IRQ: "iq",
  YEM: "ye",
  PAK: "pk",
};

const importAllFlags = (r) => {
  let flags = {};
  r.keys().forEach((key) => {
    const code = key.replace("./", "").replace(".png", "").toLowerCase();
    flags[code] = r(key);
  });
  return flags;
};
const flagMap = importAllFlags(
  require.context("../../../assets/images/flags", false, /\.png$/)
);

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

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
  marginTop: -8,
  marginBottom: theme.spacing(1),
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

const VoyagesStep = ({ formData = {}, updateBasicInfo, goToStep }) => {
  const [vesselQuery, setVesselQuery] = useState("");
  const [vesselResults, setVesselResults] = useState([]);
  const [callPortQuery, setCallPortQuery] = useState("");
  const [callPortResults, setCallPortResults] = useState([]);
  const [lastPortQuery, setLastPortQuery] = useState("");
  const [lastPortResults, setLastPortResults] = useState([]);
  const [nextPortQuery, setNextPortQuery] = useState("");
  const [nextPortResults, setNextPortResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [localFormData, setLocalFormData] = useState({
    vessel_id: formData.vessel_id || "",
    name: formData.name || "",
    imo_no: formData.imo_no || "",
    mmsi_no: formData.mmsi_no || "",
    call_sign: formData.call_sign || "",
    gross_tonnage: formData.gross_tonnage || "",
    deadweight_tonnage: formData.deadweight_tonnage || "",
    draught: formData.draught || "",
    voyage_number: formData.voyage_number || "",
    call_port: formData.call_port || null,
    eta: formData.eta || "",
    etd: formData.etd || "",
    last_port: formData.last_port || null,
    last_port_etd: formData.last_port_etd || "",
    next_port: formData.next_port || null,
    next_port_eta: formData.next_port_eta || "",
  });

  useEffect(() => {
    setLocalFormData({
      vessel_id: formData.vessel_id || "",
      name: formData.name || "",
      imo_no: formData.imo_no || "",
      mmsi_no: formData.mmsi_no || "",
      call_sign: formData.call_sign || "",
      gross_tonnage: formData.gross_tonnage || "",
      deadweight_tonnage: formData.deadweight_tonnage || "",
      draught: formData.draught || "",
      voyage_number: formData.voyage_number || "",
      call_port: formData.call_port || null,
      eta: formData.eta || "",
      etd: formData.etd || "",
      last_port: formData.last_port || null,
      last_port_etd: formData.last_port_etd || "",
      next_port: formData.next_port || null,
      next_port_eta: formData.next_port_eta || "",
    });
  }, [formData]);

  useEffect(() => {
    if (!vesselQuery.trim()) return setVesselResults([]);
    const q = vesselQuery.toLowerCase();
    setVesselResults(
      vesselsList
        .filter(
          (v) =>
            v.name?.toLowerCase().includes(q) ||
            v.imo_no?.includes(q) ||
            v.mmsi_no?.includes(q) ||
            v.call_sign?.toLowerCase().includes(q)
        )
        .slice(0, 10)
    );
  }, [vesselQuery]);

  const searchLocations = (query) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return locationsList
      .filter(
        (loc) =>
          loc.name?.toLowerCase().includes(q) ||
          loc.location_code?.toLowerCase().includes(q)
      )
      .slice(0, 10);
  };

  useEffect(
    () => setCallPortResults(searchLocations(callPortQuery)),
    [callPortQuery]
  );
  useEffect(
    () => setLastPortResults(searchLocations(lastPortQuery)),
    [lastPortQuery]
  );
  useEffect(
    () => setNextPortResults(searchLocations(nextPortQuery)),
    [nextPortQuery]
  );

  const getFlagImage = (countryCode3) => {
    if (!countryCode3) return null;
    const code = country3to2[countryCode3] || countryCode3.toLowerCase();
    return flagMap[code] || null;
  };

  const selectVessel = (v) => {
    const updatedForm = {
      ...localFormData,
      ...v,
      vessel_id: v.vessel_id,
    };
    setLocalFormData(updatedForm);
    updateBasicInfo(updatedForm);
    setVesselQuery(`${v.name} (${v.imo_no})`);
    setVesselResults([]);
    setErrors([]);
    setSuccessMessage("");
  };

  const selectLocation = (loc, fieldName) => {
    const updatedForm = {
      ...localFormData,
      [fieldName]: loc,
    };
    setLocalFormData(updatedForm);
    updateBasicInfo(updatedForm);
    if (fieldName === "call_port") setCallPortQuery(loc.name);
    else if (fieldName === "last_port") setLastPortQuery(loc.name);
    else if (fieldName === "next_port") setNextPortQuery(loc.name);

    if (fieldName === "call_port") setCallPortResults([]);
    if (fieldName === "last_port") setLastPortResults([]);
    if (fieldName === "next_port") setNextPortResults([]);
    setErrors([]);
    setSuccessMessage("");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...localFormData,
      [name]: value,
    };
    setLocalFormData(updatedForm);
    updateBasicInfo(updatedForm);
    setErrors([]);
    setSuccessMessage("");
  };

  const validate = () => {
    const errs = [];
    if (!localFormData.vessel_id) errs.push("Ship selection is required.");
    if (!localFormData.voyage_number) errs.push("Voyage Number is required.");
    if (!localFormData.call_port) errs.push("Port of Call is required.");
    if (!localFormData.eta) errs.push("ETA is required.");
    if (!localFormData.etd) errs.push("ETD is required.");
    if (!localFormData.last_port)
      errs.push("Previous Port of Call is required.");
    if (!localFormData.last_port_etd)
      errs.push("Previous Port ETD is required.");
    if (!localFormData.next_port) errs.push("Next Port of Call is required.");
    if (!localFormData.next_port_eta) errs.push("Next Port ETA is required.");
    setErrors(errs);
    return errs.length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;
    setSuccessMessage("Voyage saved successfully! Proceeding to next step...");
    setErrors([]);
    setTimeout(() => {
      if (goToStep) goToStep(3);
    }, 1200);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Ship selection */}
      <StyledPaper>
        <SectionHeader
          icon={<Sailing sx={{ fontSize: 28 }} />}
          title="Select Ship"
          subtitle="Search using ship name, call sign, IMO number or MMSI number"
        />

        <StyledTextField
          fullWidth
          variant="outlined"
          value={vesselQuery}
          onChange={(e) => setVesselQuery(e.target.value)}
          placeholder="Enter ship name, IMO, MMSI or call sign..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          disabled={!!localFormData.vessel_id}
          error={errors.includes("Ship selection is required.")}
        />
        {errors.includes("Ship selection is required.") && (
          <ErrorText>Ship selection is required.</ErrorText>
        )}

        {vesselResults.length > 0 && !localFormData.vessel_id && (
          <Paper elevation={3} sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}>
            <List>
              {vesselResults.map((v) => {
                const flagSrc = getFlagImage(v.ship_flag_code_id);
                return (
                  <ListItem
                    key={v.vessel_id}
                    onClick={() => selectVessel(v)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={flagSrc} alt={v.ship_flag_code_id}>
                        <Flag />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${v.name}`}
                      secondary={`IMO: ${v.imo_no} | MMSI: ${v.mmsi_no} | Call Sign: ${v.call_sign}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}
      </StyledPaper>

      {localFormData.vessel_id && (
        <>
          {/* Ship details and voyage number */}
          <StyledPaper>
            <SectionHeader
              icon={<DirectionsBoat sx={{ fontSize: 28 }} />}
              title="Selected Ship Details"
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{localFormData.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  IMO
                </Typography>
                <Typography variant="body1">{localFormData.imo_no}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  MMSI
                </Typography>
                <Typography variant="body1">{localFormData.mmsi_no}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Call Sign
                </Typography>
                <Typography variant="body1">
                  {localFormData.call_sign}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Gross Tonnage
                </Typography>
                <Typography variant="body1">
                  {localFormData.gross_tonnage}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Deadweight (MT)
                </Typography>
                <Typography variant="body1">
                  {localFormData.deadweight_tonnage}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Draught (m)
                </Typography>
                <Typography variant="body1">{localFormData.draught}</Typography>
              </Grid>
            </Grid>

            <StyledTextField
              fullWidth
              variant="outlined"
              name="voyage_number"
              value={localFormData.voyage_number || ""}
              onChange={onInputChange}
              placeholder="Enter voyage number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Navigation color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Voyage Number is required.")}
            />
            {errors.includes("Voyage Number is required.") && (
              <ErrorText>Voyage Number is required.</ErrorText>
            )}
          </StyledPaper>

          {/* Port of Call selection */}
          <StyledPaper>
            <SectionHeader
              icon={<LocationOn sx={{ fontSize: 28 }} />}
              title="Select Port of Call"
              subtitle="Search using location name or UN/LOCODE code"
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              value={callPortQuery}
              onChange={(e) => setCallPortQuery(e.target.value)}
              placeholder="Enter port name or code..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Port of Call is required.")}
            />
            {errors.includes("Port of Call is required.") && (
              <ErrorText>Port of Call is required.</ErrorText>
            )}

            {callPortResults.length > 0 && (
              <Paper
                elevation={3}
                sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}
              >
                <List>
                  {callPortResults.map((loc) => {
                    const flagSrc = getFlagImage(loc.country_code);
                    return (
                      <ListItem
                        key={loc.location_id}
                        onClick={() => selectLocation(loc, "call_port")}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={flagSrc} alt={loc.country_code}>
                            <Flag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={loc.name}
                          secondary={`${loc.country} • ${loc.location_code}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="ETA"
                  type="datetime-local"
                  name="eta"
                  value={localFormData.eta || ""}
                  onChange={onInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Schedule color="action" />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.includes("ETA is required.")}
                />
                {errors.includes("ETA is required.") && (
                  <ErrorText>ETA is required.</ErrorText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="ETD"
                  type="datetime-local"
                  name="etd"
                  value={localFormData.etd || ""}
                  onChange={onInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Schedule color="action" />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.includes("ETD is required.")}
                />
                {errors.includes("ETD is required.") && (
                  <ErrorText>ETD is required.</ErrorText>
                )}
              </Grid>
            </Grid>
          </StyledPaper>

          {/* Previous Port of Call */}
          <StyledPaper>
            <SectionHeader
              icon={<DepartureBoard sx={{ fontSize: 28 }} />}
              title="Previous Port of Call"
              subtitle="Search using location name or UN/LOCODE code"
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              value={lastPortQuery}
              onChange={(e) => setLastPortQuery(e.target.value)}
              placeholder="Enter port name or code..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Previous Port of Call is required.")}
            />
            {errors.includes("Previous Port of Call is required.") && (
              <ErrorText>Previous Port of Call is required.</ErrorText>
            )}

            {lastPortResults.length > 0 && (
              <Paper
                elevation={3}
                sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}
              >
                <List>
                  {lastPortResults.map((loc) => {
                    const flagSrc = getFlagImage(loc.country_code);
                    return (
                      <ListItem
                        key={loc.location_id}
                        onClick={() => selectLocation(loc, "last_port")}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={flagSrc} alt={loc.country_code}>
                            <Flag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={loc.name}
                          secondary={`${loc.country} • ${loc.location_code}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            )}

            <StyledTextField
              fullWidth
              label="ETD"
              type="datetime-local"
              name="last_port_etd"
              value={localFormData.last_port_etd || ""}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Previous Port ETD is required.")}
            />
            {errors.includes("Previous Port ETD is required.") && (
              <ErrorText>Previous Port ETD is required.</ErrorText>
            )}
          </StyledPaper>

          {/* Next Port of Call */}
          <StyledPaper>
            <SectionHeader
              icon={<Anchor sx={{ fontSize: 28 }} />}
              title="Next Port of Call"
              subtitle="Search using location name or UN/LOCODE code"
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              value={nextPortQuery}
              onChange={(e) => setNextPortQuery(e.target.value)}
              placeholder="Enter port name or code..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Next Port of Call is required.")}
            />
            {errors.includes("Next Port of Call is required.") && (
              <ErrorText>Next Port of Call is required.</ErrorText>
            )}

            {nextPortResults.length > 0 && (
              <Paper
                elevation={3}
                sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}
              >
                <List>
                  {nextPortResults.map((loc) => {
                    const flagSrc = getFlagImage(loc.country_code);
                    return (
                      <ListItem
                        key={loc.location_id}
                        onClick={() => selectLocation(loc, "next_port")}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={flagSrc} alt={loc.country_code}>
                            <Flag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={loc.name}
                          secondary={`${loc.country} • ${loc.location_code}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            )}

            <StyledTextField
              fullWidth
              label="ETA"
              type="datetime-local"
              name="next_port_eta"
              value={localFormData.next_port_eta || ""}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule color="action" />
                  </InputAdornment>
                ),
              }}
              error={errors.includes("Next Port ETA is required.")}
            />
            {errors.includes("Next Port ETA is required.") && (
              <ErrorText>Next Port ETA is required.</ErrorText>
            )}
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
              onClick={onSubmit}
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
              Save Voyage & Continue
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VoyagesStep;
