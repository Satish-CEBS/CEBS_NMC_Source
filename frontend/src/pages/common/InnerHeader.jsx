import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  Language as LanguageIcon,
  HelpOutline as HelpOutlineIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import moeiLogo from "../../assets/moei-logo.png";

const InnerHeader = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const theme = useTheme();

  const handleHomeClick = () => navigate("/dashboard");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.secondary,
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.5, 1, 1.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  }));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f9f8f3", // Very light beige/off-white
        color: theme.palette.text.primary,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "72px !important", // Taller header
          px: 3,
        }}
      >
        {/* Left side - Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexGrow: 1,
          }}
        >
          <Box
            component="img"
            src={moeiLogo}
            alt="MOEI Logo"
            sx={{
              height: 65, // Larger logo
              width: "auto",
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/dashboard")}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#555", // Soft dark grey
                letterSpacing: 0.3,
                fontSize: "1.5rem",
              }}
            >
              National Maritime Center
            </Typography>
          </Box>
        </Box>

        {/* Right side - Search and Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {/* Search */}
          <Search sx={{ mr: 2 }}>
            <SearchIconWrapper>
              <SearchIcon color="#fffff" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Action Buttons */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => navigate("/dashboard")}
            sx={{ color: "#666" }}
          >
            <HomeIcon />
          </IconButton>

          <IconButton size="large" sx={{ color: "#666" }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            sx={{ color: "#666" }}
            onClick={toggleLanguage}
          >
            <LanguageIcon />
          </IconButton>

          <IconButton size="large" sx={{ color: "#666" }}>
            <HelpOutlineIcon />
          </IconButton>

          <IconButton
            size="large"
            sx={{ color: "#666" }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>

          {/* User Avatar */}
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 40,
              height: 40,
              ml: 1.5,
              cursor: "pointer",
              color: "white",
            }}
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default InnerHeader;
