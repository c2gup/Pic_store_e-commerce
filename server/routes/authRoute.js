

const { login, signup, refresh, switchProfile,verifyEmail } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");

// Ye hai mentos zindagi
const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", refresh);
router.get("/switch", verifyToken, switchProfile);
router.get("/verify-email", verifyEmail); // Updated to GET

module.exports = router;

