const jwt = require('jsonwebtoken');
const secret = process.env.APP_KEY;
const db = require('./config')

const auth = (req, res, next) => {
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
        const jwt_token = req.headers['authorization'].substr(7);
        const sql = `SELECT * FROM revoked_tokens WHERE token = ?`

        db.execute(sql, [jwt_token], (err, result, field) => {
            if (err) {
                console.log(err)
                res.send('error')
            } else {
                if (result[0].signed_out === 'true' || !result[0].signed_out) {
                    res.send({ success: false, msg: 'Please login!' })
                } else {
                    try {
                        const user = jwt.verify(jwt_token, secret);
                        next()
                    } catch (error) {
                        res.send({ success: false, msg: error })
                    }
                }
            }
        })
    } else {
        res.send({ success: false, msg: 'Please login!' })
    }
}

const all = (req, res, next) => {
    if (req.headers['roles'] === '3' || req.headers['roles'] === '2' || req.headers['roles'] === '1') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const admin_restaurant = (req, res, next) => {
    if (req.headers['roles'] === '1' || req.headers['roles'] === '2') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const admin_customer = (req, res, next) => {
    if (req.headers['roles'] === '1' || req.headers['roles'] === '3') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const restaurant_customer = (req, res, next) => {
    if (req.headers['roles'] === '2' || req.headers['roles'] === '3') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const admin = (req, res, next) => {
    if (req.headers['roles'] === '1') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const restaurant = (req, res, next) => {
    if (req.headers['roles'] === '2') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

const customer = (req, res, next) => {
    if (req.headers['roles'] === '3') {
        next()
    } else {
        res.send({ success: false, msg: 'Need a match priviliege!' })
    }
}

module.exports = { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer }