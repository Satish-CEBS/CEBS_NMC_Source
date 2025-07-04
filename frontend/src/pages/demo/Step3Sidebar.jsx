import React from 'react';

const REPORTING_CATEGORIES = [
    { id: 'dpg', label: 'Dangerous Goods (DPG)' },
    { id: 'cargo', label: 'Cargo' },
    { id: 'shipStores', label: 'Ship Stores' },
    { id: 'crew', label: 'Crew' },
    { id: 'pax', label: 'Pax' },
    { id: 'security', label: 'Security' },
];

// Helper to map status to CSS class for colors
const getStatusClass = (status) => {
    if (!status) return 'pending';
    if (status.toLowerCase() === 'completed') return 'completed';
    if (status.toLowerCase() === 'in-progress') return 'in-progress';
    return 'pending';
};

const Step3Sidebar = ({ formData = {}, formStatus = {} }) => {
    // Defensive nested access helper
    const safeAccess = (obj, path, defaultValue = 'N/A') => {
        try {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const summaryItems = [
        { label: 'Ship Name', value: safeAccess(formData, 'name') },
        { label: 'IMO Number', value: safeAccess(formData, 'imo_no') },
        { label: 'MMSI Number', value: safeAccess(formData, 'mmsi_no') },
        { label: 'Voyage Number', value: safeAccess(formData, 'voyage_number') },
        { label: 'Port of Call', value: safeAccess(formData, 'call_port.name') },
        { label: 'ETA', value: safeAccess(formData, 'eta') },
        { label: 'ETD', value: safeAccess(formData, 'etd') },
    ];

    console.log('Step3Sidebar formData:', formData);
    console.log('Step3Sidebar formStatus:', formStatus);

    return (
        <aside className="step3-sidebar" style={{ padding: '1rem', background: '#f7f9fc', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Port Call Summary</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem' }}>
                {summaryItems.map(({ label, value }) => (
                    <li key={label} style={{ marginBottom: '0.5rem' }}>
                        <strong>{label}:</strong> {value}
                    </li>
                ))}
            </ul>

            <h4 style={{ marginBottom: '1rem' }}>Form Status</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {REPORTING_CATEGORIES.map(({ id, label }) => {
                    const status = formStatus[id] || 'pending';
                    const className = `status-indicator ${getStatusClass(status)}`;
                    return (
                        <li key={id} style={{ marginBottom: '0.4rem' }}>
                            {label}:{' '}
                            <span className={className} style={{
                                padding: '2px 10px',
                                borderRadius: '15px',
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                backgroundColor:
                                    className.includes('completed') ? '#27ae60' :
                                        className.includes('in-progress') ? '#f39c12' : '#7f8c8d',
                            }}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Step3Sidebar;
