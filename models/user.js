const { Schema, model } = require("mongoose");

// const {createHmac} = require('node:crypto');

const bcrypt = require("bcrypt");


const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/images/download.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return;

//   const salt = randomBytes(16).toString();

//   const hashedPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");

//     this.salt = salt;
//     this.password = hashedPassword;

//     next();
// });


userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    next();
  } catch (err) {
    return next(err);
  }
  
});

const User = model("user", userSchema);

module.exports = User;
