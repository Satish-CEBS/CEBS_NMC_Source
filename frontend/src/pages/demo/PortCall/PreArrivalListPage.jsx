import React, { useState } from 'react';
import data from '../../../mockData/prearrival_data.json';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import './PreArrivalListPage.css'; // Optional: for custom styling
import { useNavigate } from 'react-router-dom';

const PreArrivalListPage = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        vesselName: '',
        imo: '',
        mmsi: '',
        voyageNo: '',
        portCallId: '',
        port: '',
        status: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const filteredData = data.filter(item =>
        (item.vessel_name || '').toLowerCase().includes(filters.vesselName.toLowerCase()) &&
        String(item.imo_number || '').toLowerCase().includes(filters.imo.toLowerCase()) &&
        String(item.mmsi_number || '').toLowerCase().includes(filters.mmsi.toLowerCase()) &&
        (item.voyage_no || '').toLowerCase().includes(filters.voyageNo.toLowerCase()) &&
        (item.port_call_id || '').toLowerCase().includes(filters.portCallId.toLowerCase()) &&
        (item.departure_port || '').toLowerCase().includes(filters.port.toLowerCase()) &&
        (filters.status === '' || (item.status || '').toLowerCase() === filters.status.toLowerCase())
    );



    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1); // Reset to page 1 when filter changes
    };

    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
            <SidebarMenu />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InnerHeader />
                <InnerSubHeader title="Pre-Arrival Port Calls – Status Dashboard" />

                <div className="content" style={{ padding: '20px' }}>
                    <div className="filters" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                        <div><label>Vessel Name</label><input name="vesselName" value={filters.vesselName} onChange={handleFilterChange} /></div>
                        <div><label>IMO Number</label><input name="imo" value={filters.imo} onChange={handleFilterChange} /></div>
                        <div><label>MMSI Number</label><input name="mmsi" value={filters.mmsi} onChange={handleFilterChange} /></div>
                        <div><label>Voyage No</label><input name="voyageNo" value={filters.voyageNo} onChange={handleFilterChange} /></div>
                        <div><label>Port Call ID</label><input name="portCallId" value={filters.portCallId} onChange={handleFilterChange} /></div>
                        <div><label>Port</label><input name="port" value={filters.port} onChange={handleFilterChange} /></div>
                        <div>
                            <label>Status</label>
                            <select name="status" value={filters.status} onChange={handleFilterChange}>
                                <option value="">All</option>
                                <option value="Draft">Draft</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Cleared">Cleared</option>
                            </select>
                        </div>
                    </div>

                    <table className="prearrival-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Voyage No</th>
                                <th>Vessel Name</th>
                                <th>IMO</th>
                                <th>Call Sign</th>
                                <th>ETA</th>
                                <th>ETD</th>
                                <th>Departure</th>
                                <th>Submission</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.voyage_no}</td>
                                    <td>{item.vessel_name}</td>
                                    <td>{item.imo_number}</td>
                                    <td>{item.call_sign}</td>
                                    <td>{item.eta}</td>
                                    <td>{item.etd}</td>
                                    <td>{item.departure_port_code} / {item.departure_port}</td>
                                    <td>{item.submission_port_code} / {item.submission_port}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                if (item.port_call_id) {
                                                    navigate(`/prearrival-view/${item.port_call_id}`);
                                                } else {
                                                    alert("⚠️ Port Call ID is missing for this record.");
                                                }
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination" style={{ marginTop: '20px' }}>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={currentPage === idx + 1 ? 'active' : ''}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default PreArrivalListPage;
