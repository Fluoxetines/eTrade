import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.header("authorization");
  if (!token)
    return res.status(401).send("Access denied. Not authenticated...");
  try {
    const jwtSecretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid auth token...");
  }
};

export const isAdmin = (req, res, next) => {
  isAuth(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};
