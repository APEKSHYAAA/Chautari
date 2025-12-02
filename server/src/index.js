const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const Chat = require('./models/chat');

// Use a MAP for clean user storage
let connectedUsers = {}; // { userId: socketId }

// Add or update user
const addUser = (socketId, userId) => {
  connectedUsers[userId] = socketId;
  console.log("Connected Users:", connectedUsers);
};

// Remove user by socket
const removeUser = (socketId) => {
  for (const userId in connectedUsers) {
    if (connectedUsers[userId] === socketId) {
      delete connectedUsers[userId];
    }
  }
};

// Get socket id of a user
const getUserSocket = (userId) => {
  return connectedUsers[userId] || null;
};



const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const userRoute = require("./routes/users");
const connection = require("./db/connection");
connection();
const port = process.env.PORT;
app.use(userRoute);



io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("add user", (userId) => {
    addUser(socket.id, userId);
  });

  socket.on("send message", async ({ receiverId, senderId, msg }) => {
    console.log("Message:", senderId, "→", receiverId, msg);

    // Store message in DB
    await Chat.create({ senderId, receiverId, msg });

    const receiverSocket = getUserSocket(receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("receive message", {
        senderId,
        msg,
      });
    } else {
      console.log("receiver offline");
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    removeUser(socket.id);
  });
});



server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
