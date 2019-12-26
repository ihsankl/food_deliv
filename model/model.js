const db = require('../config/config');
const query = require('./query');

post_items = (res, restaurant, name, category, created_by, price, description, images, date_created, date_updated) => {

    db.execute(
        query.query_insert_items, [
        restaurant, name, category, created_by, price, description, images, date_created, date_updated
    ],
        (err, result, field) => {
            console.log(err);
            res.send({
                "success": true,
                "data": result
            });
        }
    )
}

module.exports = {
    post_items
}