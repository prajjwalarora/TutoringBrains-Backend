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
        console.log(userId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
      });
    });

    socket.on("disconnected", (roomId, user) => {
      console.log(user);
      socket.broadcast.to(roomId).emit("disconnected", user);
      // socket.di(roomId);
      // socket.on("ready", () => {
      // });
    });
  });
};
