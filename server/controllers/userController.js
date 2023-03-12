const { errorHandler } = require("../utils/errorHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check field

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all field" });
    }

    const user = new User({ name, email, phone, password });
    user.save((error, user) => {
      if (error || !user) {
        return res.status(400).json({ error: errorHandler(error) });
      }

      return res
        .status(200)
        .json({ success: "register successfully, you can sign in now" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res, next) => {
  const { email, phone, password } = req.body;
  User.findOne({
    $or: [
      {
        email: { $exists: true, $ne: null, $eq: email },
        googleId: { $exists: false, $eq: null },
        facebookId: { $exists: false, $eq: null },
      },
      {
        phone: { $exists: true, $ne: null, $eq: phone },
        googleId: { $exists: false, $eq: null },
        facebookId: { $exists: false, $eq: null },
      },
    ],
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({ error: "password doesn't match " });
      }

      req.auth = user;
      next();
    })
    .catch((error) => {
      res.status(404).json({ error: "User not found" });
    });
};

exports.createToken = (req, res) => {
  const user = req.auth;

  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "48h" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "99 days" }
  );

  const token = new RefreshToken({ jwt: refreshToken });
  token.save((error, t) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "create jwt failed, please try sign in again" });
    }

    return res.status(200).json({
      success: "sign in successfully",
      accessToken,
      refreshToken,
      _id: user._id,
      role: user.role,
    });
  });
};

exports.signout = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.status(401).json({ error: "refreshToken is required" });
  }

  RefreshToken.deleteOne({ jwt: refreshToken })
    .exec()
    .then(() => {
      return res.status(200).json({ success: "sign out successfully" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: "sign out and remove refresh token failed" });
    });
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.status(401).json({ error: "refreshToken is required" });
  }

  RefreshToken.findOne({ jwt: refreshToken })
    .exec()
    .then((token) => {
      if (!token) {
        return res.status(404).json({
          error: "refreshToken is invalid",
        });
      } else {
        const decoded = jwt.decode(token.jwt);

        const accessToken = jwt.sign(
          {
            _id: decoded._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "48h" }
        );

        const newRefreshToken = jwt.sign(
          { _id: decoded._id },
          process.env.REFRESH_TOKEN_SCRET,
          { expiresIn: "99 days" }
        );

        RefreshToken.findOneAndUpdate(
          { jwt: refreshToken },
          { $set: { jwt: newRefreshToken } }
        )
          .exec()
          .then((x) => {
            if (!x) {
              return res
                .status(500)
                .json({ error: "create jwt failed, try again later" });
            }

            return res.status(200).json({
              success: "refresh token successfully",
              accessToken,
              refreshToken: newRefreshToken,
            });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ error: "create jwt failed try again later" });
          });
      }
    })
    .catch((error) => {
      return res.status(401).json({ error: "refreshToken is invalid" });
    });
};

exports.forgotPassword = (req, res, next) => {
  const { email, phone } = req.body;

  const forgot_password_code = jwt.sign(
    { email, phone },
    process.env.JWT_FORGOT_PASSWORD_SECRET
  );

  User.findOneAndUpdate(
    {
      $or: [
        { email: { $exists: true, $ne: null, $eq: email } },
        { phone: { $exists: true, $ne: null, $eq: phone } },
      ],
    },
    { $set: { forgot_password_code } },
    { new: true }
  )
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const msg = {
        email: email ? email : "",
        phone: phone ? phone : "",
        name: user.name,
        title: "Request to change password",
        text: "Please click on the following link to change your password.",
        code: forgot_password_code,
      };
      req.msg = msg;
      next();

      return res
        .status(200)
        .json({ success: "request successfully, waiting for email or sms" });
    })
    .catch((error) => {
      return res.status(404).json({ error: "User not found" });
    });
};

exports.changePassword = (req, res) => {
  const forgot_password_code = req.params.forgotPasswordCode;
  const { password } = req.body;

  User.findOneAndUpdate(
    { forgot_password_code: forgot_password_code },
    { $unset: { forgot_password_code: "" } }
  ).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.hashed_password = user.encryptPassword(password, user.salt);
    user
      .save((x) => {
        if (x) {
          return res.status(500).json({
            error: "update password failed, please request to resend mail/sms",
          });
        }
        return res
          .status(200)
          .json({ success: "update password successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error: "user not found" });
      });
  });
};
