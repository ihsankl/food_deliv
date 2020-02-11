require('dotenv').config();
const Express = require('express');
const path = require('path');

const app = Express();
const cors = require('cors');
const bodyParser = require('body-parser');
const items = require('./route/items');
const user = require('./route/user');
const restaurants = require('./route/restaurants');
const carts = require('./route/carts');
const review = require('./route/review');
const categories = require('./route/categories');
// const { auth } = require('./src/middleware');
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('query parser', 'simple');
app.use('/images', Express.static(path.join(__dirname, 'img')));// app.use('/items', auth, items)
app.use('/items', items);
// app.use('/categories', auth, categories);
app.use('/categories', categories);
// app.use('/carts', auth, carts)
app.use('/carts', carts);
// app.use('/review', auth, review);
app.use('/review', review);
// app.use('/restaurants', auth, restaurants)
app.use('/restaurants', restaurants);
app.use('/user', user);

app.get('/', (req, res) => {
  res.send('App worked out');
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
