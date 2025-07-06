import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../../../mockData/prearrival_data.json';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import './PortCallDetailsStep.css';

const PreArrivalViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const record = data.find(item => item.port_call_id === id);

    const renderField = (label, value, tooltip = '') => (
        <div className="field-grid-item">
            <span className="field-label" title={tooltip}>
                <span className="material-icons info-icon">info</span> {label}
            </span>
            <span className="field-value">{value || '-'}</span>
        </div>
    );

    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
            <SidebarMenu />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <InnerHeader />
                <InnerSubHeader title="Port Call Notification – View Submitted Details" />

                <div className="main-container" style={{ padding: '24px' }}>
                    <button onClick={() => navigate('/portcall-dashboard')} className="back-button">
                        ← Back to Dashboard
                    </button>

                    {!record ? (
                        <div style={{ color: 'red', fontWeight: 'bold' }}>
                            ⚠️ No record found for Port Call ID: <code>{id}</code>
                        </div>
                    ) : (
                        <>
                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">directions_boat</span> Voyage & Vessel Details
                                </h3>
                                <div className="field-grid">
                                    {renderField('Voyage No', record.voyage_no)}
                                    {renderField('Vessel Name', record.vessel_name)}
                                    {renderField('Call Sign', record.call_sign)}
                                    {renderField('IMO Number', record.imo_number)}
                                    {renderField('MMSI Number', record.mmsi_number)}
                                    {renderField('Port Call ID', record.port_call_id)}
                                    {renderField('Flag State', record.flag_state)}
                                    {renderField('Status', record.status)}
                                    {renderField('ETA', record.eta)}
                                    {renderField('ETD', record.etd)}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">engineering</span> Operational Details
                                </h3>
                                <div className="field-grid">
                                    {renderField('Purpose of Visit', record.purpose_of_visit)}
                                    {renderField('Vessel Type', record.vessel_type)}
                                    {renderField('Voyage Type', record.voyage_type)}
                                    {renderField('Expected Draft (m)', record.expected_draft)}
                                    {renderField('Operation Type', record.operation_type)}
                                    {renderField('Line / MLO Code', record.line_mlo_code)}
                                    {renderField('Ballast Status', record.in_ballast_with_cargo)}
                                    {renderField('Oil Cess Paid', record.oil_cess_paid)}
                                    {renderField('No. of Fenders', record.number_of_fenders)}
                                    {renderField('Double Banking', record.double_banking)}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">anchor</span> Port & Submission
                                </h3>
                                <div className="field-grid">
                                    {renderField('Departure Port', `${record.departure_port_code} / ${record.departure_port}`)}
                                    {renderField('Submission Port', `${record.submission_port_code} / ${record.submission_port}`)}
                                    {renderField('Created By', record.created_by)}
                                    {renderField('Created Date', record.created_date)}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">inventory_2</span> Cargo Details
                                </h3>
                                <div className="field-grid">
                                    {renderField('20ft Import', record.cargo_details?.container_20ft_import, 'No. of 20-foot containers (Import)')}
                                    {renderField('40ft Import', record.cargo_details?.container_40ft_import, 'No. of 40-foot containers (Import)')}
                                    {renderField('20ft Export', record.cargo_details?.container_20ft_export, 'No. of 20-foot containers (Export)')}
                                    {renderField('40ft Export', record.cargo_details?.container_40ft_export, 'No. of 40-foot containers (Export)')}
                                    {renderField('Cargo Type', record.cargo_details?.cargo_type, 'Type of cargo being handled')}
                                    {renderField('Description', record.cargo_details?.cargo_description)}
                                    {renderField('IE Code', record.cargo_details?.ie_code, 'Importer/Exporter Registration Code')}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">group</span> Crew & Passengers
                                </h3>
                                <div className="field-grid">
                                    {renderField('No. of Crew', record.crew?.number_of_crew)}
                                    {renderField('Crew Nationalities', (record.crew?.crew_nationalities || []).join(', '))}
                                    {renderField('No. of Passengers', record.passengers?.number_of_passengers)}
                                    {renderField('Special Needs', record.passengers?.special_needs)}
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title">
                                    <span className="material-icons section-icon">verified_user</span> Security & Remarks
                                </h3>
                                <div className="field-grid">
                                    {renderField('Security Clearance', record.security_clearance)}
                                    {renderField('Remarks', record.remarks)}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default PreArrivalViewPage;
