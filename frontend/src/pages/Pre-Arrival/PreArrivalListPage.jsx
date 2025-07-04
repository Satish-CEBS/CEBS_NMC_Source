/**
 * @component   PreArrivalListPage.jsx
 * @description List view of all pre-arrival notifications
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';
import './PreArrivalListPage.css';

const PreArrivalListPage = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/prearrival/list`)
            .then(res => setRecords(res.data))
            .catch(err => console.error('Failed to fetch records:', err));
    }, []);

    return (
        <div className="prearrival-wrapper">
            <InnerHeader />
            <InnerSubHeader />
            <div className="prearrival-content-area">
                <SidebarMenu />
                <div className="prearrival-form-container">
                    <h2>Pre-arrival Notifications</h2>
                    <table className="table-list">
                        <thead>
                            <tr>
                                <th>Vessel</th>
                                <th>Voyage</th>
                                <th>Port</th>
                                <th>ETA</th>
                                <th>ETD</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r) => (
                                <tr key={r.port_call_id}>
                                    <td><a href={`/prearrival/view/${r.port_call_id}`}>{r.vessel_name}</a></td>
                                    <td>{r.voyage_number}</td>
                                    <td>{r.port_of_arrival}</td>
                                    <td>{new Date(r.eta).toLocaleString()}</td>
                                    <td>{new Date(r.etd).toLocaleString()}</td>
                                    <td><span className={`status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PreArrivalListPage;
