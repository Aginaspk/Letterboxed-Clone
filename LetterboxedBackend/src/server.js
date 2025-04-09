import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user/userRoutes.js";
import userAuth from "./routes/user/userAuthRoutes.js";
import adminAuth from './routes/admin/adminAuthRoutes.js'
import adminRoute from './routes/admin/adminRoutes.js'
import cookieParser from "cookie-parser";
import manageError from "./middlewares/manageError.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
dotenv.config();

connectCloudinary();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});
app.use("/user", userRoute);
app.use("/authUser", userAuth);
app.use("/authAdmin",adminAuth);
app.use('/admin',adminRoute)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(manageError)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
