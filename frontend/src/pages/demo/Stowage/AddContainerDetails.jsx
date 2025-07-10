import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import locations from '../../../mockData/locations.json';
import './AddContainerDetails.css';
import getFlagImage from '../../../utils/getFlagImage';
import DangerousIcon from '@mui/icons-material/Warning';
import SaveIcon from '@mui/icons-material/Save';


const country3to2 = {
    ARE: 'ae', BHS: 'bs', PAN: 'pa', DNK: 'dk', LBR: 'lr', USA: 'us', GBR: 'gb', ITA: 'it', SGP: 'sg',
    KOR: 'kr', CHN: 'cn', BRA: 'br', MNE: 'me', FRA: 'fr', HKG: 'hk', IND: 'in', JPN: 'jp', SAU: 'sa',
    NLD: 'nl', DEU: 'de', ESP: 'es', PRT: 'pt', TUR: 'tr', GRC: 'gr', POL: 'pl', UKR: 'ua', RUS: 'ru',
    ZAF: 'za', OMN: 'om', QAT: 'qa', BHR: 'bh', KWT: 'kw', IRN: 'ir', IRQ: 'iq', YEM: 'ye', PAK: 'pk'
};

const AddContainerDetails = () => {
    const [params] = useSearchParams();
    const vcn = params.get('vcn');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        containerNo: '',
        blNo: '',
        callSign: '',
        imo: '',
        dgClass: '',
        unNo: '',
        flashPoint: '',
        dischargePort: '',
        tonnage: '',
        stowageInstruction: ''
    });

    const [errors, setErrors] = useState({});
    const [flagMap, setFlagMap] = useState({});

    useEffect(() => {
        // Import all flag images dynamically
        const importFlags = async () => {
            const context = require.context('../../../assets/images/flags', false, /\.png$/);
            const flags = {};
            context.keys().forEach((key) => {
                const code = key.replace('./', '').replace('.png', '').toLowerCase();
                flags[code] = context(key);
            });
            setFlagMap(flags);
        };
        importFlags();
    }, []);

    const getFlag = (portCode) => {
        const port = locations.find(loc => loc.location_code === portCode);
        if (!port) return '';
        const c2 = country3to2[port.country_code] || port.country_code.toLowerCase();
        return flagMap[c2];
    };

    const validate = () => {
        const errs = {};
        if (!form.containerNo) errs.containerNo = 'Required';
        if (!form.blNo) errs.blNo = 'Required';
        if (!form.imo) errs.imo = 'Required';
        if (form.dgClass && !form.unNo) errs.unNo = 'Required for DG cargo';
        if (form.dgClass && !form.flashPoint) errs.flashPoint = 'Required for DG cargo';
        if (!form.dischargePort) errs.dischargePort = 'Required';
        if (!form.tonnage) errs.tonnage = 'Required';
        return errs;
    };

    const save = () => {
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        const key = `stowagePlan_${vcn}`;
        const existing = JSON.parse(localStorage.getItem(key) || '{}');
        const planList = existing.planList || [];
        planList.push({ ...form, is_dg: !!form.dgClass });
        const updated = { ...existing, planList };
        localStorage.setItem(key, JSON.stringify(updated));
        navigate(`/stowage/view/${vcn}`);
    };

    return (
        <PageWrapper title={`Add Container Details – ${vcn}`}>
            <div className="container-details-form">
                <div className="form-row">
                    <label>Container No *</label>
                    <input value={form.containerNo} onChange={(e) => setForm({ ...form, containerNo: e.target.value })} />
                    {errors.containerNo && <span className="error">{errors.containerNo}</span>}
                </div>

                <div className="form-row">
                    <label>BL No *</label>
                    <input value={form.blNo} onChange={(e) => setForm({ ...form, blNo: e.target.value })} />
                    {errors.blNo && <span className="error">{errors.blNo}</span>}
                </div>

                <div className="form-row">
                    <label>Call Sign</label>
                    <input value={form.callSign} onChange={(e) => setForm({ ...form, callSign: e.target.value })} />
                </div>

                <div className="form-row">
                    <label>IMO *</label>
                    <input value={form.imo} onChange={(e) => setForm({ ...form, imo: e.target.value })} />
                    {errors.imo && <span className="error">{errors.imo}</span>}
                </div>

                <div className="form-row">
                    <label>DG Class</label>
                    <input value={form.dgClass} onChange={(e) => setForm({ ...form, dgClass: e.target.value })} />
                </div>

                <div className="form-row">
                    <label>UN No {form.dgClass && '*'}</label>
                    <input value={form.unNo} onChange={(e) => setForm({ ...form, unNo: e.target.value })} />
                    {errors.unNo && <span className="error">{errors.unNo}</span>}
                </div>

                <div className="form-row">
                    <label>Flash Point {form.dgClass && '*'}</label>
                    <input value={form.flashPoint} onChange={(e) => setForm({ ...form, flashPoint: e.target.value })} />
                    {errors.flashPoint && <span className="error">{errors.flashPoint}</span>}
                </div>

                <div className="form-row">
                    <label>Port of Discharge *</label>
                    <select value={form.dischargePort} onChange={(e) => setForm({ ...form, dischargePort: e.target.value })}>
                        <option value="">-- Select Port --</option>
                        {locations.map((port, idx) => {
                            const flag = getFlag(port.location_code);
                            return (
                                <option key={idx} value={port.location_code}>
                                    {flag ? '🌐 ' : ''}{port.name} ({port.location_code})
                                </option>
                            );
                        })}
                    </select>
                    {errors.dischargePort && <span className="error">{errors.dischargePort}</span>}
                </div>

                <div className="form-row">
                    <label>Tonnage *</label>
                    <input value={form.tonnage} onChange={(e) => setForm({ ...form, tonnage: e.target.value })} />
                    {errors.tonnage && <span className="error">{errors.tonnage}</span>}
                </div>

                <div className="form-row full-width">
                    <label>Stowage Instruction</label>
                    <textarea rows="3" value={form.stowageInstruction} onChange={(e) => setForm({ ...form, stowageInstruction: e.target.value })} />
                </div>

                <div className="form-actions">
                    <button className="btn-save" onClick={save}>
                        <SaveIcon fontSize="small" /> Save Container
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default AddContainerDetails;
