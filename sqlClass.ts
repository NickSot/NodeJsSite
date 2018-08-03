import * as sql from "mssql";
import * as path from "path";
let config = require(path.resolve("./sqlConfig.json"));

class ManageSql{
    private db1;

    public connect()
    {
        return new Promise((resolve, reject) => {this.db1 = new sql.ConnectionPool(config.db, err => {
            if (err){
                console.log("Connection failed...");
                reject(err);
            }else{
                console.log("SUCCESS!!!");
                resolve();
            }
        })});
    }

    public async InsertRow(username: string, password: string)
    {
        let query = `INSERT INTO Users (Username, Password) Values (@username, @password)`;

        let request = new sql.Request(this.db1);
        let result = await request.input("username", username).input("password", password).query(query);

        return result.output;
    }

    public async Select(username: string, password: string){
        let query = `Select * From Users Where Username = @UN And Password = @PW`;

        let request = new sql.Request(this.db1);
        let result = request.input("username", username).input("password", password);


        console.log(result.parameters.username.value);
    }
}

export {ManageSql};
