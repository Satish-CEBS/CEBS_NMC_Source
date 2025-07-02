// src/pages/dashboard/RealTimeAlerts.jsx

import React from 'react';
import './RealTimeAlerts.css';
import realTimeAlerts from './RealTimeAlerts.json';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const severityColors = {
    High: 'high',
    Medium: 'medium',
    Low: 'low',
};

const RealTimeAlerts = () => {
    return (
        <div className="alerts-section">
            <div className="alerts-header">
                <WarningAmberIcon className="alerts-icon" />
                <h3>Real-Time Maritime Alerts</h3>
            </div>
            <p className="alerts-desc">
                This section highlights AI-flagged security or compliance alerts generated in real time by port monitoring systems, customs databases, and health inspections.
            </p>
            <div className="alerts-grid">
                {realTimeAlerts.map((alert, index) => (
                    <div className={`alert-card ${severityColors[alert.severity]}`} key={index}>
                        <div className="alert-title">{alert.alertType}</div>
                        <div className="alert-meta">
                            <strong>{alert.emirate}</strong> – {alert.agency}
                        </div>
                        <div className="alert-time">
                            {new Date(alert.time).toLocaleString('en-GB', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                            })}
                        </div>
                        <div className={`alert-severity ${severityColors[alert.severity]}`}>
                            {alert.severity} Severity
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RealTimeAlerts;
