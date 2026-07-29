import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import userRoutes from "./routes/userRoute.js"
import postRoutes from "./routes/postRoute.js"
import cookieParser from "cookie-parser";

// JSON middleware
app.use(express.json());
connectDb();
app.use(cookieParser());
// Custom middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
});


// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API for posts and auth",
  });
});
// routes
// app.use("/api/users", userRoutes);
app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
