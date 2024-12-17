const Pool = require("pg").Pool;

const pool = new Pool({
    label: "instagram",
    host: "localhost",
    user: "postgres",
    port: 5432,
    ssl: false,
    database: "instagram",
    password: "vlad3003",
});

module.exports = pool;
