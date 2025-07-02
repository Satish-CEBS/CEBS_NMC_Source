
// controllers/authController.js

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRes = await db.query(
            `SELECT u.*, p.hash, r.name AS role_name
   FROM "user" u
   JOIN password p ON u.password_id = p.password_id
   JOIN role r ON u.role_id = r.role_id
   WHERE normalized_email = $1`,
            [email.toUpperCase()]
        );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.user_id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, role: user.role_name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// User Registration
exports.register = async (req, res) => {
  const { email, password, role_id, given_name, surname } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const password_id = uuidv4();
    const user_id = uuidv4();
    const person_id = uuidv4();

    await db.query('INSERT INTO password (password_id, hash) VALUES ($1, $2)', [password_id, hash]);
    await db.query(
      'INSERT INTO person (person_id, given_name, surname, company_email) VALUES ($1, $2, $3, $4)',
      [person_id, given_name, surname, email]
    );

    await db.query(
      `INSERT INTO "user" (user_id, password_id, person_id, email, normalized_email,
         email_confirmed, phone_number_confirmed, role_id)
       VALUES ($1, $2, $3, $4, $5, true, true, $6)`,
      [user_id, password_id, person_id, email, email.toUpperCase(), role_id]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
