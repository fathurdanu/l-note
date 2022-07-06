const route = require('express').Router()

route.get('/', (req, res) => {
    res.status(200).json({
        message: "L-note"
    })
})

const userRoutes = require('./user')
const postingRoutes = require('./product')
const orderRoutes = require('./order')
const cartRoutes = require('./cart')
const lineItemRoutes = require('./lineItem')
const paymentRoutes = require('./payment') 

route.use('/users', userRoutes)
route.use('/products', postingRoutes)
route.use('/orders', orderRoutes)
route.use('/carts', cartRoutes)
route.use('/lines', lineItemRoutes)
route.use("/payment",paymentRoutes)

module.exports = route