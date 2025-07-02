// src/components/AI/AIExplainChip.jsx

import React, { useState } from 'react';
import './AIExplainChip.css';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AIExplainChip = ({ explanation }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="ai-lens-wrapper">
            <div className="ai-lens-chip-container">
                <button className="ai-lens-chip" onClick={toggleExpand}>
                    <CenterFocusWeakIcon className="icon" />
                    <span className="label">AI Lens</span>
                    {expanded ? (
                        <ExpandLessIcon className="expand-icon" />
                    ) : (
                        <ExpandMoreIcon className="expand-icon" />
                    )}
                </button>
                <span className="ai-orbit-indicator" title="AI Activated"></span>
            </div>

            {expanded && (
                <div className="ai-lens-details">
                    <strong>Why this insight?</strong>
                    <p dangerouslySetInnerHTML={{ __html: explanation }} />
                </div>
            )}
        </div>
    );
};

export default AIExplainChip;
