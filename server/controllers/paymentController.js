// const Razorpay = require("razorpay");
// const User = require("../models/User");
// const Order = require("../models/Order");
// const Post = require("../models/Post");
// const crypto = require("crypto");

// // create a new instance of the Razorpay

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID, // Corrected typo
//   key_secret: process.env.RAZORPAY_SECRET, // Corrected typo
// });

// const generateOrder = async (req, res) => {
//   const purchaserId = req.id;
//   const { price } = req.body;

//   try {
//     let user = await User.findById(purchaserId);

//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     const options = {
//       amount: Number(price * 100),
//       currency: "USD",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         return res.status(500).json({ succees: false, message: error.message });
//       }

//       return res.status(200).json({ success: true, data: order });
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const verifyOrder = async (req, res) => {
//   const purchaserId = req.id;

//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     postUrl,
//     author,
//     title,
//     price,
//     postId,
//   } = req.body;

//   try {
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     const isAuthentic = expectedSign === razorpay_signature;
//     if (isAuthentic) {
//       const order = new Order({
//         purchaserId,
//         postUrl,
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature,
//         author,
//         title,
//         price,
//       });


//       await order.save();

//       try {
//         let userData = await User.findByIdAndUpdate(purchaserId, {
//           $push: { purchased: order._id },
//         });

//         let postData = await Post.findByIdAndUpdate(postId, {
//           $push: { purchasedBy: purchaserId },
//         });
//       } catch (dbError) {
//         return res
//           .status(500)
//           .json({ success: false, message: dbError.message });
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "Payment successful" });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   generateOrder,
//   verifyOrder,
// };



const Razorpay = require("razorpay");
const User = require("../models/User");
const Order = require("../models/Order");
const Post = require("../models/Post");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Generate Razorpay order
const generateOrder = async (req, res) => {
  const purchaserId = req.id; // Assuming middleware adds `id` to `req`
  const { price } = req.body;

  try {
    const user = await User.findById(purchaserId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const options = {
      amount: Math.round(price * 100), // Convert price to paise
      currency: "INR", 
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      res.status(200).json({ success: true, data: order });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay order
const verifyOrder = async (req, res) => {
  const purchaserId = req.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    postId,
    postUrl,
    author,
    title,
    price,
  } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Signature mismatch! Payment verification failed.",
      });
    }

    const order = new Order({
      purchaserId,
      postUrl,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      author,
      title,
      price,
    });

    await order.save();

    // Update User and Post with transaction details
    await User.findByIdAndUpdate(purchaserId, {
      $push: { purchased: order._id },
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { purchasedBy: purchaserId },
    });

    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateOrder,
  verifyOrder,
};
