const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authentication = async function (req, res, next) {
    console.log(req)
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!userData) {
            return res.status(401).send('not authoorized')
        }
        req.user = userData
        req.token = token
        console.log('authentication done')
        next()
    } catch (e) {
    }
}

module.exports = authentication
