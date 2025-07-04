// routes/lookupRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust based on your db connection path

router.get('/vessels', async (req, res) => {
    try {
        const query = `
      SELECT 
        s.ship_id, 
        s.name AS vessel_name,
        s.call_sign,
        s.imo_no,
        s.mmsi_no,
        s.gross_tonnage,
        f.name AS flag
      FROM ship s
      LEFT JOIN ship_flag_code f ON s.ship_flag_code_id = f.ship_flag_code_id
      WHERE s.ship_status_id = 101214 -- Active ships only
      ORDER BY s.name;
    `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching vessels:', error);
        res.status(500).json({ error: 'Failed to fetch vessels' });
    }
});

router.get('/locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.location_id, l.name, l.location_code, c.three_char_code AS country_code 
            FROM location l LEFT JOIN country c ON l.country_id = c.country_id 
            ORDER BY l.location_code; 
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Failed to fetch locations:', err);
        res.status(500).json({ error: 'Error fetching locations' });
    }
});

// routes/lookupRoutes.js

router.get('/port-call-purpose', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT port_call_purpose_id AS purpose_id, name 
            FROM port_call_purpose 
            ORDER BY name
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Failed to fetch port call purposes:', err);
        res.status(500).json({ error: 'Error fetching purposes' });
    }
});



module.exports = router;
