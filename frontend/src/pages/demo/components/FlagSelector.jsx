import React, { useEffect, useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Avatar, Box } from '@mui/material';
import flagsData from '../../demo/flags.json'; // Adjust path to match actual JSON

const FlagSelector = ({ value, onChange, label = "Select Flag" }) => {
    const [flags, setFlags] = useState([]);

    useEffect(() => {
        setFlags(flagsData);
    }, []);

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                {flags.map((flag) => (
                    <MenuItem key={flag.code} value={flag.code}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                src={require(`../../../assets/images/flags/${code}.png`)}
                                alt={flag.label}
                                sx={{ width: 24, height: 18 }}
                            />
                            {flag.label}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FlagSelector;
