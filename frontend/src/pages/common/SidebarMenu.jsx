// E:\CEBS_NMC\frontend\src\pages\common\SidebarMenu.jsx
import React, { useState } from 'react';
import './SidebarMenu.css';
import {
    MdExpandLess,
    MdExpandMore,
    MdDirectionsBoat,
    MdAssignment,
    MdPeople,
    MdLocalShipping,
    MdDescription,
    MdDashboard,
    MdBarChart,
    MdGavel,
    MdLogin,
    MdSettings,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const menuData = [
    {
        label: 'Vessel & Port Call Management',
        icon: <MdDirectionsBoat />,
        items: [
            { label: 'Vessel Registration', path: '/vessel-registration' },
            { label: 'Port Call Request', path: '/port-call-request' },
            { label: 'Port Call Status Dashboard', path: '/port-call-status' },
            { label: 'Vessel Arrival Notification', path: '/vessel-arrival' },
            { label: 'Vessel Departure Notification', path: '/vessel-departure' },
        ],
    },
    {
        label: 'FAL Form Submissions',
        icon: <MdAssignment />,
        items: [
            { label: 'FAL Form 1 - General Declaration', path: '/fal1' },
            { label: 'FAL Form 2 - Cargo Declaration', path: '/fal2' },
            { label: 'FAL Form 3 - Ship\'s Stores Declaration', path: '/fal3' },
            { label: 'FAL Form 4 - Crew\'s Effects Declaration', path: '/fal4' },
            { label: 'FAL Form 5 - Crew List', path: '/fal5' },
            { label: 'FAL Form 6 - Passenger List', path: '/fal6' },
            { label: 'FAL Form 7 - Dangerous Goods Manifest', path: '/fal7' },
        ],
    },
    {
        label: 'Crew & Passenger Management',
        icon: <MdPeople />,
        items: [
            { label: 'Crew Manifest', path: '/crew-manifest' },
            { label: 'Passenger Manifest', path: '/passenger-manifest' },
            { label: 'Certificate Upload', path: '/certificate-upload' },
        ],
    },
    {
        label: 'Cargo & Dangerous Goods',
        icon: <MdLocalShipping />,
        items: [
            { label: 'Cargo Manifest', path: '/cargo-manifest' },
            { label: 'Dangerous Goods Declaration', path: '/dg-declaration' },
            { label: 'Container Information', path: '/container-info' },
        ],
    },
    {
        label: 'Certificates & Documentation',
        icon: <MdDescription />,
        items: [
            { label: 'Ship Certificates Upload', path: '/ship-certificates' },
            { label: 'Company Registration', path: '/company-registration' },
            { label: 'Flag State Documents', path: '/flag-documents' },
        ],
    },
    {
        label: 'Agency Dashboards',
        icon: <MdDashboard />,
        items: [
            { label: 'Customs Clearance', path: '/customs' },
            { label: 'Immigration Clearance', path: '/immigration' },
            { label: 'Port Authority Dashboard', path: '/port-authority' },
            { label: 'Maritime Health Authority', path: '/maritime-health' },
        ],
    },
    {
        label: 'Analytics & Reports',
        icon: <MdBarChart />,
        items: [
            { label: 'Reports & Export', path: '/reports' },
            { label: 'Emirates-wise Dashboard', path: '/emirates-dashboard' },
            { label: 'Audit Logs', path: '/audit-logs' },
        ],
    },
    {
        label: 'Compliance & Reference',
        icon: <MdGavel />,
        items: [
            { label: 'Inspection History', path: '/inspections' },
            { label: 'IMO Code Lookup', path: '/imo-codes' },
            { label: 'Master Data Management', path: '/master-data' },
        ],
    },
    {
        label: 'System Access',
        icon: <MdSettings />,
        items: [
            { label: 'Login', path: '/' },
            { label: 'Register', path: '/register' },
            { label: 'Admin Panel', path: '/admin' },
        ],
    },
];

const SidebarMenu = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleMenu = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <aside className="sidebar">
            {menuData.map((menu, index) => (
                <div key={index} className="sidebar-group">
                    <div className="sidebar-title" onClick={() => toggleMenu(index)}>
                        <span>{menu.icon}</span>
                        <span>{menu.label}</span>
                        <span>{expandedIndex === index ? <MdExpandLess /> : <MdExpandMore />}</span>
                    </div>
                    {expandedIndex === index && (
                        <div className="sidebar-items">
                            {menu.items.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `sidebar-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    );
};

export default SidebarMenu;
