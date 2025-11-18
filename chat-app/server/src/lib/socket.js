import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const onlineUsers = new Map(); //userId: socketId

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  onlineUsers.set(socket.handshake.query.userId, socket.id); //store userId and socketId
  io.emit("onlineUsers", Array.from(onlineUsers.keys())); //send online users to all connected users

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    onlineUsers.delete(socket.handshake.query.userId); //remove user from online users when it goes offline
    io.emit("onlineUsers", Array.from(onlineUsers.keys())); //send online users to all connected users
  });
});

export const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId);
};

export { io, server, app };
