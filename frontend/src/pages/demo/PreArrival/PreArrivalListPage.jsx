// src/pages/demo/PreArrival/PreArrivalListPage.jsx

import React, { useState, useEffect } from "react";
import InnerHeader from "../../common/InnerHeader";
import InnerSubHeader from "../../common/InnerSubHeader";
import SidebarMenu from "../../common/SidebarMenu";
import Footer from "../../common/Footer";
import prearrivalData from "../../../mockData/prearrival_data.json";
import "./PreArrivalDashboard.css";
import MaritimeLayout from "../../common/Applayout";

const PreArrivalListPage = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    vesselName: "",
    imo: "",
    voyageNo: "",
    submittedBy: "",
    lastPort: "",
    fromDate: "",
    toDate: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    setData(prearrivalData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const applyFilters = () => {
    return data.filter((item) => {
      const vesselName = item.vessel?.name || "";
      const imoNumber = item.vessel?.imo_no?.toString() || "";
      const voyageNo = item.voyage?.voyage_number || "";
      const submittedBy = item.submitted_by || "";
      const lastPort = item.voyage?.last_port?.name || "";
      const itemDate = new Date(item.submitted_date || "");

      const fromDateMatch = filters.fromDate
        ? itemDate >= new Date(filters.fromDate)
        : true;
      const toDateMatch = filters.toDate
        ? itemDate <= new Date(filters.toDate)
        : true;

      return (
        vesselName.toLowerCase().includes(filters.vesselName.toLowerCase()) &&
        imoNumber.includes(filters.imo) &&
        voyageNo.toLowerCase().includes(filters.voyageNo.toLowerCase()) &&
        submittedBy.toLowerCase().includes(filters.submittedBy.toLowerCase()) &&
        lastPort.toLowerCase().includes(filters.lastPort.toLowerCase()) &&
        fromDateMatch &&
        toDateMatch
      );
    });
  };

  const sortData = (sortedData) => {
    const { key, direction } = sortConfig;
    if (!key) return sortedData;

    return [...sortedData].sort((a, b) => {
      const aVal = (a.vessel?.[key] || a.voyage?.[key] || a[key] || "")
        .toString()
        .toLowerCase();
      const bVal = (b.vessel?.[key] || b.voyage?.[key] || b[key] || "")
        .toString()
        .toLowerCase();

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getBadgeClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "submitted":
        return "badge badge-submitted";
      case "draft":
        return "badge badge-draft";
      case "cancelled":
        return "badge badge-cancelled";
      default:
        return "badge";
    }
  };

  const filteredData = sortData(applyFilters());
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <MaritimeLayout>
      <div className="dashboard">
        <div className="dashboard-body">
          <main className="dashboard-content">
            <h2 className="page-title">Pre-Arrival Submissions</h2>

            <div className="filter-bar">
              <input
                name="vesselName"
                placeholder="Vessel Name"
                onChange={handleFilterChange}
              />
              <input
                name="imo"
                placeholder="IMO"
                onChange={handleFilterChange}
              />
              <input
                name="voyageNo"
                placeholder="Voyage No"
                onChange={handleFilterChange}
              />
              <input
                name="submittedBy"
                placeholder="Submitted By"
                onChange={handleFilterChange}
              />
              <input
                name="lastPort"
                placeholder="Last Port"
                onChange={handleFilterChange}
              />
              <input
                name="fromDate"
                type="date"
                onChange={handleFilterChange}
              />
              <input name="toDate" type="date" onChange={handleFilterChange} />
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n} per page
                  </option>
                ))}
              </select>
            </div>

            <div className="table-responsive">
              <table className="prearrival-table full-width">
                <thead>
                  <tr>
                    {[
                      { key: "name", label: "Vessel Name" },
                      { key: "imo_no", label: "IMO" },
                      { key: "voyage_number", label: "Voyage No" },
                      { key: "last_port", label: "Last Port" },
                      { key: "next_port", label: "Next Port" },
                      { key: "eta", label: "ETA" },
                      { key: "status", label: "Status" },
                      { key: "submitted_by", label: "Submitted By" },
                      { key: "submitted_date", label: "Date" },
                    ].map(({ key, label }) => (
                      <th key={key} onClick={() => requestSort(key)}>
                        {label}{" "}
                        {sortConfig.key === key &&
                          (sortConfig.direction === "asc" ? "▲" : "▼")}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry) => (
                    <tr key={entry.pre_arrival_id}>
                      <td>{entry.vessel?.name}</td>
                      <td>{entry.vessel?.imo_no}</td>
                      <td>{entry.voyage?.voyage_number}</td>
                      <td>{entry.voyage?.last_port?.name}</td>
                      <td>{entry.voyage?.next_port?.name}</td>
                      <td>
                        {entry.voyage?.eta
                          ? new Date(entry.voyage.eta).toLocaleString()
                          : ""}
                      </td>
                      <td>
                        <span className={getBadgeClass(entry.status)}>
                          {entry.status}
                        </span>
                      </td>
                      <td>{entry.submitted_by}</td>
                      <td>
                        {entry.submitted_date
                          ? new Date(entry.submitted_date).toLocaleString()
                          : ""}
                      </td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            (window.location.href = `/prearrival-view/${entry.pre_arrival_id}`)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination-controls">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </MaritimeLayout>
  );
};

export default PreArrivalListPage;
