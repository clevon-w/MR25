const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (it looks like 'Bearer <token>')
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401);
        throw new jwt.TokenExpiredError(
          "Your login security token has expired, please logout and login again."
        );
      }
      res.status(401);
      throw new Error("Not authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

module.exports = { protect };
