// src/pages/demo/Stowage/StowagePlanDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import mockPlans from '../../../mockData/stowagePlans.json';
import './StowagePlanDashboard.css';

const StowagePlanDashboard = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load all dynamic stowage plans from localStorage
        const localPlans = [];
        for (const key in localStorage) {
            if (key.startsWith('stowagePlan_')) {
                try {
                    const stored = JSON.parse(localStorage.getItem(key));
                    if (stored?.vcn) {
                        localPlans.push(stored);
                    }
                } catch (err) {
                    console.error(`Error parsing ${key}`);
                }
            }
        }

        // Merge static JSON with dynamic
        const all = [...mockPlans, ...localPlans];
        setPlans(all);
    }, []);

    const handleView = (vcn) => {
        navigate(`/stowage/view/${vcn}`);
    };

    return (
        <PageWrapper title="Stowage Plans">
            <div className="dashboard-wrapper">
                <div className="header">
                    <h2>Stowage Plans</h2>
                    <button className="add-btn" onClick={() => navigate('/stowage/add')}>
                        + Add New Stowage Plan
                    </button>
                </div>

                <table className="stowage-table">
                    <thead>
                        <tr>
                            <th>VCN</th>
                            <th>Terminal</th>
                            <th>FWD Draft</th>
                            <th>AFT Draft</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan, idx) => (
                            <tr key={idx}>
                                <td>{plan.vcn}</td>
                                <td>{plan.terminal || '-'}</td>
                                <td>{plan.draftFwd || '-'}</td>
                                <td>{plan.draftAft || '-'}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleView(plan.vcn)}>View</button>
                                </td>
                            </tr>
                        ))}
                        {plans.length === 0 && (
                            <tr>
                                <td colSpan="5">No stowage plans found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </PageWrapper>
    );
};

export default StowagePlanDashboard;
