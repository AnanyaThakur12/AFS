require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb://localhost:27017/tutorial", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);

// authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.substring(7); 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).send("Invalid Token");
    }

    console.log("Decoded Token in Middleware:", user);

    req.user = user;
    next();
  });
}

// Register a new user
app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(422).json({ status: 422, message: "User with the same name already exists." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send();
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid credentials");
    }

    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch all posts for the authenticated user
app.get("/posts", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const posts = await Post.find({ userId: user._id });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new post
app.post("/posts", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const post = new Post({
      userId: user._id,
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
