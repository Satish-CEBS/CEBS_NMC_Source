import React, { useEffect, useState } from "react";
import "../../../common/InnerHeader";
import "../../../common/InnerSubHeader";
import "../../../common/SidebarMenu";
import "../../../common/Footer";
import "../BerthFormTabs.css";

const useSampleData = true;

const BerthDetailsTab = ({ formData, setFormData }) => {
    const [terminals] = useState([
        "Jebel Ali Terminal",
        "Khalifa Port",
        "Port Rashid",
        "Port of Fujairah",
        "Sharjah Container Terminal"
    ]);

    useEffect(() => {
        if (useSampleData && !formData.berth_name) {
            setFormData(prev => ({
                ...prev,
                berth_id: "BRT001",
                berth_name: "Main Berth Zone A",
                location: "Khalifa Port",
                terminal: "Khalifa Port Terminal 1",
                status: "Available",
                vcn: "VCN-12345"
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Berth ID</label>
                <input
                    type="text"
                    value={formData.berth_id || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, berth_id: e.target.value })
                    }
                />
            </div>
            <div className="form-row">
                <label>Berth Name</label>
                <input
                    type="text"
                    value={formData.berth_name || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, berth_name: e.target.value })
                    }
                />
            </div>
            <div className="form-row">
                <label>VCN</label>
                <input
                    type="text"
                    value={formData.vcn || ""}
                    onChange={(e) => setFormData({ ...formData, vcn: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Location</label>
                <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                />
            </div>
            <div className="form-row">
                <label>Terminal</label>
                <select
                    value={formData.terminal || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, terminal: e.target.value })
                    }
                >
                    <option value="">Select</option>
                    {terminals.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </div>
            <div className="form-row">
                <label>Status</label>
                <select
                    value={formData.status || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                    }
                >
                    <option value="">Select</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>
            </div>
        </div>
    );
};

export default BerthDetailsTab;
