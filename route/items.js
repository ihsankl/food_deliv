const router = require('express').Router();
const db = require('../config/config');
const query = require('../model/query');

router.get('/', (req, res) => {
    db.execute(query.query_get_items, [], (err, result, field) => {
        console.log(err);
        res.send({
            "success": true,
            "data": result
        });
    })
});

// if (req.query.search) {
//     // res.send(req.query.search.name)
//     req.query.search.name === undefined ? name = '%%' : name = `%${req.query.search.name}%`
//     req.query.search.price === undefined ? price = '%%' : price = `%${req.query.search.price}%`
//     req.query.search.ratings === undefined ? ratings = '%%' : ratings = `%${req.query.search.ratings}%`

//     const sql = `SELECT items.name, items.price, items.description, AVG(review.ratings) AS ratings, items.images, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id INNER JOIN review ON items.id = review.item WHERE items.name LIKE ? AND items.price LIKE ? AND ratings LIKE ? GROUP BY review.item`

//     db.execute(
//         sql, [
//         name, price, ratings
//     ],
//         (err, result, field) => {
//             console.log(err);
//             // console.log(result)
//             if (result.length === 0) {
//                 res.send({
//                     "success": false,
//                     "msg": 'no data with that criteria'
//                 });
//             } else {
//                 res.send({
//                     "success": true,
//                     "data": result
//                 });
//             }
//         }
//     )
// } else if (req.query.sort) {
//     res.send('okay')
// }

router.get('/search', (req, res) => {

    // console.log(req.query.search)
});

router.get('/sort_by', (req, res) => {
    console.log(req.query.sort)

    req.query.sort.name === undefined ? name = '' : name = `%${req.query.sort.name}%`
    // req.query.sort.price === undefined ? price = '' : price = `%${req.query.sort.price}%`
    // req.query.sort.ratings === undefined ? ratings = '' : ratings = `%${req.query.sort.ratings}%`
    // req.query.sort.date_updated === undefined ? date_updated = '' : date_updated = `%${req.query.sort.date_updated}%`

    // const sql = `SELECT items.name, items.price, items.description, items.images, items.ratings, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id ORDER BY ? `

    // db.execute(
    //     sql, [
    //     name, price, ratings
    // ],
    //     (err, result, field) => {
    //         console.log(err);
    //         res.send({
    //             "success": true,
    //             "data": result
    //         });
    //     }
    // )
});

router.post('/', (req, res) => {

    const { name, category, created_by, price, description, images } = req.body;
    const date_created = new Date()
    const date_updated = new Date()

    db.execute(
        query.query_insert_items, [
        name, category, created_by, price, description, images, date_created, date_updated
    ],
        (err, result, field) => {
            console.log(err);
            res.send({
                "success": true,
                "data": result
            });
        }
    )
});

router.put('/:id', (req, res) => {
    const { name, category, created_by, price, description, images } = req.body;
    const date_updated = new Date()

    db.execute(
        query.query_update_items, [
        name, category, created_by, price, description, images, date_updated, req.params.id
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
            }else{
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