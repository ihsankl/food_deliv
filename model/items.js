const items = {
  count: 'SELECT COUNT(*) AS result FROM items',
  get: 'SELECT items.id, items.name AS item, items.price, items.description, items.images, items.total_ratings, items.date_created, items.date_updated FROM items',
  findImage: 'SELECT images FROM items WHERE id = ?',
  updateImage: 'UPDATE items SET images = ? WHERE id = ?',
  update: 'UPDATE items SET restaurant=?, name=?, category=?, created_by=?, price=?, description=?, date_updated=? WHERE id=?',
  delImg: 'DELETE FROM items WHERE id = ?',
  detail: 'SELECT restaurants.name, items.name AS item, items.id, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id WHERE items.id = ?',
  recommended: `SELECT restaurants.name, items.name AS item, categories.name AS category, categories.id AS category_id, users.username AS created_by, items.price, items.description, items.total_ratings, items.images, items.date_created, items.date_updated 
  FROM items INNER JOIN restaurants ON items.restaurant = restaurants.id INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id 
  WHERE category = ? ORDER BY total_ratings DESC LIMIT 3`,
  review: 'SELECT review.review, users.username, items.name, review.updated_on, review.ratings FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id WHERE item = ? ORDER BY review.updated_on DESC LIMIT 5',
};

module.exports = items;
