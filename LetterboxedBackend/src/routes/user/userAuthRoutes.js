import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
    protecte,
  refreshUserToken,
  userLogin,
  userRegister,
} from "../../controllers/auth/userAuthController.js";

const routes = express.Router();

routes
  .post("/register", trycatch(userRegister))
  .post("/login", trycatch(userLogin))
  .get("/reffresh", trycatch(refreshUserToken))
  .get('/protect',trycatch(protecte))

export default routes;
