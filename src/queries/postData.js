const databaseConnection = require('../database/db_connection.js');

const postData = (name, quantity, price, cb) => {
  databaseConnection.query(
    'INSERT INTO product (name, quantity) VALUES ($1, $2)',
    [name, quantity],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );

  databaseConnection.query('SELECT name FROM prices', (err, res) => {
    //console.log("response from postData.js: ", res.rows)

    if (res.rows.filter(nameObj => nameObj.name === name).length > 0) {
      console.log("filter returns item exists already, return out")
      return
    }
    else {
      console.log("filter returns doesn't exist. Need to add")
      addPriceQuery(name, price)
      addQuantityQuery(name,quantity)
    }
  })
};

const addPriceQuery = (name, price) => {
  databaseConnection.query(`INSERT INTO prices (name,price) VALUES ('${name}',${price});`,
    (err, res) => {
      if (err) {
        console.log(err);
        return
      } else {
        //console.log(res);
      }
    })
  }

  const addQuantityQuery = (name, quantity) => {
    databaseConnection.query(`INSERT INTO product (name,quantity) VALUES ('${name}',${quantity});`,
      (err, res) => {
        if (err) {
          console.log(err);
          return
        } else {
          //console.log(res);
        }
      })
    }



  module.exports = postData;
