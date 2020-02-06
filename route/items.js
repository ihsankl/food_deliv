const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const { auth, admin_restaurant } = require('../config/middleware');
const { post_items } = require('../model/model');
const sql = require('../model/items');

const url = process.env.APP_URI;


const storage = multer.diskStorage({
  destination(cb) {
    cb(null, './img');
  },
  filename(file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
    // callback(null, false)
  }
  callback(null, true);
};

const upload = multer({ storage, fileFilter });

router.get('/', (req, res) => {
  const { query } = req;
  let where = '';
  let sort = '';
  let page = 'LIMIT 6 OFFSET 0';
  let fullUrl = '';

  if (query.search) {
    let count = 1;
    where += 'WHERE';
    Object.keys(query.search).forEach((key) => {
      if (Object.keys(query.search).length === 1) {
        where += ` items.${key} LIKE '%${query.search[key]}%'`;
        fullUrl += `search[${key}]=${query.search[key]}&`;
        count += 1;
      } else if (Object.keys(query.search).length === count) {
        where += ` items.${key} LIKE '%${query.search[key]}%'`;
        fullUrl += `search[${key}]=${query.search[key]}&`;
        count += 1;
      } else {
        where += ` items.${key} LIKE '%${query.search[key]}%' AND`;
        fullUrl += `search[${key}]=${query.search[key]}&`;
        count += 1;
      }
    });
  }

  if (query.sort) {
    if (Object.keys(query.sort).length === 1) {
      sort += 'ORDER BY';
      Object.keys(query.sort).forEach((key) => {
        sort += ` items.${key} ${query.sort[key]}`;
        fullUrl += `sort[${key}]=${query.sort[key]}&`;
      });
    }
  }

  if (query.page) {
    const offset = (Number(query.page) * 6) - 6;
    page = `LIMIT 6 OFFSET ${offset}`;
    fullUrl += `page=${query.page}&`;
  } else {
    query.page = 1;
  }

  const sql1 = `${sql.count} ${where}`;

  const sql2 = `${sql.get} ${where} ${sort} ${page}`;

  db.execute(sql1, (err, result) => {
    if (err) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err,
      });
    } else if (result.length === 0) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'No data retrieved!',
      });
    } else {
      db.execute(sql2, (err2, res2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else if (res2.length === 0) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: 'No data retrieved!',
          });
        } else {
          let prev = '';
          let next = '';

          const noPage = fullUrl.replace(/page=[0-9\.]+&/g, '');

          prev = `${url}items?${noPage}page=${Number(query.page) - 1}`;
          next = `${url}items?${noPage}page=${Number(query.page) + 1}`;

          if (Number(query.page) === Math.ceil(Number(result[0].result) / 6)) {
            prev = `${url}items?${noPage}page=${Number(query.page) - 1}`;
            next = '';
            const regex = /page=0/g;
            if (prev.match(regex)) {
              prev = '';
              next = '';
            }
          } else if (query.page <= 1) {
            prev = '';
            next = `${url}items?${noPage}page=${Number(query.page) + 1}`;
          }

          res.send({
            uuid: uuidv1(),
            status: 200,
            info: {
              count: result[0].result,
              pages: Math.ceil(Number(result[0].result) / 6),
              current: `${url}items?${fullUrl}`,
              next,
              previous: prev,
            },
            data: res2,
          });
        }
      });
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT restaurants.name, items.name AS item, items.id, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id WHERE items.id = ?';

  db.execute(
    sql, [id],
    (err1, result1) => {
      if (err1) {
        console.log(err1);
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: err1,
        });
      } else if (result1.length === 0) {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: 'No data retrieved!',
        });
      } else {
        const related = result1[0].category_id;
        const recommended = `SELECT restaurants.name, items.name AS item, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated 
                FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id 
                WHERE category = ? ORDER BY total_ratings DESC LIMIT 3`;

        db.execute(recommended, [related], (err2, result2) => {
          if (err2) {
            console.log(err2);
            res.send({
              uuid: uuidv1(),
              status: 400,
              msg: err2,
            });
          } else {
            const review = 'SELECT review.review, users.username, items.name, review.ratings FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id WHERE item = ? ORDER BY review.updated_on DESC LIMIT 5';
            db.execute(review, [req.params.id], (err3, res3) => {
              if (err3) {
                console.log(err2);
                res.send({
                  uuid: uuidv1(),
                  status: 400,
                  msg: err3,
                });
              } else {
                res.send({
                  uuid: uuidv1(),
                  status: 200,
                  data: result1,
                  reviews: res3,
                  showcase: result2,
                });
              }
            });
          }
        });
      }
    },
  );
});

router.post('/image/:id', auth, admin_restaurant, upload.single('image'), (req, res) => {
  const { filename } = req.file;
  try {
    db.execute(sql.findImages, [req.params.id], (err, result) => {
      if (err) {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: err,
        });
      } else if (result.length === 0) {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: 'No data retrieved!',
        });
      } else if (result[0].images) {
        fs.unlink(`./img/${result[0].images}`, (err3) => {
          if (err3) {
            res.send({
              uuid: uuidv1(),
              status: 200,
              msg: err3,
            });
          } else {
            // const update = 'UPDATE items SET images = ? WHERE id = ?';
            db.execute(sql.updateImage, [filename, req.params.id], (err4) => {
              if (err4) {
                res.send({
                  uuid: uuidv1(),
                  status: 200,
                  msg: err3,
                });
              } else {
                res.send({
                  uuid: uuidv1(),
                  status: 200,
                  msg: 'Image uploaded!',
                });
              }
            });
          }
        });
      } else if (!result[0].images) {
        // const sql = 'UPDATE items SET images = ? WHERE id = ?';
        db.execute(sql.updateImage, [filename, req.params.id], (err1) => {
          if (err1) {
            res.send({
              uuid: uuidv1(),
              status: 400,
              msg: err1,
            });
          } else {
            res.send({
              uuid: uuidv1(),
              status: 200,
              msg: 'Image uploaded!',
            });
          }
        });
      }
    });
  } catch (error) {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: error,
    });
  }
});

router.post('/', auth, admin_restaurant, (req, res) => {
  const {
    restaurant, name, category, created_by, price, description,
  } = req.body;
  const dateCreated = new Date();
  const dateUpdated = new Date();

  post_items(
    res, restaurant, name, category, created_by, price, description, dateCreated, dateUpdated,
  );
});

router.put('/:id', auth, admin_restaurant, (req, res) => {
  const {
    restaurant, name, category, created_by, price, description,
  } = req.body;
  const dateUpdated = new Date();

  try {
    db.execute(
      sql.update, [
        restaurant, name, category, created_by, price, description, dateUpdated, req.params.id,
      ],
      (err) => {
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
            msg: 'Updating data completed!',
          });
        }
      },
    );
  } catch (error) {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: error,
    });
  }
});

router.delete('/:id', auth, admin_restaurant, (req, res) => {
  db.execute(sql.findImage, [req.params.id], (err, result) => {
    if (err) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err,
      });
    } else if (result.length === 0) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Data not found!',
      });
    } else if (!result[0].images) {
      db.execute(sql.delImg, [req.params.id], (err2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else {
          res.send({
            uuid: uuidv1(),
            status: 200,
            msg: 'No image detected. Data Deletion completed!',
          });
        }
      });
    } else {
      db.execute(sql.delImg, [req.params.id], (err2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else {
          fs.unlink(`./img/${result[0].images}`, (err3) => {
            if (err3) {
              res.send({
                uuid: uuidv1(),
                status: 200,
                msg: 'No image detected. Data Deletion completed!',
              });
            } else {
              // if no error, file has been deleted successfully
              res.send({
                uuid: uuidv1(),
                status: 200,
                msg: 'Data Deletion completed!',
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
