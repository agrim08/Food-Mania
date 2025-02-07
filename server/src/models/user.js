import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("password is not strong");
      },
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid email format" + value);
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (enteredPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
  return isValid;
};

export default mongoose.model("User", userSchema);
