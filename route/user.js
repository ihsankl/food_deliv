const secret = process.env.APP_KEY;
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuidv1 = require('uuid/v1');


const { auth, admin } = require('../config/middleware');
const db = require('../config/config');
const sql = require('../model/user');


require('dotenv').config();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // #1
  db.execute(sql.user, [username], (err, result) => {
    if (result.length > 0) {
      if (bcrypt.compareSync(password, result[0].password)) {
        const token = jwt.sign({
          id: result[0].id, username, roles: result[0].roles, expiresIn: '1h',
        }, secret);
        const signedOut = 'false';
        // #2
        db.execute(sql.signed, [token, signedOut], (err2) => {
          if (err2) {
            res.send(err2);
          } else {
            res.send({
              success: true,
              token,
              // auth:auth BISA JUGA auth
            });
          }
        });
      } else {
        res.send({
          success: false,
          msg: 'Wrong Password',
        });
      }
    } else {
      res.send({
        success: false,
        msg: 'User not found!',
      });
    }
  });
});

router.get('/', auth, admin, (req, res) => {
  // #3
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

router.get('/:id', auth, admin, (req, res) => {
  const { id } = req.params;
  // #4
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

router.post('/restaurant', (req, res) => {
  const { username, password } = req.body;
  const enc = bcrypt.hashSync(password);
  const createdOn = new Date();
  const updatedOn = new Date();
  // #1
  db.execute(sql.user, [username], (err1, res1) => {
    if (err1) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err1,
      });
    } else if (res1.length > 0) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Username has taken',
      });
    } else {
      db.execute(
        // #
        sql.post, [
          username, enc, 2, createdOn, updatedOn,
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
              msg: 'Data insertion completed!',
            });
          }
        },
      );
    }
  });
});

router.post('/customer', (req, res) => {
  const { username, password } = req.body;
  const enc = bcrypt.hashSync(password);
  const createdOn = new Date();
  const updatedOn = new Date();

  db.execute(sql.user, [username], (err1, res1) => {
    if (err1) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: err1,
      });
    } else if (res1.length > 0) {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Username has taken',
      });
    } else {
      db.execute(
        sql.post, [
          username, enc, 3, createdOn, updatedOn,
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
              msg: 'Data insertion completed!',
            });
          }
        },
      );
    }
  });
});

router.put('/:id', auth, (req, res) => {
  const { username, password, roles } = req.body;
  const enc = bcrypt.hashSync(password);
  const updatedOn = new Date();

  db.execute(
    sql.update, [
      username, enc, roles, updatedOn, req.params.id,
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

router.delete('/logout', auth, (req, res) => {
  const jwtToken = req.headers.authorization.substr(7);
  const signedOut = 'true';

  db.execute(sql.logout, [signedOut, jwtToken], (err) => {
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
        msg: 'Signed out!',
      });
    }
  });
});

router.delete('/:id', auth, (req, res) => {
  db.execute(sql.delete, [req.params.id], (err) => {
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
        msg: 'Account deleted!',
      });
    }
  });
});

router.put('/forgot_pass/:id', auth, (req, res) => {
  const userId = req.params.id;

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const newPass = makeid(6);
  const enc = bcrypt.hashSync(newPass);

  const q = 'UPDATE users set password = ? WHERE id = ?';

  db.execute(q, [enc, userId], (err) => {
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
        msg: `Your new password is: ${newPass}`,
      });
    }
  });
});

module.exports = router;
