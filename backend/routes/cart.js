const cartRoute = require('express').Router()
const CartController = require('../controllers/CartController')
const {authentication} = require('../middlewares/auth')

cartRoute.get('/all', CartController.getAllCarts)
cartRoute.get('/', authentication, CartController.getCartByUserId)
cartRoute.post('/add', authentication, CartController.addToCart)
cartRoute.put('/edit/:id', authentication, CartController.editLineItem)
cartRoute.delete('/delete/:id', authentication, CartController.deleteLineItem)
cartRoute.post('/checkout', authentication, CartController.checkout)


module.exports = cartRoute