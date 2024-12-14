const pool = require("../db");

class UserController {
    async Register(req, res) {
        const { username, password } = req.body;
    }
}

module.exports = new UserController();
