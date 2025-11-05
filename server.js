// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Read DB config from .env
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASS = '',
  DB_NAME = 'ticketsystem',
  PORT = 3000
} = process.env;

let pool;
async function initDb() {
  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('MySQL pool created');
}
initDb().catch(err => {
  console.error('Failed to initialize DB pool', err);
  process.exit(1);
});

// Create ticket
app.post('/api/tickets', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const {
      user_id,
      artist_name,
      event_name,
      section,
      row_name,
      seat,
      event_date,
      event_time,
      location,
      ticket_type,
      level_name,
      number_value,
      image_url
    } = req.body;

    await conn.beginTransaction();

    const [r1] = await conn.execute(
      `INSERT INTO tickets 
        (user_id, artist_name, event_name, section, row_name, seat, event_date, event_time, location, ticket_type, level_name, number_value)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, artist_name, event_name, section, row_name, seat, event_date, event_time, location, ticket_type, level_name, number_value]
    );

    const ticketId = r1.insertId;

    if (image_url) {
      await conn.execute(
        `INSERT INTO ticket_images (ticket_id, image_url) VALUES (?, ?)`,
        [ticketId, image_url]
      );
    }

    await conn.commit();

    res.status(201).json({ success: true, ticket_id: ticketId });
  } catch (err) {
    await conn.rollback().catch(()=>{});
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  } finally {
    conn.release();
  }
});

// Get ticket by id (with image)
app.get('/api/tickets/:id', async (req, res) => {
  const ticketId = Number(req.params.id);
  try {
    const [rows] = await pool.execute(
      `SELECT t.*, ti.image_url 
       FROM tickets t
       LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
       WHERE t.id = ?`,
      [ticketId]
    );
    if (!rows || rows.length === 0) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, ticket: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all tickets for a user
app.get('/api/tickets/user/:user_id', async (req, res) => {
  const userId = Number(req.params.user_id);
  try {
    const [rows] = await pool.execute(
      `SELECT t.*, ti.image_url
       FROM tickets t
       LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC`,
      [userId]
    );
    res.json({ success: true, tickets: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update ticket
app.put('/api/tickets/:id', async (req, res) => {
  const ticketId = Number(req.params.id);
  const conn = await pool.getConnection();
  try {
    const {
      user_id,
      artist_name,
      event_name,
      section,
      row_name,
      seat,
      event_date,
      event_time,
      location,
      ticket_type,
      level_name,
      number_value,
      image_url
    } = req.body;

    const [[ownerRows]] = await conn.query(`SELECT user_id FROM tickets WHERE id = ?`, [ticketId]);
    if (!ownerRows || ownerRows.length === 0) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }
    let ticketOwnerId;
    if (Array.isArray(ownerRows)) ticketOwnerId = ownerRows[0] && ownerRows[0].user_id;
    else ticketOwnerId = ownerRows.user_id;

    if (Number(ticketOwnerId) !== Number(user_id)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    await conn.beginTransaction();

    await conn.execute(
      `UPDATE tickets SET
        artist_name = ?, event_name = ?, section = ?, row_name = ?, seat = ?,
        event_date = ?, event_time = ?, location = ?, ticket_type = ?, level_name = ?, number_value = ?
       WHERE id = ?`,
      [artist_name, event_name, section, row_name, seat, event_date, event_time, location, ticket_type, level_name, number_value, ticketId]
    );

    if (typeof image_url !== 'undefined') {
      const [imgRows] = await conn.execute(`SELECT id FROM ticket_images WHERE ticket_id = ?`, [ticketId]);
      if (imgRows.length > 0) {
        await conn.execute(`UPDATE ticket_images SET image_url = ? WHERE ticket_id = ?`, [image_url, ticketId]);
      } else {
        await conn.execute(`INSERT INTO ticket_images (ticket_id, image_url) VALUES (?, ?)`, [ticketId, image_url]);
      }
    }

    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback().catch(()=>{});
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  } finally {
    conn.release();
  }
});

// Delete ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const ticketId = Number(req.params.id);
  const { user_id } = req.body || {};
  if (!user_id) return res.status(400).json({ success: false, error: 'user_id required' });

  try {
    const [result] = await pool.execute(
      `DELETE FROM tickets WHERE id = ? AND user_id = ?`,
      [ticketId, user_id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'Not found or not owner' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
