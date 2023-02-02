import User from "../models/userModels.js";
import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../helpers/auth.js";
import { sendEmailActive, sendEmailReset } from "../helpers/sendEmail.js";
import jwt from "jsonwebtoken";

const userController = express.Router();

// sign up

userController.post("/signup", async (req, res) => {
  const { name, email, password, address } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    address: address,
    password: bcrypt.hashSync(password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
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
        image: user.image,
        address: user.address,
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

userController.delete("/:id", isAdmin, isAuth, async (req, res) => {
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

    const url = `http://localhost:3000/auth/reset-password/${user.id}/${token}`;
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

userController.post("/reset-password/:id/:token", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password);
    const newPassword = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashPassword }
    );
    newPassword.save();
    res.status(200).send({
      message: "Password update successfully !",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// active account

userController.post("/active-account", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = generateToken(user);

    if (!user) {
      res
        .status(400)
        .send({ message: "This email is not register in our system" });
    }
    const url = `http://localhost:3000/auth/active-account/${user.id}/${token}`;
    const name = user.name;
    sendEmailActive(email, url, "Active Account", name);
    res
      .status(200)
      .send({ message: "Email send successfully, please check your email." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

userController.get("/active-account/:id/:token", async (req, res) => {
  const { id } = req.params;
  try {
    User.findByIdAndUpdate(id, { $set: { isActive: true } })
      .exec()
      .then((user) => {
        if (!user) {
          res.status(500).send({ message: err.message });
        }
        res.status(200).send({
          message: "Active your account successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default userController;
