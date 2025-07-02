const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

router.get('/admin', authorize('admin', 'super_admin'), (req, res) => {
    res.send('Hello Admin!');
});

router.get('/agent', authorize('agent'), (req, res) => {
    res.send('Hello Agent!');
});

module.exports = router;
