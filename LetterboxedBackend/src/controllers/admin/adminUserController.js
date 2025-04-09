import userSchema from "../../models/schema/userSchema.js";

const getAllUsers = async (req, res) => {
  const users = await userSchema.find({ isAdmin: false });
  res.status(200).json({
    message: "success",
    data: users,
  });
};
const getUserById = async (req, res, next) => {
  const user = await userSchema
    .findOne({ _id: req.params.id })
    .select("-password");
  if (!user) {
    return next(new CustomError("user not found", 404));
  }
  res.status(200).json({ user });
};

const blockUser = async (req, res, next) => {
  const user = await userSchema.findOne({ _id: req.params.id });
  if (!user) {
    return next(new CustomError("User not Found", 404));
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.status(200).json({
    message: user.isBlocked ? "user blocked" : "user unblocked",
  });
};

export { getAllUsers, getUserById,blockUser };
