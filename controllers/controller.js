require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {

getInventory: (req, res) => {
    sequelize.query(`SELECT album_name, artist_name, price FROM vinyl_records;`)
    .then((dbResult) => {
        console.log(dbResult[0])
        res.status(200).send(dbResult[0])
    })
    .catch((err) => console.log(err));
}


};