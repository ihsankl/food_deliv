const router = require('express').Router();
const db = require('../config/config');

router.get('/', (req, res) => {
    db.execute(`SELECT * FROM categories`, [], (err, result, field) => {
        console.log(err);
        res.send({
            "success": true,
            "data": result
        });
    })
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categories ( name ) VALUES(?)';

    db.execute(
        sql, [
        name
    ],
        (err, result, rows) => {
            console.log(err)
            if (result) {
                res.send({
                    "success": true,
                    "data": rows
                });
            }else{
                res.send({
                    "success": false,
                    "data": 'no such data'
                });
            }
        }
    )
});

router.put('/:id', (req, res) => {
    const { name  } = req.body;
    const sql = 'UPDATE categories SET name=? WHERE id=?';

    db.execute(
        sql, [
        name, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            if (result) {
                res.send({
                    "success": true,
                    "data": field
                });
            }else{
                res.send({
                    "success": false,
                    "data": 'no such data'
                });
            }
        }
    )
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM restaurants WHERE id=?`;

    db.execute(
        sql, [
        req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send(result)
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