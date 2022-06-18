const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => console.log(err));

console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log(" 👋 SIGTERM RECEIVED, Shutting down  greacefully");
  server.close(() => {
    console.log("🎇 Process Terminated!");
  });
});
