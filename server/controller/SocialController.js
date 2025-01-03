const pool = require("../db");

class SocialController {
    // Подписка
    async Subscribe(req, res) {
        const { id } = req.params; // ID пользователя, на которого подписываются
        const { user_id } = req.body; // ID пользователя, который подписывается

        if (!id) {
            return res.status(400).json({ message: "User Does Not Exist" });
        }

        try {
            const data = await pool.query(
                `INSERT INTO subscriptions (subscriber_id, subscribed_to_id) VALUES ($1, $2) RETURNING *`,
                [user_id, id]
            );
            res.status(201).json({
                message: "Successfully subscribed",
                subscription: data.rows[0],
            });
        } catch (error) {
            res.status(500).json({
                message: "Error subscribing",
                error: error.message,
            });
        }
    }

    // Отписка
    async Unsubscribe(req, res) {
        const { id } = req.params; // ID пользователя, от которого отписываются
        const { user_id } = req.body; // ID пользователя, который отписывается

        try {
            const data = await pool.query(
                `DELETE FROM subscriptions WHERE subscriber_id = $1 AND subscribed_to_id = $2 RETURNING *`,
                [user_id, id]
            );
            if (data.rowCount === 0) {
                return res
                    .status(404)
                    .json({ message: "Subscription not found" });
            }
            res.json({
                message: "Successfully unsubscribed",
                subscription: data.rows[0],
            });
        } catch (error) {
            res.status(500).json({
                message: "Error unsubscribing",
                error: error.message,
            });
        }
    }

    // Получить всех подписчиков пользователя
    async getSubscribers(req, res) {
        const { id } = req.params;

        try {
            const data = await pool.query(
                `SELECT 
                    subscriptions.*, 
                    users.id AS user_id, 
                    users.username, 
                    users.email, 
                    users.photo_url 
                 FROM subscriptions 
                 JOIN users ON subscriptions.subscriber_id = users.id 
                 WHERE subscriptions.subscribed_to_id = $1`,
                [id]
            );

            if (data.rows.length === 0) {
                return [];
            }

            res.status(200).json({ subscribers: data.rows });
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving subscribers",
                error: error.message,
            });
        }
    }

    async getSubscriptions(req, res) {
        const { id } = req.params; // id текущего пользователя (subscriber_id)

        try {
            const data = await pool.query(
                `SELECT 
                    subscriptions.*, 
                    users.id AS user_id, 
                    users.username, 
                    users.email, 
                    users.photo_url
                 FROM subscriptions 
                 JOIN users ON subscriptions.subscribed_to_id = users.id 
                 WHERE subscriptions.subscriber_id = $1`,
                [id]
            );

            if (data.rows.length === 0) {
                return [];
            }

            res.status(200).json({ subscriptions: data.rows });
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving subscriptions",
                error: error.message,
            });
        }
    }

    async Like(req, res) {
        const { photo_id, user_id } = req.body;
        try {
            const data = await pool.query(
                `INSERT INTO likes (user_id, photo_id) VALUES ($1, $2) RETURNING *`,
                [user_id, photo_id]
            );
            res.status(201).json({
                message: "Successfully liked",
                like: data.rows[0],
            });
        } catch (error) {
            console.error("Error in Like:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async Unlike(req, res) {
        const { photo_id, user_id } = req.body;
        try {
            const data = await pool.query(
                `DELETE FROM likes WHERE user_id = $1 AND photo_id = $2 RETURNING *`,
                [user_id, photo_id]
            );
            res.status(200).json({
                message: "Successfully unliked",
                like: data.rows[0],
            });
        } catch (error) {
            console.error("Error in Unlike:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getLikes(req, res) {
        const { id: photo_id } = req.params;
        try {
            const data = await pool.query(
                `SELECT 
                    likes.*, 
                    users.id AS user_id, 
                    users.username, 
                    users.email, 
                    users.photo_url 
                 FROM likes 
                 JOIN users ON likes.user_id = users.id 
                 WHERE likes.photo_id = $1`,
                [photo_id]
            );
            res.status(200).json({ likes: data.rows });
        } catch (error) {
            console.error("Error in getLikes:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new SocialController();
