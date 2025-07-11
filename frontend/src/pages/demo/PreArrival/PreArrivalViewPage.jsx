import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import prearrivalData from '../../../mockData/prearrival_data.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './PreArrivalDashboard.css';

const country3to2 = {
    ARE: 'ae',  // United Arab Emirates
    BHS: 'bs',  // Bahamas
    PAN: 'pa',  // Panama
    DNK: 'dk',  // Denmark
    LBR: 'lr',  // Liberia
    USA: 'us',  // United States
    GBR: 'gb',  // United Kingdom
    ITA: 'it',  // Italy
    SGP: 'sg',  // Singapore
    KOR: 'kr',  // South Korea
    CHN: 'cn',  // China
    BRA: 'br',  // Brazil
    MNE: 'me',  // Montenegro
    FRA: 'fr',  // France
    HKG: 'hk',  // Hong Kong
    IND: 'in',  // India
    JPN: 'jp',  // Japan
    SAU: 'sa',  // Saudi Arabia
    NLD: 'nl',  // Netherlands
    DEU: 'de',  // Germany
    ESP: 'es',  // Spain
    PRT: 'pt',  // Portugal
    TUR: 'tr',  // Turkey
    GRC: 'gr',  // Greece
    POL: 'pl',  // Poland
    UKR: 'ua',  // Ukraine
    RUS: 'ru',  // Russia
    ZAF: 'za',  // South Africa
    OMN: 'om',  // Oman
    QAT: 'qa',  // Qatar
    BHR: 'bh',  // Bahrain
    KWT: 'kw',  // Kuwait
    IRN: 'ir',  // Iran
    IRQ: 'iq',  // Iraq
    YEM: 'ye',  // Yemen
    PAK: 'pk',  // Pakistan
};


const getFlagIcon = (code3) => {
    const code2 = country3to2[code3?.toUpperCase()];
    try {
        return code2 ? require(`../../../assets/images/flags/${code2}.png`) : null;
    } catch {
        return null;
    }
};

const PreArrivalViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);
    const viewRef = useRef();

    useEffect(() => {
        const data = prearrivalData.find((item) => item.pre_arrival_id === id);
        setRecord(data);
    }, [id]);

    const handleBack = () => navigate('/prearrival-dashboard');

    const handleDownloadPDF = async () => {
        const canvas = await html2canvas(viewRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${record.pre_arrival_id}_view.pdf`);
    };

    if (!record) return <div>Loading...</div>;

    const { vessel, voyage, crew, passengers, documents, status, submitted_by, submitted_date } = record;
    const flagIcon = getFlagIcon(vessel.flag_code);

    const statusColor = status === 'Submitted' ? 'green' : 'goldenrod';

    return (
        <div className="page-container">
            <InnerHeader />
            <InnerSubHeader title={`Pre-Arrival Notification: ${record.pre_arrival_id}`} />

            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    <div className="prearrival-view-container" ref={viewRef}>
                        <div className="top-actions">
                            <button onClick={handleBack} className="btn-secondary">← Back to List</button>
                            
                            <button onClick={handleDownloadPDF} className="btn-primary">Download as PDF</button>
                        </div>

                        <div className="card-grid">
                            <div className="info-card">
                                <h3>Vessel Information</h3>
                                <p><strong>Name:</strong> {vessel.name}</p>
                                <p><strong>IMO Number:</strong> {vessel.imo_no}</p>
                                <p><strong>MMSI:</strong> {vessel.mmsi_no}</p>
                                <p><strong>Call Sign:</strong> {vessel.call_sign}</p>
                                <p>
                                    <strong>Flag:</strong> {vessel.flag}{" "}
                                    {flagIcon && <img src={flagIcon} alt="flag" className="flag-icon" />}
                                </p>
                                <p><strong>Ship Type:</strong> {vessel.ship_type}</p>
                                <p><strong>Gross Tonnage:</strong> {vessel.gross_tonnage}</p>
                                <p><strong>Length (m):</strong> {vessel.length_m}</p>
                            </div>

                            <div className="info-card">
                                <h3>Voyage Information</h3>
                                <p><strong>Voyage No:</strong> {voyage.voyage_number}</p>
                                <p><strong>Last Port:</strong> {voyage.last_port.name}</p>
                                <p><strong>Next Port:</strong> {voyage.next_port.name}</p>
                                <p><strong>ETA:</strong> {new Date(voyage.eta).toLocaleString()}</p>
                                <p><strong>ETD:</strong> {new Date(voyage.etd).toLocaleString()}</p>
                                <p><strong>Purpose(s) of Call:</strong> {voyage.purpose_of_call.join(', ')}</p>
                            </div>

                            <div className="info-card">
                                <h3>Crew</h3>
                                <p><strong>Number on Board:</strong> {crew.number_onboard}</p>
                                <p><strong>Nationalities:</strong> {crew.nationalities.join(', ')}</p>

                                <h3>Passengers</h3>
                                <p><strong>Number on Board:</strong> {passengers.number_onboard}</p>
                                <p><strong>Special Needs:</strong> {passengers.special_needs}</p>
                            </div>

                            <div className="info-card">
                                <h3>Documents</h3>
                                {documents && Object.entries(documents).map(([key, url]) => (
                                    <p key={key}>
                                        <a href={url} target="_blank" rel="noreferrer">
                                            📄 {key.replace(/_/g, ' ')}
                                        </a>
                                    </p>
                                ))}
                            </div>

                            <div className="info-card">
                                <h3>Submission Details</h3>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffc107',
                                        color: '#fff',
                                        fontSize: '0.9em'
                                    }}>
                                        {status}
                                    </span>
                                </p>
                                <p><strong>Submitted By:</strong> {submitted_by}</p>
                                <p><strong>Date:</strong> {new Date(submitted_date).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default PreArrivalViewPage;
