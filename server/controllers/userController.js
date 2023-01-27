import User from "../models/userModels.js";
import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../helpers/auth.js";
import sendEmailReset from "../helpers/sendEmail.js";

const userController = express.Router();

// sign up

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    token: generateToken(user),
  });
});

// sign in

userController.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(400).send({ message: "Invalid email or password" });
});

// get all user

userController.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// get user by id

userController.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(400).send({ message: "User not found !" });
  }
});

// delete user

userController.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "longdeptrai@gmail.com") {
      res.status(400).send({ message: "Can not delete Admin User" });
      return;
    }
    await user.remove();
    res.send({ message: "user Deleted" });
  } else {
    res.status(404).send({ message: "User not found !" });
  }
});

// forgot password user

userController.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .send({ message: "This email is not register in our system" });
    }

    const token = generateToken(user);
    const url = `http://localhost:3000/auth/reset-password/${token}`;
    const name = user.name;
    sendEmailReset(email, url, "Reset your password", name);
    res
      .status(200)
      .send({ message: "Re-send the password, please check your email." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// reset password user

userController.post("/reset-password", async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashPassword }
    );
    res.status(200).send({
      message: "Password update successfully !",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default userController;
