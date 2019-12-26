const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query');
const { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer } = require('../config/middleware');
const { post_items } = require('../model/model');
const multer = require('multer');
const fs = require('fs');

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
    }
    callback(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/image/:id', auth, admin_restaurant, upload.single('image'), (req, res) => {
    // try {
    //   res.send(req.file);
    // }catch(err) {
    //   res.send(400);
    // }
    const sql = `UPDATE items SET images=? WHERE id=?`
    db.execute(
        sql, [req.file.filename, req.params.id],
        (err, result, field) => {
            console.log(err)
            res.send({
                "success": true,
                "data": result
            });
        }
    )
});

router.delete('/image/:id', auth, admin_restaurant, (req, res) => {
    const sql = `SELECT images FROM items WHERE id=?`
    db.execute(sql, [req.params.id], (err1, result1, field1) => {
        console.log(err1);
        if (err1) {
            res.send('not found 1')
        } else {
            const image = ''
            const del = `UPDATE items SET images=? WHERE id=?`
            db.execute(del, [image, req.params.id], (err2, result2, field2) => {
                if (err2) {
                    console.log(err2)
                    res.send('not found 2')
                } else {
                    if (!result1[0].images) {
                        console.log('file not found')
                        res.send('file not found')
                    } else {
                        fs.unlink(`./img/${result1[0].images}`, (err3) => {
                            if (err3) {
                                console.log(err3, result1)
                                res.send(err3)
                            } else {
                                // if no error, file has been deleted successfully
                                console.log('File deleted!');
                                res.send({
                                    "success": true,
                                    "msg": 'file deleted'
                                });
                            }
                        });
                    }
                }
            })
        }
    })

});

router.get('/', auth, all, (req, res) => {
    if (req.query.page) {
        if (req.query.search) {
            if (req.query.sort) {
                // res.send(req.query.sort)
                if (req.query.page === '1') {
                    page = 0
                } else {
                    page = (req.query.page) * 5
                }
                if (req.query.sort.name) {
                    sort_by = 'items.name';
                    sort_met = req.query.sort.name;
                } else if (req.query.sort.price) {
                    sort_by = 'items.price';
                    sort_met = req.query.sort.price;
                } else if (req.query.sort.date_updated) {
                    sort_by = 'items.date_updated';
                    sort_met = req.query.sort.date_updated;
                }
                // JANGAN LUPA RATINGS NYA BLOM CUYY

                req.query.search.name ? name = `%${req.query.search.name}%` : name = '%%'
                req.query.search.price ? price = `%${req.query.search.price}%` : price = '%%'
                req.query.search.ratings ? ratings = `%${req.query.search.ratings}%` : ratings = '%%'

                db.execute(`SELECT restaurants.name AS restaurant, items.name AS item, items.price, items.description, AVG(review.ratings) as ratings, items.images, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id INNER JOIN restaurants ON items.restaurant = restaurants.id LEFT JOIN review ON review.item = items.id WHERE items.name LIKE '${name}' AND items.price LIKE '${price}' AND ratings LIKE '${ratings}'  GROUP BY items.name ORDER BY ${sort_by} ${sort_met} LIMIT 5 OFFSET ${page}`, (err, result, field) => {
                    console.log(err);
                    if (result.length === 0) {
                        res.send({
                            "success": false,
                            "msg": 'no such data'
                        });
                    } else {
                        res.send({
                            "success": true,
                            "data": result
                        });
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
                db.execute(`${query.query_search_items} ${page}`, [name, price], (err, result, field) => {
                    console.log(err);
                    if (result.length === 0) {
                        res.send({
                            "success": false,
                            "msg": 'no such data'
                        });
                    } else {
                        res.send({
                            "success": true,
                            "data": result
                        });
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
                // DONT LIMIT BY 5 FOREVER
                page = `LIMIT 5 OFFSET ${offset}`
            }
            db.execute(`${query.query_get_items} ${page}`, [], (err, result, field) => {
                console.log(err);
                if (result.length === 0) {
                    res.send({
                        "success": false,
                        "msg": 'no such data'
                    });
                } else {
                    res.send({
                        "success": true,
                        "data": result
                    });
                }
            })
        }
    } else {
        db.execute(`${query.query_get_items}`, [], (err, result, field) => {
            console.log(err);
            res.send({
                "success": true,
                "data": result
            });
        })
    }
});

router.post('/', auth, admin_restaurant, (req, res) => {

    const { restaurant, name, category, created_by, price, description, images } = req.body;
    const date_created = new Date()
    const date_updated = new Date()

    post_items(res, restaurant, name, category, created_by, price, description, images, date_created, date_updated)
});

router.put('/:id', auth, admin_restaurant, (req, res) => {
    const { restaurant, name, category, created_by, price, description, images } = req.body;
    const date_updated = new Date()

    db.execute(
        query.query_update_items, [
        restaurant, name, category, created_by, price, description, images, date_updated, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send({
                "success": true,
                "data": result
            });
        }
    )
});

router.delete('/:id', auth, admin_restaurant, (req, res) => {
    db.execute(
        query.query_delete_items, [
        req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            if (result.affectedRows > 0) {
                res.send({
                    "success": true,
                    "data": result
                });
            } else {
                res.send({
                    "success": false,
                    "msg": 'no such data'
                });
            }
        }
    )
});

// app.post('/barang', async (req, res) => {
//     const { kode_barang, nama_barang, kategori, harga_pokok, harga_distributor, harga_jual, stok } = req.body;

//     const resData = await db.query(`INSERT INTO barang( kode_barang, nama_barang, kategori, harga_pokok, harga_jual, harga_distributor, sisa_stok) VALUES('${kode_barang}', '${nama_barang}', '${kategori}', '${harga_pokok}', '${harga_jual}', '${harga_distributor}', '${stok}')`, function (err, rows, fields) {
//         console.log(err)
//         res.json(rows);
//     });
// });


module.exports = router;