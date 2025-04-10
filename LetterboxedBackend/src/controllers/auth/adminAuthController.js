import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { joiAdminLogin } from "../../models/joischema/validation.js";
import userSchema from "../../models/schema/userSchema.js";
import CustomError from "../../utils/customeError.js";

const generateAccessToken = (userData) =>
  jwt.sign({ id: userData._id }, process.env.ADMIN_ACCESS_SECRET, {
    expiresIn: "60m",
  });

const adminLogin = async (req, res, next) => {
  const { value, error } = joiAdminLogin.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { userName, password } = value;
  const userData = await userSchema.findOne({ userName, isAdmin: true });
  if (!userData) {
    return next(new CustomError("Unautherized", 404));
  }
  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return next(new CustomError("Password is incorrect", 401));
  }

  const accessToken = generateAccessToken(userData);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "user logged in successfully",
    accessToken,
    user: {
      userName: userData.userName,
      email: userData.email,
      pic: userData.profilePic,
    },
  });
};

export { adminLogin };
