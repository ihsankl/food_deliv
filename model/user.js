const user = {
  user: 'SELECT * FROM users WHERE username=?', // --> #1
  signed: 'INSERT INTO revoked_tokens(token, signed_out) VALUES(?, ?)', // #2
  get: 'SELECT * FROM users', // #3
  detail: 'SELECT * FROM users WHERE id = ?', // #4
  post: 'INSERT INTO users (username, password, roles, created_on, updated_on ) VALUES(?,?,?,?,?)', // #5
  update: 'UPDATE users SET username=?, password=?, roles=?, updated_on=? WHERE id=?', // #6
  logout: 'UPDATE revoked_tokens SET signed_out = ? WHERE token = ?', // #7
  delete: 'DELETE FROM users WHERE id = ?', // #8
};

module.exports = user;
