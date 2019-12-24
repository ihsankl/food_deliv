const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query');

router.get('/', (req, res) => {
    db.execute(query.query_get_restaurants, [], (err, result, field) => {
        console.log(err);
        res.send({
            "success": true,
            "data": result
        });
    })
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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