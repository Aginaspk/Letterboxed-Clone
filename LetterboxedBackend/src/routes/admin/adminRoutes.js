import express from "express";
import { verifyAdmin } from "../../middlewares/authentication.js";
import trycatch from "../../middlewares/tryCatch.js";
import {
  addMovie,
  updateMovie,
} from "../../controllers/admin/adminMovieController.js";
import upload from "../../middlewares/multer.js";
import { blockUser, getAllUsers, getUserById } from "../../controllers/admin/adminUserController.js";
import { getAllReviews } from "../../controllers/admin/adminReviewController.js";

const routes = express.Router();

routes
  .post(
    "/add-movie",
    verifyAdmin,
    upload.fields([
      { name: "smallPoster", maxCount: 1 },
      { name: "bigPoster", maxCount: 1 },
    ]),
    trycatch(addMovie)
  )
  .put(
    "/updateMovie/:id",
    verifyAdmin,
    upload.fields([
      { name: "smallPoster", maxCount: 1 },
      { name: "bigPoster", maxCount: 1 },
    ]),
    trycatch(updateMovie)
  )


  .get('/get-members',verifyAdmin,trycatch(getAllUsers))
  .get('/getUserById/:id',verifyAdmin,trycatch(getUserById))
  .put('/block-user/:id',verifyAdmin,trycatch(blockUser))


  .get('/reviews',verifyAdmin,trycatch(getAllReviews))

export default routes;
