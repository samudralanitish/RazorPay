const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentAmount = amount || 400;

    const options = {
      amount: paymentAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      key: process.env.KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
