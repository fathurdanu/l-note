const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const {uploadImage} = require('../middlewares/firebase')

userRoute.get('/', UserController.getAllUsers)
userRoute.post('/register', upload.single('image'), uploadImage, UserController.register)
userRoute.post('/login', UserController.login)
userRoute.put('/', authentication, upload.single('image'), uploadImage, UserController.update)
userRoute.get('/info', authentication, UserController.getUserByUsername)

module.exports = userRoute
