const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { Pool } = require('pg');

// __define-ocg__ - Initialize express app for real-time chat dashboard
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_db',
  password: 'Qwerty123!',
  port: 5432,
});

let currentMessageId = 6;
const users = ['Alice', 'Bob', 'Charlie', 'Dave', 'Emma'];
let typingUsers = new Set();

// REST API endpoint for messages
app.get('/api/messages', async(req, res) => {
  try {
  const messages = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 5');
  res.status(200).json(messages.rows.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// WebSocket connection handling
io.on('connection', async(socket) => {
  console.log('User connected:', socket.id);

  try {
    const result = await pool.query(`SELECT * FROM messages ORDER BY id DESC LIMIT 5`);
    // Send initial messages to new connection
    socket.emit('messages', result.rows.reverse());
  } catch(err) {
    console.error(err);
    res.status(500).json({error: "Error sending initial messages"})
  }
  
  // Handle new message from client
  socket.on('send_message', async(data) => {
    try {
      const newMsg = await pool.query(
        `INSERT INTO messages (user_name, message, created_at) VALUES ($1, $2, NOW()) RETURNING *`, 
        [data.user || "Anonymous", data.message]
      );
      const newMessage = newMsg.rows[0];
      io.emit('new_message', newMessage);
    } catch (err) {
      console.error("Error Saving the Message : ", err)
    }
  });
  
  // Handle typing events
  socket.on('user_typing', (user) => {
    socket.broadcast.emit('user_typing', user)

    // Clear typing indicator after 3 seconds
    setTimeout(() => {
      socket.broadcast.emit('user_stop_typing', user);
    }, 3000);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:3000 for the frontend`);
  const res = await pool.query('SELECT NOW()');
  console.log('✅ PostgreSQL connected! Server time:', res.rows[0].now);
});