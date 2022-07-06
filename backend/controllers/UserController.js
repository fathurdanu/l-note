const { User, Order, Cart } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator, tokenVerifier } = require('../helpers/jsonwebtoken')

class UserController {
    static async getAllUsers(req, res, next) {
        try {
            let users = await User.findAll({
                // include : [ Order, Cart]
            })
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const image = req.file? req.file.url: "https://www.w3schools.com/howto/img_avatar.png";

            const { username, email, password, birthday, gender, type } = req.body

            let isUsernameTaken = await User.findOne({
                where: { username }
            });

            let isEmailTaken = await User.findOne({
                where: { email }
            })

            if (!isUsernameTaken && !isEmailTaken) {
                let result = await User.create({
                    username, email, password, birthday, gender, image, type
                })
                await Cart.create({
                    UserId: result.id,
                    status: "open"
                })
                res.status(201).json(result)
            } else if (isUsernameTaken) {
                res.status(400).json({ message: "Username already taken" })
            } else if (isEmailTaken) {
                res.status(400).json({ message: "Email already taken" })
            }
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            let account = await User.findOne({
                where: { email }
            })
            if (account) {
                if (decryptPwd(password, account.password)) {
                    let access_token = tokenGenerator(account)
                    res.status(200).json({
                        access_token,
                        type: account.type,
                        image: account.image,
                    })
                } else {
                    res.status(403).json({
                        message: "Invalid password"
                    })
                }
            } else {
                res.status(404).json({
                    message: `User not found`
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async update(req, res, next) {
        try {
            const id = +req.userData.id;

            const { username, email, password, birthday, gender, img, type } = req.body

            let result = await User.update({
                username, email, password, birthday, gender,
                image: req.file? req.file.url: img,
                type,
            },
                {
                    where: { id },
                    individualHooks: true
                })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getUserByUsername(req, res, next) {
        try {
            const id = +req.userData.id
            let result = await User.findOne({
                where: { id },
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController