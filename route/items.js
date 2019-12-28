const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query');
const { auth, all, admin_restaurant } = require('../config/middleware');
const { post_items } = require('../model/model');
const multer = require('multer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
        // callback(null, false)
    }else{
        callback(null, true);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/', auth, all, (req, res) => {
    if (req.query.page) {
        if (req.query.search) {
            if (req.query.sort) {
                // res.send(req.query.sort)
                if (req.query.page === '1') {
                    page = 'LIMIT 5 OFFSET 0'
                } else if (req.query.page === 'all') {
                    page = ''
                } else {
                    offset = ((req.query.page) * 5) - 5
                    page = `LIMIT 5 OFFSET ${offset}`
                }

                if (req.query.sort.name) {
                    sort_by = 'items.name';
                    sort_con = req.query.sort.name;
                } else if (req.query.sort.price) {
                    sort_by = 'items.price';
                    sort_con = req.query.sort.price;
                } else if (req.query.sort.date_updated) {
                    sort_by = 'items.date_updated';
                    sort_con = req.query.sort.date_updated;
                } else if (req.query.sort.ratings) {
                    sort_by = 'items.total_ratings';
                    sort_con = req.query.sort.ratings;
                } else {
                    res.send('not valid')
                }

                req.query.search.name ? name = `%${req.query.search.name}%` : name = '%%'
                req.query.search.price ? price = `%${req.query.search.price}%` : price = '%%'
                req.query.search.ratings ? ratings = `%${req.query.search.ratings}%` : ratings = '%%'

                db.execute(`SELECT items.name AS item, items.price, items.description, items.images, items.total_ratings, items.date_created, items.date_updated FROM items WHERE items.name LIKE ? AND items.price LIKE ? AND items.total_ratings LIKE ? GROUP BY items.name ORDER BY ${sort_by} ${sort_con} ${page}`, [name, price, ratings], (err, result, field) => {
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
            } else {
                req.query.search.name ? name = `%${req.query.search.name}%` : name = '%%'
                req.query.search.price ? price = `%${req.query.search.price}%` : price = '%%'
                req.query.search.ratings ? ratings = `%${req.query.search.ratings}%` : ratings = '%%'
                if (req.query.page === '1') {
                    page = 'LIMIT 5 OFFSET 0'
                } else if (req.query.page === 'all') {
                    page = ''
                } else {
                    offset = ((req.query.page) * 5) - 5
                    page = `LIMIT 5 OFFSET ${offset}`
                }
                db.execute(`${query.query_search_items} ${page}`,
                    [name, price, ratings], (err, result, field) => {
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
            }
        } else {
            if (req.query.page === '1') {
                page = 'LIMIT 5 OFFSET 0'
            } else if (req.query.page === 'all') {
                page = ''
            } else {
                offset = ((req.query.page) * 5) - 5
                page = `LIMIT 5 OFFSET ${offset}`
            }
            db.execute(
                `SELECT items.name AS item, items.price, items.description, items.images, items.total_ratings, items.date_created, items.date_updated FROM items GROUP BY items.name ${page}`
                , [], (err, result, field) => {
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
        }
    } else {
        db.execute(`${query.query_get_items}`, [], (err, result, field) => {
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
                    page: {
                        limit: 5,
                        total_data: result.length,
                        total_page: Math.ceil((result.length) / 5)
                    },
                    data: result,
                })
            }
        })
    }
});

router.get('/:id', auth, all, (req, res) => {
    const { id } = req.params;

    const sql = `SELECT restaurants.name, items.name AS item, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id WHERE items.id = ?`
    db.execute(
        sql, [id],
        (err1, result1, field1) => {
            if (err1) {
                console.log(err1)
                res.send({
                    uuid: uuidv1(),
                    status: 400,
                    msg: err1,
                })
            } else {
                const related = result1[0].category_id
                const recommended = `SELECT restaurants.name, items.name AS item, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id WHERE category = ? ORDER BY total_ratings DESC LIMIT 5`

                db.execute(recommended, [related], (err2, result2, field2) => {
                    if (err2) {
                        console.log(err2)
                        res.send({
                            uuid: uuidv1(),
                            status: 400,
                            msg: err2,
                        })
                    } else if (result2.length === 0) {
                        res.send({
                            uuid: uuidv1(),
                            status: 400,
                            msg: "No data retrieved!",
                        })
                    }
                    else {
                        const review = `SELECT review.review, users.username, items.name, review.ratings FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id WHERE item = ? ORDER BY review.created_on DESC LIMIT 5`
                        db.execute(review, [req.params.id], (err3, res3, field3) => {
                            if (err3) {
                                console.log(err2)
                                res.send({
                                    uuid: uuidv1(),
                                    status: 400,
                                    msg: err3,
                                })
                            } else if (res3.length === 0) {
                                res.send({
                                    uuid: uuidv1(),
                                    status: 400,
                                    msg: "No data retrieved!",
                                })
                            }
                            else {
                                res.send({
                                    uuid: uuidv1(),
                                    status: 200,
                                    data: result1,
                                    reviews: res3,
                                    showcase: result2
                                })
                            }
                        })
                    }
                })
            }
        }
    )
});

router.post('/image/:id', auth, admin_restaurant, upload.single('image'), (req, res) => {
    const { filename } = req.file
    try {
        const find = `SELECT images FROM items WHERE id = ?`
        db.execute(find, [req.params.id], (err, result, field) => {
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
                if (result[0].images) {
                    fs.unlink(`./img/${result[0].images}`, (err3) => {
                        if (err3) {
                            console.log(err3)
                            res.send({
                                uuid: uuidv1(),
                                status: 200,
                                msg: err3
                            })
                        } else {
                            const update = `UPDATE items SET images = ? WHERE id = ?`
                            db.execute(update, [filename, req.params.id], (err4, res4, field4) => {
                                if (err4) {
                                    res.send({
                                        uuid: uuidv1(),
                                        status: 200,
                                        msg: err3
                                    })
                                } else {
                                    res.send({
                                        uuid: uuidv1(),
                                        status: 200,
                                        msg: "Image uploaded!"
                                    })
                                }
                            })
                        }
                    });
                } else if (!result[0].images) {
                    const sql = `UPDATE items SET images = ? WHERE id = ?`
                    db.execute(sql, [filename, req.params.id], (err1, result1, field1) => {
                        if (err1) {
                            console.log(err1)
                            res.send({
                                uuid: uuidv1(),
                                status: 400,
                                msg: err1,
                            })
                        } else {
                            res.send({
                                uuid: uuidv1(),
                                status: 200,
                                msg: "Image uploaded!"
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.send({
            uuid: uuidv1(),
            status: 400,
            msg: error,
        })
    }
})

router.post('/', auth, admin_restaurant, (req, res) => {

    const { restaurant, name, category, created_by, price, description } = req.body;
    const date_created = new Date()
    const date_updated = new Date()

    post_items(
        res, restaurant, name, category, created_by, price, description, date_created, date_updated
    )
});

router.put('/:id', auth, admin_restaurant, (req, res) => {
    const { restaurant, name, category, created_by, price, description } = req.body;
    const date_updated = new Date()
    const sql = sql = `UPDATE items SET restaurant=?, name=?, category=?, created_by=?, price=?, description=?, date_updated=? WHERE id=?`

    try {
        db.execute(
            sql, [
            restaurant, name, category, created_by, price, description, date_updated, req.params.id
        ],
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
    } catch (error) {
        res.send({
            uuid: uuidv1(),
            status: 400,
            msg: error,
        })
    }
});

router.delete('/:id', auth, admin_restaurant, (req, res) => {
    const sql = `SELECT images FROM items WHERE id = ?`
    db.execute(sql, [req.params.id], (err, result, field) => {
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
                msg: 'Data not found!',
            })
        } else {
            if (!result[0].images) {
                const ready_del = `DELETE FROM items WHERE id = ?`
                db.execute(ready_del, [req.params.id], (err2, res2, field2) => {
                    if (err2) {
                        console.log(err2)
                        res.send({
                            uuid: uuidv1(),
                            status: 400,
                            msg: err2,
                        })
                    } else {
                        res.send({
                            uuid: uuidv1(),
                            status: 200,
                            msg: "No image detected. Data Deletion completed!"
                        })
                    }
                })
            } else {
                const ready_del = `DELETE FROM items WHERE id = ?`
                db.execute(ready_del, [req.params.id], (err2, res2, field2) => {
                    if (err2) {
                        console.log(err2)
                        res.send({
                            uuid: uuidv1(),
                            status: 400,
                            msg: err2,
                        })
                    } else {
                        fs.unlink(`./img/${result[0].images}`, (err3) => {
                            if (err3) {
                                console.log(err3)
                                res.send({
                                    uuid: uuidv1(),
                                    status: 200,
                                    msg: "No image detected. Data Deletion completed!"
                                })
                            } else {
                                // if no error, file has been deleted successfully
                                res.send({
                                    uuid: uuidv1(),
                                    status: 200,
                                    msg: "Data Deletion completed!"
                                })
                            }
                        });
                    }
                })
            }
        }
    })
});

module.exports = router;