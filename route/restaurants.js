const router = require('express').Router();
const db = require('../config/config');
const fs = require('fs');
const query = require('../model/query');
const { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer } = require('../config/middleware');
const multer = require('multer');
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

router.post('/logo/:id', auth, admin_restaurant, upload.single('logo'), (req, res) => {
    // try {
    //   res.send(req.file);
    // }catch(err) {
    //   res.send(400);
    // }
    const sql = `UPDATE restaurants SET logo=? WHERE id=?`
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

router.delete('/logo/:id', auth, admin_restaurant, (req, res) => {
    const sql = `SELECT logo FROM restaurants WHERE restaurants.id=?`
    db.execute(sql, [req.params.id], (err1, result1, field1) => {
        console.log(err1);
        if (err1) {
            res.send('not found 1')
        } else {
            const image = ''
            const del = `UPDATE restaurants SET logo=? WHERE id=?`
            db.execute(del, [image, req.params.id], (err2, result2, field2) => {
                if (err2) {
                    console.log(err2)
                    res.send('not found 2')
                } else {
                    if (!result1[0].logo) {
                        console.log('file not found')
                        res.send('file not found')
                    } else {
                        fs.unlink(`./img/${result1[0].logo}`, (err3) => {
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
    db.execute(query.query_get_restaurants, [], (err, result, field) => {
        console.log(err);
        res.send({
            "success": true,
            "data": result
        });
    })
});

router.post('/', auth, admin_restaurant, (req, res) => {
    const { user, name, logo, location, description } = req.body;
    db.execute(
        query.query_insert_restaurants, [
        user, name, logo, location, description
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

router.put('/:id', auth, admin_restaurant, (req, res) => {
    const { user, name, logo, location, description } = req.body;
    db.execute(
        query.query_update_restaurants, [
        user, name, logo, location, description, req.params.id
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
        query.query_delete_restaurants, [
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
})

// app.post('/barang', async (req, res) => {
//     const { kode_barang, nama_barang, kategori, harga_pokok, harga_distributor, harga_jual, stok } = req.body;

//     const resData = await db.query(`INSERT INTO barang( kode_barang, nama_barang, kategori, harga_pokok, harga_jual, harga_distributor, sisa_stok) VALUES('${kode_barang}', '${nama_barang}', '${kategori}', '${harga_pokok}', '${harga_jual}', '${harga_distributor}', '${stok}')`, function (err, rows, fields) {
//         console.log(err)
//         res.json(rows);
//     });
// });


module.exports = router;