import React from "react";
import "./VesselArrival.css"; // ➊ copy of the theme for this card
import MaritimeLayout from "../../common/Applayout";

const data = {
  "Record Type": "A",
  "Berth No.": "12012",
  VCN: "VCN0901",
  "IMO No.": "9694634",
  "Call Sign": "CALLSIGN12",
  "TO OR Dock Code": "TOCODE",
  "Terminal AR": "AAA",
  "Vessel Name": "VESSELNAMEFORDESC",
  "Country Of Vessel": "CC",
  "SA Code": "CCN1",
  "Rotation Number": "1212012",
  "Rotation Date": "2007-10-15 00:00:00",
  "Anchoring Date Time": "2007-10-28 06:45:00",
  "Readiness Date Time": "2007-12-27 05:45:00",
  "Docking Date Time At Lock Gate": "2007-12-29 05:45:00",
  "Berth Date Time": "2006-06-27 12:34:00",
  EDTA: "2020-01-27 11:20:00",
  ADTP: "2020-01-30 15:35:00",
  "SL Code": "CCN1",
  "Pilot Boarded Time": "2006-12-29 06:45:00",
};

/* --- helper to style special values (dates, codes, etc.) --- */
const getValueClasses = (label, value) => {
  let cls = "vessel-card__value";
  if (value) {
    if (/date|time/i.test(label)) cls += " vessel-card__value--date";
    else if (/code|vcn|imo|call sign/i.test(label))
      cls += " vessel-card__value--code";
    else if (/status/i.test(label)) cls += " vessel-card__value--status";
  }
  return cls;
};

const VesselArrivalPage = () => (
  <MaritimeLayout>
    <section className="vessel-card">
      <header className="vessel-card__header">
        <h2>Vessel Arrival&nbsp;Report Detail</h2>
      </header>

      <div className="vessel-card__grid">
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="vessel-card__row">
            <span className="vessel-card__label">{label}</span>
            <span className={getValueClasses(label, value)} data-empty={!value}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* optional Back button like the screenshot */}
      <div style={{ textAlign: "right", padding: "0 1.5rem 2rem" }}>
        <button
          style={{
            background: "var(--light-gray)",
            border: "1px solid var(--border-gray)",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </section>
  </MaritimeLayout>
);

export default VesselArrivalPage;
