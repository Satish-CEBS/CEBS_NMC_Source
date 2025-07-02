// src/pages/dashboard/FALAnalytics.jsx

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import DescriptionIcon from '@mui/icons-material/Description';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import './Dashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const FALAnalytics = () => {
    const formLabels = ['FAL 1', 'FAL 2', 'FAL 3', 'FAL 4', 'FAL 5', 'FAL 6', 'FAL 7'];
    const formCounts = [78, 65, 90, 55, 72, 68, 80]; // Sample weekly submission counts
    const aiVsManual = [64, 36]; // In percent

    const barData = {
        labels: formLabels,
        datasets: [
            {
                label: 'Weekly Submissions',
                data: formCounts,
                backgroundColor: [
                    '#fbbf24', '#60a5fa', '#34d399', '#f87171', '#a78bfa', '#f472b6', '#facc15',
                ],
                borderRadius: 6,
                barPercentage: 0.5,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Submissions: ${context.raw} (this week)`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Submissions (per week)',
                    color: '#666',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
                ticks: {
                    stepSize: 10,
                },
                grid: { drawBorder: false },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const doughnutData = {
        labels: ['Auto-Cleared by AI (%)', 'Manually Reviewed (%)'],
        datasets: [
            {
                label: 'Clearance Method',
                data: aiVsManual,
                backgroundColor: ['#4fc3f7', '#ff8a65'],
                borderColor: ['#039be5', '#e65100'],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw;
                        return `${label}: ${value}%`;
                    },
                },
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 14,
                    padding: 20,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="fal-chart-container">
            <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#333' }}>
                    <DescriptionIcon style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    FAL Form Submissions & AI Clearance
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                    This section shows the number of FAL forms submitted <em>(weekly)</em> and the proportion
                    of submissions that are <strong>auto-cleared by AI</strong> vs <strong>manually reviewed</strong>
                    by port authorities. This helps identify clearance bottlenecks across forms FAL 1 to FAL 7.
                </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                {/* Bar Chart */}
                <div style={{ flex: '2 1 400px', height: '320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <InsertChartIcon style={{ color: '#444' }} />
                        <strong style={{ fontSize: '1rem', color: '#444' }}>Submissions Per FAL Form</strong>
                    </div>
                    <Bar data={barData} options={barOptions} />
                </div>

                {/* Doughnut Chart */}
                <div style={{ flex: '1 1 250px', height: '320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <TrackChangesIcon style={{ color: '#444' }} />
                        <strong style={{ fontSize: '1rem', color: '#444' }}>AI vs Manual Clearance</strong>
                    </div>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
            </div>
        </div>
    );
};

export default FALAnalytics;
