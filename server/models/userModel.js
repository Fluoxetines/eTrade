const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const { v4: uuid_v4 } = require("uuid");
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
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: [true, "Pease Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dmxmvx5bk/image/upload/v1675170954/eTrade/avatar/icon-256x256-removebg-preview_exu0sw.png",
    },
    role: {
      type: String,
      default: "user",
      required: true,
      enum: ["admin", "seller", "user"],
    },
    store: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
    },
    isEmailActive: {
      type: Boolean,
      default: false,
    },
    email_code: {
      type: String,
    },
    isPhoneActive: {
      type: Boolean,
      default: false,
    },
    phone_code: {
      type: String,
    },
    forgot_password_code: {
      type: String,
    },
    salt: String,
    hashed_password: {
      type: String,
    },
    address: {
      type: [
        {
          type: String,
          trim: true,
          maxLength: 200,
          validate: [addressLimit, "The limit is 6 address"],
        },
      ],
      default: [],
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dmxmvx5bk/image/upload/v1675170954/eTrade/avatar/icon-256x256-removebg-preview_exu0sw.png",
    },
    googleId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid_v4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  encryptPassword: function (password, salt = this.salt) {
    if (!password) return "";

    try {
      return crypto.createHmac("sha1", salt).update(password).digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },
};

//validators
function addressLimit(val) {
  return val.length <= 6;
}

module.exports = mongoose.model("User", userSchema);
