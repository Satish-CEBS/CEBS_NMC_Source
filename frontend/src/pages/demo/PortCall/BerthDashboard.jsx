// ------------------------------------------------------------------------
// @author      CEBS Worldwide
// @copyright   © 2025 CEBS Worldwide. All rights reserved.
// @license     STRICTLY CONFIDENTIAL
// ------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vessels from '../../../mockData/vessels.json';
import portcallData from '../../../mockData/portcall_data.json';
import berths from '../../../mockData/berths.json';
import './BerthDashboard.css';

import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

const UAE_TERMINALS = [
    'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain',
    'Ras Al Khaimah', 'Fujairah'
];

const BerthDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [vesselFilter, setVesselFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [terminalFilter, setTerminalFilter] = useState('All Terminals');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [terminalsState, setTerminalsState] = useState({});
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Load and merge data
    useEffect(() => {
        const merged = portcallData.map((entry, idx) => ({
            ...entry,
            berth_id: berths[idx]?.berth_id || `B-${idx + 1}`,
            terminal: terminalsState[idx] || entry.terminal || 'Not Assigned'
        }));
        setData(merged);
    }, [terminalsState]);

    const handleAdd = () => navigate('/berth-management'); // Add new
    const handleEdit = (id) => navigate(`/berth-management?id=${id}`);
    const handleDelete = (id) => {
        const updated = data.filter(item => item.vcn !== id);
        setData(updated);
        // Save logic for backend/localStorage can be added here
    };

    const handleTerminalChange = (idx, terminal) => {
        setTerminalsState(prev => ({ ...prev, [idx]: terminal }));
    };

    const filteredData = data
        .filter(entry => vesselFilter === '' || (entry.vessel_name?.toLowerCase() || '').includes(vesselFilter.toLowerCase()))
        .filter(entry => statusFilter === 'All' || entry.status === statusFilter)
        .filter(entry => terminalFilter === 'All Terminals' || entry.terminal === terminalFilter)
        .filter(entry => {
            if (!fromDate && !toDate) return true;
            const eta = new Date(entry.eta);
            return (!fromDate || eta >= new Date(fromDate)) &&
                (!toDate || eta <= new Date(toDate));
        });

    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + recordsPerPage);
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
            <SidebarMenu />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InnerHeader />
            <InnerSubHeader title="All Berth Requests" />
            <div className="berth-controls">
                <input
                    type="text"
                    placeholder="Search Vessel Name"
                    value={vesselFilter}
                    onChange={(e) => setVesselFilter(e.target.value)}
                />
                <select value={terminalFilter} onChange={(e) => setTerminalFilter(e.target.value)}>
                    <option>All Terminals</option>
                    {UAE_TERMINALS.map(t => <option key={t}>{t}</option>)}
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All</option>
                    <option>Draft</option>
                    <option>Submitted</option>
                    <option>Cleared</option>
                </select>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <select value={recordsPerPage} onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
                <button onClick={() => { setCurrentPage(1); }}>Filter</button>
                <button className="add-berth-btn" onClick={handleAdd}>+ Add Berth</button>
            </div>

            <table className="berth-table">
                <thead>
                    <tr>
                        <th>Berth ID</th>
                        <th>Vessel</th>
                        <th>ETA</th>
                        <th>VCN</th>
                        <th>Terminal</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.berth_id || 'N/A'}</td>
                            <td>{row.vessel_name || 'N/A'}</td>
                            <td>{row.eta || 'N/A'}</td>
                            <td>{row.vcn || 'N/A'}</td>
                            <td>
                                <select
                                    value={terminalsState[idx] || row.terminal || 'Not Assigned'}
                                    onChange={(e) => handleTerminalChange(idx, e.target.value)}
                                >
                                    <option disabled>Select</option>
                                    {UAE_TERMINALS.map(term => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                            </td>
                            <td className={`status ${row.status?.toLowerCase()}`}>{row.status}</td>
                            <td>
                                <span className="material-icons action-icon" onClick={() => handleEdit(row.vcn)}>edit</span>
                                <span className="material-icons action-icon delete" onClick={() => handleDelete(row.vcn)}>delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
            <Footer />
        </div>
        </div>
    );
};

export default BerthDashboard;
