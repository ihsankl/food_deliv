const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/config');
const secret = process.env.APP_KEY;
const { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer } = require('../config/middleware');

require('dotenv').config();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = 'SELECT * FROM users WHERE username=?';
    db.execute(user, [username], (err, result, field) => {
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {
                const auth = jwt.sign({ username: username }, secret);
                // username:username SAMA AJA DENGAN username
                const signed_out = 'false'
                const signed = `INSERT INTO revoked_tokens(token, signed_out) VALUES(?, ?)`
                db.execute(signed, [auth, signed_out], (err2, result2, field2) => {
                    if (err) {
                        console.log(err2)
                        res.send('error');
                    } else {
                        res.send({
                            success: true,
                            auth: auth,
                            roles: result[0].roles
                            // auth:auth BISA JUGA auth
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    msg: 'Password salah'
                })
            }
        } else {
            res.send({
                success: false,
                msg: 'User tidak ditemukan'
            })
        }
    })
});

router.get('/', auth, admin, (req, res) => {
    db.execute(`SELECT * FROM users`, [], (err, result, field) => {
        res.send(result);
    })
});

router.get('/:id', auth, admin, (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?'
    db.execute(sql, [id], (err, result, field) => {
        res.send({ success: true, data: result[0] })
    })
});

router.post('/', (req, res) => {
    const { username, password, roles } = req.body;
    const enc = bcrypt.hashSync(password)
    const created_on = new Date();
    const updated_on = new Date();
    const sql = 'INSERT INTO users (username, password, roles, created_on, updated_on ) VALUES(?,?,?,?,?)';

    db.execute(
        sql, [
        username, enc, roles, created_on, updated_on
    ],
        (err, result, field) => {
            console.log(err)
            res.send({
                success: true,
                msg: 'User created'
            })
        }
    );
});

router.put('/:id', auth, admin, (req, res) => {
    const { username, password, roles } = req.body;
    const enc = bcrypt.hashSync(password)
    const updated_on = new Date();
    const sql = 'UPDATE users SET username=?, password=?, roles=?, updated_on=? WHERE id=? ';

    db.execute(
        sql, [
        username, enc, roles, updated_on, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send({
                success: true,
                msg: 'User updated'
            })
        }
    );
});

router.delete('/logout', auth, (req, res) => {
    const jwt_token = req.headers['authorization'].substr(7);
    const signed_out = 'true'
    const sql = `UPDATE revoked_tokens SET signed_out = ? WHERE token = ?`

    db.execute(`UPDATE revoked_tokens SET signed_out = '${signed_out}' WHERE token = '${jwt_token}'`, (err, result, field) => {
        if (err) {
            console.log(err)
            res.send('error')
        } else {
            res.send('signed out')
        }
    })

});

module.exports = router;