const path = require("path");
const fs = require("fs");
const pool = require("../db");
const uuid = require("uuid");

class ProfileController {
    async setProfileImage(req, res) {
        try {
            const { image } = req.files; // requesting image file
            const { id } = req.params; // requesting user id

            if (!req.files || !req.files.image) {
                // checking if image is uploaded
                return res.status(400).json({ message: "No image uploaded" });
            }

            const uploadDir = path.join(__dirname, "..", "uploads"); // folder for uploading images
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const fileName = uuid.v4() + path.extname(image.name); // generating unique file name
            const uploadPath = path.join(uploadDir, fileName); // path for saving file

            await image.mv(uploadPath); // moving image to folder

            const fileUrl = `/uploads/${fileName}`; // URL for image access
            const result = await pool.query(
                "UPDATE users SET photo_url = $1 WHERE id = $2 RETURNING *",
                [fileUrl, id]
            );

            res.status(200).json({
                message: "Image uploaded successfully",
                fileName: fileName, // file name
                photoUrl: fileUrl, // URL for image
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new ProfileController();
