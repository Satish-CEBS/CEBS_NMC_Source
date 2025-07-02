/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React, { useState } from 'react';
import '../../pages/auth/AuthForm.css';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';
import Footer from '../common/Footer';
import moeiLogo from '../../assets/moei-logo.png';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel,  Select, MenuItem } from '@mui/material';
const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        given_name: '',
        surname: '',
        role: ''
    });

    const roles = [
        'Super Admin', 'Admin', 'Agent',
        'Customs', 'Immigration', 'Health Agency', 'Port'
    ];

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle API call here
        console.log('Registration data:', formData);
    };

    return (
        <>
            <Header />
            <SubHeader />

            <div className="login-page">
                {/* LEFT FORM SECTION */}
                <div className="login-form-container">
                    <div className="form-box">
                        <img src={moeiLogo} alt="MOEI Logo" className="moei-login-logo" />
                        <h2 className="form-heading">Register for <span className="highlight">NMC</span></h2>

                        <form className="form-fields" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="given_name"
                                placeholder="First Name"
                                value={formData.given_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Last Name"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FormControl fullWidth style={{ marginBottom: '15px' }}>
                                <InputLabel id="role-label">Select Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {roles.map((role, idx) => (
                                        <MenuItem key={idx} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <button type="submit" className="login-btn">Register</button>
                        </form>

                        <div className="register-link">
                            Already registered? <Link to="/">Login here</Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT INFO PANEL */}
                <div className="login-info-panel">
                    <h3>The UAE National Maritime Center (NMC)</h3>
                    <p>
                        A unified digital gateway bringing together maritime data from all Emirates onto a single, secure platform.
                        By integrating port operations, vessel clearance, customs, immigration, and health formalities, NMC
                        streamlines compliance with international IMO standards.
                    </p>
                    <p>
                        Powered by <strong>Artificial Intelligence</strong>, it delivers real-time insights and predictive analytics
                        to enhance national maritime safety, efficiency, and decision-making across the UAE’s strategic coastal infrastructure.
                    </p>
                    <ul className="nmc-keywords">
                        <li><span className="icon">✔</span> <strong>Unified national platform</strong></li>
                        <li><span className="icon">✔</span> <strong>All Emirates covered</strong></li>
                        <li><span className="icon">✔</span> <strong>AI-powered insights & predictive analytics</strong></li>
                        <li><span className="icon">✔</span> <strong>Real-time maritime coordination</strong></li>
                        <li><span className="icon">✔</span> <strong>IMO compliance</strong></li>
                    </ul>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Register;
