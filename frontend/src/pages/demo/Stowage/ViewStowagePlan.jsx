import React, { useEffect, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import stowageData from '../../../mockData/stowagePlans.json';
import DangerousIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './StowageView.css';

const ViewStowagePlan = () => {
    const [params] = useSearchParams();
    const paramVCN = params.get('vcn');
    const { vcn: routeVCN } = useParams();
    const vcn = routeVCN || paramVCN;
    const navigate = useNavigate();
    const [planData, setPlanData] = useState(null);

    useEffect(() => {
        const local = localStorage.getItem(`stowagePlan_${vcn}`);
        if (local) {
            setPlanData(JSON.parse(local));
        } else {
            const match = stowageData.find(p => p.vcn === vcn);
            if (match) setPlanData(match);
        }
    }, [vcn]);

    if (!planData) {
        return (
            <PageWrapper title="Stowage Plan View">
                <p style={{ padding: 20 }}>
                    <DangerousIcon color="error" fontSize="small" />{' '}
                    <strong>No Stowage Plan found for VCN:</strong> <code>{vcn}</code>
                </p>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={`Stowage Plan – ${planData.vcn}`}>
            <button className="back-btn" onClick={() => navigate('/stowage-dashboard')}>
                <ArrowBackIcon fontSize="small" /> Back to Dashboard
            </button>

            <div className="view-stowage-meta">
                <p><InfoIcon fontSize="small" /> <strong>Terminal:</strong> {planData.terminal}</p>
                <p><InfoIcon fontSize="small" /> <strong>Draft FWD:</strong> {planData.draftFwd} m</p>
                <p><InfoIcon fontSize="small" /> <strong>Draft AFT:</strong> {planData.draftAft} m</p>
            </div>

            <table className="view-stowage-table">
                <thead>
                    <tr>
                        <th>Container No</th>
                        <th>BL No</th>
                        <th>Call Sign</th>
                        <th>IMO</th>
                        <th>DG Class</th>
                        <th>UN No</th>
                        <th>Flash Point</th>
                        <th>Discharge Port</th>
                        <th>Tonnage</th>
                        <th>Stowage Instruction</th>
                    </tr>
                </thead>
                <tbody>
                    {(planData.planList || []).map((item, idx) => (
                        <tr key={idx} className={item.is_dg ? 'dg-row' : ''}>
                            <td>{item['Container No']}</td>
                            <td>{item['BL No']}</td>
                            <td>{item['Call Sign']}</td>
                            <td>{item['IMO']}</td>
                            <td>{item['DG Class'] || '-'}</td>
                            <td>{item['UN No'] || '-'}</td>
                            <td>{item['Flash Point'] || '-'}</td>
                            <td>{item['Discharge Port']}</td>
                            <td>{item['Tonnage']}</td>
                            <td>{item['Stowage Instruction']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PageWrapper>
    );
};

export default ViewStowagePlan;
