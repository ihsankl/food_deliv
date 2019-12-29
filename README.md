<h1 align="center">ExpressJS - Simple Food Delivery App RESTfull API</h1>



"Food deliv" is a simple express js application that can be used as a backend.. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name note, and Import file [note.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
APP_PORT=3001
APP_URI=http://localhost:3001/
APP_KEY=ininamanyasecretbaru

DB_SERVER=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=food_deliv
```

## End Point
**1. GET**
* `/restaurants`
* `/restaurants/:id` (Get restaurants by id)
* `/items` 
* `/items?items?page=all&search[name]=angel cake&sort[ratings]=asc`
* `/items/:id` (Get item by id)
* `/categories`
* `/categories/:id` (Get category by id)
* `/carts/`
* `/carts/user/1` (Get carts by user id)
* `/carts/:id` (Get cart by id)
* `/review/`
* `/review/:id` (Get review by id)
* `/user/`
* `/user/:id` (Get user by id)

**2. POST**
* `/user/restaurant` (Register new account for restaurant owner)
    * ``` { "username":"ihsankl", "password":"somestrongpassword" } ```
* `/user/restaurant` (Register new account for customer)
    * ``` { "username":"iamcustomer", "password":"somestrongpassword" } ```
* `/restaurants`
    * ``` { "name":"Restoran Padang", "user":"1", "location":"(-0.928905, 100.367287)", "description":"Lorem Ipsum" } ```
* `/restaurants/logo/:id` (Upload logo for designated restaurant id)
* `/items`
    * ``` { "restaurant": "1", "name": "Baumkuchen", "category": 1, "created_by":"1", "price":"5000", "description":"lorem ipsum" } ```
* `/items/image/:id` (Upload image for designated item id)
* `/categories`
    * ``` { "name":"Cake" } ```
* `/carts`
    * ``` { "user":"1", "restaurant":"Restoran Tanah Abang", "item":"Angel Cake", "qty":"1", "bought":"false" } ```
* `/review/`
    * ``` { "review":"Lorem Ipsum", "user":"1", "item":"1", "ratings":"5" } ```


**3. PUT**
* `/user/:id` (Update account info by id)
    * ``` { "username":"ihsankl", "password":"somestrongpassword" } ```
* `/restaurants/:id` (Update restaurant by id)
    * ``` { "name":"Restoran Tanah Abang", "user":"1", "location":"(-0.928905, 100.367287)", "description":"Lorem Ipsum" } ```
* `/categories/:id` (Update category by id)
    * ``` { "name":"Sweets" } ```
* `/items/:id` (Update item by id)
  * ``` { "restaurant": "1", "name": "Baumkuchen", "category": 1, "created_by":"1", "price":"5000", "description":"lorem ipsum" } ```
* `/carts/:id` (Update cart by id)
    * ``` { "user":"1", "restaurant":"Restoran Tanah Abang", "item":"Angel Cake", "qty":"1", "bought":"true" } ```
* `/review/:id` (Update review by id)
    * ``` { "review":"Ipsum Lorem", "user":"1", "item":"1", "ratings":"4" } ```

**4. DELETE**
* `/user/logout` (invalidate login token)
* `/user/:id` (Delete account by id)
* `/restaurants/:id` (Get restaurants by id)
* `/categories/:id` (Delete categories by id)
* `/items/:id` (Delete item by id)
* `/carts/:id` (Delete cart by id)
* `/review/:id` (Delete review by id)