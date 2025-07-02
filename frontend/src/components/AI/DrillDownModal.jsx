// src/components/AI/DrillDownModal.jsx

import React from 'react';
import './DrillDownModal.css';

// Material Icons
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from '@mui/icons-material/Close';

const DrillDownModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="drilldown-modal">
            {/* Modal Header */}
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0061b0' }}>
                <InsightsIcon /> Drill-Down: {item.type}
            </h3>

            {/* Detail Display */}
            <p><strong>Suggestion:</strong> {item.suggestion}</p>
            <p><strong>Urgency:</strong> {item.urgency}</p>
            {item.agency && <p><strong>Agency:</strong> {item.agency}</p>}
            {item.emirate && <p><strong>Emirate:</strong> {item.emirate}</p>}

            {/* Close Button */}
            <button className="ai-button" onClick={onClose}>
                <CloseIcon style={{ fontSize: '16px' }} /> Close
            </button>
        </div>
    );
};

export default DrillDownModal;
