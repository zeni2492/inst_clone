const path = require("path");
const fs = require("fs");
const pool = require("../db");
const uuid = require("uuid");

class ProfileController {
    async setProfileImage(req, res) {
        try {
            const { image } = req.files;
            const { id } = req.params;

            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: "No image uploaded" });
            }

            const uploadDir = path.join(__dirname, "..", "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const fileName = uuid.v4() + path.extname(image.name);
            const uploadPath = path.join(uploadDir, fileName);

            await image.mv(uploadPath);

            const fileUrl = `/uploads/${fileName}`;
            const result = await pool.query(
                "UPDATE users SET photo_url = $1 WHERE id = $2 RETURNING *",
                [fileUrl, id]
            );

            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new ProfileController();
