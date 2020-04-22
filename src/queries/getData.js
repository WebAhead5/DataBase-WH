const databaseConnection = require('../database/db_connection.js');

const getData = cb => {
    databaseConnection.query('SELECT product.id,product.name,product.quantity,prices.price FROM product inner join prices on product.name=prices.name;', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, JSON.stringify(res.rows));
        }
    });
};






const getPrice = (name, cb) => {
    databaseConnection.query(`SELECT price FROM prices WHERE name = '${name}'`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, JSON.stringify(res.rows));
        }
    });
}



const getAllDescriptions = cb => {
    databaseConnection.query('SELECT * FROM product', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, JSON.stringify(res.rows));
            // console.log("getAlldescriptions is working: ",JSON.stringify(res.rows))
        }
    });
};


module.exports = {
    getData: getData,
    getAllDescriptions: getAllDescriptions,
    getPrice: getPrice
};