const router = require('express').Router();
const db = require('../config/config');
const { auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer } = require('../config/middleware');

router.get('/', auth, all, (req, res) => {
    db.execute(`SELECT items.name AS item, users.username AS user, carts.total FROM carts INNER JOIN items ON carts.item = items.id INNER JOIN users ON carts.user = users.id`, [], (err, result, field) => {
        console.log(err);
        res.send(result);
    })
});

router.post('/', auth, all, (req, res) => {
    const { item, user, total } = req.body;
    
    const sql = 'INSERT INTO carts (item, user, total) VALUES(?, ?, ?)';

    db.execute(
        sql, [
            item, user, total
    ],
        (err, result, field) => {
            console.log(err);
            res.send(result);
        }
    )
});

router.put('/:id', auth, all, (req, res) => {
    const { item, user, total } = req.body;
    const date_updated = new Date()
    const sql = 'UPDATE items SET item=?, user=?, total=? WHERE id=?';

    db.execute(
        sql, [
            item, user, total, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send(result)
        }
    )
});

router.delete('/:id', auth, all, (req, res) => {
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