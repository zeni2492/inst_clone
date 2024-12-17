require("dotenv").config(); // lib for loading env variables

const fileUpload = require("express-fileupload"); // lib for uploading files
const express = require("express"); // lib for creating server
const cors = require("cors"); // lib for cors
const path = require("path"); // lib for path

const bodyParser = require("body-parser"); // lib for parsing json
const router = require("./routes/index"); // routes

const app = express(); // initializing express
const port = process.env.PORT || 5000; // port

app.use(cors()); // middleware for cors
app.use(fileUpload()); // middleware for uploading files
app.use(express.json()); // middleware for parsing json
app.use(express.static(path.resolve(__dirname, "uploads"))); // middleware for static files
app.use(bodyParser.json()); // middleware for parsing json

app.use("/api", router); // using routes

app.listen(port, () => {
    // starting server
    console.log(`Server running on port ${port}`);
});
