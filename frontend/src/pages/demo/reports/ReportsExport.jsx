/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 * ReportsExportPage.jsx
 * Description: Report generation and export interface using mock portcall, prearrival, vessel, and location data.
 */

import React, { useState } from 'react';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import portcallData from '../../../mockData/portcall_data.json';
import prearrivalData from '../../../mockData/prearrival_data.json';
import locations from '../../../mockData/locations.json';
import vessels from '../../../mockData/vessels.json';
import './ReportsExport.css';

const ReportsExportPage = () => {
    const [reportType, setReportType] = useState('prearrival');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    const handleExport = (type) => {
        alert(`Exporting ${type} report... (PDF/CSV options to be implemented)`);
    };

    const getReportData = () => {
        switch (reportType) {
            case 'prearrival': return prearrivalData;
            case 'portcall': return portcallData;
            case 'vessels': return vessels;
            case 'locations': return locations;
            default: return [];
        }
    };

    const filteredData = getReportData().filter(item => {
        if (!dateRange.from || !dateRange.to) return true;
        const dateStr = item.submitted_date || item.created_date || '';
        const date = new Date(dateStr);
        const from = new Date(dateRange.from);
        const to = new Date(dateRange.to);
        return date >= from && date <= to;
    });

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader title="Reports & Data Export" />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    <div className="report-controls">
                        <label>Report Type:
                            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="prearrival">Pre-Arrival Notices</option>
                                <option value="portcall">Port Calls</option>
                                <option value="vessels">Vessel Master Data</option>
                                <option value="locations">Port Locations</option>
                            </select>
                        </label>

                        <label>Date Range:
                            <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
                            <span> to </span>
                            <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
                        </label>

                        <button className="btn-export" onClick={() => handleExport(reportType)}>Export Report</button>
                    </div>

                    <table className="report-table">
                        <thead>
                            <tr>
                                {reportType === 'prearrival' && (<>
                                    <th>Pre-Arrival ID</th>
                                    <th>Vessel</th>
                                    <th>Flag</th>
                                    <th>ETA</th>
                                    <th>Next Port</th>
                                    <th>Status</th>
                                </>)}
                                {reportType === 'portcall' && (<>
                                    <th>Port Call ID</th>
                                    <th>Vessel</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Status</th>
                                </>)}
                                {reportType === 'vessels' && (<>
                                    <th>Name</th>
                                    <th>IMO</th>
                                    <th>Flag</th>
                                    <th>Type</th>
                                    <th>Year Built</th>
                                </>)}
                                {reportType === 'locations' && (<>
                                    <th>Location Name</th>
                                    <th>Code</th>
                                    <th>Country</th>
                                    <th>Flag</th>
                                </>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    {reportType === 'prearrival' && (<>
                                        <td>{item.pre_arrival_id}</td>
                                        <td>{item.vessel?.name}</td>
                                        <td>{item.vessel?.flag}</td>
                                        <td>{new Date(item.voyage?.eta).toLocaleString()}</td>
                                        <td>{item.voyage?.next_port?.name}</td>
                                        <td>{item.status}</td>
                                    </>)}
                                    {reportType === 'portcall' && (<>
                                        <td>{item.port_call_id}</td>
                                        <td>{item.vessel_name}</td>
                                        <td>{item.departure_port}</td>
                                        <td>{item.submission_port}</td>
                                        <td>{item.status}</td>
                                    </>)}
                                    {reportType === 'vessels' && (<>
                                        <td>{item.name}</td>
                                        <td>{item.imo_no}</td>
                                        <td>{item.flag}</td>
                                        <td>{item.ship_type_detailed}</td>
                                        <td>{item.year_built}</td>
                                    </>)}
                                    {reportType === 'locations' && (<>
                                        <td>{item.name}</td>
                                        <td>{item.location_code}</td>
                                        <td>{item.country}</td>
                                        <td>{item.flag_code?.toUpperCase()}</td>
                                    </>)}
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

export default ReportsExportPage;
