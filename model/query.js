const query = {
    query_search_items: `SELECT items.name, items.price, items.description, AVG(review.ratings) AS ratings, items.images, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id INNER JOIN review ON items.id = review.item WHERE items.name LIKE ? AND items.price LIKE ? AND ratings LIKE ? GROUP BY review.item LIMIT 5 OFFSET ?`,

    query_get_items: `SELECT restaurants.name AS restaurant, items.name AS item, items.price, items.description, items.images, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id INNER JOIN restaurants ON items.restaurant = restaurants.id  `,

    // AVG(review.ratings) as ratings -> taro di search aja

    query_insert_items: `INSERT INTO items (restaurant, name, category, created_by, price, description, images, date_created, date_updated) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,

    query_update_items:`UPDATE items SET restaurant=?, name=?, category=?, created_by=?, price=?, description=?, images=?, date_updated=? WHERE id=?`,

    query_paging_items:`SELECT restaurants.name AS restaurant, items.name AS item, items.price, items.description, items.images, items.date_created, items.date_updated, categories.name AS category, users.username AS created_by FROM items INNER JOIN categories ON items.category = categories.id INNER JOIN users ON items.created_by = users.id INNER JOIN restaurants ON items.restaurant = restaurants.id LIMIT 5 OFFSET ?`,

    query_delete_items:`DELETE FROM items WHERE id=?`,

    query_get_restaurants:`SELECT restaurants.name, restaurants.logo, restaurants.location, restaurants.description, users.username AS user FROM restaurants INNER JOIN users ON restaurants.user = users.id`,

    query_insert_restaurants:`INSERT INTO restaurants (user, name, logo, location, description) VALUES(?, ?, ?, ?, ?)`,

    query_update_restaurants:`UPDATE restaurants SET user=?, name=?, logo=?, location=?, description=? WHERE id=?`,

    query_delete_restaurants:`DELETE FROM restaurants WHERE id=?`,

    category_get:`SELECT * FROM categories`,

    category_insert:`INSERT INTO categories ( name ) VALUES(?)`,

    category_update:`UPDATE categories SET name=? WHERE id=?`,

    category_delete:`DELETE FROM categories WHERE id=?`
}

module.exports = query;