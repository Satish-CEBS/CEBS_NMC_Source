// src/components/AI/AIAssistantPanel.jsx

import React from 'react';
import './AIAssistantPanel.css';
import mockData from './mockAIData';

// Material Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SearchIcon from '@mui/icons-material/Search';

const AIAssistantPanel = ({ onDrillDown }) => {
    return (
        <div className="ai-panel">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0061b0' }}>
                <LightbulbIcon /> AI Assistant – Smart Suggestions
            </h3>

            {mockData.suggestions.map((item, index) => (
                <div key={index} className={`suggestion-card ${item.urgency.toLowerCase()}`}>
                    <h4>{item.type}</h4>
                    <p>{item.suggestion}</p>
                    <small><strong>Emirate:</strong> {item.emirate || 'All'}</small>

                    {/* Show button for high/medium risk suggestions */}
                    {['High', 'Medium'].includes(item.urgency) && (
                        <button className="ai-button" onClick={() => onDrillDown(item)}>
                            <SearchIcon style={{ fontSize: '16px' }} /> View Details
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AIAssistantPanel;
