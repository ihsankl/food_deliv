const router = require('express').Router();
const db = require('../config/config');
const { auth, all } = require('../config/middleware');
const uuidv1 = require('uuid/v1');

router.get('/', auth, all, (req, res) => {
    db.execute(`SELECT review.review, users.username, items.name, review.ratings, review.created_on, review.updated_on FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id`, [], (err, result, field) => {
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
    const { review, user, item, ratings } = req.body;
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `INSERT INTO review ( review, user, item, ratings, created_on, updated_on ) VALUES(?, ?, ?, ?, ?, ?)`
    db.execute(sql, [review, user, item, ratings, created_on, updated_on], (err, result, field) => {
        if (err) {
            console.log(err)
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err,
            })
        } else {
            const find = `SELECT AVG(ratings) AS avg_rate FROM review WHERE item = ?`
            db.execute(find, [item], (err2, res2, field2) => {
                if (err2) {
                    console.log(err2)
                    res.send({
                        uuid: uuidv1(),
                        status: 400,
                        msg: err2,
                    })
                } else {
                    const avg = res2[0].avg_rate
                    const insert_avg = `UPDATE items SET total_ratings=? WHERE id = ?`
                    db.execute(insert_avg, [avg, item], (err3, res3, field3) => {
                        if (err3) {
                            console.log(err3)
                            res.send({
                                uuid: uuidv1(),
                                status: 400,
                                msg: err3,
                            })
                        } else {
                            res.send({
                                uuid: uuidv1(),
                                status: 200,
                                msg: "Data insertion completed!"
                            })
                        }
                    })
                }
            })
        }
    })
});

router.put('/:id', auth, all, (req, res) => {
    const { review, item, ratings } = req.body;
    // const created_on = new Date()
    const updated_on = new Date()
    const sql = `UPDATE review SET review=?, item=?, ratings=?, updated_on=? WHERE id = ?`
    db.execute(sql, [review, item, ratings, updated_on, req.params.id], (err, result, field) => {
        if (err) {
            console.log(err)
            res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err,
            })
        } else {
            const find = `SELECT AVG(ratings) AS avg_rate FROM review WHERE item = ?`
            db.execute(find, [item], (err2, res2, field2) => {
                if (err2) {
                    console.log(err2)
                    res.send({
                        uuid: uuidv1(),
                        status: 400,
                        msg: err2,
                    })
                } else {
                    const avg = res2[0].avg_rate
                    const insert_avg = `UPDATE items SET total_ratings=? WHERE id = ?`
                    db.execute(insert_avg, [avg, item], (err3, res3, field3) => {
                        if (err3) {
                            console.log(err3)
                            res.send({
                                uuid: uuidv1(),
                                status: 400,
                                msg: err3,
                            })
                        } else {
                            res.send({
                                uuid: uuidv1(),
                                status: 200,
                                msg: "Updating data completed!"
                            })
                        }
                    })
                }
            })
        }
    })
});

router.delete('/:id', auth, all, (req, res) => {
    const sql = `DELETE FROM review WHERE id=?`;

    db.execute(
        sql, [req.params.id],
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