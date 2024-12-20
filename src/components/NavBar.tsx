import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserDefault from "../assets/user-svgrepo-com.svg";
import magnifier from "../assets/navIcons/magnifier-svgrepo-com.svg";
import feed from "../assets/navIcons/feed.svg";
import gear from "../assets/navIcons/gear-svgrepo-com.svg";
import { useSelector } from "react-redux";
import { UserState } from "../App";
import { photo } from "../App";
import { getSubscribers } from "../api/api";
import { getSubscriptions } from "../api/api";

export const NavBar = ({ image }: { image: string }) => {
    const navigate = useNavigate();
    const [Subscribers, setSubscribers] = useState([]);
    const [Subscriptions, setSubsription] = useState([]);

    const { username, userId } = useSelector(
        //getting data from redux
        (state: { user: UserState }) => state.user
    );

    const [PhotoList, setPhotoList] = useState<photo[]>([]);

    const getImages = async () => {
        const response = await fetch(
            `http://localhost:2492/api/photo/getAllUserPhotos/${userId}`, //query to get images
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        setPhotoList(data);
    };

    const subscriptions = async () => {
        const response = await getSubscriptions(userId);
        const data = response.subscriptions;
        if (!data) {
            return;
        }
        setSubsription(data);
    };

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

    useEffect(() => {
        getImages();
        // subscribers();
        subscribers();
        subscriptions();
    }, []);

    return (
        <aside className="NavBar__Container">
            <div className="NavBar">
                <div className="NavBar__Content">
                    <div className="NavBar__User">
                        <img
                            className="NavBar__Image"
                            onClick={() => navigate(`/profile/${userId}`)}
                            src={image}
                            alt=""
                        />
                        <p className="NavBar__Username">{username || "User"}</p>
                    </div>
                    <div className="Profile">
                        <div className="Profile__Info">
                            <div className="Profile__media Profile__Posts">
                                <p>{PhotoList.length}</p>
                                <h3>Posts</h3>
                            </div>
                            <div
                                className="Profile__media Profile__Likes"
                                onClick={() => navigate("/subscribers")}
                            >
                                <p>{Subscribers.length}</p>
                                <h3>Followers</h3>
                            </div>
                            <div
                                className="Profile__media Profile__Following"
                                onClick={() => navigate("/subscriptions")}
                            >
                                <p>{Subscriptions.length}</p>
                                <h3>Follows</h3>
                            </div>
                        </div>
                    </div>
                    <div className="navigation">
                        <nav className="navigation__nav">
                            <h2>Home</h2>
                            <ul className="navigation__list">
                                <li className="navigation__item">
                                    <Link className="navigation__link" to={"/"}>
                                        <span className="navigation__icon">
                                            <img
                                                className="navigation__image"
                                                src={feed}
                                                alt=""
                                            />
                                        </span>
                                        Feed
                                    </Link>
                                </li>
                                <li className="navigation__item">
                                    <Link
                                        className="navigation__link"
                                        to={"/find"}
                                    >
                                        <span className="navigation__icon">
                                            <img
                                                className="navigation__image"
                                                src={magnifier}
                                                alt=""
                                            />
                                        </span>
                                        Explore
                                    </Link>
                                </li>
                                <li className="navigation__item">
                                    <Link
                                        className="navigation__link"
                                        to={`/profile/${userId}`}
                                    >
                                        <span className="navigation__icon">
                                            <img
                                                className="navigation__image"
                                                src={UserDefault}
                                                alt=""
                                            />
                                        </span>
                                        Profile
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <footer className="NavBar__settings">
                        <Link to={"/settings"} className="navigation__link">
                            <img
                                className="navigation__image"
                                src={gear}
                                alt=""
                            />
                            Settings
                        </Link>
                        <Link to={"/auth"} className="navigation__link">
                            <button className="NavBar__Exit">Exit</button>
                        </Link>
                    </footer>
                </div>
            </div>
        </aside>
    );
};
