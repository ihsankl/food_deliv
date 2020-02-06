const categories = {
  get: 'SELECT * FROM categories',
  detail: 'SELECT * FROM categories WHERE id = ?',
  post: 'INSERT INTO categories ( name ) VALUES(?)',
  update: 'UPDATE categories SET name=? WHERE id=?',
  delete: 'DELETE FROM categories WHERE id=?',
};

module.exports = categories;
