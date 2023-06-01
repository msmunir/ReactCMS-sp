//Importing mongoose and schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

//Orderline schema
const orderLineSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

//Order schema
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderLines: {
      type: [orderLineSchema],
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    pending: {
      type: Boolean,
      default: true,
    }
  },

  { timestamps: true }
);

//Creating Order model and exporting it
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;