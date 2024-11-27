const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
      purchaserId: {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required : true,
      },
      postUrl:{
            type : String,
            required : true,
      },
      author:{
            type:String,
            required: true,
      },
      title:{
            type: String,
            required : true,
      },
      price :{
            type: Number,
            required : true,
      },
      razorpayOrderId :{
            type :String,
            required : true,

      },

      razorpayPaymentId :{
            type : String,
            required: true,
      },
      razorpaySignature : {
            type : String,
            required : true,
      }
},{timestamps:true});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;