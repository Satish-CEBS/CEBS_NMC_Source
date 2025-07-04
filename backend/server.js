const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const lookupRoutes = require('./routes/lookupRoutes');
const prearrivalRoutes = require('./routes/prearrivalRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/lookup', lookupRoutes);
app.use('/api/prearrival', prearrivalRoutes);

// other routes and middleware...
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
