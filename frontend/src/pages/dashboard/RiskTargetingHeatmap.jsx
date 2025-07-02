import React, { useState } from 'react';
import './RiskTargetingHeatmap.css';
import riskTargetingData from './riskTargetingData.json';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const riskColors = {
    critical: 'risk-critical',
    high: 'risk-high',
    medium: 'risk-medium',
    low: 'risk-low',
    none: 'risk-none'
};

const riskLabels = {
    critical: 'Critical risk, immediate action required',
    high: 'High risk, needs action',
    medium: 'Moderate risk, increased monitoring',
    low: 'Low risk, normal operations',
    none: 'No current risk detected'
};

const RiskTargetingHeatmap = () => {
    const [selectedEmirate, setSelectedEmirate] = useState('All');

    const emirates = [...new Set(riskTargetingData.map(item => item.emirate))].sort();
    const filteredData = selectedEmirate === 'All'
        ? riskTargetingData
        : riskTargetingData.filter(item => item.emirate === selectedEmirate);

    return (
        <div className="heatmap-container">
            <div className="heatmap-header">
                <h2><span className="section-icon">⚠️</span> AI Risk Targeting Heatmap</h2>
                <p className="heatmap-subtitle">
                    <strong>Displays real-time clearance statuses across UAE Emirates</strong> with <strong>AI-suggested actions for Customs, Immigration, and Health.</strong>
                    Use the drill-down view to explore exposure levels and operational risks.
                </p>
            </div>

            <div className="emirate-filters">
                <button
                    className={`emirate-chip ${selectedEmirate === 'All' ? 'selected' : ''}`}
                    onClick={() => setSelectedEmirate('All')}
                >All</button>
                {emirates.map(em => (
                    <button
                        key={em}
                        className={`emirate-chip ${selectedEmirate === em ? 'selected' : ''}`}
                        onClick={() => setSelectedEmirate(em)}
                    >{em}</button>
                ))}
            </div>

            <div className="heatmap-grid">
                <div className="heatmap-header-row">
                    <div className="col-emirate">Emirate</div>
                    <div className="col-risk">Customs</div>
                    <div className="col-risk">Immigration</div>
                    <div className="col-risk">Health</div>
                </div>

                {filteredData.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="heatmap-row">
                            <div className="col-emirate">{item.emirate}</div>

                            {['customs', 'immigration', 'health'].map(dept => (
                                item[dept]?.riskLevel ? (
                                    <div
                                        className={`col-risk ${riskColors[item[dept].riskLevel.toLowerCase()]}`}
                                        title={riskLabels[item[dept].riskLevel.toLowerCase()]}
                                    >
                                        <div className="risk-label">{item[dept].riskLevel}</div>
                                        <div className="risk-desc">{riskLabels[item[dept].riskLevel.toLowerCase()]}</div>
                                    </div>
                                ) : (
                                    <div className={`col-risk ${riskColors['none']}`}>
                                        <div className="risk-label">None</div>
                                        <div className="risk-desc">{riskLabels['none']}</div>
                                    </div>
                                )
                            ))}
                        </div>

                        {(item.customs?.aiNote || item.immigration?.aiNote || item.health?.aiNote) && (
                            <div className="ai-insight-box">
                                <div className="ai-insight-title">
                                    <InfoOutlinedIcon className="ai-icon" />
                                    <strong>AI Insights:</strong>
                                </div>
                                <ul>
                                    {item.customs?.aiNote && <li><strong>Customs:</strong> {item.customs.aiNote}</li>}
                                    {item.immigration?.aiNote && <li><strong>Immigration:</strong> {item.immigration.aiNote}</li>}
                                    {item.health?.aiNote && <li><strong>Health:</strong> {item.health.aiNote}</li>}
                                </ul>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default RiskTargetingHeatmap;
