const router = require('express').Router();
const db = require('../config/config');

router.get('/', (req, res) => {
    db.execute(`SELECT restaurants.name, restaurants.logo, restaurants.location, restaurants.description, users.username AS user FROM restaurants INNER JOIN users ON restaurants.user = users.id`, [], (err, result, field) => {
        console.log(err);
        res.send({
            "success": true,
            "data": result
        });
    })
});

router.post('/', (req, res) => {
    const { user, name, logo, location, description } = req.body;
    const sql = 'INSERT INTO restaurants (user, name, logo, location, description) VALUES(?, ?, ?, ?, ?)';

    db.execute(
        sql, [
        user, name, logo, location, description
    ],
        (err, result, field) => {
            console.log(err)
            res.send(result)
        }
    )
});

router.put('/:id', (req, res) => {
    const { user, name, logo, location, description } = req.body;
    const sql = 'UPDATE restaurants SET user=?, name=?, logo=?, location=?, description=? WHERE id=?';

    db.execute(
        sql, [
        user, name, logo, location, description, req.params.id
    ],
        (err, result, field) => {
            console.log(err)
            res.send(result)
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