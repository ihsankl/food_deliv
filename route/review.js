const router = require('express').Router();
const db = require('../config/config');
const { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer } = require('../config/middleware');

router.get('/', auth, all, (req, res) => {
    db.execute(`SELECT * FROM review`, [], (err, result, field) => {
        console.log(err);
        if (result.length === 0) {
            res.send({
                "success": false,
                "msg": 'no data provided'
            });
        }
        res.send({
            "success": true,
            "data": result
        });
    })
});

router.post('/', auth, all, (req, res) => {
    const { review, user, item, ratings } = req.body;
    const sql = 'INSERT INTO review ( review, user, item, ratings ) VALUES(?, ?, ?, ?)';

    db.execute(
        sql, [
        review, user, item, ratings
    ],
        (err, result, field) => {
            console.log(err)
            // console.log(result.affectedRows)
            if (result.affectedRows > 0) {
                res.send({
                    "success": true,
                    "data": field
                });
            } else if (err) {
                res.send({
                    "success": false,
                    "data": 'no such data'
                });
            }
        }
    )
});

router.put('/:id', auth, all, (req, res) => {
    const { review, user, item, ratings } = req.body;
    const sql = 'UPDATE review SET review=?, user=?, item=?, ratings=? WHERE id=?';

    db.execute(
        sql, [
        review, user, item, ratings, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            if (result) {
                res.send({
                    "success": true,
                    "data": field
                });
            } else {
                res.send({
                    "success": false,
                    "data": 'no such data'
                });
            }
        }
    )
});

router.delete('/:id', auth, all, (req, res) => {
    const sql = `DELETE FROM review WHERE id=?`;

    db.execute(
        sql, [
        req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send({
                "success": false,
                "data": 'no such data'
            });
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