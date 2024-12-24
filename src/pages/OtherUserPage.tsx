import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ImagesComponent } from "../components/ProfileImagesComponent";
import { useSelector } from "react-redux";
import DefaulUser from "../assets/user-svgrepo-com.svg";
import { photo, subscriberType, UserState } from "../App";
import { getSocialStats } from "../api/api";

type User = {
    username: string;
    id: number;
    email: string;
    photo_url: string;
};

export const OtherProfilePage = () => {
    const { id } = useParams<string>();
    const numericId = id ? Number(id) : null; // Преобразуем id в число, если оно определено

    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(true);
    const [Photos, setPhotos] = useState<photo[]>([]);
    const [follow, setFollow] = useState(false);
    const [Subscribers, setSubscribers] = useState<subscriberType[]>([]);
    const [Subscriptions, setSubsription] = useState<subscriberType[]>([]);

    const State = useSelector((state: { user: UserState }) => state.user);

    const Follow = () => {
        setFollow((prev) => !prev);
        if (!follow) subscribe();
        else unsubscribe();
    };

    const fetchUser = useCallback(async () => {
        if (!numericId) return; // Проверяем, что id преобразован
        try {
            const response = await fetch(
                `http://localhost:2492/api/user/getUser?id=${numericId}`
            );
            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.error("Ошибка при загрузке данных пользователя:", error);
            setLoading(false);
        }
    }, [numericId]);

    const fetchPhotos = useCallback(async () => {
        if (!numericId) return;
        try {
            const response = await fetch(
                `http://localhost:2492/api/photo/getAllUserPhotos/${numericId}`
            );
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }, [numericId]);

    const subscribe = async () => {
        if (!numericId) return;
        try {
            const response = await fetch(
                `http://localhost:2492/api/social/subscribe/${numericId}`,
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
            await response.json();
            await fetchSubscribers();
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    const unsubscribe = async () => {
        if (!numericId) return;
        try {
            const response = await fetch(
                `http://localhost:2492/api/social/unsubscribe/${numericId}`,
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
            await response.json();
            await fetchSubscribers();
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }
    };

    const fetchSubscribers = useCallback(async () => {
        if (!numericId) return;
        const data = await getSocialStats(
            "http://localhost:2492/api/social/getSubscribers",
            numericId
        );
        const response = data.subscribers;
        if (!response) {
            return;
        }
        setSubscribers(response);
    }, [numericId]);

    const subscriptions = useCallback(async () => {
        if (!numericId) return;
        const response = await getSocialStats(
            `http://localhost:2492/api/social/getSubscriptions`,
            numericId
        );
        const data = response.subscriptions;
        if (!data) {
            return;
        }
        setSubsription(data);
    }, [numericId]);

    useEffect(() => {
        if (numericId) {
            fetchUser();
            fetchPhotos();
            fetchSubscribers();
            subscriptions();
        }
    }, [numericId, fetchUser, fetchPhotos, fetchSubscribers, subscriptions]);

    useEffect(() => {
        setFollow(
            Subscribers.some(
                (subscriber) => subscriber.subscriber_id === State.userId
            )
        );
    }, [Subscribers, State.userId]);

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
                    <div className="MainPage__Container__Images">
                        {Photos.map((image) => (
                            <div className="MainPage__Images" key={image.id}>
                                <div className="MainPage__Images_User__Container">
                                    <div className="MainPage__Images_User"></div>
                                </div>
                                <ImagesComponent image={image} />
                                <p className="MainPage__Images_Description">
                                    {image.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};
