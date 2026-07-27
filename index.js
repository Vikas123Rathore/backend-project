import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// JSON middleware
app.use(express.json());
connectDb()
// Custom middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
});

// In-memory database
let blogPosts = [];

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API",
  });
});

// GET All Posts
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// GET Post By ID
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  res.json(post);
});

// POST Create New Post
app.post("/posts", (req, res) => {
  const newPost = {
    id: Number(req.body.id),
    title: req.body.title,
    content: req.body.content,
  };

  blogPosts.push(newPost);

  res.status(201).json({
    message: "Post Added Successfully",
    data: newPost,
  });
});

// PUT Update Post
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.json({
    message: "Post Updated Successfully",
    data: post,
  });
});

// DELETE Post
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  blogPosts = blogPosts.filter((item) => item.id !== id);

  res.json({
    message: "Post Deleted Successfully",
  });
});

// Login Route
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required",
    });
  }

  res.json({
    message: "Login Successful",
    token: "mock-jwt-token-123456",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
