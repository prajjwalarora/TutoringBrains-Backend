const socket = require("socket.io");
module.exports = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.on("ready", () => {
        socket.broadcast.to(roomId).emit("user-connected", userId);
      });
    });
  });
};
