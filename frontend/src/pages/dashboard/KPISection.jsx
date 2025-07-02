// KPISection.jsx
import React from 'react';
import './Dashboard.css';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnchorIcon from '@mui/icons-material/Anchor';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const KPISection = ({ portCalls, vessels, cargo, compliance, getTotal, getAvg }) => {
    return (
        <div className="kpi-section">
            <h2 className="section-title">
                <span className="material-icon"><Inventory2Icon /></span>
                Key Maritime Indicators
            </h2>
            <p className="section-description">This section highlights key metrics that reflect the operational status of UAE ports. Data is updated in real-time and powered by port call and clearance logs.</p>

            <div className="kpi-grid">
                <div className="kpi-card">
                    <EventIcon className="kpi-icon" />
                    <h4>Port Calls Today</h4>
                    <p className="kpi-value">{getTotal(portCalls, 'today')}</p>
                    <small className="kpi-subtitle">Number of port calls registered in the last 24 hours.</small>
                </div>
                <div className="kpi-card">
                    <CalendarMonthIcon className="kpi-icon" />
                    <h4>Port Calls (This Month)</h4>
                    <p className="kpi-value">{getTotal(portCalls, 'thisMonth')}</p>
                    <small className="kpi-subtitle">All scheduled port entries this month across UAE.</small>
                </div>
                <div className="kpi-card">
                    <AnchorIcon className="kpi-icon" />
                    <h4>Vessels In Port</h4>
                    <p className="kpi-value">{getTotal(vessels, 'inPort')}</p>
                    <small className="kpi-subtitle">Total vessels currently docked in UAE ports.</small>
                </div>
                <div className="kpi-card">
                    <TravelExploreIcon className="kpi-icon" />
                    <h4>Vessels En Route</h4>
                    <p className="kpi-value">{getTotal(vessels, 'enRoute')}</p>
                    <small className="kpi-subtitle">Incoming ships expected within the next 48 hours.</small>
                </div>
                <div className="kpi-card">
                    <Inventory2Icon className="kpi-icon" />
                    <h4>Cargo Volume (Tons)</h4>
                    <p className="kpi-value">{getTotal(cargo, 'volume')}</p>
                    <small className="kpi-subtitle">Cumulative volume of cargo handled today.</small>
                </div>
                <div className="kpi-card">
                    <CheckCircleIcon className="kpi-icon" />
                    <h4>FAL Compliance Rate</h4>
                    <p className="kpi-value">{getAvg(compliance, 'complianceRate')}%</p>
                    <small className="kpi-subtitle">Average submission compliance across all FAL forms.</small>
                </div>
            </div>
        </div>
    );
};

export default KPISection;
