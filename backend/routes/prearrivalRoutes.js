const express = require('express');
const router = express.Router();
const multer = require('multer');
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// Configure file upload storage (memory or local)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Utility function to get port_call_status_id by status name.
 */
const getPortCallStatusIdByName = async (statusName) => {
    const result = await pool.query(
        `SELECT port_call_status_id FROM port_call_status WHERE name = $1 LIMIT 1`,
        [statusName]
    );

    if (result.rowCount === 0) {
        throw new Error(`❌ Status "${statusName}" not found in port_call_status`);
    }

    return parseInt(result.rows[0].port_call_status_id); // Ensure integer
};

// -----------------------------
// POST /api/prearrival/create-draft
// -----------------------------
router.post('/create-draft', upload.fields([
    { name: 'checklist', maxCount: 1 },
    { name: 'securityCert', maxCount: 1 }
]), async (req, res) => {
    const {
        vesselId, voyageNumber, flag, callSign, grossTonnage,
        portOfArrival, terminal, berth, agent, eta, etd,
        services
    } = req.body;

    try {
        console.log('🚢 Draft creation request received with vesselId:', vesselId);
        const draftStatusId = await getPortCallStatusIdByName('Draft');
        console.log('📌 Using draftStatusId:', draftStatusId);

        const insertResult = await pool.query(`
            INSERT INTO port_call (
    port_call_id,
    ship_id,
    voyage_number,
    flag,
    call_sign,
    gross_tonnage,
    port_of_arrival,
    terminal_id,
    berth_id,
    agent_id,
    eta,
    etd,
    requested_services,
    port_call_status_id
)
VALUES (
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9,
    $10, $11, $12, $13, $14
)
 RETURNING port_call_id`,
            [
                vesselId,
                voyageNumber,
                flag,
                callSign,
                grossTonnage,
                portOfArrival,
                terminal,
                berth,
                agent,
                eta,
                etd,
                JSON.stringify(services),
                draftStatusId
            ]
        );

        const portCallId = insertResult.rows[0].port_call_id;
        console.log('✅ Draft port call created with ID:', portCallId);

        const files = req.files;
        if (files?.checklist) {
            await pool.query(`
                INSERT INTO document (document_id, port_call_id, name, file_data)
                VALUES ($1, $2, $3, $4)
            `, [uuidv4(), portCallId, 'Pre-arrival Checklist', files.checklist[0].buffer]);
            console.log('📎 Checklist document saved');
        }

        if (files?.securityCert) {
            await pool.query(`
                INSERT INTO document (document_id, port_call_id, name, file_data)
                VALUES ($1, $2, $3, $4)
            `, [uuidv4(), portCallId, 'Security Certificate', files.securityCert[0].buffer]);
            console.log('🔐 Security certificate saved');
        }

        res.status(200).json({ success: true, portCallId: portCallId });
    } catch (err) {
        console.error('❌ Error creating draft:', err);
        res.status(500).json({ success: false, message: 'Failed to save draft' });
    }
});

// -----------------------------
// POST /api/prearrival/submit/:id
// -----------------------------
router.post('/submit/:id', async (req, res) => {
    let portCallId = req.params.id;

    try {
        const awaitingClearanceId = await getPortCallStatusIdByName('Awaiting Clearance');

        portCallId = parseInt(portCallId);
        if (isNaN(portCallId)) {
            console.error('❌ Invalid portCallId received:', req.params.id);
            return res.status(400).json({ success: false, message: 'Invalid port call ID' });
        }

        console.log('🔄 Submitting port call with ID:', portCallId, '→ Status ID:', awaitingClearanceId);

        const result = await pool.query(
            'UPDATE port_call SET port_call_status_id = $1 WHERE port_call_id = $2 RETURNING *',
            [awaitingClearanceId, portCallId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Draft not found' });
        }

        res.status(200).json({ success: true, message: 'Draft submitted successfully' });
    } catch (err) {
        console.error('❌ Error submitting draft:', err);
        res.status(500).json({ success: false, message: 'Failed to submit draft' });
    }
});

// -----------------------------
// GET /api/prearrival/list
// -----------------------------
router.get('/list', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.port_call_id,
                v.name AS vessel_name,
                p.voyage_number,
                p.port_of_arrival,
                p.eta,
                p.etd,
                p.port_call_status_id
            FROM port_call p
            LEFT JOIN vessel v ON p.vessel_id = v.vessel_id
            ORDER BY p.created_at DESC
        `);

        res.json(result.rows);
    } catch (err) {
        console.error('❌ Error fetching pre-arrival list:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch records' });
    }
});

// -----------------------------
// GET /api/prearrival/view/:id
// -----------------------------
router.get('/view/:id', async (req, res) => {
    const portCallId = parseInt(req.params.id);

    if (isNaN(portCallId)) {
        return res.status(400).json({ error: 'Invalid port call ID' });
    }

    try {
        const result = await pool.query(`
            SELECT 
                p.*, v.name AS vessel_name
            FROM port_call p
            LEFT JOIN vessel v ON p.vessel_id = v.vessel_id
            WHERE p.port_call_id = $1
        `, [portCallId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('❌ Error viewing record:', err);
        res.status(500).json({ error: 'Failed to fetch record' });
    }
});

module.exports = router;
