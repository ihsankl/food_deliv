const jwt = require('jsonwebtoken');

const secret = process.env.APP_KEY;
const uuidv1 = require('uuid/v1');
const db = require('./config');
const sql = require('../model/middleware');

// const sql = {
//     detailToken: 'SELECT * FROM revoked_tokens WHERE token = ?',
// }

const auth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    // const sql = 'SELECT * FROM revoked_tokens WHERE token = ?';

    db.execute(sql.detailToken, [jwt_token], (err, result, field) => {
      if (err) {
        res.send('error');
      } else if (result.length === 0) {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: 'Wrong token!',
        });
      } else if (result[0].signed_out === 'true') {
        res.send({
          uuid: uuidv1(),
          status: 400,
          msg: 'Please login!',
        });
      } else {
        try {
          jwt.verify(jwt_token, secret);
          next();
        } catch (error) {
          res.send({ success: false, msg: error });
        }
      }
    });
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const all = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 1 || user.roles === 2 || user.roles === 3) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const admin_restaurant = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 1 || user.roles === 2) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const admin_customer = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 1 || user.roles === 3) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const restaurant_customer = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 2 || user.roles === 3) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const admin = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 1) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const restaurant = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 2) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

const customer = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const jwt_token = req.headers.authorization.substr(7);
    const user = jwt.verify(jwt_token, secret);
    if (user.roles === 3) {
      next();
    } else {
      res.send({
        uuid: uuidv1(),
        status: 400,
        msg: 'Need a match privilege!',
      });
    }
  } else {
    res.send({
      uuid: uuidv1(),
      status: 400,
      msg: 'Please login!',
    });
  }
};

module.exports = {
  auth, all, admin_restaurant, admin_customer, restaurant_customer, admin, restaurant, customer,
};
