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
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmxmvx5bk/image/upload/v1675170954/eTrade/avatar/icon-256x256-removebg-preview_exu0sw.png",
    },
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
