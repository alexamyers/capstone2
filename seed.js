require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`

        create table users (
            user_id serial primary key, 
            username varchar(100),
            password varchar(100),
            email varchar(200)
        );

        create table shopping_cart (
            cart_id serial primary key, 
            user_id integer references users(user_id)
        );

        create table vinyl_records (
            vinyl_id serial primary key, 
            album_name varchar(200),
            artist_name varchar(200),
            version varchar(200),
            genre varchar(200),
            description varchar(200),
            price varchar(100)
        );

        create table shopping_cart_items (
            id serial primary key, 
            vinyl_id integer references vinyl_records(vinyl_id),
            shopping_cart_id integer references shopping_cart(cart_id),
            quantity integer
        );

        insert into vinyl_records (vinyl_id, album_name, artist_name, version, genre, description, price)
        values (1, 'El Mal Querer', 'Rosalia', 'LP', 'Latin', 'Sophomore album by Rosalia', '$27.99'), 
        (2, 'Carrion Crawler / The Dream', 'The Oh Sees', 'LP - Reissue - Magenta', 'Rock', 'Album from the Oh Sees', '$24.99'),
        (3, 'When Forever Comes Crashing', 'Converge', 'LP - Gold Clear', 'Metal', 'Converges first full length album', '$32.99'),
        (4, 'Houses of the Holy', 'Led Zeppelin', 'LP - Reissue - Gatefold', 'Rock', 'First released in 1973 by Led Zeppelin', '$19.99'),
        (5, 'Revolver', 'The Beatles', 'LP 180gm - Reissue', 'Rock', 'Album from the Beatles', '$25.99'),
        (6, 'Lets Stay Together', 'Al Green', 'LP - Reissue', 'Soul', 'Album from Al Green', '$19.99'),
        (7, 'Yeti Season', 'El Michels Affair', 'LP - Blue Translucent', 'Soul', 'Newest album from El Michels Affair', '$21.99'),
        (8, 'Good Kid, M.A.A.D City', 'Kendrick Lamar', 'LP - Gatefold', 'Rap', 'Standout album from Kendrick Lamar', '$29.99')

        `)
    }
}