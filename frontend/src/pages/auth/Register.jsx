/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React, { useState } from "react";
// import {./AuthForm.cssuter-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
  styled,
  Fade,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import moeiLogo from "../../assets/moei-logo.png";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import Footer from "../common/Footer";
import localImage from "./back.png";
import { useNavigate } from "react-router-dom";
// Custom styled components
const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, #2c3e50, #000000)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline",
  fontWeight: 700,
}));

const pulseAnimation = (theme) => ({
  animation: `pulse 2s infinite ${theme.transitions.easing.easeInOut}`,
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.03)" },
    "100%": { transform: "scale(1)" },
  },
});

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    given_name: "",
    surname: "",
    role: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = [
    "Super Admin",
    "Admin",
    "Agent",
    "Customs",
    "Immigration",
    "Health Agency",
    "Port",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        formData
      );

      // Smooth transition before navigation
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <SubHeader />

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 144px)",
          backgroundColor: "#f9f8f3",
        }}
      >
        {/* Left Form Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            background:
              "linear-gradient(135deg, rgba(249,248,243,1) 0%, rgba(230,230,220,1) 100%)",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              width: "100%",
              padding: 4,
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 4,
              }}
            >
              <Box
                component="img"
                src={moeiLogo}
                alt="MOEI Logo"
                sx={{
                  height: 80,
                  width: "auto",
                  ...pulseAnimation(theme),
                }}
              />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Register
            </Typography>

            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                margin="normal"
                placeholder="First Name"
                name="given_name"
                value={formData.given_name}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                placeholder="Last Name"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                placeholder="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                placeholder="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {formData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              <FormControl
                fullWidth
                margin="normal"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "rgba(0,0,0,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              >
                <InputLabel>Select Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Select Role"
                >
                  {roles.map((role, idx) => (
                    <MenuItem key={idx} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  letterSpacing: 0.5,
                  background: `linear-gradient(135deg, #2c3e50, #000000)`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${theme.palette.primary.light}`,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                  transition: "all 0.3s ease",
                }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{
                  mt: 2,
                  color: theme.palette.text.secondary,
                }}
              >
                Already have an account?{" "}
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Info Panel */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            padding: 8,
            background: `linear-gradient(135deg, #2c3e50, #000000)`,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url(${localImage}) center/cover`,
              opacity: 0.15,
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              UAE National Maritime Center
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                mb: 3,
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              The unified digital gateway integrating maritime operations across
              all seven Emirates. NMC streamlines vessel clearance, port
              operations, and regulatory compliance through advanced AI and
              real-time data analytics.
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 0,
                listStyle: "none",
                "& li": {
                  mb: 1.5,
                  display: "flex",
                  alignItems: "flex-start",
                },
              }}
            >
              {[
                "Centralized maritime operations platform",
                "AI-powered predictive analytics",
                "Real-time vessel tracking and coordination",
                "Automated compliance with IMO regulations",
                "Integrated customs and immigration processes",
                "Secure data sharing between all Emirates",
              ].map((item, index) => (
                <Box component="li" key={index}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="body1">{item}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  opacity: 0.9,
                }}
              >
                "Transforming UAE's maritime sector through digital innovation
                and unified governance."
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Register;
