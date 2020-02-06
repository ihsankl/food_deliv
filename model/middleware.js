const middleware = {
  detailToken: 'SELECT * FROM revoked_tokens WHERE token = ?',
};

module.exports = middleware;
