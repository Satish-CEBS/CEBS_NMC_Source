// src/components/AIInsights.jsx

import React, { useState, useEffect } from 'react';
import './AIInsights.css';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BugReportIcon from '@mui/icons-material/BugReport';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import mockData from './dashboardMockData.json'; // Adjust path if needed

const AIInsights = () => {
    const allInsights = mockData.aiInsights || [];
    const [filter, setFilter] = useState('all');
    const [filtered, setFiltered] = useState(allInsights);

    useEffect(() => {
        const newFiltered = allInsights.filter((item) => {
            if (filter === 'congestion') return item.congestion === true;
            if (filter === 'anomaly') return item.anomaly === true;
            if (filter === 'eta') return item.etaAdjustment && item.etaAdjustment !== '0 mins';
            return true; // 'all'
        });
        setFiltered(newFiltered);
    }, [filter, allInsights]);

    return (
        <div className="ai-insights-wrapper">
            <div className="ai-header">
                <div className="ai-title-group">
                    <LightbulbIcon className="ai-icon" />
                    <h2>AI-Powered Operational Insights</h2>
                </div>
                <div className="ai-badge">
                    <span className="pulse" /> AI-Powered
                </div>
            </div>

            <p className="ai-description">
                This section highlights vessel ETA adjustments, congestion warnings, and anomaly detection
                derived from AI models. Use filters below to refine insights.
            </p>

            <div className="insight-filters">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                    <FilterAltIcon fontSize="small" /> All
                </button>
                <button className={filter === 'eta' ? 'active' : ''} onClick={() => setFilter('eta')}>
                    <AccessTimeIcon fontSize="small" /> ETA
                </button>
                <button className={filter === 'congestion' ? 'active' : ''} onClick={() => setFilter('congestion')}>
                    <WarningAmberIcon fontSize="small" /> Congestion
                </button>
                <button className={filter === 'anomaly' ? 'active' : ''} onClick={() => setFilter('anomaly')}>
                    <BugReportIcon fontSize="small" /> Anomaly
                </button>
            </div>

            <div className="ai-grid">
                {filtered.map((item, idx) => (
                    <div key={idx} className="ai-card">
                        <p><strong>{item.emirate}</strong></p>

                        {(filter === 'all' || filter === 'eta') && item.etaAdjustment && item.etaAdjustment !== '0 mins' && (
                            <p>
                                <AccessTimeIcon fontSize="small" /> ETA Adjustment: <span className="eta">{item.etaAdjustment}</span>
                            </p>
                        )}

                        {(filter === 'all' || filter === 'congestion') && item.congestion && (
                            <p className="alert-yellow">
                                <WarningAmberIcon fontSize="small" />
                                Congestion warning - AI detects high port activity
                            </p>
                        )}

                        {(filter === 'all' || filter === 'anomaly') && item.anomaly && (
                            <p className="alert-red">
                                <BugReportIcon fontSize="small" />
                                Crew list anomaly - suspicious pattern flagged
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIInsights;
