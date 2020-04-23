const databaseConnection = require('../database/db_connection.js');

const filterdata = (name,quantity,price,cb) => {
  databaseConnection.query(`SELECT product.id,product.name,product.quantity,prices.price FROM product inner join prices on product.name=prices.name where product.name ='${name}' and product.quantity >=${quantity} and prices.price >= ${price};`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.stringify(res.rows));
    }
  });
};

module.exports=filterdata; 


