const productRoute = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication, authorization} = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const {uploadImages} = require('../middlewares/firebase')

productRoute.get('/', ProductController.getAllProducts)
productRoute.post('/', authentication, authorization, upload.array('images'), uploadImages, ProductController.create)
productRoute.put('/:id', authentication, authorization, ProductController.update)
productRoute.get('/:id', ProductController.getProductById)
productRoute.put('/views/:id', ProductController.addViews);

module.exports = productRoute