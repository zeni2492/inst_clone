const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const app = express();
const port = 2492;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
