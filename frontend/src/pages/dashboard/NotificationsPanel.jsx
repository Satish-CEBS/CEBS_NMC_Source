import React, { useState } from 'react';
import './NotificationsPanel.css';
import mockData from './dashboardMockData.json';

// Icons
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import ShieldIcon from '@mui/icons-material/Shield';

const getIconByType = (type) => {
    if (type === 'error') return <ErrorIcon style={{ color: '#b91c1c' }} />;
    if (type === 'warning') return <WarningIcon style={{ color: '#f59e0b' }} />;
    return <InfoIcon style={{ color: '#0ea5e9' }} />;
};

const getSeverityColor = (severity) => {
    if (severity === 'high') return 'high-severity';
    if (severity === 'medium') return 'medium-severity';
    return 'low-severity';
};

const NotificationsPanel = () => {
    const all = mockData.notifications || [];

    const [filters, setFilters] = useState({
        type: 'all',
        severity: 'all',
        agency: 'all',
        emirate: 'all'
    });

    const suggestAction = (type, message) => {
        if (type === 'error') {
            if (message.toLowerCase().includes('berth')) return 'Notify vessel master and reassign berth immediately.';
            if (message.toLowerCase().includes('regulation')) return 'Broadcast regulatory change to port agents and customs systems.';
            return 'Escalate to agency head and log incident.';
        } else if (type === 'warning') {
            if (message.toLowerCase().includes('medical')) return 'Alert port health authority and prepare quarantine protocols.';
            return 'Monitor situation and notify operations team.';
        } else {
            if (message.toLowerCase().includes('inspection')) return 'Reschedule cargo processing and update ETD.';
            return 'Log update and inform relevant departments.';
        }
    };

    const filtered = all.filter(n => {
        return (
            (filters.type === 'all' || n.type === filters.type) &&
            (filters.severity === 'all' || n.severity === filters.severity) &&
            (filters.agency === 'all' || n.agency === filters.agency) &&
            (filters.emirate === 'all' || n.emirate === filters.emirate)
        );
    });

    const unique = (key) => [...new Set(all.map(n => n[key]))];

    return (
        <div id="real-time-alerts" className="notifications-panel">
            <div className="notifications-header">
                <h2><ShieldIcon fontSize="small" style={{ marginRight: 6 }} /> Real-Time Maritime Alerts</h2>
                <div className="filters">
                    <select onChange={e => setFilters({ ...filters, type: e.target.value })}>
                        <option value="all">Type</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                    </select>
                    <select onChange={e => setFilters({ ...filters, severity: e.target.value })}>
                        <option value="all">Severity</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select onChange={e => setFilters({ ...filters, agency: e.target.value })}>
                        <option value="all">Agency</option>
                        {unique('agency').map((a, i) => (
                            <option key={i} value={a}>{a}</option>
                        ))}
                    </select>
                    <select onChange={e => setFilters({ ...filters, emirate: e.target.value })}>
                        <option value="all">Emirate</option>
                        {unique('emirate').map((e, i) => (
                            <option key={i} value={e}>{e}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="notification-list">
                {filtered.map((n, idx) => (
                    <div className="notification-card" key={idx}>
                        <div className="card-top">
                            <div className="icon">{getIconByType(n.type)}</div>
                            <div className="meta">
                                <div><strong>{n.emirate}</strong> • {n.agency}</div>
                                <div className={`badge ${getSeverityColor(n.severity)}`}>
                                    {n.type.toUpperCase()} – {n.severity.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div className="message">📝 {n.message}</div>
                        <div className="ai-suggestion">
                            💡 <span className="ai-label">AI Suggestion:</span> {suggestAction(n.type, n.message)}
                        </div>
                        <div className="timestamp">🕒 {new Date(n.timestamp).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsPanel;
