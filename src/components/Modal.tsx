import { photo, UserState } from "../App";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import filledHeart from "../assets/PostActions/filledHearth.svg";
import emptyHeart from "../assets/PostActions/emptyHearth.svg";
import Arrow from "../assets/PostActions/back-arrow-svgrepo-com.svg";

interface Comment {
    id: number;
    user_id: number;
    comment_text: string;
    created_at: string;
    username: string;
    photo_url: string;
}

interface ModalProps {
    isOpen: boolean;
    image: photo;
    onClose: () => void;
}

export const Modal = ({ isOpen, image, onClose }: ModalProps) => {
    const { id } = useParams();
    const [userData, setUserData] = useState<UserState | null>(null);
    const [comment, setComment] = useState<string>("");
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const navigate = useNavigate();

    const user = useSelector((state: { user: UserState }) => state.user);
    // Запрос на сервер для получения данных пользователя по ID
    async function getUserById(id: number) {
        try {
            const response = await fetch(
                `http://localhost:2492/api/user/getUser?id=${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                // Проверяем наличие photo_url и устанавливаем дефолтное изображение, если оно отсутствует
                if (!data.photo_url || data.photo_url === "") {
                    data.photo_url = "/uploads/user-svgrepo-com.svg";
                }
                setUserData(data);
            } else {
                console.error("User not found:", data.message);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }

    const sendComment = async () => {
        try {
            await fetch("http://localhost:2492/api/photo/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.userId,
                    photo_id: image.id,
                    comment_text: comment,
                }),
            });
            setComment("");
            getComments();
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    };

    const getComments = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/photo/getComments/${image.id}`
            );
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setCommentList(data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setCommentList([]);
        }
    };

    useEffect(() => {
        if (image && image.user_id) {
            getUserById(image.user_id);
        }
        if (image.id) {
            getComments();
        }
    }, []);

    useEffect(() => {
        if (image.id) {
            fetchLikes();
        }
    }, [image.id]);

    const fetchLikes = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/social/getLikes/${image.id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();

            if (response.ok) {
                setLikesCount(data.likes.length || 0);
                // Проверяем, лайкнул ли текущий пользователь это фото
                const userLiked = data.likes.some(
                    (like: { user_id: number }) => like.user_id === user.userId
                );
                setIsLiked(userLiked);
            } else {
                console.error("Error fetching likes:", data.message);
            }
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    const toggleLike = async () => {
        try {
            const url = `http://localhost:2492/api/social/${
                isLiked ? "unsetLike" : "setLike"
            }/${id}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    photo_id: image.id,
                    user_id: user.userId,
                }),
            });

            if (response.ok) {
                // Переключаем состояние лайка и обновляем счетчик
                setIsLiked(!isLiked);
                setLikesCount((prev) => prev + (isLiked ? -1 : 1));
            } else {
                console.error("Error toggling like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    if (!isOpen) return null;

    if (!image.photo_url) {
        image.photo_url = "/public/user-svgrepo-com.svg";
    }

    const navigatetoCommetWriter = (id: number) => {
        navigate(`/profile/${id}`);
        onClose();
    };

    return (
        <main className="Modal" onClick={onClose}>
            <div className="Modal__Container" onClick={() => onClose}>
                <div
                    className="Modal__Content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="Modal__Close">
                        <img className="Modal__Arrow" src={Arrow} alt="" />
                    </button>
                    <div className="Modal__ImageContainer">
                        <img
                            src={`http://localhost:2492${image.photo_url}`}
                            alt="Large View"
                            className="Modal__Image"
                        />
                    </div>
                    <div className="Modal__Social">
                        <div className="Modal__Header">
                            {userData && (
                                <>
                                    <img
                                        className="Modal__UserImage"
                                        // Проверка, если userData.photo_url существует, используем его
                                        src={
                                            userData.photo_url
                                                ? `http://localhost:2492${userData.photo_url}`
                                                : `http://localhost:2492/uploads/user-svgrepo-com.svg`
                                        }
                                        alt={userData.username}
                                    />
                                    <p className="Modal__Username">
                                        {userData.username}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="Modal__CommentsContainer">
                            <div className="Modal__CommentsList">
                                {commentList.map((comment, index) => (
                                    <div key={`${comment.id}-${index}`}>
                                        <div
                                            onClick={() =>
                                                navigatetoCommetWriter(
                                                    comment.user_id
                                                )
                                            }
                                            className="Modal__Comment"
                                        >
                                            <img
                                                className="Modal__CommentImage"
                                                // Проверяем если photo_url комментария существует
                                                src={
                                                    comment.photo_url
                                                        ? `http://localhost:2492${comment.photo_url}`
                                                        : "http://localhost:2492/uploads/user-svgrepo-com.svg"
                                                }
                                                alt=""
                                            />
                                            <div>
                                                <h3 className="Modal__CommentUsername">
                                                    {comment.username}
                                                </h3>
                                                <h2 className="Modal__CommentText">
                                                    {comment.comment_text}
                                                </h2>
                                                <p className="Modal__CommentDate">
                                                    {comment.created_at.slice(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="Modal__CommentInputContainer">
                                <div className="Modal__Likes">
                                    <img
                                        onClick={toggleLike}
                                        className="Modal__LikeImage"
                                        src={isLiked ? filledHeart : emptyHeart}
                                        alt={isLiked ? "Unlike" : "Like"}
                                    />
                                    <span>
                                        {likesCount}{" "}
                                        {likesCount === 1 ? "like" : "likes"}
                                    </span>
                                </div>
                                <div className="Modal__CommentInputField">
                                    <input
                                        className="Modal__CommentInput"
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />
                                    <button
                                        className="Modal__CommentButton"
                                        onClick={sendComment}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
