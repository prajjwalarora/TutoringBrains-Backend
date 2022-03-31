const express = require("express");

const app = express();
const server = require("http").Server(app);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, { debug: true });
const roomSocket = require("./roomSocket");

const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

const userRouter = require("./routes/userRoutes");
const assessmentRouter = require("./routes/assessmentRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const questionRouter = require("./routes/questionRoutes");
const roomRouter = require("./routes/roomRoutes");

const globalErrorHandler = require("./controllers/errorController");

// /////
roomSocket(server);
// /////
app.enable("trust proxy");

app.use(cors());

app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request by this IP, please try again in an hour!",
});

app.use("/", limiter);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/peerjs", peerServer);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/assessments", assessmentRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/room", roomRouter);
// app.use("*", (req, res, next) => {
//   res.status("404").json({
//     status: "Not Found!",
//   });
// });

app.use(globalErrorHandler);

module.exports = server;
