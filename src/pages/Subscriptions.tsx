import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getSocialStats } from "../api/api";
import { UserState, User } from "../App";

export const Subscriptions = () => {
    const navigate = useNavigate();
    const [Subscriptions, setSubsription] = useState([]);
    const { userId } = useSelector(
        //getting data from redux
        (state: { user: UserState }) => state.user
    );

    // fetching info about your subscribers with function from api/api
    const subscriptions = async () => {
        const response = await getSocialStats(
            "http://localhost:2492/api/social/getSubscriptions",
            userId
        );
        const data = response.subscriptions;
        if (!data) {
            return;
        }
        setSubsription(data);
    };

    // using hook for redirect
    function redirect(id: number) {
        navigate(`/profile/${id}`);
    }

    useEffect(() => {
        subscriptions();
    }, []);

    return (
        <div className="Subscribers">
            <div className="Subscribers__Container">
                <div className="FindPage__Users">
                    {/* Список пользователей */}
                    {Subscriptions.length > 0 ? (
                        Subscriptions.map((user: User) => (
                            <div
                                onClick={() => redirect(user.user_id)}
                                className="FindPage__User"
                                key={user.id}
                            >
                                <div className="FindPage__image">
                                    <img
                                        className="FindPage__avatar"
                                        src={
                                            user.photo_url !== null
                                                ? `http://localhost:2492${user.photo_url}`
                                                : "http://localhost:2492/uploads/user-svgrepo-com.svg"
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
