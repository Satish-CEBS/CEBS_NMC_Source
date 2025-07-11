import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  Badge,
  Collapse,
  Divider,
  Chip,
  CssBaseline,
} from "@mui/material";
import {
  Dashboard,
  ViewList,
  DirectionsBoat,
  Description,
  LocalShipping,
  People,
  Person,
  Warning,
  Security,
  Business,
  Search as SearchIcon,
  Menu,
  Search,
  Help,
  Notifications,
  Settings,
  Assignment,
  InsertDriveFile,
  ExpandLess,
  ExpandMore,
  ChevronRight,
  Analytics,
  BarChart,
  PieChart,
  Assessment,
  Apps,
  Widgets,
  Extension,
  MenuOpen,
  AccountBalance,
  LocalPolice,
  ContainerSharp,
  FilePresent,
  AdminPanelSettings,
  TrendingUp,
  Gavel,
  Login,
} from "@mui/icons-material";
import InnerHeader from "./InnerHeader";
import InnerSubHeader from "./InnerSubHeader";

const drawerWidth = 280;
const collapsedDrawerWidth = 70;
const headerHeight = 136; // Increased to accommodate both headers

const menuData = [
  {
    label: "Pre-Arrival Notification",
    icon: <DirectionsBoat />,
    items: [
      { label: "Pre-Arrival Dashboard", path: "/prearrival-dashboard" },
      { label: "Pre-Arrival List", path: "/prearrival-list" },
      { label: "New Pre-Arrival Notification", path: "/prearrival-wizard" },
      { label: "🆕 NMC Pre-Arrival Wizard", path: "/nmc-prearrival-wizard" },
    ],
  },
  {
    label: "Port Call Management",
    icon: <DirectionsBoat />,
    items: [
      { label: "Port Call Management Dashboard", path: "/portcall-dashboard" },
      { label: "New Port Call Notification", path: "/portcall-wizard" },
      { label: "Berth Dashboard", path: "/berth-dashboard" },
      { label: "Arrival at anchorage", path: "/arrival-anchorage" },
      { label: "Pilot boarding", path: "/pilot-boarding" },
      { label: "Berthing", path: "/berthing" },
      { label: "Cargo operations", path: "/cargo-operations" },
      { label: "Departure and clearance", path: "/departure-clearance" },
    ],
  },
  {
    label: "Vessel Management",
    icon: <DirectionsBoat />,
    items: [
      { label: "Vessel Registration", path: "/vessel-registration" },
      { label: "Vessel Dashboard", path: "/vessel-dashboard" },
      { label: "Vessel Arrival Notification", path: "/vessel-arrival" },
      { label: "Vessel Departure Notification", path: "/vessel-departure" },
    ],
  },
  {
    label: "Departure Management",
    icon: <DirectionsBoat />,
    items: [
      { label: "Departure Notification Wizard", path: "/departure-wizard" },
    ],
  },
  {
    label: "Stowage & Cargo Handling",
    icon: <LocalShipping />,
    items: [
      { label: "Stowage Plan Dashboard", path: "/stowage-dashboard" },
      { label: "Add Stowage Plan", path: "/stowage/add" },
      { label: "Upload Stowage File", path: "/stowage/upload" },
      { label: "Review Stowage Details", path: "/stowage/review" },
    ],
  },
  {
    label: "Crew & Passenger Management",
    icon: <People />,
    items: [
      { label: "Crew Manifest Upload", path: "/crew-manifest" },
      { label: "Passenger Manifest Upload", path: "/passenger-manifest" },
    ],
  },
  {
    label: "Analytics & Reports",
    icon: <BarChart />,
    items: [
      { label: "Reports & Export", path: "/reports" },
      { label: "Emirates-wise Dashboard", path: "/emirates-dashboard" },
      { label: "Audit Logs", path: "/audit-logs" },
    ],
  },
  {
    label: "Compliance & Reference",
    icon: <Gavel />,
    items: [
      { label: "Inspection History", path: "/inspections" },
      { label: "IMO Code Lookup", path: "/imo-codes" },
      { label: "Master Data Management", path: "/master-data" },
    ],
  },
  {
    label: "System Access",
    icon: <Settings />,
    items: [
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
      { label: "Admin Panel", path: "/admin" },
    ],
  },
  {
    label: "References FAL Form Submissions",
    icon: <Assignment />,
    items: [
      { label: "FAL Form 1 - General Declaration", path: "/fal1" },
      { label: "FAL Form 2 - Cargo Declaration", path: "/fal2" },
      { label: "FAL Form 3 - Ship's Stores Declaration", path: "/fal3" },
      { label: "FAL Form 4 - Crew's Effects Declaration", path: "/fal4" },
      { label: "FAL Form 5 - Crew List", path: "/fal5" },
      { label: "FAL Form 6 - Passenger List", path: "/fal6" },
      { label: "FAL Form 7 - Dangerous Goods Manifest", path: "/fal7" },
    ],
  },
];

const MaritimeLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (!sidebarCollapsed) {
      setExpandedItems({});
    }
  };

  const handleItemExpand = (index) => {
    if (sidebarCollapsed) return;
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const currentDrawerWidth = sidebarCollapsed
    ? collapsedDrawerWidth
    : drawerWidth;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f9f8f3",
      }}
    >
      {/* User Profile Section */}
      <Box
        sx={{ p: sidebarCollapsed ? 1 : 2, borderBottom: "1px solid #e9ecef" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: sidebarCollapsed ? 32 : 40,
              height: sidebarCollapsed ? 32 : 40,
              backgroundColor: "#6c5ce7",
              fontSize: sidebarCollapsed ? "0.8rem" : "1rem",
            }}
          >
            PP
          </Avatar>
          {!sidebarCollapsed && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#2d3436" }}
              >
                Welcome,
              </Typography>
              <Typography variant="body2" sx={{ color: "#636e72" }}>
                CEBS ADMINISTRATOR
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Navigation Stats */}
      {!sidebarCollapsed && (
        <Box sx={{ p: 2, borderBottom: "1px solid #e9ecef" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "#636e72", fontSize: "0.75rem" }}
              >
                Vessels
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#2d3436" }}
              >
                142
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "#636e72", fontSize: "0.75rem" }}
              >
                Port Calls
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#2d3436" }}
              >
                89
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "#636e72", fontSize: "0.75rem" }}
              >
                Active
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#2d3436" }}
              >
                24
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Menu Button */}
      <Box sx={{ p: sidebarCollapsed ? 1 : 2 }}>
        <Box
          onClick={handleSidebarToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "#2d3436",
            color: "white",
            cursor: "pointer",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
            "&:hover": {
              backgroundColor: "#636e72",
            },
          }}
        >
          <Menu sx={{ fontSize: 20 }} />
          {!sidebarCollapsed && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 500, ml: 1 }}>
                Menu
              </Typography>
              <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "white",
                  }}
                />
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "white",
                  }}
                />
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "white",
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: sidebarCollapsed ? 0.5 : 1, pt: 0, flex: 1 }}>
        {menuData.map((item, index) => (
          <Box key={item.label}>
            <ListItem
              onClick={() => {
                if (item.items && item.items.length > 0) {
                  handleItemExpand(index);
                } else {
                  handleNavigation(item.path || "#");
                }
              }}
              sx={{
                mb: 0.5,
                borderRadius: sidebarCollapsed ? 1 : 2,
                backgroundColor: isActive(item.path)
                  ? "#e3f2fd"
                  : "transparent",
                color: isActive(item.path) ? "#1976d2" : "#636e72",
                "&:hover": {
                  backgroundColor: isActive(item.path) ? "#e3f2fd" : "#f1f3f4",
                },
                cursor: "pointer",
                px: sidebarCollapsed ? 1 : 2,
                py: 1,
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: sidebarCollapsed ? "auto" : 36,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!sidebarCollapsed && (
                <>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive(item.path) ? 600 : 400,
                    }}
                  />
                  {item.items &&
                    item.items.length > 0 &&
                    (expandedItems[index] ? <ExpandLess /> : <ExpandMore />)}
                </>
              )}
            </ListItem>

            {/* Sub Items */}
            {item.items && item.items.length > 0 && !sidebarCollapsed && (
              <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((subItem) => (
                    <ListItem
                      key={subItem.label}
                      onClick={() => handleNavigation(subItem.path)}
                      sx={{
                        pl: 5,
                        py: 0.5,
                        borderRadius: 2,
                        backgroundColor: isActive(subItem.path)
                          ? "#e3f2fd"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: isActive(subItem.path)
                            ? "#e3f2fd"
                            : "#f1f3f4",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <ChevronRight
                        sx={{ fontSize: 16, color: "#636e72", mr: 1 }}
                      />
                      <ListItemText
                        primary={subItem.label}
                        primaryTypographyProps={{
                          fontSize: "0.8rem",
                          color: isActive(subItem.path) ? "#1976d2" : "#636e72",
                          fontWeight: isActive(subItem.path) ? 500 : 400,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* New Header Components */}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          zIndex: theme.zIndex.drawer + 2,
        }}
      >
        <InnerHeader />
        <InnerSubHeader />
      </Box>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: currentDrawerWidth },
          flexShrink: { md: 0 },
          zIndex: theme.zIndex.drawer + 1,
          position: "fixed",
          top: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: currentDrawerWidth,
              borderRight: "1px solid #e9ecef",
              boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#f8f9fa",
              height: `calc(100vh - ${headerHeight}px)`,
              top: headerHeight,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #e9ecef",
              boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
              top: headerHeight,
              height: `calc(100vh - ${headerHeight}px)`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          pt: `${headerHeight}px`,
          pl: {
            xs: 0,
            md: `${currentDrawerWidth}px`,
          },
          transition: theme.transitions.create("padding-left"),
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MaritimeLayout;
