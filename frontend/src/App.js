/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import "./i18n";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//import ViewPreArrival from './pages/Pre-Arrival/ViewPreArrival';
//import PreArrivalCreatePage from './pages/Pre-Arrival/PreArrivalCreatePage';
//import axios from 'axios';

import DemoPortCallWizard from "./pages/demo/PortCall/DemoPortCallWizard";
import PortCallListPage from "./pages/demo/PortCall/PortCallListPage";
import PortCallViewPage from "./pages/demo/PortCall/PortCallViewPage";
import BerthDashboard from "./pages/demo//PortCall/BerthDashboard";
import BerthManagement from "./pages/demo/PortCall/BerthManagement";
import AddBerthForm from "./pages/demo/PortCall/AddBerthForm";

import PreArrivalWizard from "./pages/demo/PreArrival/PreArrivalWizard";
import PreArrivalDashboard from "./pages/demo/PreArrival/PreArrivalDashboard";
import PreArrivalListPage from "./pages/demo/PreArrival/PreArrivalListPage";
import PreArrivalViewPage from "./pages/demo/PreArrival/PreArrivalViewPage";

import StowagePlanDashboard from "./pages/demo/Stowage/StowagePlanDashboard";
import AddStowagePlan from "./pages/demo/Stowage/AddStowagePlan";
import ViewStowagePlan from "./pages/demo/Stowage/ViewStowagePlan";
import UploadStowageFile from "./pages/demo/Stowage/UploadStowageFile";

import VesselRegistration from "./pages/demo/Vessel/VesselRegistration";
import VesselListPage from "./pages/demo/Vessel/VesselListPage";
import VesselViewPage from "./pages/demo/Vessel/VesselViewPage";

import ReportsExport from "./pages/demo/reports/ReportsExport";
import EmiratesDashboard from "./pages/demo/emirates/EmiratesDashboard";
import AuditLogs from "./pages/demo/audit/AuditLogs";

import DepartureWizard from "./pages/demo/Departure/DepartureWizard";
import FALForm1 from "./pages/demo/forms/FALForm1";
import CrewManifest from "./pages/demo/CrewPassenger/CrewManifest";
import PassengerManifest from "./pages/demo/CrewPassenger/PassengerManifest";

import NMCPreArrivalWizard from "./pages/demo/NMCPreArrival/NMCPreArrivalWizard";

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/portcall-wizard" element={<DemoPortCallWizard />} />
        <Route path="/portcall-dashboard" element={<PortCallListPage />} />
        <Route path="/portCall-view/:id" element={<PortCallViewPage />} />
        <Route path="/berth-dashboard" element={<BerthDashboard />} />
        <Route path="/berths/*" element={<BerthManagement />} />
        <Route path="/berth-management" element={<AddBerthForm />} />

        <Route path="/prearrival-wizard" element={<PreArrivalWizard />} />
        <Route path="/prearrival-dashboard" element={<PreArrivalDashboard />} />
        <Route path="/prearrival-list" element={<PreArrivalListPage />} />
        <Route path="/prearrival-view/:id" element={<PreArrivalViewPage />} />

        <Route path="/stowage-dashboard" element={<StowagePlanDashboard />} />
        <Route path="/stowage/add" element={<AddStowagePlan />} />
        <Route path="/stowage/view" element={<ViewStowagePlan />} />
        <Route path="/stowage/view/:vcn" element={<ViewStowagePlan />} />
        <Route path="/stowage/upload" element={<UploadStowageFile />} />

        <Route path="/vessel-registration" element={<VesselRegistration />} />
        <Route path="/vessel-dashboard" element={<VesselListPage />} />
        <Route path="/vessel/view/:id" element={<VesselViewPage />} />

        {/* Analytics & Reports */}
        <Route path="/reports" element={<ReportsExport />} />
        <Route path="/emirates-dashboard" element={<EmiratesDashboard />} />
        <Route path="/audit-logs" element={<AuditLogs />} />

        <Route path="/departure-wizard" element={<DepartureWizard />} />
        <Route path="/fal1" element={<FALForm1 />} />
        <Route path="/crew-manifest" element={<CrewManifest />} />
        <Route path="/passenger-manifest" element={<PassengerManifest />} />

        <Route
          path="/nmc-prearrival-wizard"
          element={<NMCPreArrivalWizard />}
        />
      </Routes>
    </Router>
  </LocalizationProvider>
);

export default App;
