// E:\CEBS_NMC\frontend\src\pages\common\SidebarMenu.jsx
import React, { useState } from "react";
import "./SidebarMenu.css";
import {
  MdExpandLess,
  MdExpandMore,
  MdDirectionsBoat,
  MdAssignment,
  MdPeople,
  MdLocalShipping,
  MdDescription,
  MdDashboard,
  MdBarChart,
  MdGavel,
  MdLogin,
  MdSettings,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuData = [
  {
    label: "Pre-Arrival Notification",
    icon: <MdDirectionsBoat />,
    items: [
      { label: "Pre-Arrival Dashboard", path: "/prearrival-dashboard" },
      { label: "Pre-Arrival List", path: "/prearrival-list" },
      { label: "New Pre-Arrival Notification", path: "/prearrival-wizard" },
      { label: "🆕 NMC Pre-Arrival Wizard", path: "/nmc-prearrival-wizard" },
    ],
  },
  {
    label: "Port Call Management",
    icon: <MdDirectionsBoat />,
    items: [
      { label: "Port Call Management Dashboard", path: "/portcall-dashboard" },
      { label: "New Port Call Notification", path: "/portcall-wizard" },
      { label: "Berth Dashboard", path: "/berth-dashboard" },
      { label: "Arrival at anchorage", path: "" },
      { label: "Pilot boarding", path: "" },
      { label: "Berthing", path: "" },
      { label: "Cargo operations", path: "" },
      { label: "Departure and clearance", path: "" },
    ],
  },
  {
    label: "Vessel Management",
    icon: <MdDirectionsBoat />,
    items: [
      { label: "Vessel Registration", path: "/vessel-registration" },
      { label: "Vessel Dashboard", path: "/vessel-dashboard" },
      { label: "Vessel Arrival Notification", path: "/vessel-arrival" },
      { label: "Vessel Departure Notification", path: "/vessel-departure" },
    ],
  },
  {
    label: "Departure Management",
    icon: <MdDirectionsBoat />,
    items: [
      { label: "Departure Notification Wizard", path: "/departure-wizard" },
    ],
  },
  {
    label: "Stowage & Cargo Handling",
    icon: <MdLocalShipping />,
    items: [
      { label: "Stowage Plan Dashboard", path: "/stowage-dashboard" },
      { label: "Add Stowage Plan", path: "/stowage/add" },
      { label: "Upload Stowage File", path: "/stowage/upload" },
      { label: "Review Stowage Details", path: "/stowage/review" },
    ],
  },

  {
    label: "Crew & Passenger Management",
    icon: <MdPeople />,
    items: [
      { label: "Crew Manifest Upload", path: "/crew-manifest" },
      { label: "Passenger Manifest Upload", path: "/passenger-manifest" },
    ],
  },
  {
    label: "Analytics & Reports",
    icon: <MdBarChart />,
    items: [
      { label: "Reports & Export", path: "/reports" },
      { label: "Emirates-wise Dashboard", path: "/emirates-dashboard" },
      { label: "Audit Logs", path: "/audit-logs" },
    ],
  },
  {
    label: "Compliance & Reference",
    icon: <MdGavel />,
    items: [
      { label: "Inspection History", path: "/inspections" },
      { label: "IMO Code Lookup", path: "/imo-codes" },
      { label: "Master Data Management", path: "/master-data" },
    ],
  },
  {
    label: "System Access",
    icon: <MdSettings />,
    items: [
      //{ label: 'Login', path: '/' },
      //{ label: 'Register', path: '/register' },
      { label: "Admin Panel", path: "/admin" },
    ],
  },
  {
    label: "References FAL Form Submissions",
    icon: <MdAssignment />,
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
const SidebarMenu = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleMenu = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <aside className="sidebar">
      {menuData.map((menu, index) => (
        <div key={index} className="sidebar-group">
          <div className="sidebar-title" onClick={() => toggleMenu(index)}>
            <span>{menu.icon}</span>
            <span>{menu.label}</span>
            <span>
              {expandedIndex === index ? <MdExpandLess /> : <MdExpandMore />}
            </span>
          </div>
          {expandedIndex === index && (
            <div className="sidebar-items">
              {menu.items.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default SidebarMenu;
