const { Router } = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const { createTokenForUser } = require("../services/authentication");

const router = Router();

router.get("/signin", (req, res) => {
  const error = req.query.error;
  res.render("signin", { error });
});

router.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user with same email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists with this email");
    }

    // Create new user
    await User.create({ fullName, email, password });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect(
        "/user/signin?error=" + encodeURIComponent("User not found")
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.redirect(
        "/user/signin?error=" + encodeURIComponent("Invalid credentials")
      );
    }

    const token = createTokenForUser(user);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});



router.get('/logout', (req, res) => {
  res.clearCookie("token").redirect("/");
})

module.exports = router;
