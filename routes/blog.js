const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const cloudinary = require("../config/cloudinary"); 

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  let imageUrl = "";

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog-images"
      });
      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: imageUrl,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).send("Image upload failed.");
  }
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blog: req.params.id }).populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blog: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});



router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!req.user || req.user._id !== blog.createdBy.toString()) {
    return res.status(403).send("Unauthorized");
  }
  return res.render("update", { blog });
});


router.post("/update/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!req.user || req.user._id !== blog.createdBy.toString()) {
    return res.status(403).send("Unauthorized");
  }

  await Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,

  });

  return res.redirect(`/blog/${req.params.id}`);
});

// Delete route
router.post("/delete/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!req.user || req.user._id !== blog.createdBy.toString()) {
    return res.status(403).send("Unauthorized");
  }

  await Blog.findByIdAndDelete(req.params.id);
  return res.redirect("/");
});

module.exports = router;
