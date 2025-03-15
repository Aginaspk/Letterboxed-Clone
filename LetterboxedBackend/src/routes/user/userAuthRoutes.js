import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
  forgotPassword,
    logoutUser,
    protecte,
  refreshUserToken,
  resetPassword,
  userLogin,
  userRegister,
} from "../../controllers/auth/userAuthController.js";

const routes = express.Router();

routes
  .post("/register", trycatch(userRegister))
  .post("/login", trycatch(userLogin))
  .get('/logout',trycatch(logoutUser))
  .get("/reffresh", trycatch(refreshUserToken))
  .get('/protect',trycatch(protecte))
  .post('/forgot-password',trycatch(forgotPassword))
  .post('/reset-password/:token',trycatch(resetPassword))

export default routes;
