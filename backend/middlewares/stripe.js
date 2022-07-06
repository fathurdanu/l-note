require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeMiddleware = async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "IDR",
      description: "L-note",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.status(200).json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      message: "Payment failed",
      success: false,
    });
  }
};

module.exports = stripeMiddleware;
