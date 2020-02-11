const router = require('express').Router();
const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const { auth, all } = require('../config/middleware');
const sql = require('../model/review');


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

router.get('/user/:id', auth, all, (req, res) => {
  // #1
  db.execute(sql.detailWithUser, [req.params.id], (err, result) => {
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
  const { id } = req.params;
  db.execute(sql.detail, [id], (err, result) => {
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

router.post('/', auth, all, (req, res) => {
  const {
    review, user, item, ratings,
  } = req.body;
  const createdOn = new Date();
  const updatedOn = new Date();

  db.execute(sql.insert, [review, user, item, ratings, createdOn, updatedOn], (err) => {
    if (err) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err,
      });
    } else {
      db.execute(sql.find, [item], (err2, res2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else {
          const avg = res2[0].avg_rate;

          db.execute(sql.insertAvg, [avg, item], (err3) => {
            if (err3) {
              res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err3,
              });
            } else {
              res.send({
                uuid: uuidv1(),
                status: 200,
                msg: 'Data insertion completed!',
              });
            }
          });
        }
      });
    }
  });
});

router.put('/:id', auth, all, (req, res) => {
  const { review, item, ratings } = req.body;
  // const created_on = new Date()
  const updatedOn = new Date();

  db.execute(sql.update, [review, item, ratings, updatedOn, req.params.id], (err) => {
    if (err) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err,
      });
    } else {
      db.execute(sql.find, [item], (err2, res2) => {
        if (err2) {
          res.send({
            uuid: uuidv1(),
            status: 400,
            msg: err2,
          });
        } else {
          const avg = res2[0].avg_rate;
          // const insertAvg = 'UPDATE items SET total_ratings=? WHERE id = ?';
          db.execute(sql.insertAvg, [avg, item], (err3) => {
            if (err3) {
              res.send({
                uuid: uuidv1(),
                status: 400,
                msg: err3,
              });
            } else {
              res.send({
                uuid: uuidv1(),
                status: 200,
                msg: 'Updating data completed!',
              });
            }
          });
        }
      });
    }
  });
});

router.delete('/:id', auth, all, (req, res) => {
  // const sql = 'DELETE FROM review WHERE id=?';

  db.execute(
    sql.delete, [req.params.id],
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
          msg: 'Data Deletion completed!',
        });
      }
    },
  );
});

module.exports = router;
