/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React from "react";
// import {./Header.cssframes } from "@mui/material";
import moeiLogo from "../../assets/moei-logo.png";
// import { keyframes } from "framer-motion";
import { Box, keyframes, styled, Typography } from "@mui/material";

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 32px",
  backgroundColor: "#f9f8f3",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  position: "relative",
  zIndex: 10,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginRight: "24px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Logo = styled("img")({
  height: "60px",
  width: "auto",
  animation: `${floatAnimation} 4s ease-in-out infinite`,
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.8rem",
  letterSpacing: "0.5px",
  background: `linear-gradient(135deg, #2c3e50, #000000)`, // Dark grey to black
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: `${gradientShift} 8s ease infinite`,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Logo src={moeiLogo} alt="MOEI Logo" />
      </LogoContainer>
      <Title variant="h1">National Maritime Center</Title>
    </HeaderWrapper>
  );
};

export default Header;
