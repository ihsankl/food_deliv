const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const query = require('./query');

post_items = (res, restaurant, name, category, created_by, price, description, date_created, date_updated) => {
  db.execute(
    query.query_insert_items, [
      restaurant, name, category, created_by, price, description, date_created, date_updated,
    ],
    (err, result, field) => {
      if (err) {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: err,
        });
      } else {
        res.send({
          uuid: uuidv1(),
          status: 200,
          msg: 'Data insertion completed!',
        });
      }
    },
  );
};

module.exports = {
  post_items,
};
