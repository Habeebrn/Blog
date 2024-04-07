import sql from "mysql2"
 
export const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",    
    database: "blog"
 });

    db.connect((err)=> {
        if (err) {
            console.error("error connecting to database",err)
            return
        } console.log("connect to database")

    })