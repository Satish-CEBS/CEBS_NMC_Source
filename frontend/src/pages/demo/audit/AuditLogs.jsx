/* ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------ */

import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import auditData from '../../../mockData/audit_logs_data.csv';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import './AuditLogs.css';

const AuditLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [userFilter, setUserFilter] = useState('');
    const [moduleFilter, setModuleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        fetch(auditData)
            .then((res) => res.text())
            .then((data) => {
                const rows = data.split('\n').slice(1);
                const parsed = rows.map((line) => {
                    const [log_id, timestamp, user, module, action, description] = line.split(',');
                    return { log_id, timestamp, user, module, action, description };
                });
                setLogs(parsed);
                setFilteredLogs(parsed);
            });
    }, []);

    useEffect(() => {
        let temp = logs;
        if (userFilter) temp = temp.filter((log) => log.user === userFilter);
        if (moduleFilter) temp = temp.filter((log) => log.module === moduleFilter);
        if (dateFilter) temp = temp.filter((log) => log.timestamp.includes(dateFilter));
        setFilteredLogs(temp);
    }, [userFilter, moduleFilter, dateFilter]);

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Audit Logs Report', 14, 16);
        const tableColumn = ['ID', 'Timestamp', 'User', 'Module', 'Action', 'Description'];
        const tableRows = filteredLogs.map(({ log_id, timestamp, user, module, action, description }) => [
            log_id, timestamp, user, module, action, description
        ]);
        doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
        doc.save('audit_logs.pdf');
    };

    const uniqueUsers = [...new Set(logs.map(log => log.user))];
    const uniqueModules = [...new Set(logs.map(log => log.module))];

    return (
        <div className="audit-logs-page">
            <InnerHeader />
            <InnerSubHeader title="System Audit Logs" />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="audit-logs-content">
                    <div className="filters">
                        <select onChange={(e) => setUserFilter(e.target.value)} value={userFilter}>
                            <option value=''>Filter by User</option>
                            {uniqueUsers.map(user => <option key={user}>{user}</option>)}
                        </select>
                        <select onChange={(e) => setModuleFilter(e.target.value)} value={moduleFilter}>
                            <option value=''>Filter by Module</option>
                            {uniqueModules.map(module => <option key={module}>{module}</option>)}
                        </select>
                        <input type='date' onChange={(e) => setDateFilter(e.target.value)} value={dateFilter} />
                        <CSVLink data={filteredLogs} filename={'audit_logs.csv'} className="export-btn">Export CSV</CSVLink>
                        <button onClick={exportPDF} className="export-btn">Export PDF</button>
                    </div>

                    <table className="audit-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Timestamp</th>
                                <th>User</th>
                                <th>Module</th>
                                <th>Action</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.log_id}>
                                    <td>{log.log_id}</td>
                                    <td>{log.timestamp}</td>
                                    <td>{log.user}</td>
                                    <td>{log.module}</td>
                                    <td>{log.action}</td>
                                    <td>{log.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AuditLogsPage;
