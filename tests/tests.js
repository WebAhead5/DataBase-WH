const test = require("tape");
const supertest = require('supertest');
const router = require('../src/router')


test("Check HOME Router", t => {

    supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type",  "text/html")
    .end((err,res) => {
       t.error(err)
       t.equal(res.text.substring(0,5), "<!DOC");
       t.end(); 
    });
});


test("Check Descriptions Router", t => {

    supertest(router)
    .get("/alldescriptions")
    .expect(200)
    .expect("content-type", "application/json")
    .end((err,res) => {
       t.error(err)
       t.deepEqual(typeof res.body, "object");
       t.end(); 
    });
});



test("Check PUBLIC Router", t => {

    supertest(router)
    .get("/dolpin")
    .expect(500)
    .expect("content-type", "text/html")
    .end((err,res) => {
       t.error(err)
       t.deepEqual(res.text,"<h1>Sorry, encountered a problem</h1>");
       t.end(); 
    });
});