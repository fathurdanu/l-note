const paymentRoute = require('express').Router()
const stripe = require("../middlewares/stripe");

paymentRoute.post("/", stripe);

module.exports = paymentRoute;