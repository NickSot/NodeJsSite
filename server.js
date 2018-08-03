"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const sqlClass_1 = require("./sqlClass");
let app = express();
app.use(bodyParser.urlencoded());
app.set("view enging", "pug");
let sql = new sqlClass_1.ManageSql();
app.get("/", (request, response) => {
    response.render("index.pug");
    sql.connect().then(() => {
        sql.Select("asd", "asd");
    });
});
app.post("/", (request, response) => {
    sql.connect().then(() => {
        sql.InsertRow(request.body.username, request.body.password);
    });
});
app.listen(5000);
