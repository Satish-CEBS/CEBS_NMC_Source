import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vessels from '../../../mockData/vessels.json';
import flagMap from '../../../assets/images/flags/flagMap';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';
import './VesselRegistration.css';

const getFlagImage = (countryCode3) => {
    const code = (country3to2[countryCode3] || countryCode3 || '').toLowerCase();
    return flagMap[code] || flagMap['default'];
};


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


const VesselViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vessel = vessels.find(v => String(v.vessel_id) === id);

    if (!vessel) {
        return (
            <div className="main-layout">
                <SidebarMenu />
                <div className="main-content">
                    <InnerHeader />
                    <InnerSubHeader title="Vessel Details" />
                    <div className="vessel-details-card">
                        <h2>Vessel Not Found</h2>
                        <button onClick={() => navigate('/vessel-list')}>Back to List</button>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    const flagImg = getFlagImage(vessel.ship_flag_code_id);

    return (
        <div className="main-layout">
            <SidebarMenu />
            <div className="main-content">
                <InnerHeader />
                <InnerSubHeader title={`Vessel Details – ${vessel.name}`} />
                <div className="vessel-details-page">

                    <div className="vessel-details-section">
                        <h3>General Info</h3>
                        <div className="vessel-grid">
                            <div><strong>Name:</strong> {vessel.name}</div>
                            <div><strong>IMO Number:</strong> {vessel.imo_no}</div>
                            <div><strong>MMSI:</strong> {vessel.mmsi_no}</div>
                            <div><strong>Call Sign:</strong> {vessel.call_sign}</div>
                            <div><strong>Flag:</strong> <img src={flagImg} alt="Flag" width="20" /> {vessel.flag}</div>
                            <div><strong>Type:</strong> {vessel.ship_type_detailed || vessel.ship_type_ais}</div>
                            <div><strong>Status:</strong> {vessel.service_status}</div>
                            <div><strong>Year Built:</strong> {vessel.year_built}</div>
                            <div><strong>Builder:</strong> {vessel.builder}</div>
                        </div>
                    </div>

                    <div className="vessel-details-section">
                        <h3>Dimensions</h3>
                        <div className="vessel-grid">
                            <div><strong>Length:</strong> {vessel.length_m} m</div>
                            <div><strong>Beam:</strong> {vessel.beam_m} m</div>
                            <div><strong>Draft:</strong> {vessel.draft_m} m</div>
                            <div><strong>GRT:</strong> {vessel.gross_tonnage}</div>
                            <div><strong>DWT:</strong> {vessel.deadweight_tonnage || vessel.summer_dwt}</div>
                            <div><strong>Home Port:</strong> {vessel.home_port}</div>
                        </div>
                    </div>

                    <div className="vessel-details-section">
                        <h3>Registry & Certificates</h3>
                        <div className="vessel-grid">
                            <div><strong>Certificate No:</strong> {vessel.certificate_registry_no}</div>
                            <div><strong>ISSC ID:</strong> {vessel.issc_id}</div>
                            <div><strong>Classification Society:</strong> {vessel.classification_society}</div>
                        </div>
                    </div>

                    <div className="vessel-details-section">
                        <h3>Insurance</h3>
                        <div className="vessel-grid">
                            <div><strong>Hull Insurance:</strong> {vessel.insurance_hull_company}</div>
                            <div><strong>P&I Club:</strong> {vessel.insurance_pandi_club}</div>
                        </div>
                    </div>

                    <div className="vessel-details-section">
                        <h3>Engine & Propulsion</h3>
                        <div className="vessel-grid">
                            <div><strong>Engine Type:</strong> {vessel.engine_type}</div>
                            <div><strong>No. of Engines:</strong> {vessel.num_engines}</div>
                            <div><strong>Engine Power:</strong> {vessel.engine_power_bhp} BHP</div>
                            <div><strong>Propulsion Type:</strong> {vessel.propulsion_type}</div>
                            <div><strong>Propellers:</strong> {vessel.num_propellers}</div>
                            <div><strong>Bow Thruster:</strong> {vessel.bow_thruster ? 'Yes' : 'No'}</div>
                            <div><strong>Stern Thruster:</strong> {vessel.stern_thruster ? 'Yes' : 'No'}</div>
                            <div><strong>Max Speed:</strong> {vessel.max_speed_knots} knots</div>
                        </div>
                    </div>

                    {vessel.remarks && (
                        <div className="vessel-details-section">
                            <h3>Remarks</h3>
                            <p>{vessel.remarks}</p>
                        </div>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <button onClick={() => navigate('/vessel-list')}>⬅ Back to Vessel List</button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default VesselViewPage;
