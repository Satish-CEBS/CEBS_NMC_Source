/**
 * @component ViewPreArrival.jsx
 * @description Detail view of a submitted Pre-arrival Notification
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';
import './PreArrivalListPage.css';

const ViewPreArrival = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/prearrival/view/${id}`)
            .then(res => setRecord(res.data))
            .catch(err => console.error('Failed to load record:', err));
    }, [id]);

    if (!record) return <div>Loading...</div>;

    return (
        <div className="prearrival-wrapper">
            <InnerHeader />
            <InnerSubHeader />
            <div className="prearrival-content-area">
                <SidebarMenu />
                <div className="prearrival-form-container">
                    <h2>Pre-arrival Details</h2>
                    <table className="table-list">
                        <tbody>
                            <tr><th>Vessel</th><td>{record.vessel_name}</td></tr>
                            <tr><th>Voyage Number</th><td>{record.voyage_number}</td></tr>
                            <tr><th>Flag</th><td>{record.flag}</td></tr>
                            <tr><th>Call Sign</th><td>{record.call_sign}</td></tr>
                            <tr><th>Gross Tonnage</th><td>{record.gross_tonnage}</td></tr>
                            <tr><th>Port of Arrival</th><td>{record.port_of_arrival}</td></tr>
                            <tr><th>ETA</th><td>{new Date(record.eta).toLocaleString()}</td></tr>
                            <tr><th>ETD</th><td>{new Date(record.etd).toLocaleString()}</td></tr>
                            <tr><th>Services</th><td>{JSON.parse(record.requested_services || '[]').join(', ')}</td></tr>
                            <tr><th>Status</th><td className={`status-${record.status.toLowerCase()}`}>{record.status}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewPreArrival;
