import React, { useState, useEffect } from 'react';
import './AddContainerRowModal.css';
import Select from 'react-select';
import locations from '../../../mockData/locations.json';
import getFlagImage from '../../../utils/getFlagImage';

const tabIcons = ['info', 'local_shipping', 'inventory_2', 'warning'];
const tabLabels = ['Container ID', 'Vessel & Ops', 'Cargo & Weight', 'DG & Oversize'];

const AddContainerRowModal = ({ onClose, onAdd }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        bill_of_lading: '',
        equipment_status_code: '',
        container_no: '',
        shipping_bill: '',
        port_of_loading: '',
        port_of_discharge: '',
        vessel_bay: '',
        vessel_row: '',
        vessel_sub_tier: '',
        deck_hold_indicator: '',
        discharge_hook_no: '',
        load_hook_no: '',
        load_op_unit: '',
        discharge_op_unit: '',
        op_unit_discharge_seq: '',
        op_unit_load_seq: '',
        hook_load_seq: '',
        hook_discharge_seq: '',
        call_discharge_status: '',
        call_load_status: '',
        discharge_container_no: '',
        load_container_no: '',
        weight_category_pre_storage: '',
        cell_type: '',
        mode_of_dispatch: '',
        date_and_time: '',
        unit_of_quantity: '',
        weight_quantity: '',
        no_of_packages: '',
        temperature_value: '',
        unit_of_temp: '',
        dimension_code: '',
        od_length: '',
        od_width: '',
        od_height: '',
        imo_class: '',
        un_no: '',
        flash_point: '',
        goods_description: '',
        weight_category_stowage: '',
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        onAdd(formData);
        onClose();
    };

    const portOptions = locations.map(loc => ({
        value: loc.location_code,
        label: `${loc.name} – ${loc.location_code}`,
        icon: getFlagImage(loc.flag_code),
    }));

    const customSingleValue = ({ data }) => (
        <div className="custom-option">
            <img src={data.icon} alt="" className="flag-icon" />
            {data.label}
        </div>
    );

    const customOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="custom-option">
                <img src={data.icon} alt="" className="flag-icon" />
                {data.label}
            </div>
        );
    };

    const tabFields = [
        [
            { label: 'Bill Of Lading *', field: 'bill_of_lading' },
            { label: 'Equipment Status Code *', field: 'equipment_status_code' },
            { label: 'Container No. *', field: 'container_no' },
            { label: 'Shipping Bill', field: 'shipping_bill' },
            {
                label: 'Port of Loading',
                field: 'port_of_loading',
                type: 'select',
                options: portOptions,
            },
            {
                label: 'Port of Discharge',
                field: 'port_of_discharge',
                type: 'select',
                options: portOptions,
            },
            { label: 'Load Container No.', field: 'load_container_no' },
            { label: 'Discharge Container No.', field: 'discharge_container_no' }
        ],
        [
            { label: 'Vessel Bay *', field: 'vessel_bay' },
            { label: 'Vessel Row *', field: 'vessel_row' },
            { label: 'Vessel Sub Tier *', field: 'vessel_sub_tier' },
            { label: 'Deck Hold Indicator *', field: 'deck_hold_indicator' },
            { label: 'Load Hook No.', field: 'load_hook_no' },
            { label: 'Discharge Hook No.', field: 'discharge_hook_no' },
            { label: 'Load Op Unit', field: 'load_op_unit' },
            { label: 'Discharge Op Unit', field: 'discharge_op_unit' },
            { label: 'Op Unit Load Seq', field: 'op_unit_load_seq' },
            { label: 'Op Unit Discharge Seq', field: 'op_unit_discharge_seq' },
            { label: 'Hook Load Seq', field: 'hook_load_seq' },
            { label: 'Hook Discharge Seq', field: 'hook_discharge_seq' },
            { label: 'Call Load Status', field: 'call_load_status' },
            { label: 'Call Discharge Status', field: 'call_discharge_status' }
        ],
        [
            { label: 'Weight Quantity', field: 'weight_quantity' },
            { label: 'No. Of Packages', field: 'no_of_packages' },
            { label: 'Date And Time *', field: 'date_and_time' },
            { label: 'Unit Of Quantity', field: 'unit_of_quantity' },
            { label: 'Cell Type', field: 'cell_type' },
            { label: 'Weight Category Pre Storage', field: 'weight_category_pre_storage' },
            { label: 'Mode Of Dispatch', field: 'mode_of_dispatch' },
            { label: 'Weight Category Stowage', field: 'weight_category_stowage' }
        ],
        [
            { label: 'Temperature Value', field: 'temperature_value' },
            { label: 'Unit Of Temperature', field: 'unit_of_temp' },
            { label: 'Dimension Code', field: 'dimension_code' },
            { label: 'Over Dimension Length', field: 'od_length' },
            { label: 'Over Dimension Width', field: 'od_width' },
            { label: 'Over Dimension Height', field: 'od_height' },
            { label: 'IMO Class', field: 'imo_class' },
            { label: 'UN/IMDG No.', field: 'un_no' },
            { label: 'Flash Point', field: 'flash_point' },
            { label: 'Goods Description', field: 'goods_description' }
        ]
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Add Container Row</h2>
                <div className="tabs">
                    {tabLabels.map((label, i) => (
                        <button
                            key={i}
                            className={`tab-btn ${i === activeTab ? 'active' : ''}`}
                            onClick={() => setActiveTab(i)}
                        >
                            <span className="material-icons">{tabIcons[i]}</span> {label}
                        </button>
                    ))}
                </div>

                <div className="form-grid">
                    {tabFields[activeTab].map(({ label, field, type, options }) =>
                        type === 'select' ? (
                            <div key={field} className="form-group">
                                <label>{label}</label>
                                <Select
                                    value={options.find(opt => opt.value === formData[field]) || null}
                                    onChange={(opt) => handleChange(field, opt?.value)}
                                    options={options}
                                    components={{ SingleValue: customSingleValue, Option: customOption }}
                                    className="react-select-container"
                                />
                            </div>
                        ) : (
                            <div key={field} className="form-group">
                                <label>{label}</label>
                                <input
                                    type="text"
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="add-btn" onClick={handleSubmit}>Add Row</button>
                </div>
            </div>
        </div>
    );
};

export default AddContainerRowModal;
