const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createPost,
  getMyPosts,
  getAllPosts,
  deletePost,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostByDateRange,
} = require("../controllers/postController");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPosts);
router.get("/post/myPosts", verifyToken, getMyPosts);
router.delete("/post/delete/:id", verifyToken, deletePost);
router.get("/post/search", searchPosts);
router.put("/post/addToFavourites/:postId", verifyToken, addToFavourites);
router.put(
  "/post/removeFromFavourites/:postId",
  verifyToken,
  removeFromFavourites
);
router.get("/post/favourites", verifyToken, getFavourites);
router.get("/post/postByDateRange", verifyToken,getPostByDateRange );

module.exports = router;