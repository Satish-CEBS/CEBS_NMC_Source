/**
 * ------------------------------------------------------------------------
 * @component   SubHeader
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide
 * ------------------------------------------------------------------------
 */
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  keyframes,
  Tooltip,
} from "@mui/material";
import {
  Language as LanguageIcon,
  HelpOutline as HelpOutlineIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";

// Animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const highlight = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.7); }
  50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.9); }
  100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.7); }
`;

// Styled components
const SubHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 32px",
  backgroundColor: "#e8e5dd",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "12px 16px",
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "1.2rem",
  fontWeight: 500,
  color: "#5a4e42",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const HighlightText = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  margin: "0 8px",
  fontWeight: 700,
  background: `linear-gradient(135deg, #2c3e50, #000000, #2c3e50)`,
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: `${highlight} 4s ease infinite, ${glow} 3s ease infinite`,
  padding: "0 8px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: 0,
    right: 0,
    height: "2px",
    background: `linear-gradient(90deg, transparent, #ff9800, transparent)`,
    animation: `${highlight} 4s ease infinite`,
  },
  [theme.breakpoints.down("sm")]: {
    display: "inline-flex",
    margin: "4px 0",
  },
}));

const Bolt = styled(BoltIcon)(({ theme }) => ({
  margin: "0 6px",
  color: theme.palette.warning.main,
  animation: `${pulse} 1.5s ease infinite`,
  fontSize: "1.4rem",
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "32px",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    right: "auto",
    marginTop: "8px",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  marginLeft: "12px",
  backgroundColor: "rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 4px",
  },
}));

const SubHeader = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <SubHeaderWrapper>
      <Tagline variant="body1">
        From Port Call to Clearance —
        <HighlightText
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Bolt
            style={{
              animation: hovered
                ? `${pulse} 0.5s ease infinite`
                : `${pulse} 1.5s ease infinite`,
              color: hovered ? "#ff5722" : "#ffc107",
            }}
          />
          One Window. One Nation. AI-Powered.
        </HighlightText>
      </Tagline>

      <ActionButtons>
        <Tooltip title="Change Language">
          <ActionButton size="small" aria-label="language">
            <LanguageIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
        <Tooltip title="Help Center">
          <ActionButton size="small" aria-label="help">
            <HelpOutlineIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
      </ActionButtons>
    </SubHeaderWrapper>
  );
};

export default SubHeader;
