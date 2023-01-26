import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      trim: true,
      minLength: [4, "Name should have more than 4 characters"],
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Pease Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },
    image: { type: Object, default: "../uploads/default-avatar.png" },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
