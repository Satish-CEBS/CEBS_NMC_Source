/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   � 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */

import React, { useState, useRef } from "react";
import InnerHeader from "../../common/InnerHeader";
import SidebarMenu from "../../common/SidebarMenu";
import InnerSubHeader from "../../common/InnerSubHeader";
import Footer from "../../common/Footer";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./EmiratesDashboard.css";
import MaritimeLayout from "../../common/Applayout";

const emiratesList = [
  "All Emirates",
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

const EmiratesDashboardPage = () => {
  const [selectedEmirate, setSelectedEmirate] = useState("All Emirates");
  const exportRef = useRef();

  const arrivalData = {
    "Abu Dhabi": 32,
    Dubai: 48,
    Sharjah: 22,
    Ajman: 15,
    "Umm Al Quwain": 11,
    "Ras Al Khaimah": 18,
    Fujairah: 37,
  };

  const complianceData = [
    { name: "Compliant", value: 70 },
    { name: "Non-Compliant", value: 30 },
  ];

  const trafficData = [
    { month: "Jan", value: 22 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 46 },
    { month: "May", value: 41 },
  ];

  const filteredArrival =
    selectedEmirate === "All Emirates"
      ? Object.entries(arrivalData).map(([key, val]) => ({
          emirate: key,
          count: val,
        }))
      : [
          {
            emirate: selectedEmirate,
            count: arrivalData[selectedEmirate] || 0,
          },
        ];

  const exportPDF = async () => {
    const canvas = await html2canvas(exportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("EmiratesDashboard.pdf");
  };

  return (
    <MaritimeLayout>
      <div
        className="emirates-dashboard-wrapper"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div className="emirates-dashboard-content" style={{ flex: 1 }}>
          <div className="filter-bar">
            <select
              value={selectedEmirate}
              onChange={(e) => setSelectedEmirate(e.target.value)}
            >
              {emiratesList.map((em) => (
                <option key={em} value={em}>
                  {em}
                </option>
              ))}
            </select>
            <button onClick={exportPDF}>
              <DownloadIcon fontSize="small" /> Export PDF
            </button>
          </div>

          <div className="cards-container" ref={exportRef}>
            <div className="chart-card">
              <h4>Vessel Arrivals per Emirate</h4>
              <BarChart width={300} height={200} data={filteredArrival}>
                <XAxis dataKey="emirate" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
              <p className="chart-description">
                Shows number of vessels handled by each Emirate.
              </p>
            </div>

            <div className="chart-card">
              <h4>Document Compliance</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {complianceData.map((entry, index) => (
                    <Cell
                      key={`slice-${index}`}
                      className={`pie-slice-color-${index}`}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <p className="chart-description">
                Percentage of vessels with complete documentation.
              </p>
            </div>

            <div className="chart-card">
              <h4>Port Traffic Trends</h4>
              <LineChart width={300} height={200} data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4caf50"
                  strokeWidth={2}
                />
              </LineChart>
              <p className="chart-description">
                Month-wise port activity trend across Emirates.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default EmiratesDashboardPage;
