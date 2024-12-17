import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { photo } from "../App";

type User = {
    username: string;
    id: number;
    email: string;
    photo_url: string;
};

export const OtherProfilePage = () => {
    const { id } = useParams(); // Достаем параметр id из URL
    const [user, setUser] = useState<null | User>(null); // Состояние для хранения информации о пользователе
    const [loading, setLoading] = useState(true); // Состояние для отображения спиннера
    const [Photos, setPhotos] = useState([]);
    const fetchUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/user/getUser?id=${id}`
            );
            const data = await response.json();
            setUser(data);

            setLoading(false);
        } catch (error) {
            console.error("Ошибка при загрузке данных пользователя:", error);
            setLoading(false);
        }
    };

    const fetchPhotos = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/photo/getAllUserPhotos/${id}`
            );
            const data = await response.json();
            console.log(data);

            setPhotos(data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    useEffect(() => {
        if (id) fetchUser();
        fetchPhotos();
    }, [id]);

    if (loading) return <div>Загрузка...</div>; // Показываем спиннер при загрузке

    if (!user) return <div>Пользователь не найден</div>; // Если пользователь не найден, выводим сообщение

    return (
        <div className="OtherProfilePage">
            <div className="OtherProfilePage__Container">
                <img
                    className="OtherProfilePage__Avatar"
                    src={`http://localhost:2492${user.photo_url}`}
                    alt="Avatar"
                />
                <div className="OtherProfilePage__Header">
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </div>
                <div className="OtherProfilePage__Info">
                    {Photos.map((photo: photo) => (
                        <div key={photo.id}>
                            <img
                                className="OtherProfilePage__Photo"
                                src={`http://localhost:2492${photo.photo_url}`}
                                alt="Photo"
                            />
                            <p>{photo.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
