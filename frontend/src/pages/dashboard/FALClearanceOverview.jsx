// src/pages/dashboard/FALClearanceOverview.jsx
import React from 'react';
import './FALClearanceOverview.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const FALClearanceOverview = () => {
    const falData = [
        { name: 'FAL 1', submissions: 120 },
        { name: 'FAL 2', submissions: 240 },
        { name: 'FAL 3', submissions: 195 },
        { name: 'FAL 4', submissions: 400 },
        { name: 'FAL 5', submissions: 310 },
        { name: 'FAL 6', submissions: 260 },
        { name: 'FAL 7', submissions: 175 },
    ];

    const clearanceData = [
        { name: 'Auto-Cleared', value: 72 },
        { name: 'Manually Reviewed', value: 28 },
    ];

    const COLORS = ['#06b78a', '#f59e0b'];

    return (
        <div className="fal-clearance-section">
            <div className="chart-card">
                <div className="chart-title">
                    <AssignmentIcon className="icon" />
                    <span>FAL Form Submissions (1-7)</span>
                </div>
                <p className="chart-desc">This bar chart displays the number of FAL form submissions made for each IMO form type (1–7).</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={falData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="submissions" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <div className="chart-title">
                    <AutorenewIcon className="icon" />
                    <span>% Auto-Cleared vs Manual</span>
                </div>
                <p className="chart-desc">This donut chart shows the percentage of FAL forms auto-cleared by the system vs those requiring manual review.</p>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={clearanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            label
                            dataKey="value"
                        >
                            {clearanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FALClearanceOverview;
