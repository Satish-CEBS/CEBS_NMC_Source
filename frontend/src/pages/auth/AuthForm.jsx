
import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import MOEILogo from '../../assets/moei-logo.png';
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const roles = [
    { label: 'Super Admin', value: '8712cc4b-b8a6-45cc-9b2b-2feced5896a3' },
    { label: 'Admin', value: 'b22d4284-38b1-43b8-9270-d2c130285aaf' },
    { label: 'Agent', value: 'a21982ba-6f09-4b9e-b35c-1337caea1247' },
    { label: 'Customs', value: '1b92ca05-d6fc-4edd-9c78-3cf01e57ecb3' },
    { label: 'Immigration', value: 'a2ffe66d-8592-41bd-b4d7-aebcca12abb7' },
    { label: 'Health Agency', value: 'eeea87ed-54f7-4757-8d9f-01da2ff1796b' },
    { label: 'Port', value: 'f4183b29-cd17-4511-aa3b-f240987d2e99' },
];

const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        given_name: '',
        surname: '',
        role_id: roles[0].value,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegistering ? '/auth/register' : '/auth/login';

            const payload = isRegistering ? formData : {
                email: formData.email,
                password: formData.password
            };

            const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
            alert(isRegistering ? 'Registered successfully!' : 'Login successful!');
            console.log(response.data);

            if (!isRegistering) {
                navigate('/dashboard');
            }
        } catch (err) {
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Box className="auth-wrapper">
            <Box className="auth-header">
                <img src={MOEILogo} alt="MOEI Logo" className="auth-logo" />
                <Typography variant="h4" className="main-title">National Maritime Center</Typography>
                <Typography variant="subtitle2" className="sub-title">
                    From Port Call to Clearance  - One Window. One Nation. AI-Powered.
                </Typography>
            </Box>

            <Paper className="auth-card" elevation={3}>
                <Typography variant="h6" gutterBottom>
                    {isRegistering ? 'Register New User' : 'Login to Your Account'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {isRegistering && (
                        <>
                            <TextField
                                label="First Name"
                                name="given_name"
                                fullWidth
                                size="small"
                                margin="dense"
                                value={formData.given_name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Last Name"
                                name="surname"
                                fullWidth
                                size="small"
                                margin="dense"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Role"
                                name="role_id"
                                select
                                fullWidth
                                size="small"
                                margin="dense"
                                value={formData.role_id}
                                onChange={handleChange}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={isRegistering ? <AppRegistrationIcon /> : <LoginIcon />}
                        sx={{ mt: 2 }}
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </Button>
                </form>
                <Box className="toggle-mode">
                    <a onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Already have an account? Login' : 'New user? Register here'}
                    </a>
                </Box>
            </Paper>
        </Box>
    );
};

export default AuthForm;
