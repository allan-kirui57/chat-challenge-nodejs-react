const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

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

// Sample data as specified in requirements
const varOcg = [
  { "id": 1, "user": "Alice", "message": "Hey team, morning!", "timestamp": "2025-07-29T08:01:00Z" },
  { "id": 2, "user": "Bob", "message": "Morning Alice!", "timestamp": "2025-07-29T08:01:15Z" },
  { "id": 3, "user": "Charlie", "message": "Anyone up for lunch later?", "timestamp": "2025-07-29T08:02:00Z" },
  { "id": 4, "user": "Alice", "message": "Count me in.", "timestamp": "2025-07-29T08:02:10Z" },
  { "id": 5, "user": "Bob", "message": "Same here!", "timestamp": "2025-07-29T08:02:20Z" }
];

let currentMessageId = 6;
const users = ['Alice', 'Bob', 'Charlie', 'Dave', 'Emma'];
let typingUsers = new Set();

// REST API endpoint for messages
app.get('/api/messages', (req, res) => {
  res.json(varOcg.slice(-5)); // Return last 5 messages
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send initial messages to new connection
  socket.emit('messages', varOcg.slice(-5));
  
  // Handle new message from client
  socket.on('send_message', (data) => {
    const newMessage = {
      id: currentMessageId++,
      user: data.user || 'Anonymous',
      message: data.message,
      timestamp: new Date().toISOString()
    };
    
    varOcg.push(newMessage);
    
    // Broadcast new message to all clients
    io.emit('new_message', newMessage);
  });
  
  // Handle typing events
  socket.on('user_typing', (user) => {
    typingUsers.add(user);
    socket.broadcast.emit('user_typing', user);
    
    // Clear typing indicator after 3 seconds
    setTimeout(() => {
      typingUsers.delete(user);
      socket.broadcast.emit('user_stop_typing', user);
    }, 3000);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Simulate random messages and typing indicators
setInterval(() => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const messages = [
    "How's everyone doing?",
    "Great work on the project!",
    "Anyone free for a quick call?",
    "Just finished my tasks",
    "Coffee break time!",
    "Looking forward to the weekend",
    "New updates are ready"
  ];
  
  // 30% chance to simulate typing
  if (Math.random() < 0.3) {
    typingUsers.add(randomUser);
    io.emit('user_typing', randomUser);
    
    setTimeout(() => {
      typingUsers.delete(randomUser);
      io.emit('user_stop_typing', randomUser);
      
      // Send actual message after typing
      const newMessage = {
        id: currentMessageId++,
        user: randomUser,
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toISOString()
      };
      
      varOcg.push(newMessage);
      io.emit('new_message', newMessage);
    }, 2000 + Math.random() * 3000);
  }
}, 8000 + Math.random() * 7000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:3000 for the frontend`);
});