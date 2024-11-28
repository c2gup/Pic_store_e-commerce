const Order = require("../models/Order");
const User = require("../models/User");

const getOrder = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  const author = req.author;

  try {
    let orders;

    if (authorAccountType === "buyer") {
      orders = await Order.find({ purchaserId: authorId });
    } else {
      orderData = await Order.find({ author });
      const {username } = await User.findById(orderData[0].purchaserId);
      orders = orderData.map((order)=>{
            return{
                  author:order.author,
                  title: order.title,
                  price: order.price,
                  createdAt : order.createdAt,
                  razorpayOrderId : order.razorpayOrderId,
                  postUrl : order.postUrl,
                  razorpayPaymentId : order.razorpayPaymentId,
                  razorpaySignature : order.razorpaySignature,
                  purchaserId : order.purchaserId,
                  _id : order._id,
                  purchaser :username,

            }
      })
    }

    if (!orders)
      return res
        .status(404)
        .json({ success: false, message: "No order found" });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};


module.exports = {getOrder};