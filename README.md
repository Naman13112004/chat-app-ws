# 🚀 Simple WebSocket Chat (Educational)

## 🧐 What is a WebSocket?
A WebSocket is a **persistent, two-way connection** between a client and a server. 
Unlike HTTP, where the client must always ask for data (Request -> Response), 
WebSockets allow the server to "push" data to the client at any time.

---

## 📂 Architecture Overview

### Backend (ws library)
- Listens for an HTTP upgrade request.
- Once accepted, it maintains a **Set of all active client connections**.

### Frontend (Browser API)
- Uses the native `new WebSocket()` object to open the connection.
- Listens for events like:
  - `onmessage`
  - `open`
  - `close`

---

## 🛠 How to Run
1. **Backend**:
   ```bash
   cd backend
   npm install
   node server.js
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open two different browser tabs at the frontend URL to chat between them!

