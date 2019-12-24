const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query')

router.get('/', (req, res) => {
    db.execute(query.category_get, [], (err, result, field) => {
        console.log(err);
        if (result.length === 0) {
            res.send({
                "success": false,
                "msg": 'no data provided'
            });
        } else {
            res.send({
                "success": true,
                "data": result
            });
        }
    })
});

router.post('/', (req, res) => {
    const { name } = req.body;

    db.execute(
        query.category_insert, [
        name
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

router.put('/:id', (req, res) => {
    const { name } = req.body;

    db.execute(
        query.category_update, [
        name, req.params.id
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

router.delete('/:id', (req, res) => {
    db.execute(
        query.category_delete, [
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