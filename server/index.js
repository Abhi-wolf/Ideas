const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { Server } = require("socket.io");
const { createServer } = require("http");

const dotenv = require("dotenv");
dotenv.config();

const ideaRoutes = require("./routes/ideaRoute");
const userRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/commentRoute");

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT"],
    credentials: true, // Allow cookies to be sent with requests
  },
});

// attach io to the app
app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("customEvent", (data) => {
    console.log(data);
    io.emit("broadcastedEvent", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("reconnect_error", (error) => {
    console.error("Reconnection error:", error);
    socket.disconnect();
  });
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/ideas", ideaRoutes);
app.use("/api/v1/idea", commentRoutes);
app.use("/api/v1/user", userRoutes);

// exporting to use in controllers

server.listen(process.env.PORT, () => {
  console.log(`Express Server is listening on port ${process.env.PORT}`);
  // If you want to log the address and port where Socket.IO server is running
  console.log(`Socket.IO Server is listening on port ${server.address().port}`);
  console.log(`Socket.IO Server is listening on port ${server.address()}`);
});

module.exports = { app, server };
