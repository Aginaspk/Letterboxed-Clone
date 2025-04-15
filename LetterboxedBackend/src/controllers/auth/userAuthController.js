import jwt, { decode } from "jsonwebtoken";
import bycrypt from "bcryptjs";
import {
  joiNewPassword,
  joiUserLogin,
  joiUserSchema,
} from "../../models/joischema/validation.js";
import CustomError from "../../utils/customeError.js";
import user from "../../models/schema/userSchema.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import userSchema from "../../models/schema/userSchema.js";
import dotenv from "dotenv";


dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// TokenGenaration
const generateAccessToken = (userData) =>
  jwt.sign({ id: userData._id }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (userData) =>
  jwt.sign({ id: userData._id }, process.env.REFRESH_SECRET, {
    expiresIn: "60m",
  });

// Registeration
const userRegister = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);

  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const { userName, email, password, isSixteen, isPAP } = value;
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
    isSixteen,
    isPAP,
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
    user: { userName, email },
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
    user: { userId:userData._id,userName: userData.userName, email: userData.email,pic:userData.profilePic},
  });
};

// refreshUserToken
const refreshUserToken = async (req, res, next) => {
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

// forgotPassword
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new CustomError("No Email Found", 401));
  }
  const user = await userSchema.findOne({ email });
  if (!user) {
    return next(new CustomError("No User Found on This Email", 404));
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiry;
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Password Reset Request",
    html: `
       <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px 0;">
    <div style="width: 100%; max-width: 660px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #2F3C4A; width: 100%; padding: 20px 0; text-align: left;">
            <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741849895/lb-logo-header-C6I1PSYv_adoytj.png" alt="Letterboxd Logo" style="max-width: 100px; margin-left: 30px; display: block;">
        </div>

        <div style="width: 100%; padding: 30px 66px; box-sizing: border-box; text-align: left;">
            <h2 style="margin: 0; padding-bottom: 20px; color: #2F3C4A; font-size: 24px; font-weight: bold; line-height: 1.2;">Reset Your Password</h2>
            <p style="margin: 0; padding-bottom: 20px; color: #445566; font-size: 16px; line-height: 1.5;">Hi! You’ve requested to reset the password for your Letterboxd account with the username <strong>${user?.userName}</strong>. Use the button below to set a new password:</p>
            <p style="margin: 0; padding-bottom: 25px; text-align: left;">
                <a href="${process.env.APP_URL}/reset-password/${resetToken}" style="display: inline-block; padding: 12px 30px; background-color: #00C030; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">Reset Password</a>
            </p>
            <p style="margin: 0; padding-bottom: 20px; color: #445566; font-size: 14px; line-height: 1.5;">If you didn’t request this reset, feel free to ignore this email—your account is still secure.</p>
        </div>

        <div style="width: 100%; padding: 20px 66px; background-color: #ffffff; border-radius: 0 0 8px 8px; text-align: left; box-sizing: border-box;">
            <p style="margin: 0; padding-bottom: 5px; color: #445566; font-size: 14px; line-height: 1.5;">Happy watching!</p>
            <p style="margin: 0; color: #445566; font-size: 12px; line-height: 1.5;">The Letterboxd Team • <a href="https://letterboxd.com" style="color: #00C030; text-decoration: underline;">letterboxd.com</a></p>
        </div>
    </div>
    <div style="width: 100%; padding: 40px 66px; background-color: #eef2f7; text-align: center; font-size: 12px; color: #6b7280; line-height: 1.5; box-sizing: border-box;">
            <p style="margin: 0; padding-bottom: 10px;">You received this because you're a member of Letterboxd, the social network for film lovers.</p>
            <p style="margin: 0; padding-bottom: 10px;">Sent by Letterboxd, P.O. Box 99280, Newmarket, Auckland 1149, New Zealand</p>
            <p style="margin: 0;">
                <span style="color: #f97316;">⬤</span> <span style="color: #10b981;">⬤</span> <span style="color: #3b82f6;">⬤</span> | 
                <span style="color: #6b7280;">📸</span> <span style="color: #6b7280;">🐦</span> <span style="color: #6b7280;">✖️</span> <span style="color: #6b7280;">🦋</span> <span style="color: #6b7280;">👍</span> <span style="color: #6b7280;">🎥</span>
            </p>
        </div>
</body>
    `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    message: "email send to your gamil sucessfully",
  });
};

// resetPassword
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { value, error } = joiNewPassword.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const { password } = value;
  const user = await userSchema.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError("invalid token", 400));
  }
  const salt = await bycrypt.genSalt(8);
  const hashedPassword = await bycrypt.hash(password, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    message: "password reset successfully",
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const protecte = async (req, res) => {
  const user = req.user;
  const userData = await userSchema.findOne({_id:user.id});
 res.status(200).json({messgae:userData.userName})
};

export {
  userRegister,
  userLogin,
  refreshUserToken,
  protecte,
  forgotPassword,
  resetPassword,
  logoutUser,
};
