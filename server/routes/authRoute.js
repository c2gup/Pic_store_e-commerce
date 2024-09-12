const { signUp,login } = require("../controllers/authController"); // Check this path
const router = require("express").Router();

router.post("/signUp", signUp); // Make sure signUp is correctly imported
router.post("/login", login); // Make sure signUp is correctly imported

module.exports = router;
