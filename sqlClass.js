"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const path = require("path");
let config = require(path.resolve("./sqlConfig.json"));
class ManageSql {
    connect() {
        return new Promise((resolve, reject) => {
            this.db1 = new sql.ConnectionPool(config.db, err => {
                if (err) {
                    console.log("Connection failed...");
                    reject(err);
                }
                else {
                    console.log("SUCCESS!!!");
                    resolve();
                }
            });
        });
    }
    InsertRow(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO Users (Username, Password) Values (@username, @password)`;
            let request = new sql.Request(this.db1);
            let result = yield request.input("username", username).input("password", password).query(query);
            return result.output;
        });
    }
    Select(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `Select * From Users Where Username = @UN And Password = @PW`;
            let request = new sql.Request(this.db1);
            let result = request.input("username", username).input("password", password);
            console.log(result.parameters.username.value);
        });
    }
}
exports.ManageSql = ManageSql;
