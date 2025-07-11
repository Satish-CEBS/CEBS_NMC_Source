// src/pages/dashboard/Dashboard.jsx

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InnerHeader from "../common/InnerHeader";
import InnerSubHeader from "../common/InnerSubHeader";
import SidebarMenu from "../common/SidebarMenu";
import Footer from "../common/Footer";

import FALAnalytics from "./FALAnalytics";
import RiskTargetingHeatmap from "./RiskTargetingHeatmap";
import LiveWorkflowOverview from "./LiveWorkflowOverview";
import TopTrends from "./TopTrends";
import NotificationsPanel from "./NotificationsPanel";
import AIInsights from "./AIInsights";

import "./Dashboard.css";
import mockData from "./dashboardMockData.json";

// 🧠 AI Components
import AIAssistantPanel from "../../components/AI/AIAssistantPanel";
import AIChatBotModal from "../../components/AI/AIChatBotModal";
import DrillDownModal from "../../components/AI/DrillDownModal";
import AIExplainChip from "../../components/AI/AIExplainChip";

// 🧭 Section Icons
import BarChartIcon from "@mui/icons-material/BarChart";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DescriptionIcon from "@mui/icons-material/Description";
import RadarIcon from "@mui/icons-material/Radar";
import TrafficIcon from "@mui/icons-material/Traffic";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MaritimeLayout from "../common/Applayout";

const Dashboard = () => {
  const emirates = [
    "All Emirates",
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
  ];

  const [selectedEmirate, setSelectedEmirate] = useState("All Emirates");
  const [expandedSections, setExpandedSections] = useState({
    kpi: true,
    aiInsights: false,
    falAnalytics: false,
    RiskTargetingHeatmap: false,
    workflows: false,
    topTrends: false,
    alerts: false,
  });

  const [showAI, setShowAI] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [drillItem, setDrillItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for top bar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle open/close of each dashboard section with animation
  const toggleSection = (key) => {
    setExpandedSections({ ...expandedSections, [key]: !expandedSections[key] });
  };

  // Filter data by emirate or return all
  const filterData = (key) => {
    const data = mockData[key];
    if (!Array.isArray(data)) return [];
    return selectedEmirate === "All Emirates"
      ? data
      : data.filter((item) => item.emirate === selectedEmirate);
  };

  const getTotal = (arr, key) =>
    Array.isArray(arr)
      ? arr.reduce((sum, item) => sum + (item[key] || 0), 0)
      : 0;
  const getAvg = (arr, key) =>
    Array.isArray(arr) && arr.length
      ? Math.round(
          arr.reduce((sum, item) => sum + (item[key] || 0), 0) / arr.length
        )
      : 0;

  // Filtered dataset
  const portCalls = filterData("portCalls");
  const vessels = filterData("vessels");
  const clearance = filterData("clearanceTimes");
  const cargo = filterData("cargoVolumes");
  const compliance = filterData("falCompliance");
  const insights = filterData("aiInsights");
  const workflows = filterData("liveWorkflows");
  const trends = filterData("topTrends");
  const notifications = filterData("notifications");

  // Animation variants
  const sectionVariants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  const kpiCardVariants = {
    hover: { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
    tap: { y: 0 },
  };

  return (
    <MaritimeLayout>
      <div className="dashboard">
        {/* <SidebarMenu /> */}
        <div className="dashboard-body">
          <main className="dashboard-content">
            {/* === Top Bar: Navigation + AI Buttons === */}
            <motion.div
              className={`dashboard-top-bar ${scrolled ? "scrolled" : ""}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-nav">
                {[
                  {
                    id: "key-maritime-indicators",
                    icon: <BarChartIcon fontSize="small" />,
                    label: "KPI",
                  },
                  {
                    id: "ai-insights",
                    icon: <SmartToyIcon fontSize="small" />,
                    label: "AI Insights",
                  },
                  {
                    id: "fal-analytics",
                    icon: <DescriptionIcon fontSize="small" />,
                    label: "FAL Analytics",
                  },
                  {
                    id: "risk-targeting-heatmap",
                    icon: <RadarIcon fontSize="small" />,
                    label: "Risk Targeting",
                  },
                  {
                    id: "live-workflow-overview",
                    icon: <TrafficIcon fontSize="small" />,
                    label: "Workflows",
                  },
                  {
                    id: "top-trends",
                    icon: <ShowChartIcon fontSize="small" />,
                    label: "Trends",
                  },
                  {
                    id: "real-time-alerts",
                    icon: <NotificationsIcon fontSize="small" />,
                    label: "Alerts",
                  },
                ].map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="nav-pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon} {item.label}
                  </motion.a>
                ))}
              </div>

              {/* <div className="ai-actio */}
            </motion.div>

            {/* 📊 KPI Section */}
            <section id="key-maritime-indicators">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("kpi")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <BarChartIcon /> <h2>Key Maritime Indicators</h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.kpi ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.kpi ? "−" : "+"}
                </motion.span>
              </motion.div>

              {/* 🗺️ Emirate Filter */}
              <motion.div
                className="emirate-filter"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {emirates.map((e) => (
                  <motion.span
                    key={e}
                    className={selectedEmirate === e ? "active" : ""}
                    onClick={() => setSelectedEmirate(e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>

              <AnimatePresence>
                {expandedSections.kpi && (
                  <motion.div
                    className="kpi-grid"
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      {
                        title: "Port Calls Today",
                        value: getTotal(portCalls, "today"),
                        className: "kpi-card-1",
                      },
                      {
                        title: "This Month",
                        value: getTotal(portCalls, "thisMonth"),
                        className: "kpi-card-2",
                      },
                      {
                        title: "Vessels In Port",
                        value: getTotal(vessels, "inPort"),
                        className: "kpi-card-3",
                      },
                      {
                        title: "Vessels En Route",
                        value: getTotal(vessels, "enRoute"),
                        className: "kpi-card-4",
                      },
                      {
                        title: "Cargo (tons)",
                        value: getTotal(cargo, "volume"),
                        className: "kpi-card-5",
                      },
                      {
                        title: "FAL Compliance",
                        value: `${getAvg(compliance, "complianceRate")}%`,
                        className: "kpi-card-6",
                      },
                    ].map((kpi, index) => (
                      <motion.div
                        key={index}
                        className={`kpi-card ${kpi.className}`}
                        variants={kpiCardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <h4>{kpi.title}</h4>
                        <p>{kpi.value}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 🤖 AI Insights */}
            <section id="ai-insights">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("aiInsights")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <SmartToyIcon />{" "}
                <h2>
                  AI Insights{" "}
                  <AIExplainChip explanation="Generated using anomaly detection and crew pattern clustering." />
                </h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.aiInsights ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.aiInsights ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.aiInsights && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <AIInsights insights={insights} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 📄 FAL Analytics */}
            <section id="fal-analytics">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("falAnalytics")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <DescriptionIcon /> <h2>FAL Form Submissions [IMO]</h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.falAnalytics ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.falAnalytics ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.falAnalytics && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <FALAnalytics />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ⚠️ Risk Heatmap */}
            <section id="risk-targeting-heatmap">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("RiskTargetingHeatmap")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <RadarIcon />{" "}
                <h2>
                  AI Risk Targeting Heatmap{" "}
                  <AIExplainChip explanation="AI analysis based on cargo, crew history and origin." />
                </h2>{" "}
                <motion.span
                  animate={{
                    rotate: expandedSections.RiskTargetingHeatmap ? 0 : 180,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.RiskTargetingHeatmap ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.RiskTargetingHeatmap && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <RiskTargetingHeatmap />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 🛂 Live Workflows */}
            <section id="live-workflow-overview">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("workflows")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <TrafficIcon /> <h2>Live Workflow Overview</h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.workflows ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.workflows ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.workflows && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <LiveWorkflowOverview workflows={workflows} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 📈 Top 5 Trends */}
            <section id="top-trends">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("topTrends")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <ShowChartIcon />{" "}
                <h2>
                  Top 5 Trends{" "}
                  <AIExplainChip explanation="Trend data based on last 7-day volume movement." />
                </h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.topTrends ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.topTrends ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.topTrends && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <TopTrends trends={trends} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 🚨 Real-Time Alerts */}
            <section id="real-time-alerts">
              <motion.div
                className="section-header"
                onClick={() => toggleSection("alerts")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <NotificationsIcon /> <h2>Real-Time Maritime Alerts</h2>{" "}
                <motion.span
                  animate={{ rotate: expandedSections.alerts ? 0 : 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedSections.alerts ? "−" : "+"}
                </motion.span>
              </motion.div>
              <AnimatePresence>
                {expandedSections.alerts && (
                  <motion.div
                    variants={sectionVariants}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={{ duration: 0.3 }}
                  >
                    <NotificationsPanel notifications={notifications} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 🧠 AI Panels & Modals */}
            {showAI && (
              <AIAssistantPanel onDrillDown={(item) => setDrillItem(item)} />
            )}
            {chatOpen && <AIChatBotModal onClose={() => setChatOpen(false)} />}
            {drillItem && (
              <DrillDownModal
                item={drillItem}
                onClose={() => setDrillItem(null)}
              />
            )}
          </main>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default Dashboard;
