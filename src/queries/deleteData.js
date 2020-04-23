const databaseConnection = require('../database/db_connection.js');

const deleteData = (id, cb) => {
    databaseConnection.query(`DELETE FROM product WHERE id = ${id};`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, JSON.stringify(res));
            
        }
    });
};

module.exports = deleteData;


