import React from "react";
import "./vesselDeparture.css"; // create this css file in the same folder
import MaritimeLayout from "../../common/Applayout";

const departureData = {
  VCN: "VCN220722B",
  "Vessel Name": "Red Rose",
  "Vessel Berthing Status": "",
  "Port Clearance Number": "276",
  "Port Of Loading": "",
  "Date & Time Of Departure From Anchorage/Sailing": "07/23/2022 21:30",
  "Unit Of Quantity": "",
  "Sailing Date & Time Of Port": "2022-07-23 21:30:00",
  "Shipping Line Code": "VMA",
  "Arrival Date & Time In Port": "",
  "Date & Time Of Readiness": "",
  "Arrival Date & Time Of Commencement Of Cargo Operation": "",
  "Account Agent Chargeable": "No",
  "Flag Country Code Of Vessel": "IN",
  "Vessel Berthing Sub Status": "",
  "Port Clearance Date": "2022-07-23 00:00:00",
  "Next Port Of Call": "INMAG",
  "Total Weight Of Consignments": "0",
  "Date & Time Of Pilot Boarded": "2022-07-23 21:30:00",
  "Docking Date & Time At Lock": "",
  "Berth No.": "SEA",
  "Date & Time Of Un-Berthing": "",
  "Expected Date & Time Of Arrival": "",
  "Date & Time Of Completion Of Cargo": "",
  "Hauling Out Time (PostLoad/Discharge)": "",
  "Anchoring Date & Time": "",
  "Reason Of Waiting": "",
  "Location Of Carting": "",
  "Arrival Date & Time At Berth": "",
  "Berth Time": "",
};

const VesselDeparturePage = () => (
  <MaritimeLayout>
    <section className="vessel-card">
      <header className="vessel-card__header">
        <h2>Vessel Departure Details</h2>
      </header>

      <div className="vessel-card__grid">
        {Object.entries(departureData).map(([label, value]) => (
          <div key={label} className="vessel-card__row">
            <span className="vessel-card__label">{label}</span>
            <span className="vessel-card__value">{value || "-"}</span>
          </div>
        ))}
      </div>
    </section>
  </MaritimeLayout>
);

export default VesselDeparturePage;
