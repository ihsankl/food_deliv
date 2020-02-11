const carts = {
  notBought: `SELECT carts.*, items.id as itemID, items.images FROM carts LEFT JOIN items ON items.name = carts.item
      WHERE user = ? AND bought = 'false'`,
  bought: `SELECT carts.*, items.id as itemID, items.images FROM carts LEFT JOIN items ON items.name = carts.item
      WHERE user = ? AND bought = 'true'`,
  get: 'SELECT * FROM carts',
  detail: 'SELECT * FROM carts WHERE id = ?',
  post: 'INSERT INTO carts (restaurant, item, user, qty, price, total, bought) VALUES(?, ?, ?, ?, ?, ?, ?)',
  update: 'UPDATE carts SET bought=? WHERE user=?',
  delete: 'DELETE FROM carts WHERE id=?',
};

module.exports = carts;
