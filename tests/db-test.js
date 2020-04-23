const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require('../src/queries/getData')
const postData = require('../src/queries/postData');
const filterData = require('../src/queries/filterData');
const sortData = require('../src/queries/sortData');
const deleteData = require('../src/queries/deleteData');



tape("Checking getting products from the database", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        getData.getData((err, res) => {
            if (err) throw err;
            actualData = JSON.parse(res);
            // console.log(actualData);
            t.deepEqual([
            { id: 1, name: 'Coca-cola', quantity: 3, price: '9.00'},
            { id: 2, name: 'Pringles', quantity: 10, price: '50.00' },
            { id: 3, name: '3% milk', quantity: 2, price: '6.99' },
            { id: 4, name: 'Soya milk', quantity: 1, price: '10.00' },
            { id: 5, name: 'Chips', quantity: 10, price: '15.00' },
            { id: 6, name: 'Meat', quantity: 1, price: '30.00' },
            { id: 7, name: 'Pepsi', quantity: 3, price: '7.00' },
            { id: 8, name: 'Cheese', quantity: 2, price: '25.00' },
            { id: 9, name: 'Almond milk', quantity: 1, price: '20.00' },
            { id: 10, name: 'Socks', quantity: 5, price: '20.00' },
            { id: 11, name: 'Fish', quantity: 5, price: '100.00' },
            { id: 12, name: 'Chicken', quantity: 3, price: '90.00' },
            { id: 13, name: 'Bread', quantity: 10, price: '15.00' },
            { id: 14, name: 'Honey', quantity: 2, price: '80.00' },
            { id: 15, name: 'Toilet Paper', quantity: 1, price: '30.00' }], actualData, "Geting whole data");
            console.log('##############################')
            t.end();
        });
    });

});



tape("Checking posting products to the database ", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        postData('Milk', '3', (err, res) => {
            if (err) throw err;
            actualData = res;
            console.log(actualData);
            t.equals(1, actualData.rowCount, "Should get 1 as a rowCount");
            console.log('##############################')
            t.end();
        });
    });
});



tape("Checking filtering products ", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        filterData('Honey', 1, 30, (err, res) => {
            if (err) throw err;
            actualData = JSON.parse(res);
            console.log(actualData);
            t.deepEqual([{ id: 14, name: 'Honey', quantity: 2, price: '80.00' }], actualData, "Should get Honey");
            console.log('##############################')
            t.end();
        });
    });
});



tape("Checking sorting products by quantitiy ", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        sortData.sortbyquantity((err, res) => {
            if (err) throw err;
            actualData = JSON.parse(res);
            console.log(actualData);
            t.deepEqual([
                { id: 13, name: 'Bread', quantity: 10, price: '15.00' },
                { id: 5, name: 'Chips', quantity: 10, price: '15.00' },
                { id: 2, name: 'Pringles', quantity: 10, price: '50.00' },
                { id: 11, name: 'Fish', quantity: 5, price: '100.00' },
                { id: 10, name: 'Socks', quantity: 5, price: '20.00' },
                { id: 12, name: 'Chicken', quantity: 3, price: '90.00' },
                { id: 7, name: 'Pepsi', quantity: 3, price: '7.00' },
                { id: 1, name: 'Coca-cola', quantity: 3, price: '9.00' },
                { id: 8, name: 'Cheese', quantity: 2, price: '25.00' },
                { id: 3, name: '3% milk', quantity: 2, price: '6.99' },
                { id: 14, name: 'Honey', quantity: 2, price: '80.00' },
                { id: 6, name: 'Meat', quantity: 1, price: '30.00' },
                { id: 4, name: 'Soya milk', quantity: 1, price: '10.00' },
                { id: 15, name: 'Toilet Paper', quantity: 1, price: '30.00' },
                { id: 9, name: 'Almond milk', quantity: 1, price: '20.00' }
              ], actualData, "Should be sorted by quantity from the biggest to the smallest");
            console.log('##############################')
            t.end();
        });
    });
});



tape("Checking sorting products by price ", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        sortData.sortbyprice((err, res) => {
            if (err) throw err;
            actualData = JSON.parse(res);
            console.log(actualData);
            t.deepEqual([
                { id: 11, name: 'Fish', quantity: 5, price: '100.00' },
                { id: 12, name: 'Chicken', quantity: 3, price: '90.00' },
                { id: 14, name: 'Honey', quantity: 2, price: '80.00' },
                { id: 2, name: 'Pringles', quantity: 10, price: '50.00' },
                { id: 15, name: 'Toilet Paper', quantity: 1, price: '30.00' },
                { id: 6, name: 'Meat', quantity: 1, price: '30.00' },
                { id: 8, name: 'Cheese', quantity: 2, price: '25.00' },
                { id: 9, name: 'Almond milk', quantity: 1, price: '20.00' },
                { id: 10, name: 'Socks', quantity: 5, price: '20.00' },
                { id: 13, name: 'Bread', quantity: 10, price: '15.00' },
                { id: 5, name: 'Chips', quantity: 10, price: '15.00' },
                { id: 4, name: 'Soya milk', quantity: 1, price: '10.00' },
                { id: 1, name: 'Coca-cola', quantity: 3, price: '9.00' },
                { id: 7, name: 'Pepsi', quantity: 3, price: '7.00' },
                { id: 3, name: '3% milk', quantity: 2, price: '6.99' }
              ], actualData, "Should be sorted by price from the most expensive one to the chpeast");
            console.log('##############################')
            t.end();
        });
    });
});


tape("Checking deleting products from the database", (t) => {
    runDbBuild(function (err, res) {
        let actualData;
        deleteData(3,(err, res) => {
            if (err) throw err;
            actualData = JSON.parse(res);
            console.log(actualData);
            t.equals(1, actualData.rowCount, "Should get 1 as a rowCount");
            console.log('##############################')
            t.end();
        });
    });
});