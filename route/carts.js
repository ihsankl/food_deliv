const router = require('express').Router();
const db = require('../config/config');

router.get('/', (req, res) => {
    db.execute(`SELECT items.name AS item, users.username AS user FROM carts INNER JOIN items ON carts.item = items.id INNER JOIN users ON carts.user = users.id`, [], (err, result, field) => {
        console.log(err);
        res.send(result);
    })
});

router.post('/', (req, res) => {
    const { item, user } = req.body;
    
    const sql = 'INSERT INTO carts (item, user) VALUES(?, ?)';

    db.execute(
        sql, [
            item, user
    ],
        (err, result, field) => {
            console.log(err);
            res.send(result);
        }
    )
});

router.put('/:id', (req, res) => {
    const { item, user } = req.body;
    const date_updated = new Date()
    const sql = 'UPDATE items SET item=?, user=? WHERE id=?';

    db.execute(
        sql, [
            item, user, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send(result)
        }
    )
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM carts WHERE id=?`;

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