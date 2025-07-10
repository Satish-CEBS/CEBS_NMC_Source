import React, { useEffect } from "react";
import "../BerthFormTabs.css";

const useSampleData = true;

const ConsigneeTab = ({ formData, setFormData }) => {
    useEffect(() => {
        if (useSampleData && !formData.consignee_name) {
            setFormData(prev => ({
                ...prev,
                consignee_name: "Al Marina Trading LLC",
                consignee_address: "Dubai Maritime City, Dubai, UAE",
                consignee_contact: "+971 50 1234567"
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Consignee Name</label>
                <input
                    type="text"
                    value={formData.consignee_name || ""}
                    onChange={(e) => setFormData({ ...formData, consignee_name: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Address</label>
                <textarea
                    value={formData.consignee_address || ""}
                    onChange={(e) => setFormData({ ...formData, consignee_address: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Contact</label>
                <input
                    type="text"
                    value={formData.consignee_contact || ""}
                    onChange={(e) => setFormData({ ...formData, consignee_contact: e.target.value })}
                />
            </div>
        </div>
    );
};

export default ConsigneeTab;
