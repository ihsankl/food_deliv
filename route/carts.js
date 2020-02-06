const router = require('express').Router();
const uuidv1 = require('uuid/v1');
const db = require('../config/config');
const { auth, all } = require('../config/middleware');
const sql = require('../model/carts');


router.get('/user/:id', auth, all, (req, res) => {
  const { id } = req.params;
  db.execute(sql.notBought, [id], (err, result) => {
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

router.get('/user/history/:id', auth, all, (req, res) => {
  const { id } = req.params;
  db.execute(sql.bought, [id], (err, result) => {
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

router.post('/', auth, all, (req, res) => {
  const {
    restaurant, item, user, qty, price, total, bought,
  } = req.body;

  db.execute(sql.post, [restaurant, item, user, qty, price, total, bought],
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

router.put('/:id', auth, all, (req, res) => {
  const { bought } = req.body;

  db.execute(sql.update, [bought, req.params.id],
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

router.delete('/:id', auth, all, (req, res) => {
  db.execute(sql.delete, [req.params.id],
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
          msg: 'Data Deletion completed!',
          data: field,
        });
      }
    });
});

module.exports = router;
