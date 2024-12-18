import { photo } from "../App";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sendimage from "../assets/social/send-svgrepo-com.svg";
import filledHeart from "../assets/PostActions/filledHearth.svg";
import emptyHeart from "../assets/PostActions/emptyHearth.svg";
import share from "../assets/PostActions/share.svg";

interface ModalProps {
    isOpen: boolean;
    image: photo;
    onClose: () => void; // функция закрытия модалки
}

export const Modal = ({ isOpen, image, onClose }: ModalProps) => {
    const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
    const [userData, setUserData] = useState<any | null>(null); // state для данных пользователя

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
                setUserData(data); // сохраняем данные пользователя в state
            } else {
                console.error("User not found:", data.message);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }

    useEffect(() => {
        if (image && image.user_id) {
            getUserById(image.user_id); // вызываем getUserById, если у изображения есть user_id
        }
    }, [image]); // перезапускаем запрос, когда меняется image

    // Функция для переключения лайка
    function likePhoto(id: number) {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [id]: !prevLikes[id], // переключаем состояние лайка
        }));
    }

    if (!isOpen) return null; // Если модалка закрыта, ничего не рендерим

    return (
        <main className="Modal" onClick={onClose}>
            <div className="Modal__Container" onClick={() => onClose}>
                <div
                    className="Modal__Content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="Modal__ImageContainer">
                        <img
                            src={`http://localhost:2492${image.photo_url}`}
                            alt="Large View"
                            className="Modal__Image"
                        />
                    </div>
                    <div className="Modal__Social">
                        <div className="Modal__Header">
                            {/* Отображаем данные пользователя, если они есть */}
                            {userData && (
                                <>
                                    <img
                                        className="Modal__UserImage"
                                        src={`http://localhost:2492${userData.photo_url}`}
                                        alt={userData.username}
                                    />
                                    <p className="Modal__Username">
                                        {userData.username}
                                    </p>
                                </>
                            )}
                        </div>
                        <div>
                            <div className="Modal__Actions">
                                <div className="Modal__ActionsContainer">
                                    <div
                                        onClick={() => likePhoto(image.id)}
                                        className="PostActions"
                                    >
                                        <img
                                            src={
                                                likes[image.id]
                                                    ? filledHeart
                                                    : emptyHeart
                                            }
                                        />
                                    </div>
                                    <div className="PostActions">
                                        <img src={share} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="Modal__Comments">
                                <input
                                    placeholder="Comment"
                                    id="Modal__Input"
                                    className="Modal__Input"
                                    type="text"
                                />
                                <button className="Modal__Send">
                                    <img
                                        className="Modal__SendImage"
                                        src={Sendimage}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
