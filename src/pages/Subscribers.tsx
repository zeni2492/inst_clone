import { getSubscribers } from "../api/api";
import { UserState } from "../App";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User } from "../App";

export const Subscribers = () => {
    const navigate = useNavigate();
    const [Subscribers, setSubscribers] = useState([]);
    const { userId } = useSelector(
        //getting data from redux
        (state: { user: UserState }) => state.user
    );

    const subscribers = async () => {
        const response = await getSubscribers(
            "http://localhost:2492/api/social/getSubscribers",
            userId
        );
        const data = response.subscribers;
        if (!data) {
            return;
        }
        setSubscribers(data);
    };

    function redirect(id: number) {
        navigate(`/profile/${id}`);
    }

    console.log("Subscribers", Subscribers);

    useEffect(() => {
        subscribers();
    }, []);

    return (
        <div className="Subscribers">
            <div className="Subscribers__Container">
                <div className="FindPage__Users">
                    {/* Список пользователей */}
                    {Subscribers.length > 0 ? (
                        Subscribers.map((user: User) => (
                            <div
                                onClick={() => redirect(user.id)}
                                className="FindPage__User"
                                key={user.id}
                            >
                                <div className="FindPage__image">
                                    <img
                                        className="FindPage__avatar"
                                        src={
                                            user.photo_url !== null
                                                ? `http://localhost:2492${user.photo_url}`
                                                : ""
                                        }
                                        alt="User Avatar"
                                    />
                                </div>
                                <div className="FindPage__username">
                                    <h2 className="FindPage__name">
                                        {user.username}
                                    </h2>
                                    <p className="FindPage__email">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Пользователи не найдены</p>
                    )}
                </div>
            </div>
        </div>
    );
};
