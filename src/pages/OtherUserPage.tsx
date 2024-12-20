import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImagesComponent } from "../components/ProfileImagesComponent";
import { useSelector } from "react-redux";
import DefaulUser from "../assets/user-svgrepo-com.svg";
import { subscriberType, UserState } from "../App";
import { getSubscribers } from "../api/api";
import { getSubscriptions } from "../api/api";

type User = {
    username: string;
    id: number;
    email: string;
    photo_url: string;
};

export const OtherProfilePage = () => {
    const { id } = useParams<{ id: string }>(); // Достаем параметр id из URL
    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(true);
    const [Photos, setPhotos] = useState([]);
    const [follow, setFollow] = useState(false);
    const [Subscribers, setSubscribers] = useState([]);
    const [Subscriptions, setSubsription] = useState([]);

    const State = useSelector((state: { user: UserState }) => state.user);

    function Follow() {
        setFollow(!follow);
        if (!follow) subscribe();
        else unsubscribe();
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

    const subscribe = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/social/subscribe/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: State.userId,
                    }),
                }
            );
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    const unsubscribe = async () => {
        if (!State.userId) {
            console.error("User ID is missing in userState");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:2492/api/social/unsubscribe/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: State.userId,
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }
    };

    const fetchSubscribers = async () => {
        const data = await getSubscribers(
            "http://localhost:2492/api/social/getSubscribers",
            id
        );
        const response: subscriberType = data.subscribers;
        if (!response) {
            return;
        }
        setSubscribers(response);
    };

    const subscriptions = async () => {
        const response = await getSubscriptions(id);
        const data = response.subscriptions;
        if (!data) {
            return;
        }
        setSubsription(data);
    };

    useEffect(() => {
        if (id) fetchUser();
        fetchPhotos();
        fetchSubscribers();
        subscriptions();
    }, [id]);

    useEffect(() => {
        for (let i = 0; i < Subscribers.length; i++) {
            if (Subscribers[i].subscriber_id === State.userId) {
                setFollow(true);
            }
        }
    }, [Subscribers]);

    if (loading) return <div>Загрузка...</div>;

    if (!user) return <div>Пользователь не найден</div>;
    return (
        <main className="ProfilePage__container">
            <div className="ProfilePage">
                <div className="ProfilePage__user">
                    <img
                        className="ProfilePage__avatar"
                        src={
                            user.photo_url
                                ? `http://localhost:2492${user.photo_url}`
                                : DefaulUser
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
                                <p>{Subscribers.length}</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Posts</h2>
                                <p>{Photos.length}</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Follows</h2>
                                <p>{Subscriptions.length}</p>
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
