import express from "express";
import { signUpValidation } from "../utils/signUpValidation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/sign-up", async (req, res) => {
  try {
    signUpValidation(req);

    const { username, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      emailId,
      password: hashedPassword,
    });

    const newUser = await user.save();
    const token = await newUser.getJwt();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 360000),
    });
    res
      .status(201)
      .json({ message: "User registered successfully!", data: newUser });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Email already exists");
    } else {
      res.status(500).send(err.message);
    }
  }
});

authRouter.post("/sign-in", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJwt();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600 * 1000),
      httpOnly: true,
    });
    res.status(201).json({ message: "Login successful!", data: user });
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid credentials");
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successful");
});

export default authRouter;
