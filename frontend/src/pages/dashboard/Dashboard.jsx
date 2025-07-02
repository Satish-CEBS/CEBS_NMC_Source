// src/pages/dashboard/Dashboard.jsx

import React, { useState, useRef } from 'react';
import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';

import FALAnalytics from './FALAnalytics';
import RiskTargetingHeatmap from './RiskTargetingHeatmap';
import LiveWorkflowOverview from './LiveWorkflowOverview';
import TopTrends from './TopTrends';
import NotificationsPanel from './NotificationsPanel';
import AIInsights from './AIInsights';

import './Dashboard.css';
import mockData from './dashboardMockData.json';

// 🧠 AI Components
import AIAssistantPanel from '../../components/AI/AIAssistantPanel';
import AIChatBotModal from '../../components/AI/AIChatBotModal';
import DrillDownModal from '../../components/AI/DrillDownModal';
import AIExplainChip from '../../components/AI/AIExplainChip';

// 🧭 Section Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DescriptionIcon from '@mui/icons-material/Description';
import RadarIcon from '@mui/icons-material/Radar';
import TrafficIcon from '@mui/icons-material/Traffic';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Dashboard = () => {
    const emirates = ['All Emirates', 'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

    const [selectedEmirate, setSelectedEmirate] = useState('All Emirates');
    const [expandedSections, setExpandedSections] = useState({
        kpi: true,
        aiInsights: false,
        falAnalytics: false,
        RiskTargetingHeatmap: true,
        workflows: true,
        topTrends: false,
        alerts: true
    });

    const [showAI, setShowAI] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [drillItem, setDrillItem] = useState(null);

    // Toggle open/close of each dashboard section
    const toggleSection = (key) => {
        setExpandedSections({ ...expandedSections, [key]: !expandedSections[key] });
    };

    // Filter data by emirate or return all
    const filterData = (key) => {
        const data = mockData[key];
        if (!Array.isArray(data)) return [];
        return selectedEmirate === 'All Emirates' ? data : data.filter((item) => item.emirate === selectedEmirate);
    };

    const getTotal = (arr, key) => Array.isArray(arr) ? arr.reduce((sum, item) => sum + (item[key] || 0), 0) : 0;
    const getAvg = (arr, key) => Array.isArray(arr) && arr.length ? Math.round(arr.reduce((sum, item) => sum + (item[key] || 0), 0) / arr.length) : 0;

    // Filtered dataset
    const portCalls = filterData('portCalls');
    const vessels = filterData('vessels');
    const clearance = filterData('clearanceTimes');
    const cargo = filterData('cargoVolumes');
    const compliance = filterData('falCompliance');
    const insights = filterData('aiInsights');
    const workflows = filterData('liveWorkflows');
    const trends = filterData('topTrends');
    const notifications = filterData('notifications');

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    {/* === Top Bar: Navigation + AI Buttons === */}
                    <div className="dashboard-top-bar">
                        <div className="section-nav">
                            <a href="#key-maritime-indicators" className="nav-pill">
                                <BarChartIcon fontSize="small" /> KPI
                            </a>
                            <a href="#ai-insights" className="nav-pill">
                                <SmartToyIcon fontSize="small" /> AI Insights
                            </a>
                            <a href="#fal-analytics" className="nav-pill">
                                <DescriptionIcon fontSize="small" /> FAL Analytics
                            </a>
                            <a href="#risk-targeting-heatmap" className="nav-pill">
                                <RadarIcon fontSize="small" /> Risk Targeting
                            </a>
                            <a href="#live-workflow-overview" className="nav-pill">
                                <TrafficIcon fontSize="small" /> Workflows
                            </a>
                            <a href="#top-trends" className="nav-pill">
                                <ShowChartIcon fontSize="small" /> Trends
                            </a>
                            <a href="#real-time-alerts" className="nav-pill">
                                <NotificationsIcon fontSize="small" /> Alerts
                            </a>
                        </div>

                        <div className="ai-actions">
                            <button className="ai-button green" onClick={() => setShowAI(!showAI)}>
                                <PsychologyAltIcon fontSize="small" /> AI Assistant
                            </button>
                            <button className="ai-button violet-outline" onClick={() => setChatOpen(true)}>
                                <ChatBubbleOutlineIcon fontSize="small" /> Ask AI
                            </button>
                        </div>
                    </div>





                    {/* 📊 KPI Section */}
                    <section id="key-maritime-indicators">
                        <div className="section-header" onClick={() => toggleSection('kpi')}>
                            <BarChartIcon /> <h2>Key Maritime Indicators</h2> <span>{expandedSections.kpi ? '−' : '+'}</span>
                        </div>
                        {/* 🗺️ Emirate Filter */}
                        <div className="emirate-filter">
                            {emirates.map((e) => (
                                <span key={e} className={selectedEmirate === e ? 'active' : ''} onClick={() => setSelectedEmirate(e)}>
                                    {e}
                                </span>
                            ))}
                        </div>
                            {expandedSections.kpi && (
                            <div className="kpi-grid">
                                <div className="kpi-card kpi-card-1"><h4>Port Calls Today</h4><p>{getTotal(portCalls, 'today')}</p></div>
                                <div className="kpi-card kpi-card-2"><h4>This Month</h4><p>{getTotal(portCalls, 'thisMonth')}</p></div>
                                <div className="kpi-card kpi-card-3"><h4>Vessels In Port</h4><p>{getTotal(vessels, 'inPort')}</p></div>
                                <div className="kpi-card kpi-card-4"><h4>Vessels En Route</h4><p>{getTotal(vessels, 'enRoute')}</p></div>
                                <div className="kpi-card kpi-card-5"><h4>Cargo (tons)</h4><p>{getTotal(cargo, 'volume')}</p></div>
                                <div className="kpi-card kpi-card-6"><h4>FAL Compliance</h4><p>{getAvg(compliance, 'complianceRate')}%</p></div>
                            </div>
                        )}
                    </section>

                    {/* 🤖 AI Insights */}
                    <section id="ai-insights">
                        <div className="section-header" onClick={() => toggleSection('aiInsights')}>
                            <SmartToyIcon /> <h2>AI Insights <AIExplainChip explanation="Generated using anomaly detection and crew pattern clustering." /></h2> <span>{expandedSections.aiInsights ? '−' : '+'}</span>
                        </div>
                        {expandedSections.aiInsights && <AIInsights insights={insights} />}
                    </section>

                    {/* 📄 FAL Analytics */}
                    <section id="fal-analytics">
                        <div className="section-header" onClick={() => toggleSection('falAnalytics')}>
                            <DescriptionIcon /> <h2>FAL Form Submissions [IMO]</h2> <span>{expandedSections.falAnalytics ? '−' : '+'}</span>
                        </div>
                        {expandedSections.falAnalytics && <FALAnalytics />}
                    </section>

                    {/* ⚠️ Risk Heatmap */}
                    <section id="risk-targeting-heatmap">
                        <div className="section-header" onClick={() => toggleSection('RiskTargetingHeatmap')}>
                            <RadarIcon /> <h2>AI Risk Targeting Heatmap <AIExplainChip explanation="AI analysis based on cargo, crew history and origin." /></h2> <span>{expandedSections.RiskTargetingHeatmap ? '−' : '+'}</span>
                        </div>
                        {expandedSections.RiskTargetingHeatmap && <RiskTargetingHeatmap />}
                    </section>

                    {/* 🛂 Live Workflows */}
                    <section id="live-workflow-overview">
                        <div className="section-header" onClick={() => toggleSection('workflows')}>
                            <TrafficIcon /> <h2>Live Workflow Overview</h2> <span>{expandedSections.workflows ? '−' : '+'}</span>
                        </div>
                        {expandedSections.workflows && <LiveWorkflowOverview workflows={workflows} />}
                    </section>

                    {/* 📈 Top 5 Trends */}
                    <section id="top-trends">
                        <div className="section-header" onClick={() => toggleSection('topTrends')}>
                            <ShowChartIcon /> <h2>Top 5 Trends <AIExplainChip explanation="Trend data based on last 7-day volume movement." /></h2> <span>{expandedSections.topTrends ? '−' : '+'}</span>
                        </div>
                        {expandedSections.topTrends && <TopTrends trends={trends} />}
                    </section>

                    {/* 🚨 Real-Time Alerts */}
                    <section id="real-time-alerts">
                        <div className="section-header" onClick={() => toggleSection('alerts')}>
                            <NotificationsIcon /> <h2>Real-Time Maritime Alerts</h2> <span>{expandedSections.alerts ? '−' : '+'}</span>
                        </div>
                        {expandedSections.alerts && <NotificationsPanel notifications={notifications} />}
                    </section>

                    {/* 🧠 AI Panels & Modals */}
                    {showAI && <AIAssistantPanel onDrillDown={(item) => setDrillItem(item)} />}
                    {chatOpen && <AIChatBotModal onClose={() => setChatOpen(false)} />}
                    {drillItem && <DrillDownModal item={drillItem} onClose={() => setDrillItem(null)} />}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
