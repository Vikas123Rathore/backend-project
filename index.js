import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDb();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // React/Vite frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API for posts and auth",
  });
});

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
