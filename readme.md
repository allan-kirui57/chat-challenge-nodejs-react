# Real-Time Chat Dashboard Challenge

A full-stack real-time chat application built with React and Node.js, featuring WebSocket communication for live messaging and typing indicators.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Query, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO, CORS
- **Real-time**: WebSocket connections for live updates

## 📋 Features

- ✅ Real-time message display with live updates
- ✅ Typing indicators ("Charlie is typing...")
- ✅ REST API endpoint for initial messages (`GET /api/messages`)
- ✅ WebSocket connection for live chat updates
- ✅ Responsive design with Tailwind CSS
- ✅ React Query for efficient API calls
- ✅ Simulated message and typing behavior
- ✅ Scrollable message history
- ✅ User avatars with color coding
- ✅ Message timestamps

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### 1. Clone and Setup Project Structure

```bash
# Clone the repository
git clone <your-repo-url>
cd chat-challenge

# You should now see the following structure:
# chat-challenge/
# ├── chat-backend/
# ├── chat-frontend/
# └── README.md
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd chat-backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

**Console output should show:**
```
Server running on port 5000
Visit http://localhost:3000 for the frontend
```

### 3. Frontend Setup

Open a **new terminal window/tab** and run:

```bash
# Navigate to frontend directory (from chat-challenge root)
cd chat-frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

**You should see:**
- "Real-Time Chat Dashboard" header
- Connection status showing "connected • Connected"
- Initial chat messages from Alice, Bob, and Charlie
- Message input box at the bottom

## 🧪 Testing Real-time Behavior

### Quick Test Checklist ✓

1. **Initial Load Test**
   - Visit `http://localhost:3000`
   - ✅ Page loads within 2 seconds
   - ✅ Shows 5 initial messages
   - ✅ Connection status shows "connected • Connected"

2. **Real-time Message Test**
   - Wait 10-15 seconds
   - ✅ New simulated messages appear automatically
   - ✅ Messages from Alice, Bob, Charlie, Dave, or Emma

3. **Typing Indicator Test**
   - Click in the message input box and start typing
   - ✅ Your typing indicator should appear for other users
   - ✅ Simulated users will also show typing indicators
   - ✅ Typing indicators disappear after 3 seconds

4. **Send Message Test**
   - Type "Hello everyone!" and press Enter or click Send
   - ✅ Your message appears immediately
   - ✅ Message shows with "You" as the sender
   - ✅ Timestamp is current time

5. **Multi-client Test**
   - Open a new browser tab with `http://localhost:3000`
   - Type a message in one tab
   - ✅ Message appears in both tabs instantly
   - ✅ Typing indicators work across tabs

### Advanced Testing

**WebSocket Connection Test:**
```bash
# Check WebSocket connection in browser console (F12)
# You should see: "User connected: [socket-id]" in backend terminal
```

**API Endpoint Test:**
```bash
# Test REST API directly
curl http://localhost:5000/api/messages

# Should return JSON with 5 most recent messages
```

## 📁 Project Structure

```
chat-challenge/
├── README.md
├── chat-backend/
│   ├── package.json
│   ├── server.js
│   └── node_modules/
├── chat-frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── ChatDashboard.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── node_modules/
```

## 🔧 API Endpoints

### REST API
- `GET /api/messages` - Returns the 5 most recent messages

### WebSocket Events
- `connection` - New client connection
- `messages` - Initial message history
- `new_message` - Real-time message updates
- `send_message` - Send new message
- `user_typing` - User typing indicator
- `user_stop_typing` - Stop typing indicator

## 🚨 Troubleshooting

### Backend Issues
```bash
# If port 5000 is busy:
# Kill existing processes
lsof -ti:5000 | xargs kill -9

# Or change port in server.js:
const PORT = process.env.PORT || 5001;
```

### Frontend Issues
```bash
# If React won't start:
rm -rf node_modules package-lock.json
npm install
npm start

# If Tailwind CSS not working:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Connection Issues
- Ensure both servers are running simultaneously
- Check CORS settings in backend if connection fails
- Verify WebSocket connection in browser dev tools

## 🎯 Key Implementation Details

- **Socket.IO** for reliable WebSocket communication
- **Tanstack React Query** prevents redundant API calls and provides caching
- **Tailwind CSS** for responsive, modern styling
- **Automatic scrolling** to latest messages
- **Color-coded avatars** for different users
- **Simulated AI behavior** with random messages and typing
- **Session-based message persistence**
- **Typing timeout handling** with debouncing

## 🚦 Development Workflow

```bash
# Terminal 1: Backend
cd chat-challenge/chat-backend
npm run dev

# Terminal 2: Frontend  
cd chat-challenge/chat-frontend
npm start

# Browser: http://localhost:3000
```

Both servers support hot reloading for development changes.


## 📝 Sample Data Structure

```json
[
  { "id": 1, "user": "Alice", "message": "Hey team, morning!", "timestamp": "2025-07-29T08:01:00Z" },
  { "id": 2, "user": "Bob", "message": "Morning Alice!", "timestamp": "2025-07-29T08:01:15Z" },
  { "id": 3, "user": "Charlie", "message": "Anyone up for lunch later?", "timestamp": "2025-07-29T08:02:00Z" },
  { "id": 4, "user": "Alice", "message": "Count me in.", "timestamp": "2025-07-29T08:02:10Z" },
  { "id": 5, "user": "Bob", "message": "Same here!", "timestamp": "2025-07-29T08:02:20Z" }
]
```

## 📋 Final Checklist

Verify:

- [ ] Backend runs on `http://localhost:5000`
- [ ] Frontend runs on `http://localhost:3000`
- [ ] Initial messages load automatically
- [ ] Real-time messages appear every 10-15 seconds
- [ ] Typing indicators work when you type
- [ ] Can send messages successfully
- [ ] Multiple browser tabs sync properly
- [ ] Console shows no critical errors
- [ ] WebSocket connection is stable

**Ready for submission! 🚀**