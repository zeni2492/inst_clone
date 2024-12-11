import { Link } from "react-router-dom";
import UserDefault from "../assets/user-svgrepo-com.svg";
import magnifier from "../assets/magnifier-svgrepo-com.svg";
import feed from "../assets/feed.svg";
import gear from "../assets/gear-svgrepo-com.svg";

export const PhoneNavComponent = () => {
    return (
        <div className="PhoneNavComponent__Container">
            <div className="PhoneNavComponent">
                <nav className="PhoneNavComponent__Links">
                    <Link className="PhoneNavComponent__Link" to={"/"}>
                        <img src={feed} />
                        Home
                    </Link>
                    <Link className="PhoneNavComponent__Link" to={"/find"}>
                        <img src={magnifier} />
                        Find
                    </Link>
                    <Link className="PhoneNavComponent__Link" to={"/settings"}>
                        <img src={gear} />
                        Settings
                    </Link>
                    <Link className="PhoneNavComponent__Link" to={"/profile"}>
                        <img src={UserDefault} />
                        Profile
                    </Link>
                </nav>
            </div>
        </div>
    );
};
