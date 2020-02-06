const router = require('express').Router();
const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const { auth } = require('../config/middleware');
const sql = require('../model/categories');


router.get('/', (req, res) => {
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

router.get('/:id', auth, (req, res) => {
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

router.post('/', auth, (req, res) => {
  const { name } = req.body;

  db.execute(sql.post, [name],
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
    });
});

router.put('/:id', auth, (req, res) => {
  const { name } = req.body;

  db.execute(sql.update, [name, req.params.id],
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
    });
});

router.delete('/:id', auth, (req, res) => {
  db.execute(sql.delete, [req.params.id],
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
    });
});

module.exports = router;
