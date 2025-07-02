import React, { useState, useEffect } from 'react';
import './LiveWorkflowOverview.css';

import ManageSearchIcon from '@mui/icons-material/ManageSearch'; // ✅ Replacing 🧭 icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FilterListIcon from '@mui/icons-material/FilterList';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import workflowStatusMockData from './workflowStatusMockData.json'; // ✅ Using local data file

const LiveWorkflowOverview = () => {
    const [records, setRecords] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedEmirate, setSelectedEmirate] = useState('All');

    useEffect(() => {
        if (workflowStatusMockData?.workflowStatus?.length) {
            setRecords(workflowStatusMockData.workflowStatus);
        }
    }, []);

    const statusOptions = ['All', 'Cleared', 'Processing', 'Flagged'];
    const emirateOptions = ['All', ...Array.from(new Set(records.map(r => r.emirate)))];

    const getAgencyIcon = (agency) => {
        switch (agency) {
            case 'customs': return <GavelIcon />;
            case 'immigration': return <EmojiPeopleIcon />;
            case 'health': return <HealthAndSafetyIcon />;
            default: return null;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Cleared': return <CheckCircleIcon className="cleared-icon" />;
            case 'Processing': return <HourglassBottomIcon className="processing-icon" />;
            case 'Flagged': return <WarningAmberIcon className="flagged-icon" />;
            default: return null;
        }
    };

    const filteredData = records.filter(entry => {
        const emirateMatch = selectedEmirate === 'All' || entry.emirate === selectedEmirate;
        const statusMatch =
            selectedStatus === 'All' ||
            ['customs', 'immigration', 'health'].some(
                agency => entry[agency]?.status === selectedStatus
            );
        return emirateMatch && statusMatch;
    });

    return (
        <div className="workflow-section">
            <div className="workflow-header">
                <div className="workflow-title">
                    <ManageSearchIcon style={{ fontSize: '1.6rem', marginRight: '0.4rem' }} />
                    <h2>Port-Wise Real-Time Clearance Status</h2>
                </div>
                <p className="workflow-description">
                    Displays real-time clearance statuses across UAE Emirates with AI-suggested actions for Customs, Immigration, and Health. Use the filters below to view specific risks and statuses.
                </p>
            </div>

            {/* Filters */}
            <div className="workflow-filters">
                <div className="filter-group">
                    <FilterListIcon /> <strong>Status:</strong>
                    {statusOptions.map(status => (
                        <button
                            key={status}
                            className={`filter-button ${selectedStatus === status ? 'active' : ''}`}
                            onClick={() => setSelectedStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="filter-group">
                    <FilterListIcon /> <strong>Emirate:</strong>
                    {emirateOptions.map(em => (
                        <button
                            key={em}
                            className={`filter-button ${selectedEmirate === em ? 'active' : ''}`}
                            onClick={() => setSelectedEmirate(em)}
                        >
                            {em}
                        </button>
                    ))}
                </div>
            </div>

            {/* Workflow Cards */}
            <div className="workflow-grid">
                {filteredData.map((entry, idx) => (
                    <div className="workflow-card" key={idx}>
                        <h3>{entry.emirate}</h3>
                        {['customs', 'immigration', 'health'].map((agency) => {
                            const agencyData = entry[agency];
                            const statusClass = agencyData.status.toLowerCase();
                            return (
                                <div key={agency} className={`agency-box ${statusClass}`}>
                                    <div className="agency-header">
                                        {getAgencyIcon(agency)}
                                        <span className="agency-title">{agency.toUpperCase()}</span>
                                        <span className="status">
                                            {agencyData.status} {getStatusIcon(agencyData.status)}
                                        </span>
                                    </div>

                                    {/* AI Note shown as a separate block */}
                                    <div className={`ai-note-block ${statusClass}`}>
                                        {agencyData.status !== 'Cleared' ? (
                                            <strong>AI Suggestion:</strong>
                                        ) : null}
                                        <span> {agencyData.aiNote}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveWorkflowOverview;
