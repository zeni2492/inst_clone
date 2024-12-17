const pool = require("../db");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

class UserController {
    async Register(req, res) {
        try {
            const { username, password, email } = req.body;
            const userExist = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            if (userExist.rows.length > 0) {
                return res.status(400).json({
                    message: "User already exist",
                });
            }

            const hashedPassword = passwordHash.generate(password);

            const newUser = await pool.query(
                "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",
                [username, email, hashedPassword]
            );

            const token = jwt.sign(
                {
                    id: newUser.rows[0].id,
                    username: newUser.rows[0].username,
                    email: newUser.rows[0].email,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(201).json({
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
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

            if (userExist.rows.length === 0) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const storedHash = userExist.rows[0].password;
            console.log("Stored hash from DB:", storedHash);

            if (!passwordHash.verify(password, storedHash)) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                {
                    id: userExist.rows[0].id,
                    username: userExist.rows[0].username,
                    email: userExist.rows[0].email,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            const us = userExist;
            console.log(us);

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
        const { id } = req.query;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        res.status(200).json(user.rows[user.rows.length - 1]);
    }
}

module.exports = new UserController();
