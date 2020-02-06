const restaurants = {
  selectImg: 'SELECT logo FROM restaurants WHERE id = ?',
  updateImg: 'UPDATE restaurants SET logo = ? WHERE id = ?',
  delRestaurant: 'DELETE FROM restaurants WHERE id = ?',
  get: 'SELECT name, logo, location, description FROM restaurants',
  detail: 'SELECT name, logo, location, description FROM restaurants WHERE id = ?',
  post: 'INSERT INTO restaurants(name, user, location, description) VALUES(?,?,?,?)',
  update: 'UPDATE restaurants SET name = ?, user = ?, location = ?, description = ? WHERE id = ?',
};

module.exports = restaurants;
