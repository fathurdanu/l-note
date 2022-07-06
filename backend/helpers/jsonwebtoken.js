const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE || "`L1z0q6B333?f~7hXY{zX.ZwSh}NK)2;%#_$vr'F|N[p_Y#E21Qi;^'a~2wT`Rr"

const tokenGenerator = (data) => {
    const {id, username, email, birthday, gender, salt, avatar, type} = data
    return jwt.sign({
        id, username, email, birthday, gender, salt, avatar, type
    }, secretCode)
}

const tokenVerifier = (data) => {
    return jwt.verify(data, secretCode)
}

module.exports= {
    tokenGenerator, tokenVerifier
}