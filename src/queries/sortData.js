const databaseConnection = require('../database/db_connection.js');

const sortbyquantity = (cb) => {
  databaseConnection.query('SELECT product.id,product.name,product.quantity,prices.price FROM product inner join prices on product.name=prices.name order by product.quantity desc;', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.stringify(res.rows));
    }
  });
};

const sortbyprice= (cb) => {
    databaseConnection.query('SELECT product.id,product.name,product.quantity,prices.price FROM product inner join prices on product.name=prices.name order by prices.price desc;', (err, res) => {
        if (err) {
        cb(err);
      } else {  
        cb(null, JSON.stringify(res.rows));
      }
    });
  };

module.exports = {
    sortbyquantity: sortbyquantity,
    sortbyprice: sortbyprice,

};