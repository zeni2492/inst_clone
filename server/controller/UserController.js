const pool = require("../db");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

class UserController {
    async Register(req, res) {
        try {
            const { username, password, email } = req.body; // destructuring the request body
            const userExist = await pool.query(
                //query to check if user exist in database based on email
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            if (userExist.rows.length > 0) {
                // if user exist then return error
                return res.status(400).json({
                    message: "User already exist",
                });
            }

            const hashedPassword = passwordHash.generate(password); // hash the password

            const newUser = await pool.query(
                //query to insert user into database
                "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",
                [username, email, hashedPassword]
            );

            const token = jwt.sign(
                // generate token
                {
                    id: newUser.rows[0].id,
                    username: newUser.rows[0].username,
                    email: newUser.rows[0].email,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" } // token will expire in 1 hour
            );

            res.status(201).json({
                // return response
                token,
                user: newUser.rows[0],
                message: "User registered successfully",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server error",
            });
        }
    }

    async Login(req, res) {
        try {
            const { username, password } = req.body;

            const userExist = await pool.query(
                // query to check if user exist in database based on username
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

            if (userExist.rows.length === 0) {
                // if user does not exist then return error
                return res.status(400).json({ message: "User does not exist" });
            }

            const storedHash = userExist.rows[0].password; // get stored hash from database

            if (!passwordHash.verify(password, storedHash)) {
                //compare password with stored hash
                // if password does not match then return error
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                // generate token
                {
                    id: userExist.rows[0].id,
                    username: userExist.rows[0].username,
                    email: userExist.rows[0].email,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                token,
                user: userExist.rows[0],
                message: "User logged in successfully",
            });
        } catch (err) {
            console.log("Server error:", err);
            res.status(500).json({ message: "Server error" });
        }
    }

    async Get(req, res) {
        // get user by id
        const { id } = req.query;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        res.status(200).json(user.rows[user.rows.length - 1]);
    }
}

module.exports = new UserController();
