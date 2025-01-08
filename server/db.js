const Pool = require("pg").Pool; // lib for connecting to database

const pool = new Pool({
    //data for connection to database
    label: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    ssl: false,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

module.exports = pool;
