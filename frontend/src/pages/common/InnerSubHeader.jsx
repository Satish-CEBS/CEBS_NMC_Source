import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Stack,
  keyframes,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import { useNavigate, useLocation } from "react-router-dom";

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const InnerSubHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  const rawUser = localStorage.getItem("user");
  let user = {};
  try {
    user = rawUser ? JSON.parse(rawUser) : {};
  } catch (err) {
    console.warn("Could not parse user from localStorage:", err);
  }

  const role = (user.normalized_role || user.role || "").toUpperCase();

  const isPrivileged = ["SUPER_ADMIN", "ADMIN", "PORT"].includes(role);

  const showButton =
    isPrivileged && !location.pathname.includes("/prearrival/create");

  const handleCreateNew = () => {
    navigate("/portcall-wizard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // py: 1,
        px: 3,
        backgroundColor: "#e5e0d8",
        borderBottom: "1px solid #d8d0c5",
        minHeight: 54,
        position: "relative",
      }}
    >
      {/* Centered Content */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#5a4e42",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span>From Port Call to Clearance — </span>
          <Box
            component="span"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              ml: 1,
              fontWeight: 700,
              animation: `${pulse} 3s ease-in-out infinite`,
              "&:hover": {
                animation: `${pulse} 1s ease-in-out infinite`,
              },
            }}
          >
            <BoltIcon
              fontSize="small"
              sx={{
                color: hovered
                  ? theme.palette.warning.dark
                  : theme.palette.warning.main,
                mr: 0.5,
                transition: "all 0.3s ease",
              }}
            />
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: `${gradientShift} 6s ease infinite`,
                "&:hover": {
                  animation: `${gradientShift} 3s ease infinite`,
                },
              }}
            >
              One Window. One Nation. AI-Powered.
            </Box>
          </Box>
        </Typography>
      </Stack>

      {/* Absolute positioned button */}
      {showButton && (
        <Button
          //   component={Link}
          onClick={() => navigate("/portcall-wizard")}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            position: "absolute",
            right: 24,
            borderRadius: 3,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#5a5a5a",
            color: "#ffffff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              backgroundColor: "#4a4a4a",
            },
            transition: "all 0.2s ease",
          }}
        >
          Create New Port Call Notification
        </Button>
      )}
    </Box>
  );
};

export default InnerSubHeader;
