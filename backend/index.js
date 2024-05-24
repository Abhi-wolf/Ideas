const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const ideaRoutes = require("./routes/ideaRoute");
const userRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/commentRoute");

const app = express();
dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is listening in port ${process.env.PORT}`);
});
