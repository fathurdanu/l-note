const { tokenVerifier } = require('../helpers/jsonwebtoken')
const { Job, User } = require('../models')

const authentication = (req, res, next) => {
    console.log('Middleware authentication')
    const access_token = req.headers.access_token

    if (access_token) {
        try {
            let verifyToken = tokenVerifier(access_token)
            req.userData = verifyToken
            next()
        } catch (err) {
            req.status(401).json({
                message: "Token not authenticated!"
            })
        }
    } else {
        res.status(404).json({
            message: "Access token not found"
        })
    }
}

const authorization = async (req, res, next) => {
    try {
        const type = req.userData.type;
        if (type !== "admin") {
            res.status(401).json({
                message: "User doesn't have access"
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

module.exports = {authentication, authorization}