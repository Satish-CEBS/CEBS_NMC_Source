const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false // Optional: Set to true if server enforces SSL
});
module.exports = pool;
