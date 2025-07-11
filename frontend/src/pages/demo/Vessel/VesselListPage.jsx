import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vesselData from "../../../mockData/vessels.json";
import SidebarMenu from "../../common/SidebarMenu";
import InnerHeader from "../../common/InnerHeader";
import InnerSubHeader from "../../common/InnerSubHeader";
import Footer from "../../common/Footer";
import flagMap from "../../../assets/images/flags/flagMap";
import "./VesselRegistration.css";
import MaritimeLayout from "../../common/Applayout";

const country3to2 = {
  ARE: "ae", // United Arab Emirates
  BHS: "bs", // Bahamas
  PAN: "pa", // Panama
  DNK: "dk", // Denmark
  LBR: "lr", // Liberia
  USA: "us", // United States
  GBR: "gb", // United Kingdom
  ITA: "it", // Italy
  SGP: "sg", // Singapore
  KOR: "kr", // South Korea
  CHN: "cn", // China
  BRA: "br", // Brazil
  MNE: "me", // Montenegro
  FRA: "fr", // France
  HKG: "hk", // Hong Kong
  IND: "in", // India
  JPN: "jp", // Japan
  SAU: "sa", // Saudi Arabia
  NLD: "nl", // Netherlands
  DEU: "de", // Germany
  ESP: "es", // Spain
  PRT: "pt", // Portugal
  TUR: "tr", // Turkey
  GRC: "gr", // Greece
  POL: "pl", // Poland
  UKR: "ua", // Ukraine
  RUS: "ru", // Russia
  ZAF: "za", // South Africa
  OMN: "om", // Oman
  QAT: "qa", // Qatar
  BHR: "bh", // Bahrain
  KWT: "kw", // Kuwait
  IRN: "ir", // Iran
  IRQ: "iq", // Iraq
  YEM: "ye", // Yemen
  PAK: "pk", // Pakistan
};

const getFlagImage = (countryCode3) => {
  if (!countryCode3) return flagMap["default"];
  const code = country3to2[countryCode3] || countryCode3.toLowerCase();
  return flagMap[code] || flagMap["default"];
};

const VesselListPage = () => {
  const navigate = useNavigate();
  const [vessels, setVessels] = useState([]);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    imo_no: "",
    mmsi_no: "",
    ship_flag_code_id: "",
    vessel_id: "",
    ship_type_ais: "",
    service_status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    setVessels(vesselData);
    setFilteredVessels(vesselData);
  }, []);

  useEffect(() => {
    let result = vessels.filter((v) => {
      return (
        (!filters.name ||
          v.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.imo_no || v.imo_no?.includes(filters.imo_no)) &&
        (!filters.mmsi_no || v.mmsi_no?.includes(filters.mmsi_no)) &&
        (!filters.ship_flag_code_id ||
          v.ship_flag_code_id
            ?.toLowerCase()
            .includes(filters.ship_flag_code_id.toLowerCase())) &&
        (!filters.vessel_id ||
          v.vessel_id?.toString().includes(filters.vessel_id)) &&
        (!filters.ship_type_ais || v.ship_type_ais === filters.ship_type_ais) &&
        (!filters.service_status || v.service_status === filters.service_status)
      );
    });
    setFilteredVessels(result);
    setCurrentPage(1); // reset to page 1 on filter change
  }, [filters, vessels]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const vesselTypes = [
    ...new Set(vessels.map((v) => v.ship_type_ais).filter(Boolean)),
  ];
  const vesselStatuses = [
    ...new Set(vessels.map((v) => v.service_status).filter(Boolean)),
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredVessels.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredVessels.length / recordsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <MaritimeLayout>
      <div className="vessel-list-layout">
        <div className="vessel-list-content">
          <div className="inner-content">
            <div className="page-header">
              <h2>Registered Vessels</h2>
              <button className="create-button">
                Create New Pre-arrival Notification
              </button>
            </div>

            {/* Filter row */}
            <div className="filter-row">
              <input
                type="text"
                name="name"
                placeholder="Vessel Name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="imo_no"
                placeholder="IMO Number"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="mmsi_no"
                placeholder="MMSI Number"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="ship_flag_code_id"
                placeholder="Flag Code"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="vessel_id"
                placeholder="Vessel ID"
                onChange={handleInputChange}
              />
              <select name="ship_type_ais" onChange={handleInputChange}>
                <option value="">All Types</option>
                {vesselTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select name="service_status" onChange={handleInputChange}>
                <option value="">All Status</option>
                {vesselStatuses.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              >
                <option value={5}>10</option>
                <option value={10}>25</option>
                <option value={25}>50</option>
              </select>
            </div>

            {/* Table */}
            <table className="vessel-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vessel Name</th>
                  <th>IMO</th>
                  <th>MMSI</th>
                  <th>Flag</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((v, idx) => (
                    <tr key={v.vessel_id || idx}>
                      <td>{v.vessel_id}</td>
                      <td>{v.name}</td>
                      <td>{v.imo_no}</td>
                      <td>{v.mmsi_no}</td>
                      <td>
                        <img
                          src={getFlagImage(v.ship_flag_code_id)}
                          alt={v.flag}
                          className="flag-icon"
                        />{" "}
                        {v.ship_flag_code_id}
                      </td>
                      <td>{v.ship_type_detailed || v.ship_type_ais}</td>
                      <td>{v.service_status}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(`/vessel/view/${v.vessel_id}`)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No vessels found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </MaritimeLayout>
  );
};

export default VesselListPage;
