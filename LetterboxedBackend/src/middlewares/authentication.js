import jwt from "jsonwebtoken";
import CustomError from "../utils/customeError.js";

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return next(new CustomError("Auth token missing", 401));
    }
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.error("Jwt verification error:", err.message);
        return next(new CustomError("Invlaid Token", 403));
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token verification Error:", error.message);
    next(new CustomError("failed to verify", 500));
  }
};


export {verifyUser}