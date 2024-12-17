require("dotenv").config();

const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./db");
const bodyParser = require("body-parser");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "uploads")));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
