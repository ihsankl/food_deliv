const items = {
  count: 'SELECT COUNT(*) AS result FROM items',
  get: 'SELECT items.id, items.name AS item, items.price, items.description, items.images, items.total_ratings, items.date_created, items.date_updated FROM items',
  findImage: 'SELECT images FROM items WHERE id = ?',
  updateImage: 'UPDATE items SET images = ? WHERE id = ?',
  update: 'UPDATE items SET restaurant=?, name=?, category=?, created_by=?, price=?, description=?, date_updated=? WHERE id=?',
  delImg: 'DELETE FROM items WHERE id = ?',
};

module.exports = items;
