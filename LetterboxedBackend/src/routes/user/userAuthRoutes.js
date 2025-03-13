import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
  forgotPassword,
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
  .get("/reffresh", trycatch(refreshUserToken))
  .get('/protect',trycatch(protecte))
  .post('/forgot-password',trycatch(forgotPassword))
  .post('/reset-password/:token',trycatch(resetPassword))

export default routes;
