import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Pease Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      id: { type: String },
      url: { type: String },
      /*       default:
        "https://res.cloudinary.com/dmxmvx5bk/image/upload/v1675170954/eTrade/avatar/icon-256x256-removebg-preview_exu0sw.png", */
    },
    roles: {
      type: String,
      default: "user",
      required: true,
      enum: ["admin", "seller", "user"],
    },
    store: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
    },
    updatedBy: {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
    refreshToken: [String],
    blocked: {
      type: Boolean,
      default: false,
    },
    address: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
