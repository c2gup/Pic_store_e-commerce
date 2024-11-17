const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createPost,
  getMyPosts,
  getAllPosts,
} = require("../controllers/postController");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPosts);
router.get("/post/myPosts", verifyToken, getMyPosts);

module.exports = router;