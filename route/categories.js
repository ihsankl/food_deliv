const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query')
const { auth, all, admin_restaurant } = require('../config/middleware');
const uuidv1 = require('uuid/v1');

router.get('/', auth, all, (req, res) => {
    db.execute(`SELECT * FROM categories`, [], (err, result, field) => {
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
    db.execute(`SELECT * FROM categories WHERE id = ?`, [req.params.id], (err, result, field) => {
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

router.post('/', auth, admin_restaurant, (req, res) => {
    const { name } = req.body;

    db.execute(`INSERT INTO categories ( name ) VALUES(?)`, [name],
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

router.put('/:id', auth, admin_restaurant, (req, res) => {
    const { name } = req.body;

    db.execute(`UPDATE categories SET name=? WHERE id=?`, [name, req.params.id],
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

router.delete('/:id', auth, admin_restaurant, (req, res) => {
    db.execute(`DELETE FROM categories WHERE id=?`, [req.params.id],
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