import React, { useEffect } from "react";
import "../BerthFormTabs.css";

const useSampleData = true;

const VesselDetailsTab = ({ formData, setFormData }) => {
    useEffect(() => {
        if (useSampleData && !formData.vessel_name) {
            setFormData(prev => ({
                ...prev,
                vessel_name: "MANILA BREEZE",
                imo_number: "9839179",
                call_sign: "DUXR2",
                mmsi: "538008904",
                flag: "Marshall Islands",
                eta: "2025-07-10T13:00"
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Vessel Name</label>
                <input
                    type="text"
                    value={formData.vessel_name || ""}
                    onChange={(e) => setFormData({ ...formData, vessel_name: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>IMO Number</label>
                <input
                    type="text"
                    value={formData.imo_number || ""}
                    onChange={(e) => setFormData({ ...formData, imo_number: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Call Sign</label>
                <input
                    type="text"
                    value={formData.call_sign || ""}
                    onChange={(e) => setFormData({ ...formData, call_sign: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>MMSI</label>
                <input
                    type="text"
                    value={formData.mmsi || ""}
                    onChange={(e) => setFormData({ ...formData, mmsi: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Flag</label>
                <input
                    type="text"
                    value={formData.flag || ""}
                    onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>ETA</label>
                <input
                    type="datetime-local"
                    value={formData.eta || ""}
                    onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                />
            </div>
        </div>
    );
};

export default VesselDetailsTab;
