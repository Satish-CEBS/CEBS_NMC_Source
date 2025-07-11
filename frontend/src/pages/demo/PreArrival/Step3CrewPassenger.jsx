import React, { useState } from "react";
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
  FormHelperText,
  Alert,
  AlertTitle,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  styled,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  Luggage as LuggageIcon,
  Dangerous as DangerousIcon,
} from "@mui/icons-material";
import CrewList from "./FAL/CrewList";
import PassengerList from "./FAL/PassengerList";
import CrewEffects from "./FAL/CrewEffects";
import DangerousGoods from "./FAL/DangerousGoods";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
}));

const Step3CrewPassenger = ({ data = {}, update, goToStep }) => {
  const [activeModal, setActiveModal] = useState(null);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    update({
      ...data,
      [key]: {
        ...data[key],
        file,
        filename: file.name,
      },
    });
  };

  const handleFormSubmit = (key, formEntries) => {
    update({
      ...data,
      [key]: {
        ...data[key],
        data: formEntries,
      },
    });
    setActiveModal(null);
  };

  const forms = [
    {
      key: "crewEffectsForm",
      label: "FAL Form 4 – Crew Effects Declaration",
      icon: <LuggageIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />,
      component: CrewEffects,
    },
    {
      key: "crewListForm",
      label: "FAL Form 5 – Crew List",
      icon: <PersonIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />,
      component: CrewList,
    },
    {
      key: "passengerListForm",
      label: "FAL Form 6 – Passenger List",
      icon: <GroupsIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />,
      component: PassengerList,
    },
    {
      key: "dangerousGoodsForm",
      label: "FAL Form 7 – Dangerous Goods Manifest",
      icon: <DangerousIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />,
      component: DangerousGoods,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <DescriptionIcon sx={{ fontSize: 28, color: "#2D3436", mr: 2 }} />
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Crew & Passenger Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload the official IMO FAL Forms or fill them digitally below
          </Typography>
        </Box>
      </Box>

      <List sx={{ width: "100%" }}>
        {forms.map(({ key, label, icon, component: Component }) => (
          <StyledPaper key={key} sx={{ mb: 3 }}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mb: 2,
                }}
              >
                {icon}
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, flexGrow: 1 }}
                >
                  {label}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor: "#2D3436",
                      color: "#2D3436",
                      "&:hover": {
                        backgroundColor: "rgba(45, 52, 54, 0.04)",
                        borderColor: "#2D3436",
                      },
                    }}
                  >
                    Upload File
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, key)}
                      sx={{ display: "none" }}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setActiveModal(key)}
                    sx={{
                      backgroundColor: "#2D3436",
                      "&:hover": {
                        backgroundColor: "#1a1f21",
                      },
                    }}
                  >
                    Fill Digitally
                  </Button>
                </Box>
              </Box>

              {data?.[key]?.filename && (
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
                    {data[key].filename}
                  </strong>
                </FormHelperText>
              )}

              {data?.[key]?.data?.length > 0 && (
                <Box sx={{ width: "100%", mt: 3, overflowX: "auto" }}>
                  <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        {Object.keys(data[key].data[0]).map((col, idx) => (
                          <TableCell key={idx} sx={{ fontWeight: 600 }}>
                            {col}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data[key].data.map((row, idx) => (
                        <TableRow key={idx}>
                          {Object.values(row).map((val, idy) => (
                            <TableCell key={idy}>{val}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </ListItem>

            <Dialog
              open={activeModal === key}
              onClose={() => setActiveModal(null)}
              maxWidth="md"
              fullWidth
            >
              <Component
                initialData={data?.[key]?.data || []}
                onClose={() => setActiveModal(null)}
                onSave={(entries) => handleFormSubmit(key, entries)}
              />
            </Dialog>
          </StyledPaper>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => goToStep(2)}
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
          Back to Step 2
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => goToStep(4)}
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
          Continue to Step 4
        </Button>
      </Box>
    </Box>
  );
};

export default Step3CrewPassenger;
