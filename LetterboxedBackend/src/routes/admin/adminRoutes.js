import express from "express";
import { verifyAdmin } from "../../middlewares/authentication.js";
import trycatch from "../../middlewares/tryCatch.js";
import {
  addMovie,
  getAllFilms,
  getFilmById,
  removeMovie,
  updateMovie,
} from "../../controllers/admin/adminMovieController.js";
import upload from "../../middlewares/multer.js";
import {
  blockUser,
  getAllUsers,
  getUserById,
} from "../../controllers/admin/adminUserController.js";
import {
  getAllReviews,
  getRevById,
  getRevByMovie,
  getRevByUser,
  removeReview,
} from "../../controllers/admin/adminReviewController.js";
import {
  getALlLists,
  getListById,
  getListsByUser,
} from "../../controllers/admin/adminListController.js";

const routes = express.Router();

routes
  .get("/get-all-filims", verifyAdmin, trycatch(getAllFilms))
  .get("/get-filim-byId/:id", verifyAdmin, trycatch(getFilmById))
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
  .delete('/remove-film/:id',verifyAdmin,trycatch(removeMovie))

  .get("/get-members", verifyAdmin, trycatch(getAllUsers))
  .get("/getUserById/:id", verifyAdmin, trycatch(getUserById))
  .put("/block-user/:id", verifyAdmin, trycatch(blockUser))

  .get("/reviews", verifyAdmin, trycatch(getAllReviews))
  .get("/review-by-id/:id", verifyAdmin, trycatch(getRevById))
  .get("/reviews-by-user/:id", verifyAdmin, trycatch(getRevByUser))
  .get("/reviews-by-movie/:id", verifyAdmin, trycatch(getRevByMovie))
  .delete("/remove-review/:id", verifyAdmin, trycatch(removeReview))

  .get("/get-all-lists", verifyAdmin, trycatch(getALlLists))
  .get("/get-list-byId/:id", verifyAdmin, trycatch(getListById))
  .get("/get-list-ByUser/:id", verifyAdmin, trycatch(getListsByUser));

export default routes;
