/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React, { useState } from 'react';
import '../../pages/auth/AuthForm.css';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';
import Footer from '../common/Footer';
import moeiLogo from '../../assets/moei-logo.png';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, formData);

            const { token, user } = response.data;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user)); // ✅ Valid JSON string
            }

            localStorage.setItem('token', token);

            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid credentials. Please try again.');
        }
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
                        <h2 className="form-heading">Login to <span className="highlight">NMC</span></h2>

                        <form onSubmit={handleLogin} className="form-fields">
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
                            <button type="submit" className="login-btn">Login</button>
                        </form>

                        <div className="register-link">
                            New user? <a href="/register">Register here</a>
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

export default Login;
