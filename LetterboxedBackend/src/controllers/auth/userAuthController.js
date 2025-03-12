import jwt, { decode } from "jsonwebtoken";
import bycrypt from "bcryptjs";
import {
  joiUserLogin,
  joiUserSchema,
} from "../../models/joischema/validation.js";
import CustomError from "../../utils/customeError.js";
import user from "../../models/schema/userSchema.js";

// TokenGenaration
const generateAccessToken = (userData) =>
  jwt.sign({ id: userData._id }, process.env.ACCESS_SECRET, {
    expiresIn: "15s",
  });

const generateRefreshToken = (userData) =>
  jwt.sign({ id: userData._id }, process.env.REFRESH_SECRET, {
    expiresIn: "30s",
  });

// Registeration
const userRegister = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);

  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const { userName, email, password } = value;
  const existUser = await user.findOne({ userName });
  if (existUser) {
    return next(new CustomError("user already exist", 400));
  }

  const salt = await bycrypt.genSalt(8);
  const hashedPassword = await bycrypt.hash(password, salt);
  const newUser = new user({
    userName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "user registered successfully",
    refreshToken,
    accessToken,
    user:{userName,email}
  });
};

// Login
const userLogin = async (req, res, next) => {
  const { value, error } = joiUserLogin.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { userName, password } = value;
  const userData = await user.findOne({ userName, isAdmin: false });
  if (!userData) {
    return next(new CustomError("User not found", 404));
  }
  const isMatch = await bycrypt.compare(password, userData.password);

  if (!isMatch) {
    return next(new CustomError("Password is incorrect", 401));
  }

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "user logged in successfully",
    accessToken,
    refreshToken,
    user:{userName:userData.userName,email:userData.email}
  });
};

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(new CustomError("No reffresh token", 401));
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return next(new CustomError("invalid ReffrshToken", 403));
    }

    const newAccessToken = generateAccessToken({ _id: decoded.id });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  });

  res.status(201).json({ message: "accesstoken Reffreshed" });
};

const protecte = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({ message: "Protected data", userId: decoded.id });
  });
};

export { userRegister, userLogin, refreshUserToken, protecte };
