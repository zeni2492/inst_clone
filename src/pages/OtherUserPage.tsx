import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImagesComponent } from "../components/ProfileImagesComponent";
import DefaulUser from "../assets/user-svgrepo-com.svg";

type User = {
    username: string;
    id: number;
    email: string;
    photo_url: string;
};

export const OtherProfilePage = ({ photo }: { photo: string }) => {
    const { id } = useParams(); // Достаем параметр id из URL
    const [user, setUser] = useState<null | User>(null); // Состояние для хранения информации о пользователе
    const [loading, setLoading] = useState(true); // Состояние для отображения спиннера
    const [Photos, setPhotos] = useState([]);
    const [follow, setFollow] = useState(false); //follow state

    function Follow() {
        setFollow(!follow);
    }

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
        <main className="ProfilePage__container">
            <div className="ProfilePage">
                <div className="ProfilePage__user">
                    <img
                        className="ProfilePage__avatar"
                        src={
                            user.photo_url ? photo + user.photo_url : DefaulUser
                        }
                        alt=""
                    />
                    <div className="ProfilePage__Follow">
                        <button
                            onClick={Follow}
                            className="ProfilePage__Follow-button"
                        >
                            {follow ? "✓" : "+"}
                        </button>
                    </div>
                    <div className="ProfilePage__username">
                        <h2>{user.username || "User"}</h2>
                    </div>
                    <div></div>
                    <div className="ProfilePage__statistics PersonalPage_Statistics">
                        <ul className="ProfilePage__statsics-list">
                            <li className="ProfilePage__statistics-item">
                                <h2>Followers</h2>
                                <p>100</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Posts</h2>
                                <p>{Photos.length}</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Follows</h2>
                                <p>100</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ImagesComponent image={Photos} />
                    </div>
                </div>
            </div>
        </main>
    );
};
