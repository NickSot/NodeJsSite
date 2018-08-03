import * as express from "express";
import * as bodyParser from "body-parser";
import {ManageSql} from "./sqlClass";

let app = express();

app.use(bodyParser.urlencoded());
app.set("view enging", "pug");

let sql = new ManageSql();

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