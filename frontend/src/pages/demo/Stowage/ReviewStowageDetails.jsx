import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import DangerousIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './StowageReview.css';

const ReviewStowageDetails = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const vcn = params.get('vcn');
    const [planData, setPlanData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(`stowagePlan_${vcn}`) || '{}');
        if (data?.vcn) setPlanData(data);
    }, [vcn]);

    if (!planData) {
        return (
            <PageWrapper title="Review Stowage Details">
                <p style={{ padding: 20 }}>❌ No plan data available for VCN: <b>{vcn}</b></p>
            </PageWrapper>
        );
    }

    const dangerousContainers = planData.planList.filter(row => row.dg_class || row.un_no);
    const normalContainers = planData.planList.filter(row => !row.dg_class && !row.un_no);

    const finalizeSubmission = () => {
        alert('✅ Stowage Plan submitted successfully.');
        navigate(`/stowage/view/${vcn}`);
    };

    return (
        <PageWrapper title="Review Stowage Details">
            <div className="review-summary">
                <div><strong>VCN:</strong> {planData.vcn}</div>
                <div><strong>Terminal:</strong> {planData.terminal}</div>
                <div><strong>Draft FWD:</strong> {planData.draftFwd} m</div>
                <div><strong>Draft AFT:</strong> {planData.draftAft} m</div>
                <div><strong>Total Containers:</strong> {planData.planList.length}</div>
                <div><strong>Dangerous Goods:</strong> {dangerousContainers.length}</div>
            </div>

            {dangerousContainers.length > 0 && (
                <>
                    <h3><DangerousIcon fontSize="small" color="error" /> Dangerous Goods</h3>
                    <table className="review-table dg-highlight">
                        <thead>
                            <tr>
                                <th>Container No</th>
                                <th>DG Class</th>
                                <th>UN No</th>
                                <th>Flash Point</th>
                                <th>Discharge Port</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dangerousContainers.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.container_no}</td>
                                    <td>{row.dg_class}</td>
                                    <td>{row.un_no}</td>
                                    <td>{row.flash_point || '-'}</td>
                                    <td>{row.discharge_port}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <h3><CheckCircleIcon fontSize="small" color="success" /> Regular Containers</h3>
            <table className="review-table">
                <thead>
                    <tr>
                        <th>Container No</th>
                        <th>BL No</th>
                        <th>Call Sign</th>
                        <th>IMO</th>
                        <th>Tonnage</th>
                        <th>Discharge Port</th>
                    </tr>
                </thead>
                <tbody>
                    {normalContainers.map((row, i) => (
                        <tr key={i}>
                            <td>{row.container_no}</td>
                            <td>{row.bl_no}</td>
                            <td>{row.call_sign}</td>
                            <td>{row.imo}</td>
                            <td>{row.tonnage}</td>
                            <td>{row.discharge_port}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: 'right', marginTop: 30 }}>
                <button className="btn-primary" onClick={finalizeSubmission}>✅ Final Submit</button>
            </div>
        </PageWrapper>
    );
};

export default ReviewStowageDetails;
