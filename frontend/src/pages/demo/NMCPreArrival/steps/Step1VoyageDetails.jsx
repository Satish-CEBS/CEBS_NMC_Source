import React, { useState } from "react";
import Select from "react-select";
import vessels from "../../../../mockData/vessels.json";
import locations from "../../../../mockData/locations.json";
import getFlagImage from "../../../../utils/getFlagImage";
import "../../styles/NMCStep.css";
import { motion } from "framer-motion";

const Step1VoyageDetails = ({ data = {}, updateData = () => {}, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vesselOptions = vessels.map((v) => ({
    value: v.name,
    label: (
      <div className="dropdown-option">
        <img
          src={getFlagImage(v.ship_flag_code_id)}
          alt=""
          className="flag-icon"
        />
        <span>
          {v.name} - IMO {v.imo_no}
        </span>
      </div>
    ),
    vessel: v,
  }));

  const portOptions = locations.map((p) => ({
    value: p.name,
    label: (
      <div className="dropdown-option">
        <img src={getFlagImage(p.country_code)} alt="" className="flag-icon" />
        <span>
          {p.name} ({p.country})
        </span>
      </div>
    ),
    port: p,
  }));

  const handleVesselChange = (opt) => {
    const v = opt.vessel;
    updateData({
      ...data,
      vesselName: v.name,
      callSign: v.call_sign,
      imo: v.imo_no,
      flag: v.flag,
      tonnage: v.gross_tonnage,
      type: v.ship_type_detailed,
    });
  };

  const handleChange = (field, value) => {
    updateData({ ...data, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateAndNext = () => {
    setIsSubmitted(true);
    const required = [
      "vesselName",
      "callSign",
      "lastPort",
      "nextPort",
      "eta",
      "purpose",
    ];
    const errs = {};
    required.forEach((f) => {
      if (!data[f]) errs[f] = "This field is required";
    });

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      nextStep();
    } else {
      // Scroll to first error
      const firstError = Object.keys(errs)[0];
      document.querySelector(`[data-field="${firstError}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="nmc-step enhanced"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="step-header">
        <h2>Voyage Details</h2>
        <p className="step-description">
          Enter the voyage information to proceed with your NMC application
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "25%" }}></div>
          </div>
          <span>Step 1 of 4</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="form-section">
        <div className="section-title">
          <span className="section-number">1</span>
          <h3>Vessel Information</h3>
        </div>

        <div className="form-row">
          <div className="form-group" data-field="vesselName">
            <label>
              <span className="required">*</span> Vessel
            </label>
            <Select
              options={vesselOptions}
              onChange={handleVesselChange}
              className={`react-select-container ${
                errors.vesselName ? "error-border" : ""
              }`}
              classNamePrefix="react-select"
              placeholder="Search vessel..."
            />
            {errors.vesselName && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i>{" "}
                {errors.vesselName}
              </motion.p>
            )}
          </div>
          <div className="form-group" data-field="callSign">
            <label>
              <span className="required">*</span> Call Sign
            </label>
            <input
              value={data.callSign || ""}
              readOnly
              className={errors.callSign ? "error-border" : ""}
            />
            {errors.callSign && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.callSign}
              </motion.p>
            )}
          </div>
        </div>

        {data.vesselName && (
          <motion.div
            className="vessel-details-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">IMO</span>
                <span className="detail-value">{data.imo}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Flag</span>
                <span className="detail-value">{data.flag}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type</span>
                <span className="detail-value">{data.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tonnage</span>
                <span className="detail-value">{data.tonnage}</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="form-section">
        <div className="section-title">
          <span className="section-number">2</span>
          <h3>Voyage Information</h3>
        </div>

        <div className="form-row">
          <div className="form-group" data-field="lastPort">
            <label>
              <span className="required">*</span> Last Port of Call
            </label>
            <Select
              options={portOptions}
              onChange={(opt) => handleChange("lastPort", opt.value)}
              className={`react-select-container ${
                errors.lastPort ? "error-border" : ""
              }`}
              classNamePrefix="react-select"
              placeholder="Select last port..."
            />
            {errors.lastPort && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.lastPort}
              </motion.p>
            )}
          </div>
          <div className="form-group" data-field="nextPort">
            <label>
              <span className="required">*</span> Next Port of Call
            </label>
            <Select
              options={portOptions}
              onChange={(opt) => handleChange("nextPort", opt.value)}
              className={`react-select-container ${
                errors.nextPort ? "error-border" : ""
              }`}
              classNamePrefix="react-select"
              placeholder="Select next port..."
            />
            {errors.nextPort && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.nextPort}
              </motion.p>
            )}
          </div>
          <div className="form-group" data-field="eta">
            <label>
              <span className="required">*</span> ETA
            </label>
            <input
              type="datetime-local"
              value={data.eta || ""}
              onChange={(e) => handleChange("eta", e.target.value)}
              className={errors.eta ? "error-border" : ""}
            />
            {errors.eta && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle"></i> {errors.eta}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="form-section">
        <div className="section-title">
          <span className="section-number">3</span>
          <h3>Purpose of Call</h3>
        </div>

        <div className="form-group" data-field="purpose">
          <label>
            <span className="required">*</span> Purpose of Call
          </label>
          <Select
            isMulti
            options={[
              "Bunkering",
              "Loading",
              "Discharging",
              "Crew Change",
              "Repairs",
              "Supplies",
              "Survey",
              "Passenger Exchange",
              "Other",
            ].map((v) => ({ value: v, label: v }))}
            onChange={(opts) =>
              handleChange(
                "purpose",
                opts.map((o) => o.value)
              )
            }
            className={`react-select-container ${
              errors.purpose ? "error-border" : ""
            }`}
            classNamePrefix="react-select"
            placeholder="Select purposes..."
          />
          {errors.purpose && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-exclamation-circle"></i> {errors.purpose}
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div className="form-actions" variants={itemVariants}>
        <button
          className="next-button"
          onClick={validateAndNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next Step <i className="fas fa-arrow-right"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Step1VoyageDetails;
