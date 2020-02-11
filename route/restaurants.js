const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const {
  auth, all, admin_restaurant,
} = require('../config/middleware');
const sql = require('../model/restaurants');

// const sql = {
//   selectImg: 'SELECT logo FROM restaurants WHERE id = ?',
//   updateImg: 'UPDATE restaurants SET logo = ? WHERE id = ?',
//   delRestaurant: 'DELETE FROM restaurants WHERE id = ?',
//   get: 'SELECT name, logo, location, description FROM restaurants',
//   detail: 'SELECT name, logo, location, description FROM restaurants WHERE id = ?',
//   post: 'INSERT INTO restaurants(name, user, location, description) VALUES(?,?,?,?)',
//   update: 'UPDATE restaurants SET name = ?, user = ?, location = ?, description = ? WHERE id = ?',
// };

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './logo');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, callback) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

const upload = multer({ storage, fileFilter });

router.post('/logo/:id', auth, admin_restaurant, upload.single('logo'), (req, res) => {
  const { filename } = req.file;
  try {
    // const find = 'SELECT logo FROM restaurants WHERE id = ?';
    db.execute(sql.selectImg, [req.params.id], (err, result) => {
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
      } else if (result[0].logo) {
        fs.unlink(`./logo/${result[0].logo}`, (err3) => {
          if (err3) {
            res.send({
              uuid: uuidv1(),
              status: 200,
              msg: err3,
            });
          } else {
            db.execute(sql.updateImg, [filename, req.params.id], (err4) => {
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
      } else if (!result[0].logo) {
        db.execute(sql.updateImg, [filename, req.params.id], (err1) => {
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

router.delete('/:id', auth, admin_restaurant, (req, res) => {
  // const sql = 'SELECT logo FROM restaurants WHERE id = ?';
  db.execute(sql.selectImg, [req.params.id], (err, result) => {
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
    } else if (!result[0].logo) {
      // const ready_del = 'DELETE FROM restaurants WHERE id = ?';
      db.execute(sql.delRestaurant, [req.params.id], (err2) => {
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
      // const ready_del = 'DELETE FROM restaurants WHERE id = ?';
      db.execute(sql.delRestaurant, [req.params.id], (err2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else {
          fs.unlink(`./logo/${result[0].logo}`, (err3) => {
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

router.get('/', auth, all, (req, res) => {
  db.execute(sql.get, [], (err, result) => {
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
      res.send({
        uuid: uuidv1(),
        status: 200,
        data: result,
      });
    }
  });
});

router.get('/:id', auth, all, (req, res) => {
  // const sql = 'SELECT name, logo, location, description FROM restaurants WHERE id = ?';
  db.execute(sql.detail, [req.params.id], (err, result) => {
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
      res.send({
        uuid: uuidv1(),
        status: 200,
        data: result,
      });
    }
  });
});

router.post('/', auth, admin_restaurant, (req, res) => {
  const {
    name, user, location, description,
  } = req.body;
  db.execute(
    sql.post, [name, user, location, description],
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
          msg: 'Data insertion completed!',
        });
      }
    },
  );
});

router.put('/:id', auth, admin_restaurant, (req, res) => {
  const {
    name, user, location, description,
  } = req.body;
  db.execute(
    sql.update, [
      name, user, location, description, req.params.id,
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
});

module.exports = router;
