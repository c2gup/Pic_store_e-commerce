const {getOrder} = require("../controllers/orderController");

const {verifyToken} = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/orders/get", verifyToken, getOrder);

module.exports = router;