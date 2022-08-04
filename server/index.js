const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});

io = socket(server);

io.on("connection", (socket) => {
  console.log("USER CONNECTED", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room No: " + data);
  });

  socket.on("send_message", (data) => {
    console.log("User Send Message", data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
