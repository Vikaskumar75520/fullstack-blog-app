const express = require("express");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// CREATE POST (Protected)
// =========================
router.post("/", protect, async (req, res) => {
  try {
    const { title, imageURL, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (title.length < 5 || title.length > 120) {
      return res.status(400).json({ message: "Title must be 5-120 characters" });
    }

    if (content.length < 50) {
      return res
        .status(400)
        .json({ message: "Content must be at least 50 characters" });
    }

    const newPost = new Post({
      title,
      imageURL,
      content,
      username: req.user.username,
      user: req.user._id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// GET ALL POSTS (Search + Pagination)
// =========================
router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// GET SINGLE POST
// =========================
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// UPDATE POST (Owner only)
// =========================
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, imageURL, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (title) post.title = title;
    if (imageURL) post.imageURL = imageURL;
    if (content) post.content = content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// DELETE POST (Owner only)
// =========================
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

