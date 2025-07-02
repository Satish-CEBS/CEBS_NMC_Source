import React, { useState } from 'react';
import './TopTrends.css';
import { FaTruckMoving, FaBoxOpen, FaUsers, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';
import mockData from './dashboardMockData.json';

const TopTrends = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Flatten trends with metadata
    const trends = mockData.topTrends[0];
    const allTrends = [
        ...trends.ports.map(item => ({ ...item, category: 'Ports' })),
        ...trends.cargoTypes.map(item => ({ ...item, category: 'Cargo' })),
        ...trends.nationalities.map(item => ({ ...item, category: 'Crew' })),
    ];

    const filteredTrends = selectedCategory === 'All'
        ? allTrends
        : allTrends.filter(t => t.category === selectedCategory);

    // Icons by category
    const getIcon = (cat) => {
        if (cat === 'Ports') return <FaTruckMoving />;
        if (cat === 'Cargo') return <FaBoxOpen />;
        if (cat === 'Crew') return <FaUsers />;
        return null;
    };

    // Trend arrow
    const getTrendIcon = (trend) => {
        return trend === 'up'
            ? <FaArrowUp className="trend-up" />
            : <FaArrowDown className="trend-down" />;
    };

    // Insight text
    const getInsight = (name, cat, trend) => {
        if (cat === 'Ports') {
            return trend === 'up'
                ? `Increased traffic expected due to rerouted vessels.`
                : `Reduced port usage as cargo shifts to alternates.`;
        }
        if (cat === 'Cargo') {
            return trend === 'up'
                ? `Higher demand in regional cargo logistics.`
                : `Drop observed in cargo throughput.`;
        }
        if (cat === 'Crew') {
            return trend === 'up'
                ? `Rise in crew deployment from this nationality.`
                : `Reduction due to visa/policy changes.`;
        }
        return '';
    };

    return (
        <div className="top-trends-section">
            <div className="top-trends-header">
                <div className="title">
                    <FaFilter style={{ marginRight: '8px' }} />
                    Top 5 Trends – <span className="ai-highlight">AI-Powered</span>
                </div>
                <div className="trend-filters">
                    {['All', 'Ports', 'Cargo', 'Crew'].map(cat => (
                        <button
                            key={cat}
                            className={`trend-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <p className="top-trends-description">
                This section provides AI-curated insights across port activity, cargo handling, and nationality patterns. Changes are tracked compared to the previous analysis cycle.
            </p>

            <div className="trend-card-grid">
                {filteredTrends.map((item, idx) => (
                    <div className="trend-card" key={idx}>
                        <div className="trend-title">
                            {getIcon(item.category)} <strong>{item.name}</strong>
                        </div>
                        <div className="trend-stats">
                            {getTrendIcon(item.trend)}
                            <span className={item.trend === 'up' ? 'trend-up' : 'trend-down'}>
                                {item.trend === 'up' ? '+' : '-'}
                                {Math.floor(Math.random() * 12 + 3)}%
                            </span>
                        </div>
                        <p className="trend-insight">
                            {getInsight(item.name, item.category, item.trend)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopTrends;
