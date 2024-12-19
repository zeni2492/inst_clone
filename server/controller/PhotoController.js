const fs = require("fs");
const path = require("path");
const pool = require("../db");
const uuid = require("uuid");

class PhotoController {
    async upload(req, res) {
        try {
            const { photo } = req.files; // Извлекаем файл из запроса
            const { user_id } = req.body; // Извлекаем ID пользователя
            const { description } = req.body;

            if (!req.files || !req.files.photo) {
                return res
                    .status(400)
                    .json({ message: "Фотография не была загружена" });
            }

            const uploadDir = path.join(__dirname, "..", "photos"); // Папка для загрузки файлов
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const fileName = uuid.v4() + path.extname(photo.name); // Уникальное имя файла
            const uploadPath = path.join(uploadDir, fileName); // Полный путь к файлу

            await photo.mv(uploadPath); // Перемещаем файл в папку

            const fileUrl = `/photos/${fileName}`; // URL для доступа к изображению
            const result = await pool.query(
                "INSERT INTO photos (user_id, photo_url, description) VALUES ($1, $2, $3) RETURNING *",
                [user_id, fileUrl, description]
            );

            res.status(201).json({
                message: "Фотография успешно загружена",
                fileName: fileName, // Имя файла
                photoUrl: fileUrl, // URL для доступа к изображению
            });
        } catch (error) {
            console.error("Ошибка при загрузке фотографии:", error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }
    async getPhoto(req, res) {
        try {
            const { id } = req.params;

            const photo = await pool.query(
                "SELECT * FROM photos WHERE id = $1",
                [id]
            );
            if (photo.rows.length === 0) {
                return res.status(404).json({ message: "Photo not found" });
            }

            res.status(200).json(photo.rows[0]);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUserPhotos(req, res) {
        try {
            const { user_id } = req.params;
            await pool
                .query("SELECT * FROM photos WHERE user_id = $1", [user_id])
                .then((result) => {
                    res.status(200).json(result.rows);
                })
                .catch((error) => {
                    console.error("Ошибка при получении фотографий:", error);
                    res.status(500).json({ message: "Ошибка сервера" });
                });
        } catch (error) {
            console.error("Ошибка при получении фотографий:", error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getAll(req, res) {
        try {
            const result = await pool.query("SELECT * FROM photos");
            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Ошибка при получении всех фотографий:", error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async UploadComment(req, res) {
        const { user_id, photo_id, comment_text } = req.body;

        try {
            if (!comment_text) {
                return res
                    .status(400)
                    .json({ message: "comment cannot be empty" });
            }

            const data = await pool.query(
                `INSERT INTO photo_comments (user_id,photo_id,comment_text) VALUES ($1,$2,$3) RETURNING *`,
                [user_id, photo_id, comment_text]
            );

            res.status(201).json(data.rows[0]);
        } catch (e) {
            console.log(e);
        }
    }
    async getComments(req, res) {
        const { photo_id } = req.params; // Получаем photo_id из параметров

        try {
            const result = await pool.query(
                `SELECT 
                    photo_comments.id AS comment_id, 
                    photo_comments.comment_text, 
                    photo_comments.created_at, 
                    users.id AS user_id, 
                    users.username, 
                    users.photo_url 
                 FROM 
                    photo_comments 
                 JOIN 
                    users 
                 ON 
                    photo_comments.user_id = users.id 
                 WHERE 
                    photo_comments.photo_id = $1 
                 ORDER BY 
                    photo_comments.created_at DESC;`,
                [photo_id] // Подставляем photo_id в SQL-запрос
            );

            // Если комментариев нет, возвращаем пустой массив
            if (result.rows.length === 0) {
                return res.status(200).json({ comments: [] });
            }

            // Возвращаем список комментариев
            res.status(200).json({ comments: result.rows });
        } catch (e) {
            console.error("Ошибка при получении комментариев:", e);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new PhotoController();
