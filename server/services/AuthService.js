const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const accessTokenSecret = 'XXXXX'
const mdp = 'XXXXX'
const admin = {
    type: 'Admin',
    email: 'XXXXX',
    firstname: 'XXXXX',
    lastname: 'XXXXX'
}

exports.getDefaultPassword = () => crypto.createHash("sha512").update(mdp).digest("base64")

exports.getDefaultAdmin = () => admin

exports.service = (req, res, next) => {
    if (req.method === "GET" || req.url === '/login') {
        next()
        return
    }

    authenticateJWT(req, res, next)
}

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.sendStatus(401)
        return
    }

    try {
        const user = jwt.verify(token, accessTokenSecret)
        req.user = user
        next()
    }
    catch (e) {
        res.sendStatus(401)
    }
}

exports.generateToken = () => jwt.sign(admin, accessTokenSecret)
