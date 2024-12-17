const Pool = require("pg").Pool; // lib for connecting to database

const pool = new Pool({
    //data for connection to database
    label: "instagram",
    host: "localhost",
    user: "postgres",
    port: 5432,
    ssl: false,
    database: "instagram",
    password: "vlad3003",
});

module.exports = pool;
