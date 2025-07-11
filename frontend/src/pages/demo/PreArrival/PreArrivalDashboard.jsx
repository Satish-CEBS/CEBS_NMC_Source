/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL – Unauthorized use prohibited.
 * ------------------------------------------------------------------------
 */

import React, { useState, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "leaflet/dist/leaflet.css";
import InnerHeader from "../../common/InnerHeader";
import InnerSubHeader from "../../common/InnerSubHeader";
import SidebarMenu from "../../common/SidebarMenu";
import Footer from "../../common/Footer";
import "./PreArrivalDashboard.css";
import DownloadIcon from "@mui/icons-material/Download";
import L from "leaflet";
import vesselGeo from "../../../mockData/vesselGeo.json";
import MaritimeLayout from "../../common/Applayout";

const etaData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 9 },
  { day: "Thu", count: 15 },
  { day: "Fri", count: 21 },
  { day: "Sat", count: 6 },
  { day: "Sun", count: 11 },
];

const flagData = [
  { name: "India", value: 8 },
  { name: "Bahamas", value: 10 },
  { name: "UAE", value: 6 },
  { name: "Panama", value: 12 },
  { name: "Korea", value: 5 },
  { name: "Singapore", value: 9 },
];

const checklistData = [
  { name: "Complete", value: 40 },
  { name: "Missing", value: 10 },
];

const liveETA = [
  { time: "08:00", arrivals: 3 },
  { time: "12:00", arrivals: 5 },
  { time: "16:00", arrivals: 4 },
  { time: "20:00", arrivals: 7 },
];

const PreArrivalDashboard = () => {
  const [tab, setTab] = useState("overview");
  const overviewRef = useRef();
  const etaRef = useRef();
  const flagRef = useRef();
  const checklistRef = useRef();
  const [filterMessage, setFilterMessage] = useState("");

  const exportChart = async (ref, filename) => {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
    }
  };

  const handleDrilldown = (label) => {
    setFilterMessage(`🔍 Drilldown: Showing data for ${label}`);
    setTimeout(() => setFilterMessage(""), 3000);
  };

  const pieClass = (index) => `pie-slice-color-${index % 6}`;

  const renderGeoMarkers = () => {
    return {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#29b6f6",
          color: "#fff",
          weight: 1,
          fillOpacity: 0.9,
        });
      },
      onEachFeature: (feature, layer) => {
        const { vessel_name, flag, last_port } = feature.properties;
        const content = `<strong>${vessel_name}</strong><br/>Flag: ${flag}<br/>Last Port: ${last_port}`;
        layer.bindPopup(content);
      },
    };
  };

  return (
    <MaritimeLayout>
      <div className="dashboard">
        <div className="dashboard-body">
          <main className="dashboard-content">
            <div className="dashboard-tabs">
              <button
                className={tab === "overview" ? "active" : ""}
                onClick={() => setTab("overview")}
              >
                Overview
              </button>
              <button
                className={tab === "geo" ? "active" : ""}
                onClick={() => setTab("geo")}
              >
                Geo Maps
              </button>
              <button
                className={tab === "alerts" ? "active" : ""}
                onClick={() => setTab("alerts")}
              >
                Risk & Alerts
              </button>
              <button
                onClick={() => exportChart(overviewRef, "PreArrivalDashboard")}
              >
                <DownloadIcon /> Export PDF
              </button>
            </div>

            {filterMessage && (
              <div className="filter-message">{filterMessage}</div>
            )}

            {tab === "overview" && (
              <div className="cards-container" ref={overviewRef}>
                {/* ETA Distribution */}
                <div className="chart-card" ref={etaRef}>
                  <div className="card-header">
                    <h3>ETA Distribution (Weekly)</h3>
                    <button
                      onClick={() => exportChart(etaRef, "eta-distribution")}
                    >
                      <DownloadIcon fontSize="small" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={etaData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#ff69b4"
                        onClick={(d) => handleDrilldown(d.day)}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="chart-description">
                    Shows daily expected vessel arrivals for berth planning.
                  </p>
                </div>

                {/* Flag States */}
                <div className="chart-card" ref={flagRef}>
                  <div className="card-header">
                    <h3>Flag States</h3>
                    <button onClick={() => exportChart(flagRef, "flag-states")}>
                      <DownloadIcon fontSize="small" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={flagData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        onClick={(entry) => handleDrilldown(entry.name)}
                      >
                        {flagData.map((entry, idx) => (
                          <Cell key={idx} className={pieClass(idx)} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="chart-description">
                    Represents vessel counts grouped by flag state.
                  </p>
                </div>

                {/* Checklist Compliance */}
                <div className="chart-card" ref={checklistRef}>
                  <div className="card-header">
                    <h3>Checklist Compliance</h3>
                    <button
                      onClick={() =>
                        exportChart(checklistRef, "checklist-compliance")
                      }
                    >
                      <DownloadIcon fontSize="small" />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={checklistData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {checklistData.map((entry, idx) => (
                          <Cell key={idx} className={pieClass(idx)} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="chart-description">
                    Tracks how many vessels submitted all required
                    documentation.
                  </p>
                </div>

                {/* Live ETA */}
                <div className="chart-card full-width">
                  <h3>Live ETA – Arriving in Next 72 Hours</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={liveETA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="arrivals"
                        stroke="#8a2be2"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="chart-description">
                    Displays expected hourly arrivals to prepare gates and
                    support.
                  </p>
                </div>
              </div>
            )}

            {tab === "geo" && (
              <div className="map-card">
                <h3>Port Origins & Flag State Density</h3>
                <MapContainer
                  center={[22, 35]}
                  zoom={2}
                  scrollWheelZoom={false}
                  className="leaflet-map"
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <GeoJSON data={vesselGeo} {...renderGeoMarkers()} />
                </MapContainer>
                <p className="chart-description">
                  Visual map of vessels based on port of origin and flag state.
                </p>
              </div>
            )}

            {tab === "alerts" && (
              <div className="cards-container">
                <div className="alert-card red">
                  <h4>⚠️ Dangerous Goods Vessels</h4>
                  <p>4 vessels reported carrying hazardous cargo.</p>
                </div>
                <div className="alert-card yellow">
                  <h4>🚑 Health Declarations</h4>
                  <p>2 vessels indicated medical assistance onboard.</p>
                </div>
                <div className="alert-card orange">
                  <h4>🚩 Flagged Vessels</h4>
                  <p>
                    1 vessel under close monitoring due to compliance history.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default PreArrivalDashboard;
