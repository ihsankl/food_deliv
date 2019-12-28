const router = require('express').Router();
const db = require('../config/config');
const { auth, all } = require('../config/middleware');
const uuidv1 = require('uuid/v1');

router.get('/', auth, all, (req, res) => {
    const { user } = req.query
    db.execute(`SELECT * FROM carts WHERE user = ?`, [user], (err, result, field) => {
        if (err) {
            console.log(err)
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err,
            })
        } else if (result.length === 0) {
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: "No data retrieved!",
            })
        } else {
            res.send({
                uuid: uuidv1(),
                status: 200,
                data: result
            })
        }
    })
});

router.get('/:id', auth, all, (req, res) => {
    db.execute(`SELECT * FROM carts WHERE id = ?`, [req.params.id], (err, result, field) => {
        if (err) {
            console.log(err)
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err,
            })
        } else if (result.length === 0) {
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: "No data retrieved!",
            })
        } else {
            res.send({
                uuid: uuidv1(),
                status: 200,
                data: result
            })
        }
    })
});

router.post('/', auth, all, (req, res) => {
    const { restaurant, item, user, qty, total, bought } = req.body;

    const sql = 'INSERT INTO carts (restaurant, item, user, qty, total, bought) VALUES(?, ?, ?, ?, ?, ?)';
    db.execute(sql, [restaurant, item, user, qty, total, bought],
        (err, result, field) => {
            if (err) {
                console.log(err)
                res.send({
                    uuid: uuidv1(),
                    status: 400,
                    msg: err,
                })
            } else {
                res.send({
                    uuid: uuidv1(),
                    status: 200,
                    msg: "Data insertion completed!"
                })
            }
        }
    )
});

router.put('/:id', auth, all, (req, res) => {
    const { item, user, total } = req.body;
    const date_updated = new Date()
    const sql = 'UPDATE items SET item=?, user=?, total=? WHERE id=?';

    db.execute(sql, [item, user, total, req.params.id],
        (err, result, field) => {
            if (err) {
                console.log(err)
                res.send({
                    uuid: uuidv1(),
                    status: 400,
                    msg: err,
                })
            } else {
                res.send({
                    uuid: uuidv1(),
                    status: 200,
                    msg: "Updating data completed!"
                })
            }
        }
    )
});

router.delete('/:id', auth, all, (req, res) => {
    const sql = `DELETE FROM carts WHERE id=?`;

    db.execute(sql, [req.params.id],
        (err, result, field) => {
            if (err) {
                console.log(err)
                res.send({
                    uuid: uuidv1(),
                    status: 400,
                    msg: err,
                })
            } else {
                res.send({
                    uuid: uuidv1(),
                    status: 200,
                    msg: "Data Deletion completed!"
                })
            }
        }
    )
})

module.exports = router;