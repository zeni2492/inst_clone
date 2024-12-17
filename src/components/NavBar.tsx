import { Link } from "react-router-dom";

import UserDefault from "../assets/user-svgrepo-com.svg";
import magnifier from "../assets/magnifier-svgrepo-com.svg";
import feed from "../assets/feed.svg";
import gear from "../assets/gear-svgrepo-com.svg";
import { useSelector } from "react-redux";
import { UserState } from "../pages/ProfilePage";

export const NavBar = ({ image }: { image: string }) => {
    const { username, userId } = useSelector(
        (state: { user: UserState }) => state.user
    );

    return (
        <aside className="NavBar__Container">
            <div className="NavBar">
                <div className="NavBar__Content">
                    <div className="NavBar__User">
                        <img className="NavBar__Image" src={image} alt="" />
                        <p className="NavBar__Username">{username || "User"}</p>
                    </div>
                    <div className="Profile">
                        <div className="Profile__Info">
                            <div className="Profile__media Profile__Posts">
                                <p>20</p>
                                <h3>Posts</h3>
                            </div>
                            <div className="Profile__media Profile__Likes">
                                <p>100</p>
                                <h3>Followers</h3>
                            </div>
                            <div className="Profile__media Profile__Following">
                                <p>100</p>
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
