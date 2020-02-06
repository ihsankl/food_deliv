const review = {
  detailWithUser: 'SELECT review.id, review.review, users.username, items.name, items.id AS itemID, review.ratings, review.created_on, review.updated_on FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id WHERE review.user = ?', // #1
  get: 'SELECT review.review, users.username, items.name, review.ratings, review.created_on, review.updated_on FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id', // #2
  detail: 'SELECT review.review, users.username, items.name, review.ratings, review.created_on, review.updated_on FROM review INNER JOIN users ON review.user = users.id INNER JOIN items ON review.item = items.id WHERE review.id = ?',
  insert: 'INSERT INTO review ( review, user, item, ratings, created_on, updated_on ) VALUES(?, ?, ?, ?, ?, ?)',
  find: 'SELECT AVG(ratings) AS avg_rate FROM review WHERE item = ?',
  insertAvg: 'UPDATE items SET total_ratings=? WHERE id = ?',
  update: 'UPDATE review SET review=?, item=?, ratings=?, updated_on=? WHERE id = ?',
  delete: 'DELETE FROM review WHERE id=?',
};

module.exports = review;
