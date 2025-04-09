import express from "express";
import { verifyAdmin } from "../../middlewares/authentication.js";
import trycatch from "../../middlewares/tryCatch.js";
import { adminLogin } from "../../controllers/auth/adminAuthController.js";

const routes = express.Router();

routes.post("/loginAdmin", trycatch(adminLogin));

export default routes;
